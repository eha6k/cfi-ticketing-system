import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const fields = await prisma.formField.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(fields);
}

export async function POST(request: Request) {
  const body = await request.json();

  const created = await prisma.formField.create({
    data: {
      name: body.name,
      type: body.type,
      required: Boolean(body.required),
      order: Number(body.order ?? 10),
      active: body.active ?? true,
      placeholder: body.placeholder ?? '',
      description: body.description ?? '',
      options: body.options ?? '',
    },
  });

  return NextResponse.json(created, { status: 201 });
}
