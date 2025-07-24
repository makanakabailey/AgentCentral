import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Hammer, 
  ArrowLeft, 
  Settings, 
  Wand2, 
  Archive, 
  Plus,
  TrendingUp,
  BarChart3,
  Target,
  Sparkles,
  Eye,
  Edit3,
  Activity
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import type { Agent, ContentTemplate, GeneratedContent } from "@shared/schema";

export default function ContentForgeAgent() {
  const { toast } = useToast();

  // Queries
  const { data: agents } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
    refetchInterval: 30000,
  });

  const { data: templates = [] } = useQuery<ContentTemplate[]>({
    queryKey: ["/api/content/templates"],
  });

  const { data: generatedContent = [] } = useQuery<GeneratedContent[]>({
    queryKey: ["/api/content/generated"],
  });

  const contentForgeAgent = agents?.find(agent => agent.name === "Content Forge Agent");

  const recentContent = generatedContent
    .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
    .slice(0, 5);

  const avgViralityScore = templates.length > 0 
    ? Math.round(templates.reduce((sum, t) => sum + (t.viralityScore || 0), 0) / templates.length)
    : 0;

  const publishedCount = generatedContent.filter(c => c.status === "published").length;
  const draftCount = generatedContent.filter(c => c.status === "draft").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#1a1a2e] to-[#16213e] text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-gray-800 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="p-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] rounded-lg">
              <Hammer className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-white bg-clip-text text-transparent">
                Content Forge Agent
              </h1>
              <p className="text-sm text-gray-400">AI-Powered Content Creation & Optimization Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${contentForgeAgent?.isActive ? 'bg-[#00ff9d]' : 'bg-gray-500'} animate-pulse`}></div>
              <span className="text-xs text-gray-400">
                {contentForgeAgent?.isActive ? "Active" : "Standby"}
              </span>
            </div>
            
            <Link href="/agents/content-forge/settings">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:border-[#00ff9d]/50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/agents/content-forge/create">
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-[#00ff9d]/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] rounded-lg">
                    <Wand2 className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#00ff9d]">Create Content</h3>
                    <p className="text-sm text-gray-400">Generate new content using AI templates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/agents/content-forge/library">
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-[#00ff9d]/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Archive className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400">Content Library</h3>
                    <p className="text-sm text-gray-400">Manage and organize generated content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/agents/content-forge/settings">
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-[#00ff9d]/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-400">Settings</h3>
                    <p className="text-sm text-gray-400">Configure templates and preferences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Templates</p>
                  <p className="text-2xl font-bold text-[#00ff9d]">{templates.length}</p>
                </div>
                <Target className="h-8 w-8 text-[#00ff9d]/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Generated</p>
                  <p className="text-2xl font-bold text-blue-400">{generatedContent.length}</p>
                </div>
                <Sparkles className="h-8 w-8 text-blue-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-green-400">{publishedCount}</p>
                </div>
                <Eye className="h-8 w-8 text-green-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Virality</p>
                  <p className="text-2xl font-bold text-purple-400">{avgViralityScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Status and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agent Status */}
          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#00ff9d]">Agent Status</CardTitle>
              <CardDescription>Current performance and activity metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status</span>
                <Badge variant="secondary" className={contentForgeAgent?.isActive ? "bg-green-500" : "bg-gray-500"}>
                  {contentForgeAgent?.isActive ? "Active" : "Standby"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Tasks Completed</span>
                  <span className="text-sm font-semibold">{contentForgeAgent?.tasksCompleted || 0}</span>
                </div>
                <Progress value={((contentForgeAgent?.tasksCompleted || 0) / 200) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Content Quality</span>
                  <span className="text-sm font-semibold">{avgViralityScore}%</span>
                </div>
                <Progress value={avgViralityScore} className="h-2" />
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Activity className="h-3 w-3" />
                  <span>Last activity: {contentForgeAgent?.lastActivity ? new Date(contentForgeAgent.lastActivity).toLocaleString() : 'Never'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Content */}
          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#00ff9d]">Recent Content</CardTitle>
              <CardDescription>Latest generated content pieces</CardDescription>
            </CardHeader>
            <CardContent>
              {recentContent.length > 0 ? (
                <div className="space-y-3">
                  {recentContent.map((content) => (
                    <div key={content.id} className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{getPlatformIcon(content.platform)}</span>
                            <h4 className="text-sm font-semibold line-clamp-1">{content.title}</h4>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2">{content.content}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-400" />
                              <span className="text-xs text-gray-400">{content.viralityPrediction}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3 text-blue-400" />
                              <span className="text-xs text-gray-400">{content.engagementPrediction}%</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`ml-2 ${getStatusColor(content.status)} text-white text-xs`}>
                          {content.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No content generated yet</p>
                  <Link href="/agents/content-forge/create">
                    <Button size="sm" className="mt-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90">
                      <Plus className="h-3 w-3 mr-1" />
                      Create Content
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper functions
const getPlatformIcon = (platform: string) => {
  const icons: { [key: string]: string } = {
    tiktok: "🎵",
    instagram: "📸",
    linkedin: "💼",
    twitter: "🐦",
    youtube: "📹",
    blog: "📝",
  };
  return icons[platform] || "📄";
};

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    draft: "bg-yellow-500",
    approved: "bg-green-500",
    published: "bg-blue-500",
    archived: "bg-gray-500",
  };
  return colors[status] || "bg-gray-500";
};
