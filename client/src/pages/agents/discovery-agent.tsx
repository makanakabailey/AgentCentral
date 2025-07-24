import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Search, ArrowLeft, Target, Users, TrendingUp, Database, Brain, Settings, Play, Pause, RefreshCw, Sliders } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function DiscoveryAgent() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const discoveryAgent = agents?.find(agent => agent.name === "Discovery Agent");

  const handleStartAnalysis = () => {
    toast({
      title: "Analysis Started",
      description: "Discovery Agent is now analyzing new market opportunities and audience segments.",
    });
  };

  const handleOptimizeStrategy = () => {
    toast({
      title: "Strategy Optimization",
      description: "AI is optimizing niche identification parameters for better targeting.",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-dark-accent/20">
              <Search className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">DISCOVERY AGENT</h1>
              <p className="text-sm text-gray-400">Strategic Intelligence Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {discoveryAgent?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            
            <button
              onClick={handleOptimizeStrategy}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
            >
              <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent" />
            </button>
            
            <Link href="/agents/discovery/controls">
              <button className="p-2 lg:p-3 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors">
                <Sliders className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent" />
              </button>
            </Link>
            
            <Link href="/agents/discovery/settings">
              <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Agent Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Target className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Niches Identified</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">127</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">total</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Audience Profiles</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">2.4K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">analyzed</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Trending</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Viability Score</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">94%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">avg</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Database className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Real-time</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Data Points</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">847K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">processed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Discoveries */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Active Market Analysis</h3>
              <button
                onClick={handleStartAnalysis}
                className="p-2 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
              >
                <Play className="w-4 h-4 text-dark-accent" />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { niche: "AI-Powered SaaS Tools", score: 97, trend: "+15%", audience: "4.2M" },
                { niche: "Sustainable Tech Solutions", score: 94, trend: "+23%", audience: "2.8M" },
                { niche: "Remote Work Optimization", score: 91, trend: "+8%", audience: "6.1M" },
                { niche: "Health Tech Wearables", score: 89, trend: "+32%", audience: "3.5M" },
                { niche: "EdTech for Gen-Z", score: 87, trend: "+19%", audience: "5.3M" },
              ].map((item, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent/10 hover:border-dark-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white mb-1">{item.niche}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Audience: {item.audience}</span>
                        <span className="text-dark-accent">Growth: {item.trend}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">{item.score}%</div>
                      <div className="text-xs text-gray-400">Viability</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 h-1 bg-dark-primary rounded-full overflow-hidden">
              <div className="animation-line bg-dark-accent"></div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <Brain className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Controls</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Deep Market Scan</p>
                      <p className="text-xs text-gray-400">Analyze emerging opportunities</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Refine Targeting</p>
                      <p className="text-xs text-gray-400">Optimize audience parameters</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Trend Analysis</p>
                      <p className="text-xs text-gray-400">Monitor market dynamics</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <TrendingUp className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Accuracy Rate</span>
                    <span className="text-sm text-dark-accent font-medium">97.2%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[97%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Processing Speed</span>
                    <span className="text-sm text-dark-accent2 font-medium">1.2s avg</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[94%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Data Quality</span>
                    <span className="text-sm text-dark-accent font-medium">99.1%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[99%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Discoveries */}
        <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-white">Recent Discovery Activity</h3>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Last updated: 2 minutes ago</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { time: "2 min ago", action: "Identified high-potential niche: 'AI Content Tools'", score: 95 },
              { time: "8 min ago", action: "Analyzed audience segment: Tech Entrepreneurs 25-40", score: 87 },
              { time: "15 min ago", action: "Market gap discovered in Remote Team Management", score: 92 },
              { time: "23 min ago", action: "Competitor analysis completed for SaaS sector", score: 89 },
            ].map((activity, index) => (
              <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent/10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="text-xs text-dark-accent font-medium">{activity.score}%</span>
                  </div>
                  <p className="text-sm text-white">{activity.action}</p>
                  <div className="w-full bg-dark-primary rounded-full h-1">
                    <div 
                      className="h-1 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${activity.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Status Bar */}
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span>Discovery Agent: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-dark-accent" />
              <span>Niches: 127 active</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-dark-accent" />
              <span>Profiles: 2.4K analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-dark-accent" />
              <span>Accuracy: 97.2%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {discoveryAgent?.tasksCompleted || 0}</span>
            <span>AI Engine: v2.1</span>
          </div>
        </div>
      </footer>

    </div>
  );
}