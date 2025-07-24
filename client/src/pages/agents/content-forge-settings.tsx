import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Settings, Palette, FileText, Zap, Brain, Save, RotateCcw, Database, Sparkles, Target, Layers, Cpu } from "lucide-react";
import { Link } from "wouter";

export default function ContentForgeSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Content Generation Settings
  const [contentStyle, setContentStyle] = useState("professional");
  const [outputFormat, setOutputFormat] = useState("markdown");
  const [creativityLevel, setCreativityLevel] = useState(75);
  const [qualityThreshold, setQualityThreshold] = useState(85);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [brandConsistency, setBrandConsistency] = useState(true);

  // AI Model Configuration
  const [primaryModel, setPrimaryModel] = useState("gpt-4");
  const [fallbackModel, setFallbackModel] = useState("gpt-3.5-turbo");
  const [maxTokens, setMaxTokens] = useState(2048);
  const [temperature, setTemperature] = useState(0.7);

  // Content Templates
  const [templates, setTemplates] = useState([
    { id: 1, name: "Blog Post", category: "Educational", status: "active" },
    { id: 2, name: "Social Media", category: "Marketing", status: "active" },
    { id: 3, name: "Product Description", category: "E-commerce", status: "inactive" },
    { id: 4, name: "Email Newsletter", category: "Communication", status: "active" },
  ]);

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Settings Saved",
      description: "Content Forge configuration has been updated successfully.",
    });
    
    setIsLoading(false);
  };

  const handleResetSettings = () => {
    setContentStyle("professional");
    setOutputFormat("markdown");
    setCreativityLevel(75);
    setQualityThreshold(85);
    setAutoOptimize(true);
    setBrandConsistency(true);
    setPrimaryModel("gpt-4");
    setFallbackModel("gpt-3.5-turbo");
    setMaxTokens(2048);
    setTemperature(0.7);

    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/content-forge">
              <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Settings className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">CONTENT FORGE SETTINGS</h1>
              <p className="text-sm text-gray-400">AI Content Creation Configuration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleResetSettings}
              variant="outline"
              size="sm"
              className="border-dark-accent/30 text-gray-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="generation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-dark-secondary/50">
            <TabsTrigger value="generation" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              <Palette className="w-4 h-4 mr-2" />
              Generation
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              <Brain className="w-4 h-4 mr-2" />
              AI Models
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              <FileText className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="optimization" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              <Zap className="w-4 h-4 mr-2" />
              Optimization
            </TabsTrigger>
          </TabsList>

          {/* Content Generation Settings */}
          <TabsContent value="generation" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="holographic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Palette className="w-5 h-5" />
                    Content Style & Format
                  </CardTitle>
                  <CardDescription>Configure content generation preferences and output formatting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-style">Content Style</Label>
                    <Select value={contentStyle} onValueChange={setContentStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="output-format">Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select output format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="markdown">Markdown</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="plain">Plain Text</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Creativity Level: {creativityLevel}%</Label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={creativityLevel}
                        onChange={(e) => setCreativityLevel(parseInt(e.target.value))}
                        className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer slider-orange"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Conservative</span>
                        <span>Balanced</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="holographic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Target className="w-5 h-5" />
                    Quality & Brand Settings
                  </CardTitle>
                  <CardDescription>Configure quality thresholds and brand consistency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Quality Threshold: {qualityThreshold}%</Label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={qualityThreshold}
                        onChange={(e) => setQualityThreshold(parseInt(e.target.value))}
                        className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer slider-orange"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Basic</span>
                        <span>High</span>
                        <span>Premium</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-optimize">Auto-Optimization</Label>
                    <Switch
                      id="auto-optimize"
                      checked={autoOptimize}
                      onCheckedChange={setAutoOptimize}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="brand-consistency">Brand Consistency</Label>
                    <Switch
                      id="brand-consistency"
                      checked={brandConsistency}
                      onCheckedChange={setBrandConsistency}
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Brand Voice Analysis
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      AI analyzes your content to maintain consistent brand voice across all generated content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Models Configuration */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="holographic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Brain className="w-5 h-5" />
                    AI Model Selection
                  </CardTitle>
                  <CardDescription>Configure primary and fallback AI models for content generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-model">Primary Model</Label>
                    <Select value={primaryModel} onValueChange={setPrimaryModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Best Quality)</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Fast & Quality)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Cost Effective)</SelectItem>
                        <SelectItem value="claude-3">Claude 3 (Creative)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fallback-model">Fallback Model</Label>
                    <Select value={fallbackModel} onValueChange={setFallbackModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fallback model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="claude-instant">Claude Instant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
                    <Input
                      type="number"
                      min="500"
                      max="8000"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="bg-dark-surface border-dark-accent/30"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="holographic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Cpu className="w-5 h-5" />
                    Model Parameters
                  </CardTitle>
                  <CardDescription>Fine-tune AI model behavior and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Temperature: {temperature}</Label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer slider-orange"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Focused (0)</span>
                        <span>Balanced (0.5)</span>
                        <span>Creative (1)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20">
                    <h4 className="text-sm font-medium text-white mb-2">Model Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-orange-400">1.2s avg</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Quality Score</span>
                        <span className="text-orange-400">94/100</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Templates */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <FileText className="w-5 h-5" />
                  Content Templates
                </CardTitle>
                <CardDescription>Manage and configure content templates for different use cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 rounded-lg bg-dark-surface/30 border border-dark-accent/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/20">
                          <Layers className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{template.name}</h4>
                          <p className="text-xs text-gray-400">{template.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={template.status === "active" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30">
                    <FileText className="w-4 h-4 mr-2" />
                    Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimization Settings */}
          <TabsContent value="optimization" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="holographic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Zap className="w-5 h-5" />
                    Performance Optimization
                  </CardTitle>
                  <CardDescription>Configure automatic optimization and performance tuning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-seo">SEO Optimization</Label>
                      <Switch id="auto-seo" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="readability">Readability Analysis</Label>
                      <Switch id="readability" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="plagiarism">Plagiarism Check</Label>
                      <Switch id="plagiarism" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fact-check">Fact Verification</Label>
                      <Switch id="fact-check" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="holographic-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Database className="w-5 h-5" />
                    Content Database
                  </CardTitle>
                  <CardDescription>Manage content storage and retrieval settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Total Content Items</span>
                      <span className="text-white font-medium">2,847</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Storage Used</span>
                      <span className="text-white font-medium">1.2 GB</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Cache Hit Rate</span>
                      <span className="text-orange-400 font-medium">94.2%</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-dark-accent/30">
                    <Database className="w-4 h-4 mr-2" />
                    Optimize Database
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}