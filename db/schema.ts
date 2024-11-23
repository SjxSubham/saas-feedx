import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  //phone: varchar("phone", { length: 256 }),
  url: text("url"),
  userId: varchar("user_id"),
});