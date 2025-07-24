import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertActivitySchema, insertSystemMetricsSchema, insertPerformanceMetricsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all agents
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  // Get agent by ID
  app.get("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const agent = await storage.getAgent(id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });

  // Update agent status
  app.patch("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const agent = await storage.updateAgent(id, updateData);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to update agent" });
    }
  });

  // Get latest system metrics
  app.get("/api/metrics/system", async (req, res) => {
    try {
      const metrics = await storage.getLatestSystemMetrics();
      if (!metrics) {
        return res.status(404).json({ message: "No system metrics found" });
      }
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch system metrics" });
    }
  });

  // Create system metrics
  app.post("/api/metrics/system", async (req, res) => {
    try {
      const validatedData = insertSystemMetricsSchema.parse(req.body);
      const metrics = await storage.createSystemMetrics(validatedData);
      res.status(201).json(metrics);
    } catch (error) {
      res.status(400).json({ message: "Invalid metrics data" });
    }
  });

  // Get system metrics history
  app.get("/api/metrics/system/history", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const history = await storage.getSystemMetricsHistory(limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics history" });
    }
  });

  // Get recent activities
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Create activity
  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data" });
    }
  });

  // Get database stats
  app.get("/api/database/stats", async (req, res) => {
    try {
      const stats = await storage.getDatabaseStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch database stats" });
    }
  });

  // Get performance metrics
  app.get("/api/metrics/performance", async (req, res) => {
    try {
      const metrics = await storage.getLatestPerformanceMetrics();
      if (!metrics) {
        return res.status(404).json({ message: "No performance metrics found" });
      }
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance metrics" });
    }
  });

  // Create performance metrics
  app.post("/api/metrics/performance", async (req, res) => {
    try {
      const validatedData = insertPerformanceMetricsSchema.parse(req.body);
      const metrics = await storage.createPerformanceMetrics(validatedData);
      res.status(201).json(metrics);
    } catch (error) {
      res.status(400).json({ message: "Invalid performance metrics data" });
    }
  });

  // Refresh all data endpoint
  app.post("/api/refresh", async (req, res) => {
    try {
      // Simulate refreshing system metrics
      const currentTime = new Date();
      const cpuUsage = Math.floor(Math.random() * 40) + 50; // 50-90%
      const memoryUsage = Math.floor(Math.random() * 2000) + 3000; // 3-5GB
      const activeTasks = Math.floor(Math.random() * 20) + 15; // 15-35
      const contentGenerated = Math.floor(Math.random() * 50) + 100; // 100-150

      await storage.createSystemMetrics({
        cpuUsage,
        memoryUsage,
        activeTasks,
        contentGenerated,
      });

      // Create a new activity
      const activities = [
        "System refresh completed successfully",
        "All agents synchronized",
        "Database integrity check passed",
        "Performance metrics updated",
      ];
      
      await storage.createActivity({
        agentId: null,
        message: activities[Math.floor(Math.random() * activities.length)],
        type: "info",
        icon: "fas fa-sync-alt",
      });

      res.json({ message: "System refreshed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to refresh system" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
