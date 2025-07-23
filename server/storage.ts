import {
  agents,
  systemMetrics,
  activities,
  databaseStats,
  performanceMetrics,
  type Agent,
  type InsertAgent,
  type SystemMetrics,
  type InsertSystemMetrics,
  type Activity,
  type InsertActivity,
  type DatabaseStats,
  type InsertDatabaseStats,
  type PerformanceMetrics,
  type InsertPerformanceMetrics,
} from "@shared/schema";

export interface IStorage {
  // Agents
  getAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined>;

  // System Metrics
  getLatestSystemMetrics(): Promise<SystemMetrics | undefined>;
  createSystemMetrics(metrics: InsertSystemMetrics): Promise<SystemMetrics>;
  getSystemMetricsHistory(limit?: number): Promise<SystemMetrics[]>;

  // Activities
  getRecentActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Database Stats
  getDatabaseStats(): Promise<DatabaseStats[]>;
  createDatabaseStats(stats: InsertDatabaseStats): Promise<DatabaseStats>;
  updateDatabaseStats(id: number, stats: Partial<InsertDatabaseStats>): Promise<DatabaseStats | undefined>;

  // Performance Metrics
  getLatestPerformanceMetrics(): Promise<PerformanceMetrics | undefined>;
  createPerformanceMetrics(metrics: InsertPerformanceMetrics): Promise<PerformanceMetrics>;
}

export class MemStorage implements IStorage {
  private agents: Map<number, Agent> = new Map();
  private systemMetrics: Map<number, SystemMetrics> = new Map();
  private activities: Map<number, Activity> = new Map();
  private databaseStats: Map<number, DatabaseStats> = new Map();
  private performanceMetrics: Map<number, PerformanceMetrics> = new Map();
  
  private agentIdCounter = 1;
  private systemMetricsIdCounter = 1;
  private activityIdCounter = 1;
  private databaseStatsIdCounter = 1;
  private performanceMetricsIdCounter = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize agents
    const initialAgents: InsertAgent[] = [
      {
        name: "Content Creator",
        description: "Social media content generation",
        icon: "fas fa-pencil-alt",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 156,
        isActive: true,
      },
      {
        name: "Engagement Tracker",
        description: "Analytics and insights",
        icon: "fas fa-chart-line",
        status: "active",
        color: "dark-accent2",
        tasksCompleted: 89,
        isActive: true,
      },
      {
        name: "Smart Scheduler",
        description: "Automated posting schedule",
        icon: "fas fa-calendar-alt",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 234,
        isActive: true,
      },
      {
        name: "Influencer Finder",
        description: "Partner discovery & outreach",
        icon: "fas fa-users",
        status: "active",
        color: "dark-accent2",
        tasksCompleted: 67,
        isActive: true,
      },
      {
        name: "Trend Analyzer",
        description: "Market trend detection",
        icon: "fas fa-trending-up",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 123,
        isActive: true,
      },
      {
        name: "Community Manager",
        description: "Engagement & responses",
        icon: "fas fa-comments",
        status: "active",
        color: "dark-accent2",
        tasksCompleted: 189,
        isActive: true,
      },
      {
        name: "Performance Oracle",
        description: "AI-driven optimizations",
        icon: "fas fa-brain",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 276,
        isActive: true,
      },
    ];

    initialAgents.forEach(agent => {
      this.createAgent(agent);
    });

    // Initialize database stats
    const initialDatabaseStats: InsertDatabaseStats[] = [
      {
        name: "Content Database",
        description: "Posts & media files",
        records: 12847,
        sizeBytes: 2472960000, // ~2.3GB
        icon: "fas fa-table",
      },
      {
        name: "Analytics Database",
        description: "Metrics & insights",
        records: 45291,
        sizeBytes: 935329280, // ~892MB
        icon: "fas fa-chart-bar",
      },
      {
        name: "User Database",
        description: "Profiles & contacts",
        records: 8934,
        sizeBytes: 163577856, // ~156MB
        icon: "fas fa-users",
      },
      {
        name: "System Logs",
        description: "Activity & errors",
        records: 78213,
        sizeBytes: 1181116006, // ~1.1GB
        icon: "fas fa-cogs",
      },
    ];

    initialDatabaseStats.forEach(stats => {
      this.createDatabaseStats(stats);
    });

    // Initialize system metrics
    this.createSystemMetrics({
      cpuUsage: 67,
      memoryUsage: 4200, // MB
      activeTasks: 23,
      contentGenerated: 156,
    });

    // Initialize performance metrics
    this.createPerformanceMetrics({
      engagementRate: 1230, // 12.30%
      contentQualityScore: 920, // 9.20/10
      responseTime: 1800, // 1.8s
      trendData: [60, 45, 70, 55, 80, 65, 90, 75, 85, 95],
    });

    // Initialize activities
    const initialActivities: InsertActivity[] = [
      {
        agentId: 1,
        message: "Content Creator generated 3 new posts",
        type: "success",
        icon: "fas fa-pencil-alt",
      },
      {
        agentId: 2,
        message: "Engagement Tracker analyzed 1.2K interactions",
        type: "info",
        icon: "fas fa-chart-line",
      },
      {
        agentId: 3,
        message: "Smart Scheduler queued 15 posts for tomorrow",
        type: "success",
        icon: "fas fa-calendar-alt",
      },
      {
        agentId: 4,
        message: "Influencer Finder identified 5 potential partners",
        type: "info",
        icon: "fas fa-users",
      },
    ];

    initialActivities.forEach(activity => {
      this.createActivity(activity);
    });
  }

  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values()).sort((a, b) => a.id - b.id);
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = this.agentIdCounter++;
    const agent: Agent = {
      ...insertAgent,
      id,
      lastActivity: new Date(),
    };
    this.agents.set(id, agent);
    return agent;
  }

  async updateAgent(id: number, updateAgent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const existing = this.agents.get(id);
    if (!existing) return undefined;
    
    const updated: Agent = {
      ...existing,
      ...updateAgent,
      lastActivity: new Date(),
    };
    this.agents.set(id, updated);
    return updated;
  }

  async getLatestSystemMetrics(): Promise<SystemMetrics | undefined> {
    const metrics = Array.from(this.systemMetrics.values());
    return metrics.sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())[0];
  }

  async createSystemMetrics(insertMetrics: InsertSystemMetrics): Promise<SystemMetrics> {
    const id = this.systemMetricsIdCounter++;
    const metrics: SystemMetrics = {
      ...insertMetrics,
      id,
      timestamp: new Date(),
    };
    this.systemMetrics.set(id, metrics);
    return metrics;
  }

  async getSystemMetricsHistory(limit = 10): Promise<SystemMetrics[]> {
    return Array.from(this.systemMetrics.values())
      .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
      .slice(0, limit);
  }

  async getRecentActivities(limit = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityIdCounter++;
    const activity: Activity = {
      ...insertActivity,
      id,
      timestamp: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getDatabaseStats(): Promise<DatabaseStats[]> {
    return Array.from(this.databaseStats.values()).sort((a, b) => a.id - b.id);
  }

  async createDatabaseStats(insertStats: InsertDatabaseStats): Promise<DatabaseStats> {
    const id = this.databaseStatsIdCounter++;
    const stats: DatabaseStats = {
      ...insertStats,
      id,
      lastSync: new Date(),
    };
    this.databaseStats.set(id, stats);
    return stats;
  }

  async updateDatabaseStats(id: number, updateStats: Partial<InsertDatabaseStats>): Promise<DatabaseStats | undefined> {
    const existing = this.databaseStats.get(id);
    if (!existing) return undefined;
    
    const updated: DatabaseStats = {
      ...existing,
      ...updateStats,
      lastSync: new Date(),
    };
    this.databaseStats.set(id, updated);
    return updated;
  }

  async getLatestPerformanceMetrics(): Promise<PerformanceMetrics | undefined> {
    const metrics = Array.from(this.performanceMetrics.values());
    return metrics.sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())[0];
  }

  async createPerformanceMetrics(insertMetrics: InsertPerformanceMetrics): Promise<PerformanceMetrics> {
    const id = this.performanceMetricsIdCounter++;
    const metrics: PerformanceMetrics = {
      ...insertMetrics,
      id,
      timestamp: new Date(),
    };
    this.performanceMetrics.set(id, metrics);
    return metrics;
  }
}

export const storage = new MemStorage();
