import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// @ts-ignore
export const db = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });
    }
    return (globalForPrisma.prisma as any)[prop];
  }
}) as PrismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
