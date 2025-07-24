import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Hammer, ArrowLeft, Zap, Instagram, Facebook, Youtube, Twitter, Linkedin, Clock, Sparkles, Play, Settings2, Image, Video, FileText, Mic, Layout, Palette, MessageSquare, Target, Music } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const quickActionTemplates = [
  {
    id: 1,
    name: "Instagram Story",
    description: "Create engaging Instagram story content",
    icon: Instagram,
    color: "bg-pink-500/20 text-pink-400",
    category: "Social Media",
    estimatedTime: "2 min",
    parameters: { platform: "instagram", format: "story", dimensions: "1080x1920" }
  },
  {
    id: 2,
    name: "Facebook Post",
    description: "Generate Facebook post with image",
    icon: Facebook,
    color: "bg-blue-500/20 text-blue-400",
    category: "Social Media",
    estimatedTime: "3 min",
    parameters: { platform: "facebook", format: "post", dimensions: "1200x630" }
  },
  {
    id: 3,
    name: "YouTube Thumbnail",
    description: "Eye-catching YouTube thumbnail design",
    icon: Youtube,
    color: "bg-red-500/20 text-red-400",
    category: "Video Content",
    estimatedTime: "5 min",
    parameters: { platform: "youtube", format: "thumbnail", dimensions: "1280x720" }
  },
  {
    id: 4,
    name: "Twitter Thread",
    description: "Multi-tweet Twitter thread content",
    icon: Twitter,
    color: "bg-cyan-500/20 text-cyan-400",
    category: "Social Media",
    estimatedTime: "4 min",
    parameters: { platform: "twitter", format: "thread", maxTweets: 10 }
  },
  {
    id: 5,
    name: "TikTok Script",
    description: "Viral TikTok video script generator",
    icon: Music,
    color: "bg-purple-500/20 text-purple-400",
    category: "Video Content",
    estimatedTime: "3 min",
    parameters: { platform: "tiktok", format: "script", duration: "60s" }
  },
  {
    id: 6,
    name: "LinkedIn Article",
    description: "Professional LinkedIn article content",
    icon: Linkedin,
    color: "bg-blue-600/20 text-blue-300",
    category: "Professional",
    estimatedTime: "8 min",
    parameters: { platform: "linkedin", format: "article", wordCount: 1000 }
  },
  {
    id: 7,
    name: "Blog Post",
    description: "SEO-optimized blog post content",
    icon: FileText,
    color: "bg-green-500/20 text-green-400",
    category: "Content Marketing",
    estimatedTime: "15 min",
    parameters: { format: "blog", wordCount: 1500, seoOptimized: true }
  },
  {
    id: 8,
    name: "Email Campaign",
    description: "Marketing email with call-to-action",
    icon: MessageSquare,
    color: "bg-orange-500/20 text-orange-400",
    category: "Email Marketing",
    estimatedTime: "6 min",
    parameters: { format: "email", type: "marketing", includeImages: true }
  },
  {
    id: 9,
    name: "Product Description",
    description: "Compelling product description copy",
    icon: Target,
    color: "bg-indigo-500/20 text-indigo-400",
    category: "E-commerce",
    estimatedTime: "4 min",
    parameters: { format: "product", tone: "persuasive", length: "medium" }
  },
  {
    id: 10,
    name: "Podcast Script",
    description: "Structured podcast episode script",
    icon: Mic,
    color: "bg-yellow-500/20 text-yellow-400",
    category: "Audio Content",
    estimatedTime: "12 min",
    parameters: { format: "podcast", duration: "30min", includeIntro: true }
  },
  {
    id: 11,
    name: "Infographic Design",
    description: "Data visualization infographic",
    icon: Layout,
    color: "bg-teal-500/20 text-teal-400",
    category: "Visual Content",
    estimatedTime: "10 min",
    parameters: { format: "infographic", style: "modern", dataPoints: 5 }
  },
  {
    id: 12,
    name: "Brand Palette",
    description: "Generate brand color palette",
    icon: Palette,
    color: "bg-rose-500/20 text-rose-400",
    category: "Branding",
    estimatedTime: "5 min",
    parameters: { format: "palette", colors: 5, style: "modern" }
  }
];

export default function ContentForgeQuickActions() {
  const { toast } = useToast();
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [customPrompt, setCustomPrompt] = useState("");
  const [customTarget, setCustomTarget] = useState("");

  const executeQuickActionMutation = useMutation({
    mutationFn: async (actionData: any) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, contentId: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Content Generated!",
        description: `${variables.name} has been created successfully. Content ID: ${data.contentId}`,
      });
      setIsDialogOpen(false);
      setSelectedAction(null);
      setCustomPrompt("");
      setCustomTarget("");
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "There was an error creating your content. Please try again.",
        variant: "destructive",
      });
    }
  });

  const filteredActions = quickActionTemplates.filter(action => {
    const matchesSearch = action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || action.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(quickActionTemplates.map(action => action.category)));

  const handleExecuteAction = () => {
    if (!selectedAction) return;
    
    executeQuickActionMutation.mutate({
      ...selectedAction,
      customPrompt,
      customTarget,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/content-forge">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">QUICK ACTIONS</h1>
              <p className="text-sm text-gray-400">Instant Content Generation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30">
              {filteredActions.length} Available
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search quick actions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark-surface/50 border-dark-accent/20 text-white placeholder:text-gray-400"
              data-testid="input-search-actions"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-dark-surface/50 border-dark-accent/20 text-white" data-testid="select-category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-dark-surface border-dark-accent/20">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Card key={action.id} className="holographic group hover:scale-105 transition-all duration-300 cursor-pointer border-dark-accent/10">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <IconComponent className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{action.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <h3 className="font-semibold text-white text-sm lg:text-base">{action.name}</h3>
                    <p className="text-xs lg:text-sm text-gray-400 line-clamp-2">{action.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {action.category}
                    </Badge>
                  </div>

                  <Dialog open={isDialogOpen && selectedAction?.id === action.id} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) {
                      setSelectedAction(null);
                      setCustomPrompt("");
                      setCustomTarget("");
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-400/20"
                        onClick={() => setSelectedAction(action)}
                        data-testid={`button-execute-${action.id}`}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Generate Now
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="bg-dark-surface border-dark-accent/20 text-white sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${action.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          Generate {action.name}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="custom-prompt" className="text-sm font-medium text-gray-300">
                            Custom Prompt (Optional)
                          </Label>
                          <Textarea
                            id="custom-prompt"
                            placeholder="Describe what you want to create..."
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white placeholder:text-gray-400"
                            rows={3}
                            data-testid="textarea-custom-prompt"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="target-audience" className="text-sm font-medium text-gray-300">
                            Target Audience (Optional)
                          </Label>
                          <Input
                            id="target-audience"
                            placeholder="e.g., Young professionals, Tech enthusiasts..."
                            value={customTarget}
                            onChange={(e) => setCustomTarget(e.target.value)}
                            className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white placeholder:text-gray-400"
                            data-testid="input-target-audience"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-dark-accent/20 text-gray-300 hover:bg-dark-accent/10"
                            onClick={() => setIsDialogOpen(false)}
                            data-testid="button-cancel-generation"
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={handleExecuteAction}
                            disabled={executeQuickActionMutation.isPending}
                            data-testid="button-confirm-generation"
                          >
                            {executeQuickActionMutation.isPending ? (
                              <>
                                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 rounded-lg bg-dark-surface/30 max-w-md mx-auto">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Actions Found</h3>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filter to find quick actions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}