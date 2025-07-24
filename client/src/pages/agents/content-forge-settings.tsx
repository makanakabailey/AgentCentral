import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Save,
  Target,
  Sparkles,
  BarChart3,
  TrendingUp,
  Clock,
  ArrowLeft,
  RefreshCw,
  Zap,
  Brain,
  Globe
} from "lucide-react";
import { Link } from "wouter";
import type { ContentTemplate, ContentForgeConfig } from "@shared/schema";

export default function ContentForgeSettings() {
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    prompt: "",
    type: "tiktok",
    category: "engagement",
    variables: [] as string[],
    viralityScore: 75,
  });
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ContentTemplate | null>(null);
  const [newVariable, setNewVariable] = useState("");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Queries
  const { data: templates = [] } = useQuery<ContentTemplate[]>({
    queryKey: ["/api/content/templates"],
  });

  const { data: config } = useQuery<ContentForgeConfig>({
    queryKey: ["/api/content/config"],
  });

  // Mutations
  const createTemplateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/content/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create template");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/templates"] });
      setShowTemplateDialog(false);
      setNewTemplate({
        name: "",
        prompt: "",
        type: "tiktok",
        category: "engagement",
        variables: [],
        viralityScore: 75,
      });
      toast({
        title: "Template Created",
        description: "New content template has been added successfully.",
      });
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/content/templates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update template");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/templates"] });
      setEditingTemplate(null);
      toast({
        title: "Template Updated",
        description: "Template has been updated successfully.",
      });
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/content/templates/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete template");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/templates"] });
      toast({
        title: "Template Deleted",
        description: "Template has been removed successfully.",
      });
    },
  });

  const updateConfigMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/content/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update config");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/config"] });
      toast({
        title: "Settings Updated",
        description: "Configuration has been saved successfully.",
      });
    },
  });

  // Handlers
  const handleAddVariable = () => {
    if (newVariable.trim() && !newTemplate.variables.includes(newVariable.trim())) {
      setNewTemplate(prev => ({
        ...prev,
        variables: [...prev.variables, newVariable.trim()]
      }));
      setNewVariable("");
    }
  };

  const handleRemoveVariable = (variable: string) => {
    setNewTemplate(prev => ({
      ...prev,
      variables: prev.variables.filter(v => v !== variable)
    }));
  };

  const handleCreateTemplate = () => {
    createTemplateMutation.mutate(newTemplate);
  };

  const handleEditTemplate = (template: ContentTemplate) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      prompt: template.prompt,
      type: template.type,
      category: template.category,
      variables: template.variables || [],
      viralityScore: template.viralityScore || 75,
    });
    setShowTemplateDialog(true);
  };

  const handleUpdateTemplate = () => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({
        id: editingTemplate.id,
        data: newTemplate,
      });
    }
  };

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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      engagement: "bg-blue-500",
      viral: "bg-purple-500",
      educational: "bg-green-500",
      promotional: "bg-orange-500",
      storytelling: "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#1a1a2e] to-[#16213e] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/agents/content-forge">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="p-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] rounded-lg">
              <Settings className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-white bg-clip-text text-transparent">
                Content Forge Settings
              </h1>
              <p className="text-gray-400">Configure templates, preferences, and AI parameters</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-sm">
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Templates
            </TabsTrigger>
            <TabsTrigger value="ai-config" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              AI Configuration
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Platforms
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#00ff9d]">Content Templates</h2>
                <p className="text-sm text-gray-400">Manage and create content templates for different platforms</p>
              </div>
              <Button
                onClick={() => {
                  setEditingTemplate(null);
                  setNewTemplate({
                    name: "",
                    prompt: "",
                    type: "tiktok",
                    category: "engagement",
                    variables: [],
                    viralityScore: 75,
                  });
                  setShowTemplateDialog(true);
                }}
                className="bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-[#00ff9d]/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getPlatformIcon(template.type)}</span>
                        <Badge variant="secondary" className={`${getCategoryColor(template.category)} text-white text-xs`}>
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditTemplate(template)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTemplateMutation.mutate(template.id)}
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-400 line-clamp-3 mb-3">
                      {template.prompt}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Virality Score</span>
                        <span className="text-xs font-semibold text-[#00ff9d]">{template.viralityScore}%</span>
                      </div>
                      <Progress value={template.viralityScore || 0} className="h-1" />
                    </div>
                    {template.variables && template.variables.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 mb-1">Variables:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.slice(0, 3).map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs border-gray-600">
                              {variable}
                            </Badge>
                          ))}
                          {template.variables.length > 3 && (
                            <Badge variant="outline" className="text-xs border-gray-600">
                              +{template.variables.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Configuration Tab */}
          <TabsContent value="ai-config" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#00ff9d]">AI Configuration</h2>
              <p className="text-sm text-gray-400">Configure AI parameters and generation settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Generation Settings</CardTitle>
                  <CardDescription>Control AI content generation parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Creativity Level</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger className="bg-black/40 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700">
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="experimental">Experimental</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Content Length Preference</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-black/40 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700">
                        <SelectItem value="short">Short (Twitter-style)</SelectItem>
                        <SelectItem value="medium">Medium (LinkedIn-style)</SelectItem>
                        <SelectItem value="long">Long (Blog-style)</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tone Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger className="bg-black/40 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700">
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Auto-optimization</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include hashtags</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Quality Controls</CardTitle>
                  <CardDescription>Set content quality and safety parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Minimum Quality Score</Label>
                      <span className="text-sm text-[#00ff9d]">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Virality Threshold</Label>
                      <span className="text-sm text-[#00ff9d]">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Content filtering</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Plagiarism check</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Brand safety</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Keywords</Label>
                    <Textarea
                      placeholder="Enter brand keywords, separated by commas..."
                      className="bg-black/40 border-gray-700 min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#00ff9d]">Platform Settings</h2>
              <p className="text-sm text-gray-400">Configure platform-specific settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "TikTok", icon: "🎵", active: true, templates: 12 },
                { name: "Instagram", icon: "📸", active: true, templates: 8 },
                { name: "LinkedIn", icon: "💼", active: true, templates: 15 },
                { name: "Twitter", icon: "🐦", active: false, templates: 6 },
                { name: "YouTube", icon: "📹", active: true, templates: 4 },
                { name: "Blog", icon: "📝", active: true, templates: 9 },
              ].map((platform) => (
                <Card key={platform.name} className="bg-black/40 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{platform.icon}</span>
                        <h3 className="font-semibold">{platform.name}</h3>
                      </div>
                      <Switch defaultChecked={platform.active} />
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>{platform.templates} templates available</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${platform.active ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span>{platform.active ? 'Active' : 'Disabled'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#00ff9d]">Performance Analytics</h2>
              <p className="text-sm text-gray-400">Monitor and optimize content performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Avg. Quality Score</p>
                      <p className="text-2xl font-bold text-[#00ff9d]">87.3%</p>
                    </div>
                    <Target className="h-8 w-8 text-[#00ff9d]/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Generation Speed</p>
                      <p className="text-2xl font-bold text-blue-400">2.4s</p>
                    </div>
                    <Zap className="h-8 w-8 text-blue-400/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Success Rate</p>
                      <p className="text-2xl font-bold text-green-400">94.7%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Daily Output</p>
                      <p className="text-2xl font-bold text-purple-400">156</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-400/60" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Template Creation/Edit Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="bg-black border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Edit Template" : "Create New Template"}
              </DialogTitle>
              <DialogDescription>
                {editingTemplate ? "Update your content template" : "Create a new content template for AI generation"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Viral TikTok Hook"
                    className="bg-black/40 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select 
                    value={newTemplate.type} 
                    onValueChange={(value) => setNewTemplate(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-black/40 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-700">
                      <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                      <SelectItem value="instagram">📸 Instagram</SelectItem>
                      <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                      <SelectItem value="twitter">🐦 Twitter</SelectItem>
                      <SelectItem value="youtube">📹 YouTube</SelectItem>
                      <SelectItem value="blog">📝 Blog</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select 
                    value={newTemplate.category} 
                    onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-black/40 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-700">
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="viral">Viral</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="storytelling">Storytelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Virality Score (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={newTemplate.viralityScore}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, viralityScore: parseInt(e.target.value) || 0 }))}
                    className="bg-black/40 border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Template Prompt</Label>
                <Textarea
                  value={newTemplate.prompt}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                  placeholder="Enter your content template prompt. Use {variable} for dynamic content..."
                  className="bg-black/40 border-gray-700 min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Variables</Label>
                <div className="flex gap-2">
                  <Input
                    value={newVariable}
                    onChange={(e) => setNewVariable(e.target.value)}
                    placeholder="e.g. productName, targetAudience"
                    className="bg-black/40 border-gray-700"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddVariable()}
                  />
                  <Button onClick={handleAddVariable} variant="outline" className="border-[#00ff9d] text-[#00ff9d]">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newTemplate.variables.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newTemplate.variables.map((variable) => (
                      <Badge key={variable} variant="secondary" className="bg-gray-700">
                        {variable}
                        <button
                          onClick={() => handleRemoveVariable(variable)}
                          className="ml-1 hover:text-red-400"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
                  disabled={createTemplateMutation.isPending || updateTemplateMutation.isPending}
                  className="bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingTemplate ? "Update" : "Create"} Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}