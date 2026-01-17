import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const miningStats = pgTable("mining_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  balance: text("balance").default("0.00"),
  hashRate: text("hash_rate").default("0 MH/s"),
  active: boolean("active").default(false),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertMiningStatsSchema = createInsertSchema(miningStats).omit({ id: true, lastUpdated: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type MiningStats = typeof miningStats.$inferSelect;
export type InsertMiningStats = z.infer<typeof insertMiningStatsSchema>;
