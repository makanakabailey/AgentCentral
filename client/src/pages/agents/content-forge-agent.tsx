import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Hammer, ArrowLeft, FileText, Image, Video, Zap, Brain, Settings, Play, Download, Upload, Sliders, Wand2, Archive } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function ContentForgeAgent() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const contentForgeAgent = agents?.find(agent => agent.name === "Content Forge Agent");

  const handleGenerateContent = () => {
    toast({
      title: "Content Generation Started",
      description: "Content Forge Agent is creating optimized content across all platforms.",
    });
  };

  const handleOptimizeContent = () => {
    toast({
      title: "Content Optimization",
      description: "AI is optimizing existing content for better engagement and performance.",
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
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Hammer className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">CONTENT FORGE AGENT</h1>
              <p className="text-sm text-gray-400">AI Content Creation Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {contentForgeAgent?.isActive ? "Creating" : "Standby"}
              </span>
            </div>
            
            <button
              onClick={handleOptimizeContent}
              className="p-2 lg:p-3 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
            >
              <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400" />
            </button>
            
            <Link href="/agents/content-forge/controls">
              <button className="p-2 lg:p-3 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors">
                <Sliders className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400" />
              </button>
            </Link>
            
            <Link href="/agents/content-forge/settings">
              <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Content Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Content Created</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">1.2K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">pieces</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Engagement Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">87%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">avg</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Image className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Creating</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Visual Content</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">423</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">assets</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Video className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Processing</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Video Content</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">156</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">videos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Content Pipeline */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Active Content Pipeline</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateContent}
                  className="p-2 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-dark-accent" />
                </button>
                <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "AI SaaS Product Launch Campaign", type: "Multi-Platform", progress: 95, platform: "LinkedIn + Twitter + Blog", status: "Finalizing" },
                { title: "Tech Trends Analysis Series", type: "Blog + Video", progress: 78, platform: "Blog + YouTube", status: "Writing" },
                { title: "Customer Success Stories", type: "Case Studies", progress: 67, platform: "Website + Email", status: "Reviewing" },
                { title: "Product Feature Deep-Dive", type: "Video Series", progress: 89, platform: "YouTube + Social", status: "Editing" },
                { title: "Industry Thought Leadership", type: "Articles", progress: 56, platform: "Medium + LinkedIn", status: "Research" },
              ].map((content, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent/10 hover:border-dark-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white">{content.title}</h4>
                        <span className="px-2 py-1 bg-dark-accent/20 text-dark-accent text-xs rounded-full">
                          {content.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Type: {content.type}</span>
                        <span className="text-dark-accent">Platform: {content.platform}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">{content.progress}%</div>
                      <div className="text-xs text-gray-400">Complete</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${content.progress}%` }}
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
            
            {/* Content Controls */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <Brain className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">Forge Controls</h3>
              </div>
              <div className="space-y-3">
                <Link href="/agents/content-forge/creator">
                  <button className="w-full p-3 rounded-lg bg-orange-500/20 text-left hover:bg-orange-500/30 transition-colors border border-orange-500/30">
                    <div className="flex items-center gap-3">
                      <Wand2 className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Content Creator</p>
                        <p className="text-xs text-gray-400">AI-powered content generation</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/content-forge/controls">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Sliders className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Forge Controls</p>
                        <p className="text-xs text-gray-400">Generation management</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/content-forge/stock">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Archive className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Content Stock</p>
                        <p className="text-xs text-gray-400">Content library & management</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/content-forge/bulk-upload">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Upload className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Bulk Upload</p>
                        <p className="text-xs text-gray-400">Mass content import & processing</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/content-forge/quick-actions">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Quick Actions</p>
                        <p className="text-xs text-gray-400">Instant content generation</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/content-forge/templates">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Template Library</p>
                        <p className="text-xs text-gray-400">Import & manage templates</p>
                      </div>
                    </div>
                  </button>
                </Link>
                <Link href="/agents/content-forge/api-keys">
                  <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">API Keys</p>
                        <p className="text-xs text-gray-400">Service integrations</p>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <Zap className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Content Quality</span>
                    <span className="text-sm text-dark-accent font-medium">96.4%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[96%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Generation Speed</span>
                    <span className="text-sm text-dark-accent2 font-medium">3.2s avg</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[88%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Optimization Rate</span>
                    <span className="text-sm text-dark-accent font-medium">94.7%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Content Analytics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Platform Performance */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Platform Performance</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { platform: "LinkedIn", posts: 287, engagement: 94, reach: "45K" },
                { platform: "Twitter", posts: 456, engagement: 82, reach: "78K" },
                { platform: "YouTube", posts: 34, engagement: 89, reach: "125K" },
                { platform: "Blog", posts: 67, engagement: 91, reach: "23K" },
                { platform: "Instagram", posts: 198, engagement: 76, reach: "34K" },
              ].map((platform, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{platform.platform}</span>
                    <span className="text-sm text-dark-accent font-medium">{platform.engagement}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{platform.posts} posts • {platform.reach} reach</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${platform.engagement}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Forge Activity */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Forge Activity</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "2 min ago", action: "Generated LinkedIn article: 'AI Trends 2024'", type: "Article" },
                { time: "8 min ago", action: "Created video script for product demo", type: "Video" },
                { time: "15 min ago", action: "Optimized 12 social media posts for engagement", type: "Social" },
                { time: "23 min ago", action: "Generated infographic: 'SaaS Growth Stats'", type: "Visual" },
                { time: "31 min ago", action: "Created email campaign content series", type: "Email" },
              ].map((activity, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="px-2 py-1 bg-dark-accent/20 text-dark-accent text-xs rounded-full">
                      {activity.type}
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
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span>Content Forge: Creating</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3 text-dark-accent" />
              <span>Content: 1.2K pieces</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-dark-accent" />
              <span>Engagement: 87% avg</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="w-3 h-3 text-dark-accent" />
              <span>Visuals: 423 assets</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {contentForgeAgent?.tasksCompleted || 0}</span>
            <span>AI Engine: v3.1</span>
          </div>
        </div>
      </footer>

    </div>
  );
}