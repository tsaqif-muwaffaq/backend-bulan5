import { getPrisma } from "../prisma";
import type { Prisma } from "../generated/client";

const prisma = getPrisma();

export const findByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email,
      deletedAt: null
    }
  });
};

export const findById = async (id: number) => {
  return prisma.user.findFirst({
    where: {
      id,
      deletedAt: null
    }
  });
};

export const create = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

export const update = async (id: number, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data
  });
};

export const softDelete = async (id: number) => {
  return prisma.user.update({
    where: {
      id,
      deletedAt: null
    },
    data: {
      deletedAt: new Date()
    }
  });
};