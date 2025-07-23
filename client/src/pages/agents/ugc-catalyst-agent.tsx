import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Users, ArrowLeft, Heart, Share2, MessageSquare, Star, Brain, Settings, Play, Upload, Download } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function UGCCatalystAgent() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const ugcCatalyst = agents?.find(agent => agent.name === "UGC Catalyst Agent");

  const handleAmplifyContent = () => {
    toast({
      title: "Amplification Started",
      description: "UGC Catalyst is amplifying user testimonials and community content.",
    });
  };

  const handleOptimizeCommunity = () => {
    toast({
      title: "Community Optimization",
      description: "AI is optimizing community engagement and content curation strategies.",
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
              <Users className="w-6 h-6 text-dark-accent2" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">UGC CATALYST AGENT</h1>
              <p className="text-sm text-gray-400">Community Amplification Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {ugcCatalyst?.isActive ? "Amplifying" : "Monitoring"}
              </span>
            </div>
            
            <button
              onClick={handleOptimizeCommunity}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
            >
              <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent2" />
            </button>
            
            <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* UGC Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">UGC Pieces</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">847</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">collected</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Share2 className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Viral</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Amplification Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">234%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">boost</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Engaged</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Community Size</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">12.4K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">members</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Star className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Quality</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Content Quality</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">92%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Featured UGC Content */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Featured User-Generated Content</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAmplifyContent}
                  className="p-2 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-dark-accent2" />
                </button>
                <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors">
                  <Upload className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { user: "@SarahTechCEO", content: "This AI tool completely transformed our content strategy! ROI increased by 340% in just 2 months.", type: "Testimonial", engagement: 2847, platform: "LinkedIn" },
                { user: "@StartupMike", content: "Video review: 'How this platform saved me 20 hours per week'", type: "Video", engagement: 1924, platform: "YouTube" },
                { user: "@ContentQueen", content: "Thread: 15 ways this tool revolutionized my content workflow", type: "Thread", engagement: 3156, platform: "Twitter" },
                { user: "@TechReviewer", content: "Case study: From 0 to 100K followers using this AI platform", type: "Case Study", engagement: 4721, platform: "Blog" },
                { user: "@InfluencerJane", content: "Instagram Reel: 'Before vs After using AI content tools'", type: "Reel", engagement: 8934, platform: "Instagram" },
              ].map((ugc, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent2/10 hover:border-dark-accent2/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white">{ugc.user}</h4>
                        <span className="px-2 py-1 bg-dark-accent2/20 text-dark-accent2 text-xs rounded-full">
                          {ugc.type}
                        </span>
                        <span className="px-2 py-1 bg-dark-accent/20 text-dark-accent text-xs rounded-full">
                          {ugc.platform}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{ugc.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {ugc.engagement.toLocaleString()} engagements
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">Viral</div>
                      <div className="text-xs text-gray-400">Status</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: `${Math.min((ugc.engagement / 10000) * 100, 100)}%` }}
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
            
            {/* Catalyst Controls */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <Brain className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Catalyst Controls</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Content Curation</p>
                      <p className="text-xs text-gray-400">AI-powered UGC discovery</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Share2 className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Amplification Engine</p>
                      <p className="text-xs text-gray-400">Cross-platform promotion</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Community Building</p>
                      <p className="text-xs text-gray-400">Engagement optimization</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-dark-accent2" />
                    <div>
                      <p className="text-sm font-medium text-white">Quality Scoring</p>
                      <p className="text-xs text-gray-400">Content quality analysis</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Community Metrics */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <Users className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">Community Health</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Engagement Rate</span>
                    <span className="text-sm text-dark-accent2 font-medium">89.7%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[90%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Content Quality</span>
                    <span className="text-sm text-dark-accent font-medium">92.3%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[92%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Growth Rate</span>
                    <span className="text-sm text-dark-accent2 font-medium">87.1%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[87%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Content Categories & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Content Categories */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Top UGC Categories</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { category: "Customer Testimonials", count: 234, engagement: 94, growth: "+23%" },
                { category: "Product Reviews", count: 187, engagement: 87, growth: "+18%" },
                { category: "Use Case Videos", count: 156, engagement: 91, growth: "+31%" },
                { category: "Tutorial Content", count: 143, engagement: 89, growth: "+15%" },
                { category: "Success Stories", count: 127, engagement: 96, growth: "+27%" },
              ].map((category, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{category.category}</span>
                    <span className="text-sm text-dark-accent2 font-medium">{category.engagement}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{category.count} pieces • {category.growth} growth</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
                      style={{ width: `${category.engagement}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Catalyst Activity */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Catalyst Activity</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "3 min ago", action: "Amplified viral testimonial from @SarahTechCEO", impact: "2.8K engagements" },
                { time: "12 min ago", action: "Curated 15 high-quality customer reviews", impact: "94% quality score" },
                { time: "28 min ago", action: "Launched community challenge #AISuccess", impact: "156 submissions" },
                { time: "1 hr ago", action: "Optimized UGC promotion across platforms", impact: "+34% reach" },
                { time: "2 hrs ago", action: "Identified trending content patterns", impact: "87% accuracy" },
              ].map((activity, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="text-xs text-dark-accent2 font-medium">{activity.impact}</span>
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
              <span>UGC Catalyst: Amplifying</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-dark-accent2" />
              <span>UGC: 847 pieces</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-3 h-3 text-dark-accent2" />
              <span>Amplification: 234% boost</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-dark-accent2" />
              <span>Community: 12.4K members</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {ugcCatalyst?.tasksCompleted || 0}</span>
            <span>AI Engine: v2.9</span>
          </div>
        </div>
      </footer>

    </div>
  );
}