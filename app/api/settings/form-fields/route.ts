import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const commentSchema = z.object({
  message: z.string().min(1),
  userEmail: z.string().email(),
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const parsed = commentSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.upsert({
    where: { email: parsed.data.userEmail },
    update: {},
    create: {
      email: parsed.data.userEmail,
      name: 'Support Agent',
      role: 'AGENT',
    },
  });

  const comment = await prisma.comment.create({
    data: {
      ticketId: params.id,
      userId: user.id,
      message: parsed.data.message,
    },
    include: { user: true },
  });

  await prisma.ticketActivity.create({
    data: {
      ticketId: params.id,
      userId: user.id,
      action: 'Comment added',
      newValue: parsed.data.message,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
