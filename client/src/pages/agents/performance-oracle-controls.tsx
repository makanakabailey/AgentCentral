import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Brain, ArrowLeft, Play, Pause, RotateCcw, Settings, TrendingUp, BarChart3, Zap, Target, Eye, Download, Upload, Filter, Search, AlertTriangle, CheckCircle, Clock, RefreshCw, Activity, Database, Users, MessageSquare, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const analyticsModules = [
  {
    id: 1,
    name: "Campaign Performance Monitor",
    description: "Real-time tracking of campaign metrics across all platforms",
    status: "active",
    lastUpdate: "2 minutes ago",
    metrics: { accuracy: 98.5, processedData: 45230, alerts: 3 },
    icon: TrendingUp,
    color: "text-green-400"
  },
  {
    id: 2,
    name: "Audience Behavior Predictor",
    description: "AI-powered audience engagement prediction and optimization",
    status: "active",
    lastUpdate: "5 minutes ago",
    metrics: { accuracy: 94.2, processedData: 23840, alerts: 1 },
    icon: Users,
    color: "text-blue-400"
  },
  {
    id: 3,
    name: "Content Quality Analyzer",
    description: "Automated content scoring and improvement recommendations",
    status: "paused",
    lastUpdate: "12 minutes ago",
    metrics: { accuracy: 91.7, processedData: 18920, alerts: 0 },
    icon: MessageSquare,
    color: "text-yellow-400"
  },
  {
    id: 4,
    name: "ROI Optimization Engine",
    description: "Budget allocation and return on investment maximization",
    status: "active",
    lastUpdate: "1 minute ago",
    metrics: { accuracy: 96.8, processedData: 67450, alerts: 2 },
    icon: Target,
    color: "text-purple-400"
  },
  {
    id: 5,
    name: "Cross-Platform Analytics",
    description: "Unified analytics across LinkedIn, email, Twitter, and phone",
    status: "configuring",
    lastUpdate: "8 minutes ago",
    metrics: { accuracy: 89.3, processedData: 34560, alerts: 5 },
    icon: Activity,
    color: "text-orange-400"
  }
];

const activeAlerts = [
  {
    id: 1,
    type: "warning",
    module: "Campaign Performance Monitor",
    message: "LinkedIn engagement rate dropped 15% in last 2 hours",
    timestamp: "2 minutes ago",
    severity: "medium"
  },
  {
    id: 2,
    type: "success",
    module: "ROI Optimization Engine",
    message: "Budget reallocation increased conversion rate by 23%",
    timestamp: "5 minutes ago",
    severity: "low"
  },
  {
    id: 3,
    type: "error",
    module: "Cross-Platform Analytics",
    message: "Twitter API rate limit exceeded - reducing monitoring frequency",
    timestamp: "8 minutes ago",
    severity: "high"
  },
  {
    id: 4,
    type: "info",
    module: "Audience Behavior Predictor",
    message: "New behavioral pattern detected in tech executive segment",
    timestamp: "15 minutes ago",
    severity: "low"
  }
];

const optimizationTemplates = [
  {
    id: 1,
    name: "Daily Performance Boost",
    description: "Optimize campaigns for maximum daily performance",
    duration: "4 hours",
    targetMetrics: ["engagement", "conversion", "reach"],
    estimatedImprovement: "15-25%"
  },
  {
    id: 2,
    name: "Budget Efficiency Maximizer",
    description: "Reallocate budget across platforms for optimal ROI",
    duration: "2 hours",
    targetMetrics: ["roi", "cost-per-lead", "budget-allocation"],
    estimatedImprovement: "20-35%"
  },
  {
    id: 3,
    name: "Audience Targeting Refinement",
    description: "Fine-tune audience segments based on recent behavior",
    duration: "6 hours",
    targetMetrics: ["targeting-accuracy", "audience-quality", "response-rate"],
    estimatedImprovement: "10-20%"
  },
  {
    id: 4,
    name: "Content Strategy Optimization",
    description: "Analyze and optimize content performance across channels",
    duration: "8 hours",
    targetMetrics: ["content-quality", "engagement", "virality"],
    estimatedImprovement: "25-40%"
  }
];

export default function PerformanceOracleControls() {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Mock mutations for demo purposes
  const startOptimizationMutation = useMutation({
    mutationFn: async ({ templateId }: { templateId: number }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, templateId };
    },
    onSuccess: (data) => {
      setIsOptimizing(true);
      toast({
        title: "Optimization Started",
        description: `Performance Oracle is running optimization template ${data.templateId}`,
      });
      // Simulate optimization completion
      setTimeout(() => {
        setIsOptimizing(false);
        toast({
          title: "Optimization Complete",
          description: "Performance improvements have been applied to your campaigns",
        });
      }, 5000);
    }
  });

  const toggleModuleMutation = useMutation({
    mutationFn: async ({ moduleId, action }: { moduleId: number; action: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, moduleId, action };
    },
    onSuccess: (data) => {
      toast({
        title: `Module ${data.action === 'start' ? 'Started' : 'Paused'}`,
        description: `Analytics module ${data.moduleId} has been ${data.action === 'start' ? 'activated' : 'paused'}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/oracle/modules"] });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-400 border-green-400/30";
      case "paused": return "text-yellow-400 border-yellow-400/30";
      case "configuring": return "text-blue-400 border-blue-400/30";
      case "error": return "text-red-400 border-red-400/30";
      default: return "text-gray-400 border-gray-400/30";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  const filteredModules = analyticsModules.filter(module => {
    const matchesStatus = filterStatus === "all" || module.status === filterStatus;
    const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/performance-oracle">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">ORACLE CONTROLS</h1>
              <p className="text-sm text-gray-400">Advanced Analytics & Optimization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {isOptimizing ? "Optimizing" : "Monitoring"}
              </span>
            </div>
            
            <Link href="/agents/performance-oracle-settings">
              <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-500/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="bg-dark-surface/50 border-dark-accent/20 flex-wrap">
            <TabsTrigger value="modules" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Analytics Modules
            </TabsTrigger>
            <TabsTrigger value="optimization" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Optimization
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Alerts & Monitoring
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Reports & Analytics
            </TabsTrigger>
          </TabsList>

          {/* Analytics Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            {/* Controls */}
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  Module Control Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-dark-surface/50 border-dark-accent/30 text-black placeholder:text-gray-500"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30 text-black min-w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-dark-accent/20">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="configuring">Configuring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredModules.map((module) => (
                    <Card key={module.id} className="holographic border-dark-accent/10">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-dark-surface/50">
                            <module.icon className={`w-5 h-5 ${module.color}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-white truncate">{module.name}</h3>
                              <Badge variant="outline" className={getStatusColor(module.status)}>
                                {module.status}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                            
                            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                              <div className="text-center">
                                <div className="font-semibold text-white">{module.metrics.accuracy}%</div>
                                <div className="text-gray-400">Accuracy</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-white">{module.metrics.processedData.toLocaleString()}</div>
                                <div className="text-gray-400">Processed</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-yellow-400">{module.metrics.alerts}</div>
                                <div className="text-gray-400">Alerts</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Updated {module.lastUpdate}</span>
                              
                              <div className="flex gap-2">
                                {module.status === "active" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-500/20"
                                    onClick={() => toggleModuleMutation.mutate({ moduleId: module.id, action: "pause" })}
                                    disabled={toggleModuleMutation.isPending}
                                  >
                                    <Pause className="w-3 h-3" />
                                  </Button>
                                )}
                                
                                {module.status === "paused" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-green-400/30 text-green-400 hover:bg-green-500/20"
                                    onClick={() => toggleModuleMutation.mutate({ moduleId: module.id, action: "start" })}
                                    disabled={toggleModuleMutation.isPending}
                                  >
                                    <Play className="w-3 h-3" />
                                  </Button>
                                )}
                                
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-blue-400/30 text-blue-400 hover:bg-blue-500/20"
                                  onClick={() => setSelectedModule(module.id)}
                                >
                                  <Settings className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  AI-Powered Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isOptimizing && (
                  <Alert className="mb-6 border-purple-400/30 bg-purple-500/10">
                    <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                    <AlertDescription className="text-purple-400">
                      Optimization in progress... Performance Oracle is analyzing and improving your campaigns.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {optimizationTemplates.map((template) => (
                    <Card key={template.id} className="holographic border-dark-accent/10">
                      <CardContent className="p-4">
                        <div className="mb-4">
                          <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                          <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                            <span>Duration: {template.duration}</span>
                            <span>Improvement: {template.estimatedImprovement}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {template.targetMetrics.map((metric) => (
                              <Badge key={metric} variant="outline" className="text-purple-400 border-purple-400/30">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                          onClick={() => startOptimizationMutation.mutate({ templateId: template.id })}
                          disabled={startOptimizationMutation.isPending || isOptimizing}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {startOptimizationMutation.isPending ? "Starting..." : "Run Optimization"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-purple-400" />
                  Active Alerts & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <Card key={alert.id} className="holographic border-dark-accent/10">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {getAlertIcon(alert.type)}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">{alert.module}</span>
                              <Badge variant="outline" className={
                                alert.severity === "high" ? "text-red-400 border-red-400/30" :
                                alert.severity === "medium" ? "text-yellow-400 border-yellow-400/30" :
                                "text-blue-400 border-blue-400/30"
                              }>
                                {alert.severity}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-2">{alert.message}</p>
                            <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          </div>
                          
                          <Button size="sm" variant="outline" className="border-gray-400/30 text-gray-400 hover:bg-gray-500/20">
                            Dismiss
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Analytics Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Performance Report
                  </Button>
                  <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-500/20">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trend Analysis
                  </Button>
                  <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-500/20">
                    <Target className="w-4 h-4 mr-2" />
                    ROI Report
                  </Button>
                </div>
                
                <Alert className="border-blue-400/30 bg-blue-500/10">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <AlertDescription className="text-blue-400">
                    Advanced reporting features will be available after connecting your analytics platforms and running initial optimizations.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}