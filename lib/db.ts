import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const settings = await prisma.setting.findMany();
  return NextResponse.json(Object.fromEntries(settings.map((item) => [item.key, item.value])));
}
