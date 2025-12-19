import { getPrisma } from "../prisma";
import type { Prisma } from "../generated/client";

const prisma = getPrisma()

export const list = async (skip: number, take: number, where: Prisma.CategoryWhereInput, 
    orderBy: Prisma.CategoryOrderByWithRelationInput) => {

    return await prisma.category.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { products: true }
    })
}

export const countAll = async (where: Prisma.CategoryWhereInput) => {
    return await prisma.category.count({ where })
}

export const findById = async (id: number) => {
    return await prisma.category.findUnique({
        where: { id, deletedAt: null },
        include: { products: true }
    })
}

export const create = async (data: Prisma.CategoryCreateInput) => {
    return await prisma.category.create({ data })
}

export const update = async (id: number, data: Prisma.CategoryUpdateInput) => {
    return await prisma.category.update({
        where: { id },
        data
    })
}

export const softDelete = async (id: number) => {
    return await prisma.category.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() }
    })
}
