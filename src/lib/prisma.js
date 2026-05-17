import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

// 1. Create a PostgreSQL connection pool using the pg driver
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

// 2. Initialize the Prisma PostgreSQL adapter
const adapter = new PrismaPg(pool)

// 3. Pass the adapter to the PrismaClient constructor (Required for Prisma 7+)
const prisma = new PrismaClient({ adapter })

// Connection Test
prisma.$connect()
    .then(() => console.log("--- Supabase Identity Uplink Established (Prisma 7) ---"))
    .catch((err) => console.error("--- Link Failure ---", err))

export { prisma }
