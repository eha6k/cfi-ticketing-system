import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.upsert({
    where: { email: 'admin@cfi.local' },
    update: {},
    create: {
      email: 'admin@cfi.local',
      name: 'CFI Administrator',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'teamlead@cfi.local' },
    update: {},
    create: {
      email: 'teamlead@cfi.local',
      name: 'Operations Team Lead',
      role: 'TEAM_LEAD',
    },
  });

  await prisma.user.upsert({
    where: { email: 'agent@cfi.local' },
    update: {},
    create: {
      email: 'agent@cfi.local',
      name: 'Support Agent',
      role: 'AGENT',
    },
  });

  const defaultFields = [
    { name: 'Ticket Type', type: 'TEXT', required: true, order: 1, active: true },
    { name: 'Reason for the Ticket', type: 'TEXTAREA', required: true, order: 2, active: true },
    { name: 'Related Position Number(s)', type: 'TEXT', required: false, order: 3, active: true },
    { name: 'Special Notes', type: 'TEXTAREA', required: false, order: 4, active: true },
  ];

  for (const field of defaultFields) {
    await prisma.formField.upsert({
      where: { id: `seed-${field.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: field,
      create: { id: `seed-${field.name.toLowerCase().replace(/\s+/g, '-')}`, ...field },
    });
  }

  await prisma.setting.upsert({
    where: { key: 'overdueThresholdHours' },
    update: { value: '24' },
    create: { key: 'overdueThresholdHours', value: '24' },
  });

  const existingTicket = await prisma.ticket.findFirst();
  if (!existingTicket) {
    const ticket = await prisma.ticket.create({
      data: {
        clientPlatformId: '10124',
        actualTicketReference: 'TKT-2026-001',
        ticketType: 'Technical Support',
        regulatoryOrganization: 'Jordan Securities Commission',
        reason: 'Unable to submit client verification request.',
        relatedPositionNumbers: 'POS-7741',
        specialNotes: 'Customer reported issue after password reset.',
        createdById: users.id,
        status: 'OPEN',
        previousTicketCount: 1,
        recordType: 'NATIVE',
      },
    });

    await prisma.comment.create({
      data: {
        ticketId: ticket.id,
        userId: users.id,
        message: 'Investigating the verification flow and checking whether the client profile is properly synced.',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
