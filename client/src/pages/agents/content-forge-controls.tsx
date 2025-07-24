import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Play, Pause, Square, Sliders, Palette, FileText, Zap, Brain, Target, Activity, Clock, TrendingUp, Settings } from "lucide-react";
import { Link } from "wouter";

export default function ContentForgeControls() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Generation Controls
  const [batchSize, setBatchSize] = useState(5);
  const [priority, setPriority] = useState("medium");
  const [autoApprove, setAutoApprove] = useState(false);
  const [contentType, setContentType] = useState("blog-post");
  
  // Real-time Metrics
  const [metrics] = useState({
    generatedToday: 47,
    averageTime: "2.3s",
    qualityScore: 94,
    successRate: 98.2,
    activeJobs: 3,
    queuedJobs: 12
  });

  const handleStartGeneration = () => {
    setIsGenerating(true);
    toast({
      title: "Generation Started",
      description: "Content Forge is now creating high-quality content based on your parameters.",
    });
  };

  const handlePauseGeneration = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Generation Resumed" : "Generation Paused",
      description: isPaused ? "Content generation has been resumed." : "Content generation has been paused.",
    });
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    setIsPaused(false);
    toast({
      title: "Generation Stopped",
      description: "All content generation processes have been stopped.",
    });
  };

  const handleOptimizeContent = () => {
    toast({
      title: "Optimization Started",
      description: "AI is optimizing existing content for better engagement and SEO performance.",
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
              <Sliders className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">CONTENT FORGE CONTROLS</h1>
              <p className="text-sm text-gray-400">AI Content Generation Command Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {isGenerating ? "Generating" : "Idle"}
              </span>
            </div>
            
            <Link href="/agents/content-forge/settings">
              <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Control Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generation Controls */}
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Play className="w-5 h-5" />
                  Generation Controls
                </CardTitle>
                <CardDescription>Start, pause, and manage content generation processes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleStartGeneration}
                    disabled={isGenerating}
                    className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Generation
                  </Button>
                  
                  <Button
                    onClick={handlePauseGeneration}
                    disabled={!isGenerating}
                    className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30"
                  >
                    {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  
                  <Button
                    onClick={handleStopGeneration}
                    disabled={!isGenerating}
                    variant="destructive"
                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                  
                  <Button
                    onClick={handleOptimizeContent}
                    className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Optimize
                  </Button>
                </div>

                {isGenerating && (
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-400">Generation Progress</span>
                      <span className="text-xs text-gray-400">3 of 5 items completed</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generation Parameters */}
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Target className="w-5 h-5" />
                  Generation Parameters
                </CardTitle>
                <CardDescription>Configure content generation settings for this session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog-post">Blog Post</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="product-description">Product Description</SelectItem>
                        <SelectItem value="email-newsletter">Email Newsletter</SelectItem>
                        <SelectItem value="landing-page">Landing Page</SelectItem>
                        <SelectItem value="press-release">Press Release</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch-size">Batch Size: {batchSize}</Label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={batchSize}
                      onChange={(e) => setBatchSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer slider-orange"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1 item</span>
                      <span>10 items</span>
                      <span>20 items</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-approve">Auto-Approve</Label>
                    <Switch
                      id="auto-approve"
                      checked={autoApprove}
                      onCheckedChange={setAutoApprove}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Generation Queue */}
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Activity className="w-5 h-5" />
                  Generation Queue
                </CardTitle>
                <CardDescription>Monitor active and queued content generation tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Active Jobs */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Active Jobs ({metrics.activeJobs})</h4>
                    {[1, 2, 3].map((job) => (
                      <div key={job} className="flex items-center justify-between p-3 rounded-lg bg-dark-surface/30 border border-orange-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                          <div>
                            <p className="text-sm font-medium text-white">Blog Post: "AI Marketing Trends"</p>
                            <p className="text-xs text-gray-400">Progress: 78% • Est. 30s remaining</p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-orange-500/20 text-orange-400">
                          Generating
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Queued Jobs */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Queued Jobs ({metrics.queuedJobs})</h4>
                    {[1, 2].map((job) => (
                      <div key={job} className="flex items-center justify-between p-3 rounded-lg bg-dark-surface/20 border border-dark-accent/20">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <div>
                            <p className="text-sm font-medium text-white">Social Media: "Product Launch"</p>
                            <p className="text-xs text-gray-400">Position: #{job} in queue</p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          Queued
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel - Metrics & Quick Actions */}
          <div className="space-y-6">
            {/* Real-time Metrics */}
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <TrendingUp className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Real-time generation statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                    <div className="text-lg font-bold text-orange-400">{metrics.generatedToday}</div>
                    <div className="text-xs text-gray-400">Generated Today</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                    <div className="text-lg font-bold text-orange-400">{metrics.averageTime}</div>
                    <div className="text-xs text-gray-400">Avg. Time</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                    <div className="text-lg font-bold text-orange-400">{metrics.qualityScore}</div>
                    <div className="text-xs text-gray-400">Quality Score</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                    <div className="text-lg font-bold text-orange-400">{metrics.successRate}%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-orange-400">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Memory Usage</span>
                    <span className="text-orange-400">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Content
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Optimization
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Palette className="w-4 h-4 mr-2" />
                  Style Templates
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Generation
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="holographic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Activity className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">AI Models</span>
                  <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Content Database</span>
                  <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">API Services</span>
                  <Badge className="bg-green-500/20 text-green-400">Operational</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Generation Engine</span>
                  <Badge className="bg-orange-500/20 text-orange-400">Ready</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}