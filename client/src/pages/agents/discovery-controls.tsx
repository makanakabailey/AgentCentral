import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { 
  Search, ArrowLeft, Target, Users, TrendingUp, Database, Brain, Settings, 
  Play, Pause, RefreshCw, Sliders, AlertTriangle, CheckCircle, XCircle,
  BarChart3, Zap, Globe, DollarSign, Shield, Clock, Filter, Bell
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationSearch from "@/components/location-search";

export default function DiscoveryControls() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Mock data for Discovery Agent configuration
  const [config, setConfig] = useState({
    businessDomain: "vegan skincare",
    geographicalFocus: "North America",
    budgetThreshold: 10000,
    analysisDepth: "standard",
    autoOptimization: true,
    excludedTopics: ["animals testing", "synthetic chemicals"],
    excludedCompetitors: ["competitor1.com", "competitor2.com"],
    alertThresholds: {
      minViabilityScore: 70,
      maxVolatility: 30,
      minLifespan: 30
    }
  });

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast({
            title: "Analysis Complete",
            description: "New market opportunities and audience segments have been identified.",
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    toast({
      title: "Analysis Started",
      description: "Discovery Agent is analyzing market opportunities...",
    });
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Discovery Agent settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/discovery">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-dark-accent/20">
              <Sliders className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">AI CONTROLS</h1>
              <p className="text-sm text-gray-400">Discovery Agent Configuration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
              className="bg-dark-accent/10 hover:bg-dark-accent/20 text-dark-accent border border-dark-accent/30"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
            
            <Button
              onClick={handleSaveConfig}
              className="bg-dark-accent text-dark-primary hover:bg-dark-accent/90"
            >
              <Settings className="w-4 h-4 mr-2" />
              Save Config
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="holographic border-dark-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-dark-accent">
                <Brain className="w-5 h-5" />
                Analysis in Progress
              </CardTitle>
              <CardDescription>
                Processing market data and identifying opportunities...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Market Scanning</span>
                  <span>{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                    Trend Analysis
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                    Audience Profiling
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-dark-accent3 animate-pulse"></div>
                    Competitive Intelligence
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="bg-dark-secondary/50 border border-dark-accent/20">
            <TabsTrigger value="configuration" className="data-[state=active]:bg-dark-accent/20">
              Configuration
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-dark-accent/20">
              Analysis Settings
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-dark-accent/20">
              Alerts & Thresholds
            </TabsTrigger>
            <TabsTrigger value="exclusions" className="data-[state=active]:bg-dark-accent/20">
              Exclusions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Domain */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Target className="w-5 h-5" />
                    Business Domain
                  </CardTitle>
                  <CardDescription>
                    Define your core business focus area
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="domain">Primary Domain</Label>
                    <Input
                      id="domain"
                      value={config.businessDomain}
                      onChange={(e) => setConfig({...config, businessDomain: e.target.value})}
                      placeholder="e.g., vegan skincare, sustainable fashion"
                      className="bg-dark-surface/50 border-dark-accent/30 text-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="geo">Geographical Focus</Label>
                    <LocationSearch
                      value={config.geographicalFocus}
                      onChange={(location) => setConfig({...config, geographicalFocus: location})}
                      placeholder="Search for countries, regions, or cities..."
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Search and select target markets using Google Maps integration
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Threshold ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={config.budgetThreshold}
                      onChange={(e) => setConfig({...config, budgetThreshold: parseInt(e.target.value)})}
                      placeholder="10000"
                      className="bg-dark-surface/50 border-dark-accent/30 text-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Configuration */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Brain className="w-5 h-5" />
                    Analysis Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure how deep the AI should analyze
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="depth">Analysis Depth</Label>
                    <Select value={config.analysisDepth} onValueChange={(value) => setConfig({...config, analysisDepth: value})}>
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic - Quick scan</SelectItem>
                        <SelectItem value="standard">Standard - Comprehensive</SelectItem>
                        <SelectItem value="deep">Deep - Maximum insights</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-opt">Auto Optimization</Label>
                      <p className="text-xs text-gray-400">Let AI optimize parameters automatically</p>
                    </div>
                    <Switch
                      id="auto-opt"
                      checked={config.autoOptimization}
                      onCheckedChange={(checked) => setConfig({...config, autoOptimization: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Data Sources */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Database className="w-5 h-5" />
                    Data Sources
                  </CardTitle>
                  <CardDescription>
                    Configure data collection preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Google Trends</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social Media</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reddit Analytics</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Competitor Intel</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scoring Weights */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <BarChart3 className="w-5 h-5" />
                    NVS Weights
                  </CardTitle>
                  <CardDescription>
                    Adjust Niche Viability Score factors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Search Momentum</span>
                        <span>15%</span>
                      </div>
                      <Slider defaultValue={[15]} max={30} step={1} className="w-full" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Content Gap</span>
                        <span>18%</span>
                      </div>
                      <Slider defaultValue={[18]} max={30} step={1} className="w-full" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Competition</span>
                        <span>13%</span>
                      </div>
                      <Slider defaultValue={[13]} max={25} step={1} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Models */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <TrendingUp className="w-5 h-5" />
                    Predictive Models
                  </CardTitle>
                  <CardDescription>
                    Configure forecasting parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Forecast Horizon</Label>
                      <Select defaultValue="90">
                        <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Model Sensitivity</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Threshold Settings */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <AlertTriangle className="w-5 h-5" />
                    Alert Thresholds
                  </CardTitle>
                  <CardDescription>
                    Set limits for automated alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="min-nvs">Minimum Viability Score</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Slider
                        value={[config.alertThresholds.minViabilityScore]}
                        onValueChange={(value) => setConfig({
                          ...config,
                          alertThresholds: {...config.alertThresholds, minViabilityScore: value[0]}
                        })}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{config.alertThresholds.minViabilityScore}%</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="max-vol">Maximum Volatility</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Slider
                        value={[config.alertThresholds.maxVolatility]}
                        onValueChange={(value) => setConfig({
                          ...config,
                          alertThresholds: {...config.alertThresholds, maxVolatility: value[0]}
                        })}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{config.alertThresholds.maxVolatility}%</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="min-life">Minimum Lifespan (days)</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Slider
                        value={[config.alertThresholds.minLifespan]}
                        onValueChange={(value) => setConfig({
                          ...config,
                          alertThresholds: {...config.alertThresholds, minLifespan: value[0]}
                        })}
                        max={365}
                        step={7}
                        className="flex-1"
                      />
                      <span className="text-sm w-12">{config.alertThresholds.minLifespan}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure alert preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">High Opportunity Alerts</span>
                        <p className="text-xs text-gray-400">New niches above threshold</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Risk Warnings</span>
                        <p className="text-xs text-gray-400">Volatility & regulatory alerts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Weekly Summaries</span>
                        <p className="text-xs text-gray-400">Performance reports</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exclusions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Excluded Topics */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <XCircle className="w-5 h-5" />
                    Excluded Topics
                  </CardTitle>
                  <CardDescription>
                    Topics to avoid in analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={config.excludedTopics.join(', ')}
                    onChange={(e) => setConfig({
                      ...config,
                      excludedTopics: e.target.value.split(', ').filter(t => t.trim())
                    })}
                    placeholder="animal testing, synthetic chemicals, controversial topics"
                    className="bg-dark-surface/50 border-dark-accent/30 min-h-24 text-gray-600"
                  />
               
                  <div className="flex flex-wrap gap-2">
                    {config.excludedTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="bg-red-500/20 text-red-300">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Excluded Competitors */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Shield className="w-5 h-5" />
                    Excluded Competitors
                  </CardTitle>
                  <CardDescription>
                    Competitors to exclude from monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={config.excludedCompetitors.join(', ')}
                    onChange={(e) => setConfig({
                      ...config,
                      excludedCompetitors: e.target.value.split(', ').filter(c => c.trim())
                    })}
                    placeholder="competitor1.com, competitor2.com, brand-name"
                    className="bg-dark-surface/50 border-dark-accent/30 min-h-24"
                  />
                  <div className="flex flex-wrap gap-2">
                    {config.excludedCompetitors.map((competitor, index) => (
                      <Badge key={index} variant="secondary" className="bg-orange-500/20 text-orange-300">
                        {competitor}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}