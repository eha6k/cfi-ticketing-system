import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const createTicketSchema = z.object({
  clientPlatformId: z.string().regex(/^\d+$/),
  actualTicketReference: z.string().min(1),
  ticketType: z.string().min(1),
  regulatoryOrganization: z.string().min(1),
  reason: z.string().optional(),
  createdByEmail: z.string().email().optional(),
  status: z.enum(['OPEN', 'SOLVED', 'SECONDARY_REVIEW', 'CLOSED']).optional(),
});

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      createdBy: true,
      comments: { include: { user: true } },
    },
  });

  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const data = await request.json();
  const parsed = createTicketSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { clientPlatformId, actualTicketReference, ticketType, regulatoryOrganization, reason, createdByEmail, status } = parsed.data;

  const user = await prisma.user.upsert({
    where: { email: createdByEmail ?? 'admin@cfi.local' },
    update: {},
    create: {
      email: createdByEmail ?? 'admin@cfi.local',
      name: 'CFI Admin',
      role: 'ADMIN',
    },
  });

  const ticket = await prisma.ticket.create({
    data: {
      clientPlatformId,
      actualTicketReference,
      ticketType,
      regulatoryOrganization,
      reason: reason ?? '',
      createdById: user.id,
      status: status ?? 'OPEN',
      previousTicketCount: 1,
      recordType: 'NATIVE',
    },
    include: { createdBy: true },
  });

  await prisma.ticketActivity.create({
    data: {
      ticketId: ticket.id,
      userId: user.id,
      action: 'Ticket created',
      newValue: ticket.status,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
