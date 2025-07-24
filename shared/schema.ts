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

export const contentTemplates = pgTable("content_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // social-post, blog, email, video-script, etc.
  platform: text("platform"), // instagram, facebook, youtube, etc.
  templateData: jsonb("template_data").notNull(), // template structure and content
  thumbnail: text("thumbnail"), // base64 or URL
  tags: text("tags").array(),
  isPublic: boolean("is_public").default(false),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contentApiKeys = pgTable("content_api_keys", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull(), // canva, adobe, figma, etc.
  displayName: text("display_name").notNull(),
  apiKey: text("api_key").notNull(),
  serviceType: text("service_type").notNull(), // design, writing, video, audio
  isActive: boolean("is_active").default(true),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bulkUploads = pgTable("bulk_uploads", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // zip, csv, json
  status: text("status").notNull().default("processing"), // processing, completed, failed
  totalItems: integer("total_items").notNull(),
  processedItems: integer("processed_items").default(0),
  failedItems: integer("failed_items").default(0),
  uploadData: jsonb("upload_data"), // processed content data
  errors: text("errors").array(),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const quickActions = pgTable("quick_actions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  actionType: text("action_type").notNull(), // generate-post, create-story, make-video, etc.
  parameters: jsonb("parameters"), // action-specific parameters
  isCustom: boolean("is_custom").default(false),
  usageCount: integer("usage_count").default(0),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDiscoveryResultsSchema = createInsertSchema(discoveryResults).omit({
  id: true,
  timestamp: true,
});

export const insertContentTemplateSchema = createInsertSchema(contentTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContentApiKeySchema = createInsertSchema(contentApiKeys).omit({
  id: true,
  lastUsed: true,
  createdAt: true,
});

export const insertBulkUploadSchema = createInsertSchema(bulkUploads).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertQuickActionSchema = createInsertSchema(quickActions).omit({
  id: true,
  lastUsed: true,
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
export type ContentApiKey = typeof contentApiKeys.$inferSelect;
export type InsertContentApiKey = z.infer<typeof insertContentApiKeySchema>;
export type BulkUpload = typeof bulkUploads.$inferSelect;
export type InsertBulkUpload = z.infer<typeof insertBulkUploadSchema>;
export type QuickAction = typeof quickActions.$inferSelect;
export type InsertQuickAction = z.infer<typeof insertQuickActionSchema>;
