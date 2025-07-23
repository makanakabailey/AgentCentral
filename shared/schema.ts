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
