import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Settings, Key, Clock, Shield, Database, RotateCcw, Eye, EyeOff, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface LeadScoutApiConfig {
  linkedinApiKey: string;
  twitterApiKey: string;
  facebookApiKey: string;
  redditApiKey: string;
  scrapingApiKey: string;
  rateLimiting: boolean;
  requestLimits: {
    linkedin: number;
    twitter: number;
    facebook: number;
    reddit: number;
    scraping: number;
  };
  cacheSettings: {
    leadDataHours: number;
    behaviorDataHours: number;
    networkDataHours: number;
  };
}

export default function LeadScoutSettings() {
  const { toast } = useToast();
  const [showApiKeys, setShowApiKeys] = useState(false);
  
  const [apiConfig, setApiConfig] = useState<LeadScoutApiConfig>({
    linkedinApiKey: "••••••••••••••••",
    twitterApiKey: "••••••••••••••••",
    facebookApiKey: "••••••••••••••••",
    redditApiKey: "••••••••••••••••",
    scrapingApiKey: "••••••••••••••••",
    rateLimiting: true,
    requestLimits: {
      linkedin: 500,
      twitter: 1500,
      facebook: 200,
      reddit: 100,
      scraping: 1000
    },
    cacheSettings: {
      leadDataHours: 6,
      behaviorDataHours: 12,
      networkDataHours: 24
    }
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Lead Scout Agent configuration updated successfully.",
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
            <Link href="/agents/lead-scout">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Settings className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">SETTINGS</h1>
              <p className="text-sm text-gray-400">Lead Scout Agent Configuration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleResetToDefaults}
              variant="outline"
              className="border-blue-400/30 text-gray-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={handleSaveSettings}
              className="bg-blue-500 text-white hover:bg-blue-600"
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
            <TabsTrigger value="api" className="data-[state=active]:bg-blue-500/20">
              API Configuration
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-blue-500/20">
              Performance
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500/20">
              Security
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-blue-500/20">
              Data Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* API Keys */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Key className="w-5 h-5" />
                    Platform API Keys
                  </CardTitle>
                  <CardDescription>
                    Configure social platform API access
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
                      <Label htmlFor="linkedin-api">LinkedIn API</Label>
                      <Input
                        id="linkedin-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "ln_123456789abcdef" : apiConfig.linkedinApiKey}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter-api">Twitter API</Label>
                      <Input
                        id="twitter-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "tw_987654321fedcba" : apiConfig.twitterApiKey}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook-api">Facebook API</Label>
                      <Input
                        id="facebook-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "fb_abcdef123456789" : apiConfig.facebookApiKey}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reddit-api">Reddit API</Label>
                      <Input
                        id="reddit-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "rd_fedcba987654321" : apiConfig.redditApiKey}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="scraping-api">Scraping API</Label>
                      <Input
                        id="scraping-api"
                        type={showApiKeys ? "text" : "password"}
                        value={showApiKeys ? "sc_123abc456def789" : apiConfig.scrapingApiKey}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rate Limits */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
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
                        <span>LinkedIn</span>
                        <span>{apiConfig.requestLimits.linkedin}/hr</span>
                      </div>
                      <Slider
                        value={[apiConfig.requestLimits.linkedin]}
                        onValueChange={(value) => setApiConfig({
                          ...apiConfig,
                          requestLimits: {...apiConfig.requestLimits, linkedin: value[0]}
                        })}
                        max={1000}
                        step={25}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Twitter</span>
                        <span>{apiConfig.requestLimits.twitter}/hr</span>
                      </div>
                      <Slider
                        value={[apiConfig.requestLimits.twitter]}
                        onValueChange={(value) => setApiConfig({
                          ...apiConfig,
                          requestLimits: {...apiConfig.requestLimits, twitter: value[0]}
                        })}
                        max={2000}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Facebook</span>
                        <span>{apiConfig.requestLimits.facebook}/hr</span>
                      </div>
                      <Slider
                        value={[apiConfig.requestLimits.facebook]}
                        onValueChange={(value) => setApiConfig({
                          ...apiConfig,
                          requestLimits: {...apiConfig.requestLimits, facebook: value[0]}
                        })}
                        max={500}
                        step={10}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Reddit</span>
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cache Settings */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Database className="w-5 h-5" />
                    Cache Settings
                  </CardTitle>
                  <CardDescription>
                    Data caching durations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="lead-cache">Lead Data (hours)</Label>
                    <Select 
                      value={apiConfig.cacheSettings.leadDataHours.toString()}
                      onValueChange={(value) => setApiConfig({
                        ...apiConfig,
                        cacheSettings: {...apiConfig.cacheSettings, leadDataHours: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="behavior-cache">Behavior Data (hours)</Label>
                    <Select 
                      value={apiConfig.cacheSettings.behaviorDataHours.toString()}
                      onValueChange={(value) => setApiConfig({
                        ...apiConfig,
                        cacheSettings: {...apiConfig.cacheSettings, behaviorDataHours: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="12">12 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="network-cache">Network Data (hours)</Label>
                    <Select 
                      value={apiConfig.cacheSettings.networkDataHours.toString()}
                      onValueChange={(value) => setApiConfig({
                        ...apiConfig,
                        cacheSettings: {...apiConfig.cacheSettings, networkDataHours: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
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
                </CardContent>
              </Card>

              {/* Processing Options */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Brain className="w-5 h-5" />
                    AI Processing
                  </CardTitle>
                  <CardDescription>
                    Lead scoring and analysis settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Parallel Processing</span>
                        <p className="text-xs text-gray-400">Process multiple platforms simultaneously</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Real-time Scoring</span>
                        <p className="text-xs text-gray-400">Update lead scores continuously</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Predictive Analytics</span>
                        <p className="text-xs text-gray-400">Use ML for behavior prediction</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Network Analysis</span>
                        <p className="text-xs text-gray-400">Analyze influence networks</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Memory Usage */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Zap className="w-5 h-5" />
                    Memory Usage
                  </CardTitle>
                  <CardDescription>
                    Current system resource usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Lead Database</span>
                      <span>1.2 GB</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Behavior Models</span>
                      <span>680 MB</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network Cache</span>
                      <span>450 MB</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
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
                        <p className="text-xs text-gray-400">Encrypt all stored lead data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">PII Anonymization</span>
                        <p className="text-xs text-gray-400">Strip personal identifiers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Consent Verification</span>
                        <p className="text-xs text-gray-400">Verify opt-in consent</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">Platform Compliance</span>
                        <p className="text-xs text-gray-400">Follow platform ToS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Clock className="w-5 h-5" />
                    Data Retention
                  </CardTitle>
                  <CardDescription>
                    How long to keep different types of data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="lead-retention">Lead Profiles</Label>
                    <Select defaultValue="90">
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">6 months</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="behavior-retention">Behavioral Data</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="interaction-retention">Interaction Logs</Label>
                    <Select defaultValue="14">
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Export Options */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Database className="w-5 h-5" />
                    Data Export
                  </CardTitle>
                  <CardDescription>
                    Export and backup lead data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Export All Leads
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Export Hot Leads
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Export Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Export Network Data
                  </Button>
                </CardContent>
              </Card>

              {/* Import Options */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Zap className="w-5 h-5" />
                    Data Import
                  </CardTitle>
                  <CardDescription>
                    Import external lead databases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Import CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Import CRM Data
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400/30 text-gray-400 hover:text-white"
                  >
                    Import Contact Lists
                  </Button>
                  <div className="text-xs text-gray-400 mt-2">
                    Supported formats: CSV, JSON, Excel
                  </div>
                </CardContent>
              </Card>

              {/* Database Stats */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Shield className="w-5 h-5" />
                    Database Statistics
                  </CardTitle>
                  <CardDescription>
                    Current database metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Leads</span>
                      <span className="text-sm font-mono text-blue-400">12,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hot Leads</span>
                      <span className="text-sm font-mono text-green-400">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Warm Leads</span>
                      <span className="text-sm font-mono text-yellow-400">4,567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cold Leads</span>
                      <span className="text-sm font-mono text-gray-400">7,046</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Network Nodes</span>
                      <span className="text-sm font-mono text-purple-400">45,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Updated</span>
                      <span className="text-sm font-mono text-gray-400">2 min ago</span>
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