import { db } from "./db";
import {
  users, miningStats,
  type User, type InsertUser,
  type MiningStats, type InsertMiningStats
} from "../shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMiningStats(userId: number): Promise<MiningStats | undefined>;
  createMiningStats(stats: InsertMiningStats): Promise<MiningStats>;
  updateMiningStats(userId: number, updates: Partial<InsertMiningStats>): Promise<MiningStats>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getMiningStats(userId: number): Promise<MiningStats | undefined> {
    const [stats] = await db.select().from(miningStats).where(eq(miningStats.userId, userId));
    return stats;
  }

  async createMiningStats(stats: InsertMiningStats): Promise<MiningStats> {
    const [newStats] = await db.insert(miningStats).values(stats).returning();
    return newStats;
  }

  async updateMiningStats(userId: number, updates: Partial<InsertMiningStats>): Promise<MiningStats> {
    const [updated] = await db.update(miningStats)
      .set(updates)
      .where(eq(miningStats.userId, userId))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
