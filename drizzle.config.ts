import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { migrate } from 'drizzle-orm/postgres-js/migrator';

config({ path: ".env.local"});
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: './migrations',

  migrations: {
    
    prefix: "supabase" // why supabase?
  },
  dbCredentials: {
    
    url: process.env.DATABASE_URL ||  'postgres://localhost:5432/drizzle' // 5432 optioanl
        
  }
});