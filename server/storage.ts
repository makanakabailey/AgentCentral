import {
  agents,
  systemMetrics,
  activities,
  databaseStats,
  performanceMetrics,
  contentTemplates,
  generatedContent,
  contentPillars,
  contentCalendar,
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
  type ContentTemplate,
  type InsertContentTemplate,
  type GeneratedContent,
  type InsertGeneratedContent,
  type ContentPillar,
  type InsertContentPillar,
  type ContentCalendar,
  type InsertContentCalendar,
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

  // Content Forge Agent - Templates
  getContentTemplates(): Promise<ContentTemplate[]>;
  getContentTemplate(id: number): Promise<ContentTemplate | undefined>;
  createContentTemplate(template: InsertContentTemplate): Promise<ContentTemplate>;
  updateContentTemplate(id: number, template: Partial<InsertContentTemplate>): Promise<ContentTemplate | undefined>;
  deleteContentTemplate(id: number): Promise<boolean>;

  // Content Forge Agent - Generated Content
  getGeneratedContent(): Promise<GeneratedContent[]>;
  getGeneratedContentByStatus(status: string): Promise<GeneratedContent[]>;
  createGeneratedContent(content: InsertGeneratedContent): Promise<GeneratedContent>;
  updateGeneratedContent(id: number, content: Partial<InsertGeneratedContent>): Promise<GeneratedContent | undefined>;
  deleteGeneratedContent(id: number): Promise<boolean>;

  // Content Forge Agent - Content Pillars
  getContentPillars(): Promise<ContentPillar[]>;
  createContentPillar(pillar: InsertContentPillar): Promise<ContentPillar>;
  updateContentPillar(id: number, pillar: Partial<InsertContentPillar>): Promise<ContentPillar | undefined>;

  // Content Forge Agent - Content Calendar
  getContentCalendar(): Promise<ContentCalendar[]>;
  createContentCalendarEntry(entry: InsertContentCalendar): Promise<ContentCalendar>;
  updateContentCalendarEntry(id: number, entry: Partial<InsertContentCalendar>): Promise<ContentCalendar | undefined>;
}

export class MemStorage implements IStorage {
  private agents: Map<number, Agent> = new Map();
  private systemMetrics: Map<number, SystemMetrics> = new Map();
  private activities: Map<number, Activity> = new Map();
  private databaseStats: Map<number, DatabaseStats> = new Map();
  private performanceMetrics: Map<number, PerformanceMetrics> = new Map();
  private contentTemplates: Map<number, ContentTemplate> = new Map();
  private generatedContent: Map<number, GeneratedContent> = new Map();
  private contentPillars: Map<number, ContentPillar> = new Map();
  private contentCalendar: Map<number, ContentCalendar> = new Map();
  
  private agentIdCounter = 1;
  private systemMetricsIdCounter = 1;
  private activityIdCounter = 1;
  private databaseStatsIdCounter = 1;
  private performanceMetricsIdCounter = 1;
  private contentTemplateIdCounter = 1;
  private generatedContentIdCounter = 1;
  private contentPillarIdCounter = 1;
  private contentCalendarIdCounter = 1;

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

    // Initialize Content Forge data
    this.initializeContentForgeData();

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

  private async initializeContentForgeData() {
    // Initialize Content Pillars
    const contentPillars = [
      {
        name: "Educational Content",
        description: "Value-driven content that teaches and informs the audience",
        targetAudience: "Entrepreneurs and business owners",
        keyTopics: ["marketing strategies", "business growth", "automation"],
        contentTypes: ["blog", "video", "infographic"],
        performanceWeight: 95,
      },
      {
        name: "Social Proof",
        description: "User testimonials and success stories",
        targetAudience: "Potential customers",
        keyTopics: ["case studies", "testimonials", "results"],
        contentTypes: ["video", "carousel", "testimonial"],
        performanceWeight: 90,
      },
      {
        name: "Behind the Scenes",
        description: "Authentic glimpses into the process and team",
        targetAudience: "Community members",
        keyTopics: ["team culture", "development process", "insights"],
        contentTypes: ["video", "image", "story"],
        performanceWeight: 75,
      },
    ];

    for (const pillar of contentPillars) {
      await this.createContentPillar(pillar);
    }

    // Initialize Content Templates
    const contentTemplates = [
      {
        name: "TikTok Hook Template",
        type: "tiktok",
        category: "viral",
        prompt: "🔥 {hook} that will change how you {action}! Here's what most people don't know: {secret}. Try this {solution} and watch your {result} skyrocket! Save this post 📌 #business #growth #marketing",
        variables: ["hook", "action", "secret", "solution", "result"],
        viralityScore: 85,
        structure: {
          maxLength: 150,
          hashtags: 5,
          emojis: true,
          hooks: ["pattern interrupt", "curiosity gap"]
        },
      },
      {
        name: "LinkedIn Value Post",
        type: "linkedin",
        category: "educational",
        prompt: "The {number} {topic} mistakes that cost {audience} {cost}:\n\n1. {mistake1}\n2. {mistake2}\n3. {mistake3}\n\nHere's what to do instead:\n\n✅ {solution1}\n✅ {solution2}\n✅ {solution3}\n\nWhich mistake have you made? Comment below 👇",
        variables: ["number", "topic", "audience", "cost", "mistake1", "mistake2", "mistake3", "solution1", "solution2", "solution3"],
        viralityScore: 78,
        structure: {
          format: "problem-solution",
          engagement: "question",
          length: "medium"
        },
      },
      {
        name: "Instagram Carousel",
        type: "instagram",
        category: "educational",
        prompt: "Slide 1: {title} - {subtitle}\nSlide 2: {point1}\nSlide 3: {point2}\nSlide 4: {point3}\nSlide 5: {point4}\nSlide 6: {point5}\nSlide 7: Key Takeaway: {takeaway}\nSlide 8: Follow @{handle} for more {topic} tips! ✨",
        variables: ["title", "subtitle", "point1", "point2", "point3", "point4", "point5", "takeaway", "handle", "topic"],
        viralityScore: 82,
        structure: {
          slides: 8,
          format: "carousel",
          cta: "follow"
        },
      },
      {
        name: "Twitter Thread Starter",
        type: "twitter",
        category: "viral",
        prompt: "🧵 {number} {topic} secrets that {benefit}:\n\n(Most people get this wrong)\n\n1/ {point1}\n\n2/ {point2}\n\n3/ {point3}\n\nThread below 👇",
        variables: ["number", "topic", "benefit", "point1", "point2", "point3"],
        viralityScore: 79,
        structure: {
          format: "thread",
          maxTweets: 10,
          engagement: "retweet"
        },
      },
    ];

    for (const template of contentTemplates) {
      await this.createContentTemplate(template);
    }

    // Initialize some sample generated content
    const sampleContent = [
      {
        templateId: 1,
        title: "TikTok: Growth Hacks for Entrepreneurs",
        content: "🔥 This marketing hack that will change how you get customers! Here's what most people don't know: 95% of businesses ignore their existing customers. Try this retention strategy and watch your revenue skyrocket! Save this post 📌 #business #growth #marketing",
        platform: "tiktok",
        contentType: "video",
        status: "approved",
        viralityPrediction: 87,
        engagementPrediction: 92,
        metadata: {
          platform: "tiktok",
          variables: {
            hook: "This marketing hack",
            action: "get customers",
            secret: "95% of businesses ignore their existing customers",
            solution: "retention strategy",
            result: "revenue"
          }
        },
      },
      {
        templateId: 2,
        title: "LinkedIn: Content Marketing Mistakes",
        content: "The 3 content marketing mistakes that cost entrepreneurs $10,000+:\n\n1. Posting without a strategy\n2. Ignoring audience feedback\n3. Focusing on vanity metrics\n\nHere's what to do instead:\n\n✅ Create content pillars\n✅ Engage with your community\n✅ Track conversion metrics\n\nWhich mistake have you made? Comment below 👇",
        platform: "linkedin",
        contentType: "text",
        status: "draft",
        viralityPrediction: 75,
        engagementPrediction: 81,
      },
    ];

    for (const content of sampleContent) {
      await this.createGeneratedContent(content);
    }
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

  // Content Templates Methods
  async getContentTemplates(): Promise<ContentTemplate[]> {
    return Array.from(this.contentTemplates.values()).sort((a, b) => a.id - b.id);
  }

  async getContentTemplate(id: number): Promise<ContentTemplate | undefined> {
    return this.contentTemplates.get(id);
  }

  async createContentTemplate(insertTemplate: InsertContentTemplate): Promise<ContentTemplate> {
    const id = this.contentTemplateIdCounter++;
    const template: ContentTemplate = {
      ...insertTemplate,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: insertTemplate.isActive ?? true,
      structure: insertTemplate.structure ?? null,
      variables: insertTemplate.variables ?? null,
      viralityScore: insertTemplate.viralityScore ?? 0,
    };
    this.contentTemplates.set(id, template);
    return template;
  }

  async updateContentTemplate(id: number, updateTemplate: Partial<InsertContentTemplate>): Promise<ContentTemplate | undefined> {
    const existing = this.contentTemplates.get(id);
    if (!existing) return undefined;
    
    const updated: ContentTemplate = {
      ...existing,
      ...updateTemplate,
      updatedAt: new Date(),
    };
    this.contentTemplates.set(id, updated);
    return updated;
  }

  async deleteContentTemplate(id: number): Promise<boolean> {
    return this.contentTemplates.delete(id);
  }

  // Generated Content Methods
  async getGeneratedContent(): Promise<GeneratedContent[]> {
    return Array.from(this.generatedContent.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getGeneratedContentByStatus(status: string): Promise<GeneratedContent[]> {
    return Array.from(this.generatedContent.values())
      .filter(content => content.status === status)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createGeneratedContent(insertContent: InsertGeneratedContent): Promise<GeneratedContent> {
    const id = this.generatedContentIdCounter++;
    const content: GeneratedContent = {
      ...insertContent,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: insertContent.status ?? "draft",
      templateId: insertContent.templateId ?? null,
      viralityPrediction: insertContent.viralityPrediction ?? 0,
      engagementPrediction: insertContent.engagementPrediction ?? 0,
      metadata: insertContent.metadata ?? null,
      assets: insertContent.assets ?? null,
      scheduledFor: insertContent.scheduledFor ?? null,
      publishedAt: insertContent.publishedAt ?? null,
    };
    this.generatedContent.set(id, content);
    return content;
  }

  async updateGeneratedContent(id: number, updateContent: Partial<InsertGeneratedContent>): Promise<GeneratedContent | undefined> {
    const existing = this.generatedContent.get(id);
    if (!existing) return undefined;
    
    const updated: GeneratedContent = {
      ...existing,
      ...updateContent,
      updatedAt: new Date(),
    };
    this.generatedContent.set(id, updated);
    return updated;
  }

  async deleteGeneratedContent(id: number): Promise<boolean> {
    return this.generatedContent.delete(id);
  }

  // Content Pillars Methods
  async getContentPillars(): Promise<ContentPillar[]> {
    return Array.from(this.contentPillars.values()).sort((a, b) => a.id - b.id);
  }

  async createContentPillar(insertPillar: InsertContentPillar): Promise<ContentPillar> {
    const id = this.contentPillarIdCounter++;
    const pillar: ContentPillar = {
      ...insertPillar,
      id,
      createdAt: new Date(),
      isActive: insertPillar.isActive ?? true,
      keyTopics: insertPillar.keyTopics ?? null,
      contentTypes: insertPillar.contentTypes ?? null,
      performanceWeight: insertPillar.performanceWeight ?? 100,
    };
    this.contentPillars.set(id, pillar);
    return pillar;
  }

  async updateContentPillar(id: number, updatePillar: Partial<InsertContentPillar>): Promise<ContentPillar | undefined> {
    const existing = this.contentPillars.get(id);
    if (!existing) return undefined;
    
    const updated: ContentPillar = {
      ...existing,
      ...updatePillar,
    };
    this.contentPillars.set(id, updated);
    return updated;
  }

  // Content Calendar Methods
  async getContentCalendar(): Promise<ContentCalendar[]> {
    return Array.from(this.contentCalendar.values())
      .sort((a, b) => new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime());
  }

  async createContentCalendarEntry(insertEntry: InsertContentCalendar): Promise<ContentCalendar> {
    const id = this.contentCalendarIdCounter++;
    const entry: ContentCalendar = {
      ...insertEntry,
      id,
      createdAt: new Date(),
      status: insertEntry.status ?? "scheduled",
      contentId: insertEntry.contentId ?? null,
      pillarId: insertEntry.pillarId ?? null,
      peakTime: insertEntry.peakTime ?? null,
      notes: insertEntry.notes ?? null,
    };
    this.contentCalendar.set(id, entry);
    return entry;
  }

  async updateContentCalendarEntry(id: number, updateEntry: Partial<InsertContentCalendar>): Promise<ContentCalendar | undefined> {
    const existing = this.contentCalendar.get(id);
    if (!existing) return undefined;
    
    const updated: ContentCalendar = {
      ...existing,
      ...updateEntry,
    };
    this.contentCalendar.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
