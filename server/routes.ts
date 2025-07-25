import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertActivitySchema, 
  insertSystemMetricsSchema, 
  insertPerformanceMetricsSchema,
  insertConnectedAccountSchema,
  insertAudienceSegmentSchema,
  insertOutreachCampaignSchema 
} from "@shared/schema";

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

  // Connected Accounts Routes
  app.get("/api/connected-accounts", async (req, res) => {
    try {
      const accounts = await storage.getConnectedAccounts();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch connected accounts" });
    }
  });

  app.get("/api/connected-accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const account = await storage.getConnectedAccount(id);
      if (!account) {
        return res.status(404).json({ message: "Connected account not found" });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch connected account" });
    }
  });

  app.post("/api/connected-accounts", async (req, res) => {
    try {
      const validatedData = insertConnectedAccountSchema.parse(req.body);
      const account = await storage.createConnectedAccount(validatedData);
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ message: "Invalid connected account data" });
    }
  });

  app.patch("/api/connected-accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const account = await storage.updateConnectedAccount(id, updateData);
      if (!account) {
        return res.status(404).json({ message: "Connected account not found" });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ message: "Failed to update connected account" });
    }
  });

  app.delete("/api/connected-accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteConnectedAccount(id);
      if (!deleted) {
        return res.status(404).json({ message: "Connected account not found" });
      }
      res.json({ message: "Connected account deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete connected account" });
    }
  });

  // Audience Segments Routes
  app.get("/api/audience-segments", async (req, res) => {
    try {
      const segments = await storage.getAudienceSegments();
      res.json(segments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audience segments" });
    }
  });

  app.get("/api/audience-segments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const segment = await storage.getAudienceSegment(id);
      if (!segment) {
        return res.status(404).json({ message: "Audience segment not found" });
      }
      res.json(segment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audience segment" });
    }
  });

  app.post("/api/audience-segments", async (req, res) => {
    try {
      const validatedData = insertAudienceSegmentSchema.parse(req.body);
      const segment = await storage.createAudienceSegment(validatedData);
      res.status(201).json(segment);
    } catch (error) {
      res.status(400).json({ message: "Invalid audience segment data" });
    }
  });

  app.patch("/api/audience-segments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const segment = await storage.updateAudienceSegment(id, updateData);
      if (!segment) {
        return res.status(404).json({ message: "Audience segment not found" });
      }
      res.json(segment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update audience segment" });
    }
  });

  app.delete("/api/audience-segments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAudienceSegment(id);
      if (!deleted) {
        return res.status(404).json({ message: "Audience segment not found" });
      }
      res.json({ message: "Audience segment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete audience segment" });
    }
  });

  // Outreach Campaigns Routes
  app.get("/api/outreach-campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getOutreachCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch outreach campaigns" });
    }
  });

  app.get("/api/outreach-campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const campaign = await storage.getOutreachCampaign(id);
      if (!campaign) {
        return res.status(404).json({ message: "Outreach campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch outreach campaign" });
    }
  });

  app.post("/api/outreach-campaigns", async (req, res) => {
    try {
      const validatedData = insertOutreachCampaignSchema.parse(req.body);
      const campaign = await storage.createOutreachCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(400).json({ message: "Invalid outreach campaign data" });
    }
  });

  app.patch("/api/outreach-campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const campaign = await storage.updateOutreachCampaign(id, updateData);
      if (!campaign) {
        return res.status(404).json({ message: "Outreach campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to update outreach campaign" });
    }
  });

  app.delete("/api/outreach-campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteOutreachCampaign(id);
      if (!deleted) {
        return res.status(404).json({ message: "Outreach campaign not found" });
      }
      res.json({ message: "Outreach campaign deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete outreach campaign" });
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
