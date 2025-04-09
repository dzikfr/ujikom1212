import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || "postgres.vohtchabrxjzjwxfttpm",
  host: process.env.DB_HOST || "aws-0-ap-southeast-1.pooler.supabase.com",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  port: Number(process.env.DB_PORT) || 5432,
  max: 20,
  ssl: { rejectUnauthorized: false },
});
