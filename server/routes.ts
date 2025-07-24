import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertActivitySchema, 
  insertSystemMetricsSchema, 
  insertPerformanceMetricsSchema,
  insertContentTemplateSchema,
  insertGeneratedContentSchema,
  insertContentPillarSchema,
  insertContentCalendarSchema
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

  // Content Forge Agent Routes
  
  // Content Templates
  app.get("/api/content/templates", async (req, res) => {
    try {
      const templates = await storage.getContentTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content templates" });
    }
  });

  app.get("/api/content/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getContentTemplate(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  app.post("/api/content/templates", async (req, res) => {
    try {
      const validatedData = insertContentTemplateSchema.parse(req.body);
      const template = await storage.createContentTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      res.status(400).json({ message: "Invalid template data" });
    }
  });

  app.patch("/api/content/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.updateContentTemplate(id, req.body);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to update template" });
    }
  });

  app.delete("/api/content/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteContentTemplate(id);
      if (!deleted) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json({ message: "Template deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Generated Content
  app.get("/api/content/generated", async (req, res) => {
    try {
      const status = req.query.status as string;
      const content = status 
        ? await storage.getGeneratedContentByStatus(status)
        : await storage.getGeneratedContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch generated content" });
    }
  });

  app.post("/api/content/generated", async (req, res) => {
    try {
      const validatedData = insertGeneratedContentSchema.parse(req.body);
      const content = await storage.createGeneratedContent(validatedData);
      res.status(201).json(content);
    } catch (error) {
      res.status(400).json({ message: "Invalid content data" });
    }
  });

  app.patch("/api/content/generated/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const content = await storage.updateGeneratedContent(id, req.body);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  // Content Pillars
  app.get("/api/content/pillars", async (req, res) => {
    try {
      const pillars = await storage.getContentPillars();
      res.json(pillars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content pillars" });
    }
  });

  app.post("/api/content/pillars", async (req, res) => {
    try {
      const validatedData = insertContentPillarSchema.parse(req.body);
      const pillar = await storage.createContentPillar(validatedData);
      res.status(201).json(pillar);
    } catch (error) {
      res.status(400).json({ message: "Invalid pillar data" });
    }
  });

  // Content Calendar
  app.get("/api/content/calendar", async (req, res) => {
    try {
      const calendar = await storage.getContentCalendar();
      res.json(calendar);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content calendar" });
    }
  });

  app.post("/api/content/calendar", async (req, res) => {
    try {
      const validatedData = insertContentCalendarSchema.parse(req.body);
      const entry = await storage.createContentCalendarEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ message: "Invalid calendar entry data" });
    }
  });

  // AI Content Generation Endpoint
  app.post("/api/content/generate", async (req, res) => {
    try {
      const { templateId, variables, platform } = req.body;
      const template = await storage.getContentTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }

      // Simulate AI content generation
      let content = template.prompt;
      if (variables && template.variables) {
        template.variables.forEach((variable: string) => {
          if (variables[variable]) {
            content = content.replace(new RegExp(`\\{${variable}\\}`, 'g'), variables[variable]);
          }
        });
      }

      // Generate prediction scores based on template virality score and content analysis
      const viralityPrediction = Math.min(100, (template.viralityScore || 70) + Math.floor(Math.random() * 20) - 10);
      const engagementPrediction = Math.min(100, viralityPrediction + Math.floor(Math.random() * 15) - 7);

      const generatedContent = await storage.createGeneratedContent({
        templateId,
        title: `Generated ${template.type} content`,
        content,
        platform: platform || template.type,
        contentType: template.type.includes('video') ? 'video' : 'text',
        viralityPrediction,
        engagementPrediction,
        metadata: { platform, variables },
      });

      res.status(201).json(generatedContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate content" });
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
