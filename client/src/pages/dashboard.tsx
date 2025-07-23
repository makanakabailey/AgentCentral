import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AgentCard } from "@/components/agent-card";
import { MetricCard } from "@/components/metric-card";
import { ActivityFeed } from "@/components/activity-feed";
import { PerformanceMetrics } from "@/components/performance-metrics";
import { DatabaseStatus } from "@/components/database-status";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Settings, Power, Database, Play } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { toast } = useToast();

  const { data: agents, isLoading: agentsLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const { data: systemMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/metrics/system"],
    queryFn: api.getSystemMetrics,
    refetchInterval: 10000,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/activities"],
    queryFn: () => api.getActivities(10),
    refetchInterval: 5000,
  });

  const { data: performanceMetrics, isLoading: performanceLoading } = useQuery({
    queryKey: ["/api/metrics/performance"],
    queryFn: api.getPerformanceMetrics,
    refetchInterval: 30000,
  });

  const handleRefresh = async () => {
    try {
      await api.refreshSystem();
      toast({
        title: "System Refreshed",
        description: "All data has been updated successfully",
      });
      // Refresh all queries
      window.location.reload();
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh system data",
        variant: "destructive",
      });
    }
  };

  const activeAgents = agents?.filter(agent => agent.isActive).length || 0;
  const totalAgents = agents?.length || 0;

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-dark-accent/20">
              <i className="fas fa-brain w-6 h-6 text-dark-accent"></i>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">SOCIAL CONNECT</h1>
              <p className="text-sm text-gray-400">Central Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span className="text-xs text-gray-400">System Online</span>
            </div>
            
            <button
              onClick={handleRefresh}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent" />
            </button>
            
            <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 lg:w-72 bg-dark-secondary/60 backdrop-blur-lg border-r border-dark-accent/20 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-4 lg:p-6 space-y-6">
            
            {/* Agent Management Section */}
            <div>
              <h3 className="text-xs lg:text-sm text-dark-accent font-medium uppercase tracking-wider mb-4">AI Agents</h3>
              <div className="space-y-3">
                {agentsLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="holographic rounded-xl p-4 animate-pulse">
                        <div className="h-16 bg-dark-surface/50 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  agents?.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))
                )}
              </div>
            </div>

            {/* Database Management Section */}
            <div>
              <h3 className="text-xs lg:text-sm text-dark-accent2 font-medium uppercase tracking-wider mb-4">System Management</h3>
              <div className="space-y-3">
                <Link href="/database">
                  <div className="holographic rounded-xl p-4 group hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                        <Database className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent2" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm lg:text-base font-semibold text-white">Database Manager</h4>
                        <p className="text-xs text-gray-400">Shared data & analytics</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-dark-accent2 animate-pulse"></div>
                          <span className="text-xs text-dark-accent2">Syncing</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 h-1 bg-dark-primary rounded-full overflow-hidden">
                      <div className="animation-line bg-dark-accent2"></div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* System Controls */}
            <div className="mt-auto pt-6">
              <h3 className="text-xs lg:text-sm text-gray-400 font-medium uppercase tracking-wider mb-4">System</h3>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-gray-400 hover:text-white hover:bg-dark-surface transition-colors flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-accent/10 text-dark-accent hover:bg-dark-accent hover:text-dark-primary transition-colors flex items-center gap-3">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Start All</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-4 lg:p-6 space-y-6">
            
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <i className="fas fa-tachometer-alt w-6 h-6 text-dark-accent"></i>
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold gradient-text">System Overview</h2>
                  <p className="text-sm lg:text-base text-gray-400">Real-time agent performance and system status</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex bg-dark-secondary/50 rounded-lg p-1">
                  <button className="px-3 py-1 rounded-md text-sm font-medium transition-all bg-dark-accent text-dark-primary">Live</button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium transition-all text-gray-400 hover:text-white">1H</button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium transition-all text-gray-400 hover:text-white">24H</button>
                  <button className="px-3 py-1 rounded-md text-sm font-medium transition-all text-gray-400 hover:text-white">7D</button>
                </div>
              </div>
            </div>

            {/* System Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <MetricCard
                title="Active Agents"
                value={`${activeAgents}`}
                subtitle={`of ${totalAgents}`}
                icon="fas fa-robot"
                status="Live"
                percentage={totalAgents > 0 ? Math.round((activeAgents / totalAgents) * 100) : 0}
                color="dark-accent"
                loading={agentsLoading}
              />

              <MetricCard
                title="Active Tasks"
                value={systemMetrics?.activeTasks?.toString() || "0"}
                subtitle="tasks"
                icon="fas fa-tasks"
                status="Processing"
                badge="+12%"
                badgeText="vs last hour"
                color="dark-accent2"
                loading={metricsLoading}
              />

              <MetricCard
                title="Content Generated"
                value={systemMetrics?.contentGenerated?.toString() || "0"}
                subtitle="posts"
                icon="fas fa-file-alt"
                status="Today"
                badge="+8.5%"
                badgeText="engagement"
                color="dark-accent"
                loading={metricsLoading}
              />

              <MetricCard
                title="CPU Usage"
                value={systemMetrics?.cpuUsage?.toString() || "0"}
                subtitle="%"
                icon="fas fa-microchip"
                status="Optimal"
                progressValue={systemMetrics?.cpuUsage || 0}
                color="dark-accent2"
                loading={metricsLoading}
              />
            </div>

            {/* Agent Performance Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeed activities={activities || []} loading={activitiesLoading} />
              <PerformanceMetrics metrics={performanceMetrics} loading={performanceLoading} />
            </div>

            {/* Database Status Section */}
            <DatabaseStatus />

          </div>
        </main>

      </div>

      {/* Status Bar */}
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span>System Status: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-microchip w-3 h-3 text-dark-accent2"></i>
              <span>CPU: {systemMetrics?.cpuUsage || 0}%</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-memory w-3 h-3 text-dark-accent2"></i>
              <span>RAM: {((systemMetrics?.memoryUsage || 0) / 1000).toFixed(1)}GB</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-dark-accent2" />
              <span>DB: Synced</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Last Update: {new Date().toLocaleTimeString()}</span>
            <span>v2.1.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
