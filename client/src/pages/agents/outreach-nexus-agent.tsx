import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Satellite, ArrowLeft, Mail, MessageSquare, Phone, Users, Brain, Settings, Play, Send, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function OutreachNexusAgent() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const outreachAgent = agents?.find(agent => agent.name === "Outreach Nexus Agent");

  const handleStartCampaign = () => {
    toast({
      title: "Campaign Launched",
      description: "Outreach Nexus is executing personalized campaigns across all platforms.",
    });
  };

  const handleOptimizeOutreach = () => {
    toast({
      title: "Outreach Optimization",
      description: "AI is optimizing communication strategies for better response rates.",
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
              <Satellite className="w-6 h-6 text-dark-accent2" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">OUTREACH NEXUS AGENT</h1>
              <p className="text-sm text-gray-400">Cross-Platform Communication Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {outreachAgent?.isActive ? "Reaching Out" : "Standby"}
              </span>
            </div>
            
            <button
              onClick={handleOptimizeOutreach}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
            >
              <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent2" />
            </button>
            
            <Link href="/agents/outreach-nexus/settings">
              <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Outreach Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Send className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Messages Sent</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">4.7K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">total</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Hot</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Response Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">78%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">success</span>
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
                <span className="text-xs text-gray-400">Growing</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Active Campaigns</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">23</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">running</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Scheduled</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Follow-ups</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">156</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">queued</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Campaigns */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Active Outreach Campaigns</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartCampaign}
                  className="p-2 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-dark-accent2" />
                </button>
                <Link href="/agents/outreach-nexus/scheduler">
                  <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "SaaS Decision Makers Outreach", platform: "LinkedIn + Email", sent: 342, responses: 78, rate: "78%", status: "Active" },
                { name: "Tech Startup Founders Campaign", platform: "Twitter + Cold Email", sent: 287, responses: 67, rate: "67%", status: "Active" },
                { name: "Enterprise Client Follow-up", platform: "Phone + Email", sent: 156, responses: 89, rate: "89%", status: "Hot" },
                { name: "Content Marketing Outreach", platform: "LinkedIn + DM", sent: 234, responses: 71, rate: "71%", status: "Active" },
                { name: "Partnership Proposal Series", platform: "Email + Video", sent: 89, responses: 56, rate: "56%", status: "Nurturing" },
              ].map((campaign, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent2/10 hover:border-dark-accent2/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white">{campaign.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          campaign.status === 'Hot' ? 'bg-red-500/20 text-red-400' :
                          campaign.status === 'Active' ? 'bg-dark-accent2/20 text-dark-accent2' :
                          'bg-dark-accent/20 text-dark-accent'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Platform: {campaign.platform}</span>
                        <span className="text-dark-accent2">Sent: {campaign.sent} | Responses: {campaign.responses}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">{campaign.rate}</div>
                      <div className="text-xs text-gray-400">Response Rate</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: campaign.rate }}
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
            
            {/* Nexus Controls */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <Brain className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Nexus Controls</h3>
              </div>
              <div className="space-y-3">
                <Link href="/agents/outreach-nexus/controls">
                  <button className="w-full p-3 rounded-lg bg-orange-500/20 text-left hover:bg-orange-500/30 transition-colors border border-orange-500/30">
                    <div className="flex items-center gap-3">
                      <Send className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Campaign Controls</p>
                        <p className="text-xs text-gray-400">Manage active outreach campaigns</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/outreach-nexus/scheduler">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-dark-accent2" />
                      <div>
                        <p className="text-sm font-medium text-white">Outreach Scheduler</p>
                        <p className="text-xs text-gray-400">Schedule & automate campaigns</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/outreach-nexus/settings">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings className="w-4 h-4 text-dark-accent2" />
                      <div>
                        <p className="text-sm font-medium text-white">Agent Settings</p>
                        <p className="text-xs text-gray-400">Configuration & preferences</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/outreach-nexus/audience">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-dark-accent2" />
                      <div>
                        <p className="text-sm font-medium text-white">Audience Targeting</p>
                        <p className="text-xs text-gray-400">Account linking & personalization engine</p>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <Satellite className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Email Deliverability</span>
                    <span className="text-sm text-dark-accent2 font-medium">97.8%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[98%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Response Quality</span>
                    <span className="text-sm text-dark-accent font-medium">89.4%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[89%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Personalization Rate</span>
                    <span className="text-sm text-dark-accent2 font-medium">94.1%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[94%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Platform Analytics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Platform Performance */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Platform Response Rates</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { platform: "LinkedIn", messages: 1847, responses: 89, rate: 89 },
                { platform: "Email Campaigns", messages: 2134, responses: 76, rate: 76 },
                { platform: "Twitter DM", messages: 634, responses: 67, rate: 67 },
                { platform: "Cold Calling", messages: 287, responses: 82, rate: 82 },
                { platform: "Facebook Messenger", messages: 456, responses: 71, rate: 71 },
              ].map((platform, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{platform.platform}</span>
                    <span className="text-sm text-dark-accent2 font-medium">{platform.responses}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{platform.messages} messages sent</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: `${platform.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Nexus Activity */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Nexus Activity</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "1 min ago", action: "Personalized email sent to TechStart CEO", platform: "Email" },
                { time: "5 min ago", action: "LinkedIn connection request with custom message", platform: "LinkedIn" },
                { time: "12 min ago", action: "Follow-up sequence triggered for 23 prospects", platform: "Multi" },
                { time: "18 min ago", action: "Phone call scheduled with InnovateCorp founder", platform: "Phone" },
                { time: "25 min ago", action: "Twitter DM campaign launched for tech influencers", platform: "Twitter" },
              ].map((activity, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="px-2 py-1 bg-dark-accent2/20 text-dark-accent2 text-xs rounded-full">
                      {activity.platform}
                    </span>
                  </div>
                  <p className="text-sm text-white">{activity.action}</p>
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
              <span>Outreach Nexus: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Send className="w-3 h-3 text-dark-accent2" />
              <span>Messages: 4.7K sent</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-dark-accent2" />
              <span>Response: 78% rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-dark-accent2" />
              <span>Campaigns: 23 active</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {outreachAgent?.tasksCompleted || 0}</span>
            <span>AI Engine: v2.7</span>
          </div>
        </div>
      </footer>

    </div>
  );
}