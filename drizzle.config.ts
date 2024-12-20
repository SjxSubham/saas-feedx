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
    
    url: process.env.DATABASE_URL ||  "postgresql://postgres.ojnmmpjlrzieugbetbdp:Andal@4249*@aws-0-ap-south-1.pooler.supabase.com:6543/postgres" // 5432 optioanl
        
  }
});