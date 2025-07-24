import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Search, ArrowLeft, Target, Users, TrendingUp, Database, Brain, Settings, 
  Play, Pause, RefreshCw, Sliders, AlertTriangle, CheckCircle, XCircle,
  BarChart3, Zap, Globe, DollarSign, Shield, Clock, Filter, Bell, User,
  Key, Lock, Eye, EyeOff, Download, Upload, RotateCcw
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

export default function DiscoverySettings() {
  const { toast } = useToast();
  const [showApiKeys, setShowApiKeys] = useState(false);

  // Mock API configuration data
  const [apiConfig, setApiConfig] = useState({
    googleTrendsApiKey: "••••••••••••••••",
    redditApiKey: "••••••••••••••••",
    twitterApiKey: "••••••••••••••••",
    scrapingBeeApiKey: "••••••••••••••••",
    requestLimits: {
      googleTrends: 100,
      reddit: 60,
      twitter: 300,
      scrapingBee: 1000
    },
    rateLimiting: true,
    cacheSettings: {
      trendDataHours: 6,
      competitorDataHours: 24,
      audienceDataHours: 12
    }
  });

  const [exportConfig, setExportConfig] = useState({
    format: "json",
    includeRawData: false,
    includePersonas: true,
    includeMetrics: true,
    autoExportFrequency: "weekly"
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Discovery Agent settings have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will be available shortly.",
    });
  };

  const handleImportConfig = () => {
    toast({
      title: "Import Complete",
      description: "Configuration has been imported successfully.",
    });
  };

  const handleResetToDefaults = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
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
              <Settings className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">SETTINGS</h1>
              <p className="text-sm text-gray-400">Discovery Agent Configuration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleResetToDefaults}
              variant="outline"
              className="border-dark-accent/30 text-gray-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={handleSaveSettings}
              className="bg-dark-accent text-dark-primary hover:bg-dark-accent/90"
            >
              <Settings className="w-4 h-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="bg-dark-secondary/50 border border-dark-accent/20">
            <TabsTrigger value="api" className="data-[state=active]:bg-dark-accent/20">
              API Configuration
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-dark-accent/20">
              Performance
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-dark-accent/20">
              Security
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-dark-accent/20">
              Data Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* API Keys */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Key className="w-5 h-5" />
                    API Keys
                  </CardTitle>
                  <CardDescription>
                    Configure external service API keys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Show API Keys</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKeys(!showApiKeys)}
                    >
                      {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="google-api">Google Trends API</Label>
                      <Input
                        id="google-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "gt_123456789abcdef" : apiConfig.googleTrendsApiKey}
                        className="bg-dark-surface/50 border-dark-accent/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reddit-api">Reddit API</Label>
                      <Input
                        id="reddit-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "rd_987654321fedcba" : apiConfig.redditApiKey}
                        className="bg-dark-surface/50 border-dark-accent/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter-api">Twitter API</Label>
                      <Input
                        id="twitter-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "tw_abcdef123456789" : apiConfig.twitterApiKey}
                        className="bg-dark-surface/50 border-dark-accent/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="scraping-api">ScrapingBee API</Label>
                      <Input
                        id="scraping-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "sb_fedcba987654321" : apiConfig.scrapingBeeApiKey}
                        className="bg-dark-surface/50 border-dark-accent/30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rate Limits */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Clock className="w-5 h-5" />
                    Rate Limits
                  </CardTitle>
                  <CardDescription>
                    Configure API request limits per hour
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Enable Rate Limiting</Label>
                    <Switch
                      checked={apiConfig.rateLimiting}
                      onCheckedChange={(checked) => setApiConfig({...apiConfig, rateLimiting: checked})}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Google Trends</span>
                        <span>{apiConfig.requestLimits.googleTrends}/hr</span>
                      </div>
                      <Slider
                        value={[apiConfig.requestLimits.googleTrends]}
                        onValueChange={(value) => setApiConfig({
                          ...apiConfig,
                          requestLimits: {...apiConfig.requestLimits, googleTrends: value[0]}
                        })}
                        max={1000}
                        step={10}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Reddit API</span>
                        <span>{apiConfig.requestLimits.reddit}/hr</span>
                      </div>
                      <Slider
                        value={[apiConfig.requestLimits.reddit]}
                        onValueChange={(value) => setApiConfig({
                          ...apiConfig,
                          requestLimits: {...apiConfig.requestLimits, reddit: value[0]}
                        })}
                        max={300}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Twitter API</span>
                        <span>{apiConfig.requestLimits.twitter}/hr</span>
                      </div>
                      <Slider
                        value={[apiConfig.requestLimits.twitter]}
                        onValueChange={(value) => setApiConfig({
                          ...apiConfig,
                          requestLimits: {...apiConfig.requestLimits, twitter: value[0]}
                        })}
                        max={1500}
                        step={25}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cache Settings */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Database className="w-5 h-5" />
                    Cache Settings
                  </CardTitle>
                  <CardDescription>
                    Data caching durations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="trend-cache">Trend Data (hours)</Label>
                    <Select 
                      value={apiConfig.cacheSettings.trendDataHours.toString()}
                      onValueChange={(value) => setApiConfig({
                        ...apiConfig,
                        cacheSettings: {...apiConfig.cacheSettings, trendDataHours: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="competitor-cache">Competitor Data (hours)</Label>
                    <Select 
                      value={apiConfig.cacheSettings.competitorDataHours.toString()}
                      onValueChange={(value) => setApiConfig({
                        ...apiConfig,
                        cacheSettings: {...apiConfig.cacheSettings, competitorDataHours: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                        <SelectItem value="72">72 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="audience-cache">Audience Data (hours)</Label>
                    <Select 
                      value={apiConfig.cacheSettings.audienceDataHours.toString()}
                      onValueChange={(value) => setApiConfig({
                        ...apiConfig,
                        cacheSettings: {...apiConfig.cacheSettings, audienceDataHours: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="18">18 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Options */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Brain className="w-5 h-5" />
                    Processing
                  </CardTitle>
                  <CardDescription>
                    AI processing configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Parallel Processing</span>
                        <p className="text-xs text-gray-400">Process multiple sources simultaneously</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Smart Batching</span>
                        <p className="text-xs text-gray-400">Group similar requests</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Auto-Retry Failed</span>
                        <p className="text-xs text-gray-400">Retry failed API calls</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Incremental Updates</span>
                        <p className="text-xs text-gray-400">Only process new/changed data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Memory Usage */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <BarChart3 className="w-5 h-5" />
                    Memory Usage
                  </CardTitle>
                  <CardDescription>
                    Current system resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Data Cache</span>
                        <span>2.1 GB</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Analysis Models</span>
                        <span>890 MB</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Temp Processing</span>
                        <span>340 MB</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-dark-accent/30 text-gray-400 hover:text-white"
                    >
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Privacy and security configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Data Encryption</span>
                        <p className="text-xs text-gray-400">Encrypt stored analysis data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Anonymous Data Collection</span>
                        <p className="text-xs text-gray-400">Strip all PII from collected data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">GDPR Compliance</span>
                        <p className="text-xs text-gray-400">Follow GDPR data retention rules</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Audit Logging</span>
                        <p className="text-xs text-gray-400">Log all system activities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Clock className="w-5 h-5" />
                    Data Retention
                  </CardTitle>
                  <CardDescription>
                    How long to keep different types of data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="analysis-retention">Analysis Results</Label>
                    <Select defaultValue="90">
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="forever">Indefinitely</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="raw-retention">Raw Data</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="log-retention">System Logs</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Export Settings */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Download className="w-5 h-5" />
                    Export Settings
                  </CardTitle>
                  <CardDescription>
                    Configure data export options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="export-format">Export Format</Label>
                    <Select 
                      value={exportConfig.format}
                      onValueChange={(value) => setExportConfig({...exportConfig, format: value})}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Include Raw Data</span>
                      <Switch
                        checked={exportConfig.includeRawData}
                        onCheckedChange={(checked) => setExportConfig({...exportConfig, includeRawData: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Include Personas</span>
                      <Switch
                        checked={exportConfig.includePersonas}
                        onCheckedChange={(checked) => setExportConfig({...exportConfig, includePersonas: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Include Metrics</span>
                      <Switch
                        checked={exportConfig.includeMetrics}
                        onCheckedChange={(checked) => setExportConfig({...exportConfig, includeMetrics: checked})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="auto-export">Auto Export Frequency</Label>
                    <Select 
                      value={exportConfig.autoExportFrequency}
                      onValueChange={(value) => setExportConfig({...exportConfig, autoExportFrequency: value})}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleExportData}
                    className="w-full bg-dark-accent/10 hover:bg-dark-accent/20 text-dark-accent border border-dark-accent/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Now
                  </Button>
                </CardContent>
              </Card>

              {/* Import/Backup */}
              <Card className="holographic border-dark-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-dark-accent">
                    <Upload className="w-5 h-5" />
                    Import & Backup
                  </CardTitle>
                  <CardDescription>
                    Import configurations and manage backups
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button 
                      onClick={handleImportConfig}
                      variant="outline"
                      className="w-full border-dark-accent/30 text-gray-400 hover:text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Configuration
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-dark-accent/30 text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Configuration
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-dark-accent/30 text-gray-400 hover:text-white"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Create Backup
                    </Button>
                  </div>

                  <div className="border-t border-dark-accent/20 pt-4">
                    <p className="text-sm text-gray-400 mb-3">Recent Backups:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>2024-01-24 15:30</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>2024-01-17 10:15</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>2024-01-10 08:45</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          Complete
                        </Badge>
                      </div>
                    </div>
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