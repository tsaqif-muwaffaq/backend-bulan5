import type { Prisma } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export async function list(
  skip: number,
  take: number,
  where: Prisma.ProductWhereInput,
  orderBy: Prisma.ProductOrderByWithRelationInput
) {
  return prisma.product.findMany({
    skip,
    take,
    where,
    orderBy,
    include: {
      category: true,
    },
  });
}

export async function countAll(where: Prisma.ProductWhereInput) {
  return await prisma.product.count({
    where,
  })
}

export async function findById(id: number) {
  return await prisma.product.findUnique({
    where: { id, deletedAt: null },
    include: {
      category: true }
});
}

export async function create(data: Prisma.ProductCreateInput) {
  return prisma.product.create({
    data,
  });
}

export async function update(
  id: number,
  data: Prisma.ProductUpdateInput
) {
  return prisma.product.update({
    where: { id, deletedAt: null},
    data,
  });
}

export async function softDelete(id: number) {
  return prisma.product.update({
    where: { id, deletedAt: null},
    data: {
      deletedAt: new Date(),
    },
  });
}
