import { PrismaClient } from '@prisma/client'

// Version bumped to force new PrismaClient instance when schema changes
const PRISMA_VERSION = 'v3-schema'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient; __prismaVersion?: string }

// Recreate client if version changed (handles schema updates without server restart)
if (globalForPrisma.prisma && globalForPrisma.__prismaVersion !== PRISMA_VERSION) {
  globalForPrisma.prisma.$disconnect().catch(() => {})
  globalForPrisma.prisma = undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

globalForPrisma.prisma = db
globalForPrisma.__prismaVersion = PRISMA_VERSION
