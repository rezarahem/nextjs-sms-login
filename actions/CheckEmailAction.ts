'use server';

import Prisma from '@/libs/prisma';

export async function CheckEmailAction(phone: string) {
  const user = await Prisma.user.findUnique({
    where: {
      phone,
    },
  });

  if (!user) {
    const newUser = await Prisma.user.create({
      data: {
        phone,
      },
    });

    if (newUser) return true;
  }

  return true;
}
