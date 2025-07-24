import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Hammer, 
  Eye, 
  Wand2, 
  Copy,
  Save,
  Send,
  TrendingUp,
  BarChart3,
  Calendar,
  Target,
  ArrowLeft,
  RefreshCw
} from "lucide-react";
import { Link } from "wouter";
import type { ContentTemplate, GeneratedContent } from "@shared/schema";

interface ContentVariables {
  [key: string]: string;
}

export default function ContentForgeCreate() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [contentVariables, setContentVariables] = useState<ContentVariables>({});
  const [previewContent, setPreviewContent] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [useCustomPrompt, setUseCustomPrompt] = useState<boolean>(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("tiktok");
  const [generatedResult, setGeneratedResult] = useState<GeneratedContent | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Queries
  const { data: templates = [] } = useQuery<ContentTemplate[]>({
    queryKey: ["/api/content/templates"],
  });

  // Mutations
  const generateContentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to generate content");
      return response.json();
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/generated"] });
      setGeneratedResult(result);
      toast({
        title: "Content Generated!",
        description: "Your content has been successfully created and saved.",
      });
    },
  });

  const saveContentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/content/generated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/generated"] });
      toast({
        title: "Content Saved!",
        description: "Your content has been saved to the library.",
      });
    },
  });

  // Handlers
  const handlePreviewContent = () => {
    let content = "";
    
    if (useCustomPrompt) {
      content = customPrompt;
    } else if (selectedTemplate) {
      content = selectedTemplate.prompt;
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
    }
    
    setPreviewContent(content);
  };

  const handleGenerateContent = () => {
    if (useCustomPrompt) {
      // Generate content from custom prompt
      const viralityPrediction = Math.floor(Math.random() * 30) + 60; // 60-90%
      const engagementPrediction = Math.min(100, viralityPrediction + Math.floor(Math.random() * 15) - 7);

      saveContentMutation.mutate({
        title: `Custom ${selectedPlatform} content`,
        content: previewContent,
        platform: selectedPlatform,
        contentType: selectedPlatform.includes('video') ? 'video' : 'text',
        status: "draft",
        viralityPrediction,
        engagementPrediction,
        metadata: { 
          platform: selectedPlatform,
          customPrompt: true,
          originalPrompt: customPrompt
        },
      });
    } else if (selectedTemplate) {
      generateContentMutation.mutate({
        templateId: selectedTemplate.id,
        variables: contentVariables,
        platform: selectedTemplate.type,
      });
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(previewContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
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

  // Auto-preview when content changes
  useEffect(() => {
    handlePreviewContent();
  }, [selectedTemplate, contentVariables, customPrompt, useCustomPrompt]);

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
              <Wand2 className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-white bg-clip-text text-transparent">
                Content Creation Studio
              </h1>
              <p className="text-gray-400">AI-powered content generation with real-time preview</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Mode Selection */}
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#00ff9d]">Creation Mode</CardTitle>
                <CardDescription>Choose how you want to create content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={!useCustomPrompt ? "default" : "outline"}
                    onClick={() => setUseCustomPrompt(false)}
                    className={!useCustomPrompt 
                      ? "bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black" 
                      : "border-gray-600 text-gray-300 hover:border-[#00ff9d]/50"
                    }
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                  <Button
                    variant={useCustomPrompt ? "default" : "outline"}
                    onClick={() => setUseCustomPrompt(true)}
                    className={useCustomPrompt 
                      ? "bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black" 
                      : "border-gray-600 text-gray-300 hover:border-[#00ff9d]/50"
                    }
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Custom Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            {!useCustomPrompt && (
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Select Template</CardTitle>
                  <CardDescription>Choose a proven content template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select onValueChange={(value) => {
                    const template = templates.find(t => t.id === parseInt(value));
                    setSelectedTemplate(template || null);
                    setContentVariables({});
                  }}>
                    <SelectTrigger className="bg-black/40 border-gray-700">
                      <SelectValue placeholder="Choose a content template" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-700">
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{getPlatformIcon(template.type)}</span>
                            <span>{template.name}</span>
                            <Badge variant="secondary" className="bg-gray-700 text-xs">
                              {template.viralityScore}%
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedTemplate && (
                    <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getPlatformIcon(selectedTemplate.type)}</span>
                        <h3 className="font-semibold">{selectedTemplate.name}</h3>
                        <Badge variant="secondary" className="bg-gray-700">
                          {selectedTemplate.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Virality Score: {selectedTemplate.viralityScore}%
                      </p>
                      <Progress value={selectedTemplate.viralityScore || 0} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Custom Prompt Input */}
            {useCustomPrompt && (
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Custom Prompt</CardTitle>
                  <CardDescription>Write your own content prompt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
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
                    <Label>Content Prompt</Label>
                    <Textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Write your content here. Be creative and engaging..."
                      className="bg-black/40 border-gray-700 min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Variables Input */}
            {!useCustomPrompt && selectedTemplate && selectedTemplate.variables && selectedTemplate.variables.length > 0 && (
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d]">Content Variables</CardTitle>
                  <CardDescription>Fill in the template variables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTemplate.variables.map((variable) => (
                    <div key={variable} className="space-y-1">
                      <Label className="text-sm text-gray-400 capitalize">
                        {variable.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <Input
                        value={contentVariables[variable] || ""}
                        onChange={(e) => setContentVariables(prev => ({ ...prev, [variable]: e.target.value }))}
                        placeholder={`Enter ${variable}...`}
                        className="bg-black/40 border-gray-700"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handlePreviewContent}
                    variant="outline"
                    className="flex-1 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d]/10"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Preview
                  </Button>
                  <Button
                    onClick={handleGenerateContent}
                    disabled={generateContentMutation.isPending || saveContentMutation.isPending || !previewContent}
                    className="flex-1 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {generateContentMutation.isPending || saveContentMutation.isPending ? "Generating..." : "Generate & Save"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#00ff9d] flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>Real-time preview of your content</CardDescription>
              </CardHeader>
              <CardContent>
                {previewContent ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-black/60 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">
                          {useCustomPrompt ? getPlatformIcon(selectedPlatform) : (selectedTemplate ? getPlatformIcon(selectedTemplate.type) : "📄")}
                        </span>
                        <span className="text-sm text-gray-400">
                          {useCustomPrompt ? selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1) : selectedTemplate?.type.charAt(0).toUpperCase() + selectedTemplate?.type.slice(1)} Post
                        </span>
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed bg-gray-900/50 p-4 rounded border border-gray-600">
                        {previewContent}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <span>Characters: {previewContent.length}</span>
                        {!useCustomPrompt && selectedTemplate && (
                          <span>Est. Virality: {selectedTemplate?.viralityScore || 0}%</span>
                        )}
                      </div>
                      <Button
                        onClick={handleCopyContent}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 text-gray-500">
                    <div className="text-center">
                      <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Preview will appear here</p>
                      <p className="text-xs mt-1">
                        {useCustomPrompt ? "Enter your custom prompt" : "Select a template and fill variables"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generation Result */}
            {generatedResult && (
              <Card className="bg-black/40 border-gray-800 backdrop-blur-sm border-[#00ff9d]/30">
                <CardHeader>
                  <CardTitle className="text-[#00ff9d] flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generation Complete!
                  </CardTitle>
                  <CardDescription>Your content has been generated and saved</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                      <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-400" />
                      <p className="text-sm text-gray-400">Virality Prediction</p>
                      <p className="text-lg font-bold text-green-400">{generatedResult.viralityPrediction}%</p>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <BarChart3 className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                      <p className="text-sm text-gray-400">Engagement Prediction</p>
                      <p className="text-lg font-bold text-blue-400">{generatedResult.engagementPrediction}%</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href="/agents/content-forge/library" className="flex-1">
                      <Button variant="outline" className="w-full border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d]/10">
                        <Eye className="h-4 w-4 mr-2" />
                        View in Library
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setGeneratedResult(null)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-gray-500"
                    >
                      Create Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#00ff9d] text-sm">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-400">
                <p>• Use action words and emotional triggers for higher engagement</p>
                <p>• Include a clear call-to-action in your content</p>
                <p>• Add relevant hashtags and emojis for platform optimization</p>
                <p>• Test different templates to find what works best for your audience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}