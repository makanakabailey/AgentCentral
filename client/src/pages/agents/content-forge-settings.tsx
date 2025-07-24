import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Hammer, 
  Settings, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  Download, 
  Upload,
  TrendingUp,
  BarChart3,
  Calendar,
  Target
} from "lucide-react";
import type { ContentTemplate, GeneratedContent, ContentPillar } from "@shared/schema";

interface ContentVariables {
  [key: string]: string;
}

export default function ContentForgeSettings() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [contentVariables, setContentVariables] = useState<ContentVariables>({});
  const [previewContent, setPreviewContent] = useState<string>("");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "tiktok",
    category: "viral",
    prompt: "",
    variables: [] as string[],
    viralityScore: 75,
  });

  const queryClient = useQueryClient();

  // Queries
  const { data: templates = [] } = useQuery<ContentTemplate[]>({
    queryKey: ["/api/content/templates"],
  });

  const { data: generatedContent = [] } = useQuery<GeneratedContent[]>({
    queryKey: ["/api/content/generated"],
  });

  const { data: contentPillars = [] } = useQuery<ContentPillar[]>({
    queryKey: ["/api/content/pillars"],
  });

  // Mutations
  const createTemplateMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/content/templates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/templates"] });
      setNewTemplate({
        name: "",
        type: "tiktok",
        category: "viral",
        prompt: "",
        variables: [],
        viralityScore: 75,
      });
    },
  });

  const generateContentMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/content/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/generated"] });
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiRequest(`/api/content/generated/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/generated"] });
    },
  });

  // Handlers
  const handlePreviewContent = () => {
    if (!selectedTemplate) return;

    let content = selectedTemplate.prompt;
    if (selectedTemplate.variables) {
      selectedTemplate.variables.forEach((variable) => {
        if (contentVariables[variable]) {
          content = content.replace(
            new RegExp(`\\{${variable}\\}`, 'g'),
            contentVariables[variable]
          );
        }
      });
    }
    setPreviewContent(content);
  };

  const handleGenerateContent = () => {
    if (!selectedTemplate) return;

    generateContentMutation.mutate({
      templateId: selectedTemplate.id,
      variables: contentVariables,
      platform: selectedTemplate.type,
    });
  };

  const handleCreateTemplate = () => {
    const variables = newTemplate.prompt.match(/\{([^}]+)\}/g)?.map(v => v.slice(1, -1)) || [];
    
    createTemplateMutation.mutate({
      ...newTemplate,
      variables,
    });
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

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-gray-500",
      approved: "bg-green-500",
      published: "bg-blue-500",
      archived: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#1a1a2e] to-[#16213e] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] rounded-lg">
              <Hammer className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-white bg-clip-text text-transparent">
                Content Forge Agent
              </h1>
              <p className="text-gray-400">AI-Powered Content Creation & Optimization Engine</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d]/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-sm">
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              <Settings className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="generate" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              <Eye className="h-4 w-4 mr-2" />
              Content Library
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Existing Templates */}
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Content Templates</CardTitle>
                  <CardDescription>Manage your content generation templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 border border-gray-700 rounded-lg hover:border-[#00ff9d]/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getPlatformIcon(template.type)}</span>
                            <h3 className="font-semibold">{template.name}</h3>
                            <Badge variant="secondary" className="bg-gray-700">
                              {template.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {template.prompt.slice(0, 100)}...
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-[#00ff9d]" />
                              <span className="text-xs text-gray-400">
                                {template.viralityScore}% viral score
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3 text-blue-400" />
                              <span className="text-xs text-gray-400">
                                {template.variables?.length || 0} variables
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Create New Template */}
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Create New Template</CardTitle>
                  <CardDescription>Design your content generation template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Template Name</Label>
                    <Input
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., TikTok Hook Template"
                      className="bg-black/40 border-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Platform</Label>
                      <Select value={newTemplate.type} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, type: value }))}>
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

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="bg-black/40 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-700">
                          <SelectItem value="viral">🔥 Viral</SelectItem>
                          <SelectItem value="educational">📚 Educational</SelectItem>
                          <SelectItem value="promotional">📢 Promotional</SelectItem>
                          <SelectItem value="testimonial">⭐ Testimonial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Template Prompt</Label>
                    <Textarea
                      value={newTemplate.prompt}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                      placeholder="Enter your template with variables in {curly} brackets..."
                      className="bg-black/40 border-gray-700 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500">
                      Use {`{variable}`} syntax for dynamic content. Variables will be extracted automatically.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Virality Score (0-100)</Label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={newTemplate.viralityScore}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, viralityScore: parseInt(e.target.value) }))}
                        className="bg-black/40 border-gray-700"
                      />
                      <Progress value={newTemplate.viralityScore} className="h-2" />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCreateTemplate}
                    disabled={createTemplateMutation.isPending || !newTemplate.name || !newTemplate.prompt}
                    className="w-full bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {createTemplateMutation.isPending ? "Creating..." : "Create Template"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Selection & Variables */}
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Content Generation</CardTitle>
                  <CardDescription>Select a template and fill in variables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Template Selection */}
                  <div className="space-y-2">
                    <Label>Select Template</Label>
                    <Select onValueChange={(value) => {
                      const template = templates.find(t => t.id === parseInt(value));
                      setSelectedTemplate(template || null);
                      setContentVariables({});
                      setPreviewContent("");
                    }}>
                      <SelectTrigger className="bg-black/40 border-gray-700">
                        <SelectValue placeholder="Choose a content template" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700">
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {getPlatformIcon(template.type)} {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Variables Input */}
                  {selectedTemplate && selectedTemplate.variables && (
                    <div className="space-y-4">
                      <Label>Fill in Variables</Label>
                      <div className="space-y-3">
                        {selectedTemplate.variables.map((variable) => (
                          <div key={variable} className="space-y-1">
                            <Label className="text-sm text-gray-400">{variable}</Label>
                            <Input
                              value={contentVariables[variable] || ""}
                              onChange={(e) => setContentVariables(prev => ({ ...prev, [variable]: e.target.value }))}
                              placeholder={`Enter ${variable}...`}
                              className="bg-black/40 border-gray-700"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTemplate && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handlePreviewContent}
                        variant="outline"
                        className="flex-1 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d]/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        onClick={handleGenerateContent}
                        disabled={generateContentMutation.isPending}
                        className="flex-1 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {generateContentMutation.isPending ? "Generating..." : "Generate"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Content Preview</CardTitle>
                  <CardDescription>Preview your generated content</CardDescription>
                </CardHeader>
                <CardContent>
                  {previewContent ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">{selectedTemplate ? getPlatformIcon(selectedTemplate.type) : "📄"}</span>
                          <span className="text-sm text-gray-400">
                            {selectedTemplate?.type.charAt(0).toUpperCase() + selectedTemplate?.type.slice(1)} Post
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {previewContent}
                        </div>
                      </div>
                      {selectedTemplate && (
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Estimated virality: {selectedTemplate.viralityScore}%</span>
                          <span>Characters: {previewContent.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 text-gray-500">
                      <div className="text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Preview will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Library Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#00ff9d]">Generated Content Library</CardTitle>
                <CardDescription>Manage your generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedContent.map((content) => (
                    <div key={content.id} className="p-4 border border-gray-700 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getPlatformIcon(content.platform)}</span>
                            <h3 className="font-semibold">{content.title}</h3>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(content.status)}`}></div>
                            <Badge variant="secondary" className="bg-gray-700">
                              {content.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                            {content.content.slice(0, 150)}...
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-[#00ff9d]" />
                              <span className="text-xs text-gray-400">
                                {content.viralityPrediction}% viral
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3 text-blue-400" />
                              <span className="text-xs text-gray-400">
                                {content.engagementPrediction}% engagement
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-purple-400" />
                              <span className="text-xs text-gray-400">
                                {new Date(content.createdAt!).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {generatedContent.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">No content generated yet</h3>
                      <p className="text-sm">Start by creating templates and generating content</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Templates</p>
                      <p className="text-2xl font-bold text-[#00ff9d]">{templates.length}</p>
                    </div>
                    <Settings className="h-8 w-8 text-[#00ff9d]/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Generated Content</p>
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
                      <p className="text-sm text-gray-400">Avg Virality Score</p>
                      <p className="text-2xl font-bold text-purple-400">
                        {templates.length > 0 
                          ? Math.round(templates.reduce((sum, t) => sum + (t.viralityScore || 0), 0) / templates.length)
                          : 0}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-400/60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Content Pillars</p>
                      <p className="text-2xl font-bold text-orange-400">{contentPillars.length}</p>
                    </div>
                    <Target className="h-8 w-8 text-orange-400/60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Pillars Overview */}
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#00ff9d]">Content Pillars Performance</CardTitle>
                <CardDescription>Strategic content categories and their effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentPillars.map((pillar) => (
                    <div key={pillar.id} className="p-4 border border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{pillar.name}</h3>
                        <Badge variant="secondary" className="bg-gray-700">
                          {pillar.performanceWeight}% weight
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{pillar.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Target: {pillar.targetAudience}</span>
                          <Progress value={pillar.performanceWeight || 0} className="w-24 h-2" />
                        </div>
                        {pillar.keyTopics && pillar.keyTopics.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {pillar.keyTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-600">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}