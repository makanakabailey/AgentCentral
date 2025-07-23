import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Search, ArrowLeft, Users, Target, TrendingUp, Zap, Brain, Settings, Play, Filter, Download } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function LeadScoutAgent() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const leadScoutAgent = agents?.find(agent => agent.name === "Lead Scout Agent");

  const handleStartProfiling = () => {
    toast({
      title: "Lead Profiling Started",
      description: "Lead Scout Agent is now analyzing behavioral patterns and intent signals.",
    });
  };

  const handleExportLeads = () => {
    toast({
      title: "Export Initiated",
      description: "High-quality leads are being exported with behavioral predictions.",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent2/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-dark-accent2/20">
              <Search className="w-6 h-6 text-dark-accent2" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">LEAD SCOUT AGENT</h1>
              <p className="text-sm text-gray-400">Precision Lead Extraction</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {leadScoutAgent?.isActive ? "Scanning" : "Standby"}
              </span>
            </div>
            
            <button
              onClick={handleExportLeads}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
            >
              <Download className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent2" />
            </button>
            
            <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Lead Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Total Leads</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">3.2K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">profiled</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Target className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Hot</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">High Intent</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">847</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">qualified</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Trending</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Conversion Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">73%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">success</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Speed</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">2.1s</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">avg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* High-Intent Leads */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">High-Intent Lead Pipeline</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartProfiling}
                  className="p-2 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-dark-accent2" />
                </button>
                <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors">
                  <Filter className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Sarah Chen", company: "TechStart Inc", score: 97, behavior: "Pricing page + Demo request", prediction: "Hot Lead" },
                { name: "Marcus Johnson", company: "InnovateCorp", score: 94, behavior: "Feature comparison + Trial sign-up", prediction: "Ready to Buy" },
                { name: "Elena Rodriguez", company: "GrowthLab", score: 92, behavior: "Case studies + Contact form", prediction: "Evaluating" },
                { name: "David Kim", company: "ScaleUp Pro", score: 89, behavior: "Blog engagement + Newsletter", prediction: "Nurture Lead" },
                { name: "Amy Thompson", company: "NextGen Solutions", score: 87, behavior: "Product tour + FAQ visits", prediction: "Researching" },
              ].map((lead, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent2/10 hover:border-dark-accent2/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white">{lead.name}</h4>
                        <span className="px-2 py-1 bg-dark-accent2/20 text-dark-accent2 text-xs rounded-full">
                          {lead.prediction}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{lead.company}</span>
                        <span className="text-dark-accent2">Behavior: {lead.behavior}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">{lead.score}%</div>
                      <div className="text-xs text-gray-400">Intent Score</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: `${lead.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 h-1 bg-dark-primary rounded-full overflow-hidden">
              <div className="animation-line bg-dark-accent2"></div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            
            {/* AI Controls */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <Brain className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Scout Controls</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Deep Lead Scan</p>
                      <p className="text-xs text-gray-400">Advanced behavioral analysis</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Intent Prediction</p>
                      <p className="text-xs text-gray-400">AI-powered lead scoring</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Audience Mapping</p>
                      <p className="text-xs text-gray-400">Profile similar prospects</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <TrendingUp className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">Scout Analytics</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Lead Quality</span>
                    <span className="text-sm text-dark-accent2 font-medium">94.7%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Prediction Accuracy</span>
                    <span className="text-sm text-dark-accent font-medium">91.3%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[91%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Processing Speed</span>
                    <span className="text-sm text-dark-accent2 font-medium">96.8%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[97%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Lead Sources & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Lead Sources */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Top Lead Sources</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { source: "LinkedIn Outreach", leads: 1247, conversion: 76 },
                { source: "Website Traffic", leads: 892, conversion: 68 },
                { source: "Email Campaigns", leads: 634, conversion: 71 },
                { source: "Content Marketing", leads: 423, conversion: 83 },
                { source: "Social Media", leads: 287, conversion: 59 },
              ].map((source, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{source.source}</span>
                    <span className="text-sm text-dark-accent2 font-medium">{source.conversion}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{source.leads} leads generated</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: `${source.conversion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Scout Activity</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "1 min ago", action: "High-intent lead identified: Sarah Chen (TechStart)", score: 97 },
                { time: "4 min ago", action: "Behavioral pattern analyzed for 23 prospects", score: 85 },
                { time: "12 min ago", action: "Lead qualification completed for InnovateCorp", score: 94 },
                { time: "18 min ago", action: "Intent prediction updated for 156 leads", score: 89 },
                { time: "25 min ago", action: "New lead source discovered: Tech Podcast", score: 78 },
              ].map((activity, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="text-xs text-dark-accent2 font-medium">{activity.score}%</span>
                  </div>
                  <p className="text-sm text-white">{activity.action}</p>
                  <div className="w-full bg-dark-primary rounded-full h-1 mt-2">
                    <div 
                      className="h-1 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: `${activity.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Status Bar */}
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent2/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
              <span>Lead Scout: Scanning</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-dark-accent2" />
              <span>Leads: 3.2K profiled</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-dark-accent2" />
              <span>High Intent: 847 qualified</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-dark-accent2" />
              <span>Conversion: 73%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {leadScoutAgent?.tasksCompleted || 0}</span>
            <span>AI Engine: v2.3</span>
          </div>
        </div>
      </footer>

    </div>
  );
}