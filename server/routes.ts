import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // User Routes
  app.post(api.users.create.path, async (req, res) => {
    try {
      const input = api.users.create.input.parse(req.body);
      
      const existing = await storage.getUserByUsername(input.username);
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(input);
      
      // Initialize mining stats for new user
      await storage.createMiningStats({
        userId: user.id,
        balance: "0.00",
        hashRate: "0 MH/s",
        active: false
      });

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.users.get.path, async (req, res) => {
    const user = await storage.getUser(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  // Mining Routes
  app.get(api.mining.getStats.path, async (req, res) => {
    const stats = await storage.getMiningStats(Number(req.params.userId));
    if (!stats) {
      // If stats missing (shouldn't happen if created with user), create them
      const newStats = await storage.createMiningStats({
        userId: Number(req.params.userId),
        balance: "0.00",
        hashRate: "0 MH/s",
        active: false
      });
      return res.json(newStats);
    }
    res.json(stats);
  });

  app.put(api.mining.updateStats.path, async (req, res) => {
    const userId = Number(req.params.userId);
    const stats = await storage.getMiningStats(userId);
    if (!stats) return res.status(404).json({ message: 'Stats not found' });

    try {
      const input = api.mining.updateStats.input.parse(req.body);
      const updated = await storage.updateMiningStats(userId, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.message });
      }
      throw err;
    }
  });

  app.post(api.mining.toggle.path, async (req, res) => {
    const userId = Number(req.params.userId);
    const stats = await storage.getMiningStats(userId);
    if (!stats) return res.status(404).json({ message: 'Stats not found' });

    try {
      const { active } = api.mining.toggle.input.parse(req.body);
      
      // Simulate HashRate change based on active state
      const hashRate = active ? "45.2 MH/s" : "0 MH/s";
      
      const updated = await storage.updateMiningStats(userId, { active, hashRate });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: 'Invalid input' });
    }
  });

  // Seed Data (if no users exist)
  const existingUser = await storage.getUser(1);
  if (!existingUser) {
    const demoUser = await storage.createUser({
      username: "demo_miner",
      password: "password123"
    });
    await storage.createMiningStats({
      userId: demoUser.id,
      balance: "1250.50",
      hashRate: "85.5 MH/s",
      active: true
    });
    console.log("Seeded demo user");
  }

  return httpServer;
}
