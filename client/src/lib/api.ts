import { apiRequest } from "./queryClient";
import type { Agent, SystemMetrics, Activity, DatabaseStats, PerformanceMetrics } from "@shared/schema";

export const api = {
  // Agents
  getAgents: (): Promise<Agent[]> =>
    fetch("/api/agents").then(res => res.json()),
  
  getAgent: (id: number): Promise<Agent> =>
    fetch(`/api/agents/${id}`).then(res => res.json()),
  
  updateAgent: (id: number, data: Partial<Agent>): Promise<Agent> =>
    apiRequest("PATCH", `/api/agents/${id}`, data).then(res => res.json()),

  // System Metrics
  getSystemMetrics: (): Promise<SystemMetrics> =>
    fetch("/api/metrics/system").then(res => res.json()),
  
  getSystemMetricsHistory: (limit?: number): Promise<SystemMetrics[]> =>
    fetch(`/api/metrics/system/history${limit ? `?limit=${limit}` : ""}`).then(res => res.json()),

  createSystemMetrics: (data: Omit<SystemMetrics, "id" | "timestamp">): Promise<SystemMetrics> =>
    apiRequest("POST", "/api/metrics/system", data).then(res => res.json()),

  // Activities
  getActivities: (limit?: number): Promise<Activity[]> =>
    fetch(`/api/activities${limit ? `?limit=${limit}` : ""}`).then(res => res.json()),
  
  createActivity: (data: Omit<Activity, "id" | "timestamp">): Promise<Activity> =>
    apiRequest("POST", "/api/activities", data).then(res => res.json()),

  // Database Stats
  getDatabaseStats: (): Promise<DatabaseStats[]> =>
    fetch("/api/database/stats").then(res => res.json()),

  // Performance Metrics
  getPerformanceMetrics: (): Promise<PerformanceMetrics> =>
    fetch("/api/metrics/performance").then(res => res.json()),
  
  createPerformanceMetrics: (data: Omit<PerformanceMetrics, "id" | "timestamp">): Promise<PerformanceMetrics> =>
    apiRequest("POST", "/api/metrics/performance", data).then(res => res.json()),

  // System Operations
  refreshSystem: (): Promise<{ message: string }> =>
    apiRequest("POST", "/api/refresh").then(res => res.json()),
};
