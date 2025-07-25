import {
  agents,
  systemMetrics,
  activities,
  databaseStats,
  performanceMetrics,
  connectedAccounts,
  audienceSegments,
  outreachCampaigns,
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
  type ConnectedAccount,
  type InsertConnectedAccount,
  type AudienceSegment,
  type InsertAudienceSegment,
  type OutreachCampaign,
  type InsertOutreachCampaign,
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

  // Connected Accounts
  getConnectedAccounts(): Promise<ConnectedAccount[]>;
  getConnectedAccount(id: number): Promise<ConnectedAccount | undefined>;
  createConnectedAccount(account: InsertConnectedAccount): Promise<ConnectedAccount>;
  updateConnectedAccount(id: number, account: Partial<InsertConnectedAccount>): Promise<ConnectedAccount | undefined>;
  deleteConnectedAccount(id: number): Promise<boolean>;

  // Audience Segments
  getAudienceSegments(): Promise<AudienceSegment[]>;
  getAudienceSegment(id: number): Promise<AudienceSegment | undefined>;
  createAudienceSegment(segment: InsertAudienceSegment): Promise<AudienceSegment>;
  updateAudienceSegment(id: number, segment: Partial<InsertAudienceSegment>): Promise<AudienceSegment | undefined>;
  deleteAudienceSegment(id: number): Promise<boolean>;

  // Outreach Campaigns
  getOutreachCampaigns(): Promise<OutreachCampaign[]>;
  getOutreachCampaign(id: number): Promise<OutreachCampaign | undefined>;
  createOutreachCampaign(campaign: InsertOutreachCampaign): Promise<OutreachCampaign>;
  updateOutreachCampaign(id: number, campaign: Partial<InsertOutreachCampaign>): Promise<OutreachCampaign | undefined>;
  deleteOutreachCampaign(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private agents: Map<number, Agent> = new Map();
  private systemMetrics: Map<number, SystemMetrics> = new Map();
  private activities: Map<number, Activity> = new Map();
  private databaseStats: Map<number, DatabaseStats> = new Map();
  private performanceMetrics: Map<number, PerformanceMetrics> = new Map();
  private connectedAccounts: Map<number, ConnectedAccount> = new Map();
  private audienceSegments: Map<number, AudienceSegment> = new Map();
  private outreachCampaigns: Map<number, OutreachCampaign> = new Map();
  
  private agentIdCounter = 1;
  private systemMetricsIdCounter = 1;
  private activityIdCounter = 1;
  private databaseStatsIdCounter = 1;
  private performanceMetricsIdCounter = 1;
  private connectedAccountIdCounter = 1;
  private audienceSegmentIdCounter = 1;
  private outreachCampaignIdCounter = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize agents - 7 specialized AI agents
    const initialAgents: InsertAgent[] = [
      {
        name: "Discovery Agent",
        description: "Strategic intelligence hub for niche identification & audience profiling",
        icon: "fas fa-search",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 342,
        isActive: true,
      },
      {
        name: "Lead Scout Agent",
        description: "Precision lead extraction with behavioral prediction",
        icon: "fas fa-crosshairs",
        status: "active",
        color: "dark-accent2",
        tasksCompleted: 267,
        isActive: true,
      },
      {
        name: "Content Forge Agent",
        description: "AI-powered content creation & optimization engine",
        icon: "fas fa-hammer",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 189,
        isActive: true,
      },
      {
        name: "Outreach Nexus Agent",
        description: "Hyper-personalized cross-platform communication",
        icon: "fas fa-satellite-dish",
        status: "active",
        color: "dark-accent2",
        tasksCompleted: 445,
        isActive: true,
      },
      {
        name: "Performance Oracle",
        description: "Predictive analytics & autonomous optimization",
        icon: "fas fa-brain",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 523,
        isActive: true,
      },
      {
        name: "UGC Catalyst Agent",
        description: "Community amplification & user-generated content",
        icon: "fas fa-users-cog",
        status: "active",
        color: "dark-accent2",
        tasksCompleted: 298,
        isActive: true,
      },
      {
        name: "Voice & Messaging Negotiator",
        description: "AI-powered voice calls & text conversations",
        icon: "fas fa-phone-alt",
        status: "active",
        color: "dark-accent",
        tasksCompleted: 156,
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
        message: "Discovery Agent identified 12 high-opportunity niches with 85+ viability scores",
        type: "success",
        icon: "fas fa-search",
      },
      {
        agentId: 2,
        message: "Lead Scout Agent profiled 847 high-intent leads with behavioral predictions",
        type: "info",
        icon: "fas fa-crosshairs",
      },
      {
        agentId: 3,
        message: "Content Forge Agent generated 15 platform-optimized content pieces",
        type: "success",
        icon: "fas fa-hammer",
      },
      {
        agentId: 4,
        message: "Outreach Nexus Agent executed 23 personalized campaigns with 78% response rate",
        type: "success",
        icon: "fas fa-satellite-dish",
      },
      {
        agentId: 5,
        message: "Performance Oracle optimized 5 campaigns with +32% conversion improvement",
        type: "success",
        icon: "fas fa-brain",
      },
      {
        agentId: 6,
        message: "UGC Catalyst Agent amplified 34 user testimonials across platforms",
        type: "info",
        icon: "fas fa-users-cog",
      },
      {
        agentId: 7,
        message: "Voice Negotiator completed 8 qualification calls with 67% conversion",
        type: "success",
        icon: "fas fa-phone-alt",
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
      color: insertAgent.color || "dark-accent",
      status: insertAgent.status || "active",
      tasksCompleted: insertAgent.tasksCompleted || 0,
      isActive: insertAgent.isActive !== undefined ? insertAgent.isActive : true,
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
      agentId: insertActivity.agentId || null,
      timestamp: new Date(),
      type: insertActivity.type || "info",
      agentId: insertActivity.agentId || null,
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
      records: insertStats.records || 0,
      sizeBytes: insertStats.sizeBytes || 0,
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
      trendData: insertMetrics.trendData || [60, 45, 70, 55, 80, 65, 90, 75, 85, 95],
    };
    this.performanceMetrics.set(id, metrics);
    return metrics;
  }

  // Connected Accounts Methods
  async getConnectedAccounts(): Promise<ConnectedAccount[]> {
    return Array.from(this.connectedAccounts.values()).sort((a, b) => a.id - b.id);
  }

  async getConnectedAccount(id: number): Promise<ConnectedAccount | undefined> {
    return this.connectedAccounts.get(id);
  }

  async createConnectedAccount(insertAccount: InsertConnectedAccount): Promise<ConnectedAccount> {
    const id = this.connectedAccountIdCounter++;
    const account: ConnectedAccount = {
      ...insertAccount,
      id,
      createdAt: new Date(),
      lastSync: null,
      expiresAt: null,
      isActive: insertAccount.isActive ?? true,
      accountId: insertAccount.accountId || null,
      accessToken: insertAccount.accessToken || null,
      refreshToken: insertAccount.refreshToken || null,
      permissions: insertAccount.permissions || [],
      profileData: insertAccount.profileData || {},
    };
    this.connectedAccounts.set(id, account);
    return account;
  }

  async updateConnectedAccount(id: number, updateAccount: Partial<InsertConnectedAccount>): Promise<ConnectedAccount | undefined> {
    const existing = this.connectedAccounts.get(id);
    if (!existing) return undefined;
    
    const updated: ConnectedAccount = {
      ...existing,
      ...updateAccount,
      lastSync: new Date(),
    };
    this.connectedAccounts.set(id, updated);
    return updated;
  }

  async deleteConnectedAccount(id: number): Promise<boolean> {
    return this.connectedAccounts.delete(id);
  }

  // Audience Segments Methods
  async getAudienceSegments(): Promise<AudienceSegment[]> {
    return Array.from(this.audienceSegments.values()).sort((a, b) => a.id - b.id);
  }

  async getAudienceSegment(id: number): Promise<AudienceSegment | undefined> {
    return this.audienceSegments.get(id);
  }

  async createAudienceSegment(insertSegment: InsertAudienceSegment): Promise<AudienceSegment> {
    const id = this.audienceSegmentIdCounter++;
    const segment: AudienceSegment = {
      ...insertSegment,
      id,
      lastUpdated: new Date(),
      description: insertSegment.description || null,
      isActive: insertSegment.isActive ?? true,
      tags: insertSegment.tags || [],
      estimatedSize: insertSegment.estimatedSize || null,
      platforms: insertSegment.platforms || [],
    };
    this.audienceSegments.set(id, segment);
    return segment;
  }

  async updateAudienceSegment(id: number, updateSegment: Partial<InsertAudienceSegment>): Promise<AudienceSegment | undefined> {
    const existing = this.audienceSegments.get(id);
    if (!existing) return undefined;
    
    const updated: AudienceSegment = {
      ...existing,
      ...updateSegment,
      lastUpdated: new Date(),
    };
    this.audienceSegments.set(id, updated);
    return updated;
  }

  async deleteAudienceSegment(id: number): Promise<boolean> {
    return this.audienceSegments.delete(id);
  }

  // Outreach Campaigns Methods
  async getOutreachCampaigns(): Promise<OutreachCampaign[]> {
    return Array.from(this.outreachCampaigns.values()).sort((a, b) => a.id - b.id);
  }

  async getOutreachCampaign(id: number): Promise<OutreachCampaign | undefined> {
    return this.outreachCampaigns.get(id);
  }

  async createOutreachCampaign(insertCampaign: InsertOutreachCampaign): Promise<OutreachCampaign> {
    const id = this.outreachCampaignIdCounter++;
    const campaign: OutreachCampaign = {
      ...insertCampaign,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: insertCampaign.description || null,
      audienceSegmentId: insertCampaign.audienceSegmentId || null,
      messageTemplates: insertCampaign.messageTemplates || {},
      status: insertCampaign.status || "draft",
      startDate: insertCampaign.startDate || null,
      endDate: insertCampaign.endDate || null,
      targetCount: insertCampaign.targetCount || null,
      sentCount: insertCampaign.sentCount || 0,
      responseCount: insertCampaign.responseCount || 0,
      settings: insertCampaign.settings || {},
    };
    this.outreachCampaigns.set(id, campaign);
    return campaign;
  }

  async updateOutreachCampaign(id: number, updateCampaign: Partial<InsertOutreachCampaign>): Promise<OutreachCampaign | undefined> {
    const existing = this.outreachCampaigns.get(id);
    if (!existing) return undefined;
    
    const updated: OutreachCampaign = {
      ...existing,
      ...updateCampaign,
      updatedAt: new Date(),
    };
    this.outreachCampaigns.set(id, updated);
    return updated;
  }

  async deleteOutreachCampaign(id: number): Promise<boolean> {
    return this.outreachCampaigns.delete(id);
  }
}

export const storage = new MemStorage();
