import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  status: text("status").notNull().default("active"), // active, inactive, warning
  color: text("color").notNull().default("dark-accent"),
  lastActivity: timestamp("last_activity").defaultNow(),
  tasksCompleted: integer("tasks_completed").default(0),
  isActive: boolean("is_active").default(true),
});

export const systemMetrics = pgTable("system_metrics", {
  id: serial("id").primaryKey(),
  cpuUsage: integer("cpu_usage").notNull(),
  memoryUsage: integer("memory_usage").notNull(),
  activeTasks: integer("active_tasks").notNull(),
  contentGenerated: integer("content_generated").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  type: text("type").notNull().default("info"), // info, success, warning, error
  icon: text("icon").notNull(),
});

export const databaseStats = pgTable("database_stats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  records: integer("records").notNull().default(0),
  sizeBytes: integer("size_bytes").notNull().default(0),
  icon: text("icon").notNull(),
  lastSync: timestamp("last_sync").defaultNow(),
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: serial("id").primaryKey(),
  engagementRate: integer("engagement_rate").notNull(), // percentage * 100
  contentQualityScore: integer("content_quality_score").notNull(), // score * 100
  responseTime: integer("response_time").notNull(), // milliseconds
  timestamp: timestamp("timestamp").defaultNow(),
  trendData: jsonb("trend_data"), // array of numbers for sparkline
});

export const discoveryAgentConfig = pgTable("discovery_agent_config", {
  id: serial("id").primaryKey(),
  businessDomain: text("business_domain").notNull(),
  geographicalFocus: text("geographical_focus"),
  budgetThreshold: integer("budget_threshold"),
  excludedTopics: text("excluded_topics").array(),
  excludedCompetitors: text("excluded_competitors").array(),
  analysisDepth: text("analysis_depth").notNull().default("standard"), // basic, standard, deep
  dataSourcePreferences: jsonb("data_source_preferences"), // API preferences and weights
  alertThresholds: jsonb("alert_thresholds"), // NVS thresholds, volatility limits
  autoOptimization: boolean("auto_optimization").default(true),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const discoveryResults = pgTable("discovery_results", {
  id: serial("id").primaryKey(),
  nicheName: text("niche_name").notNull(),
  nicheViabilityScore: integer("niche_viability_score").notNull(), // NVS * 100
  searchMomentum: integer("search_momentum").notNull(),
  engagementDensity: integer("engagement_density").notNull(),
  monetizationIndex: integer("monetization_index").notNull(),
  competitionSaturation: integer("competition_saturation").notNull(),
  riskFactors: text("risk_factors").array(),
  audienceArchetypes: jsonb("audience_archetypes"), // array of persona objects
  predictedLifespan: integer("predicted_lifespan"), // days
  timestamp: timestamp("timestamp").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  lastActivity: true,
});

export const insertSystemMetricsSchema = createInsertSchema(systemMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  timestamp: true,
});

export const insertDatabaseStatsSchema = createInsertSchema(databaseStats).omit({
  id: true,
  lastSync: true,
});

export const insertPerformanceMetricsSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertDiscoveryAgentConfigSchema = createInsertSchema(discoveryAgentConfig).omit({
  id: true,
  lastUpdated: true,
});

export const insertDiscoveryResultsSchema = createInsertSchema(discoveryResults).omit({
  id: true,
  timestamp: true,
});

// Content Forge Agent schemas
export const contentTemplates = pgTable("content_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // tiktok, linkedin, twitter, instagram, blog, email
  category: text("category").notNull(), // educational, promotional, viral, testimonial
  prompt: text("prompt").notNull(),
  structure: jsonb("structure"), // platform-specific structure template
  variables: text("variables").array(), // dynamic variables in the template
  viralityScore: integer("virality_score").default(0), // predicted virality score
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const generatedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").references(() => contentTemplates.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  platform: text("platform").notNull(),
  contentType: text("content_type").notNull(), // video, image, text, carousel
  status: text("status").notNull().default("draft"), // draft, approved, published, archived
  viralityPrediction: integer("virality_prediction").default(0),
  engagementPrediction: integer("engagement_prediction").default(0),
  metadata: jsonb("metadata"), // platform-specific metadata
  assets: text("assets").array(), // links to generated assets
  scheduledFor: timestamp("scheduled_for"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contentPillars = pgTable("content_pillars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetAudience: text("target_audience").notNull(),
  keyTopics: text("key_topics").array(),
  contentTypes: text("content_types").array(),
  performanceWeight: integer("performance_weight").default(100), // 0-100
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentCalendar = pgTable("content_calendar", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id").references(() => generatedContent.id),
  pillarId: integer("pillar_id").references(() => contentPillars.id),
  platform: text("platform").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  peakTime: text("peak_time"), // optimal posting time
  status: text("status").notNull().default("scheduled"), // scheduled, posted, failed
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContentTemplateSchema = createInsertSchema(contentTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGeneratedContentSchema = createInsertSchema(generatedContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentPillarSchema = createInsertSchema(contentPillars).omit({
  id: true,
  createdAt: true,
});

export const insertContentCalendarSchema = createInsertSchema(contentCalendar).omit({
  id: true,
  createdAt: true,
});

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type SystemMetrics = typeof systemMetrics.$inferSelect;
export type InsertSystemMetrics = z.infer<typeof insertSystemMetricsSchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type DatabaseStats = typeof databaseStats.$inferSelect;
export type InsertDatabaseStats = z.infer<typeof insertDatabaseStatsSchema>;
export type PerformanceMetrics = typeof performanceMetrics.$inferSelect;
export type InsertPerformanceMetrics = z.infer<typeof insertPerformanceMetricsSchema>;
export type DiscoveryAgentConfig = typeof discoveryAgentConfig.$inferSelect;
export type InsertDiscoveryAgentConfig = z.infer<typeof insertDiscoveryAgentConfigSchema>;
export type DiscoveryResults = typeof discoveryResults.$inferSelect;
export type InsertDiscoveryResults = z.infer<typeof insertDiscoveryResultsSchema>;
export type ContentTemplate = typeof contentTemplates.$inferSelect;
export type InsertContentTemplate = z.infer<typeof insertContentTemplateSchema>;
export type GeneratedContent = typeof generatedContent.$inferSelect;
export type InsertGeneratedContent = z.infer<typeof insertGeneratedContentSchema>;
export type ContentPillar = typeof contentPillars.$inferSelect;
export type InsertContentPillar = z.infer<typeof insertContentPillarSchema>;
export type ContentCalendar = typeof contentCalendar.$inferSelect;
export type InsertContentCalendar = z.infer<typeof insertContentCalendarSchema>;
