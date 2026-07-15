import { PrismaClient } from "@prisma/client";

// Prevents exhausting database connections due to hot-reloading in development.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    "[prisma] DATABASE_URL is not set. Available env vars:",
    Object.keys(process.env).filter(
      (k) => k.includes("DATABASE") || k.includes("POSTGRES") || k.includes("DB_")
    )
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasourceUrl: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
