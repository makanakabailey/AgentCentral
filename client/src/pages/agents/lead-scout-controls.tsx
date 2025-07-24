import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, Target, Brain, Users, Network, Settings as SettingsIcon, Filter, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationSearch from "@/components/location-search";
import { useToast } from "@/hooks/use-toast";

interface LeadScoutConfig {
  // Data Ingestion
  platforms: string[];
  geographicalFocus: string;
  industryFocus: string[];
  engagementThreshold: number;
  dataRetentionDays: number;
  
  // Behavioral Analysis
  buyingStages: string[];
  psychologicalTriggers: string[];
  influenceMinFollowers: number;
  influenceMaxFollowers: number;
  engagementRateThreshold: number;
  
  // Lead Scoring
  keywordIntensityWeight: number;
  engagementVelocityWeight: number;
  socialProofWeight: number;
  influenceWeight: number;
  
  // Scoring Thresholds
  coldThreshold: number;
  warmThreshold: number;
  hotThreshold: number;
  
  // Advanced Settings
  autoOptimization: boolean;
  realTimeAlerts: boolean;
  complianceMode: boolean;
  biasAuditEnabled: boolean;
}

export default function LeadScoutControls() {
  const { toast } = useToast();
  
  const [config, setConfig] = useState<LeadScoutConfig>({
    platforms: ["LinkedIn", "Twitter"],
    geographicalFocus: "North America",
    industryFocus: ["Technology", "SaaS"],
    engagementThreshold: 5,
    dataRetentionDays: 30,
    buyingStages: ["Problem-Aware", "Solution Explorer", "Decision Maker"],
    psychologicalTriggers: ["Status", "Security", "Competence"],
    influenceMinFollowers: 1000,
    influenceMaxFollowers: 10000,
    engagementRateThreshold: 5,
    keywordIntensityWeight: 40,
    engagementVelocityWeight: 30,
    socialProofWeight: 20,
    influenceWeight: 10,
    coldThreshold: 3.9,
    warmThreshold: 6.9,
    hotThreshold: 7.0,
    autoOptimization: true,
    realTimeAlerts: true,
    complianceMode: true,
    biasAuditEnabled: true
  });

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Lead Scout Agent parameters updated successfully.",
    });
  };

  const handleOptimizeParameters = () => {
    toast({
      title: "AI Optimization Started",
      description: "Analyzing historical data to optimize lead scoring parameters.",
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
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">LEAD SCOUT CONTROLS</h1>
              <p className="text-sm text-gray-400">Precision Lead Extraction Configuration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleOptimizeParameters}
              variant="outline"
              className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Optimize
            </Button>
            
            <Button
              onClick={handleSaveConfig}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Save Config
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="ingestion" className="space-y-6">
          <TabsList className="bg-dark-secondary/50 border border-dark-accent/20">
            <TabsTrigger value="ingestion" className="data-[state=active]:bg-blue-500/20">
              Data Ingestion
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500/20">
              Behavioral Analysis
            </TabsTrigger>
            <TabsTrigger value="scoring" className="data-[state=active]:bg-blue-500/20">
              Lead Scoring
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-blue-500/20">
              Advanced Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ingestion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Configuration */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Network className="w-5 h-5" />
                    Platform Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure data sources and collection parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="platforms">Active Platforms</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["LinkedIn", "Twitter", "Facebook", "Instagram", "TikTok", "Reddit"].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Switch
                            checked={config.platforms.includes(platform)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConfig({
                                  ...config,
                                  platforms: [...config.platforms, platform]
                                });
                              } else {
                                setConfig({
                                  ...config,
                                  platforms: config.platforms.filter(p => p !== platform)
                                });
                              }
                            }}
                          />
                          <span className="text-sm">{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="geo">Geographical Focus</Label>
                    <LocationSearch
                      value={config.geographicalFocus}
                      onChange={(location) => setConfig({...config, geographicalFocus: location})}
                      placeholder="Search for target regions..."
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="engagement">Engagement Threshold (%)</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Slider
                        value={[config.engagementThreshold]}
                        onValueChange={(value) => setConfig({...config, engagementThreshold: value[0]})}
                        max={20}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-400 w-12">{config.engagementThreshold}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Minimum engagement rate for micro-influencer identification
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Industry Focus */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Filter className="w-5 h-5" />
                    Industry Focus
                  </CardTitle>
                  <CardDescription>
                    Target specific industries and verticals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="industries">Target Industries</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {["Technology", "SaaS", "E-commerce", "Healthcare", "Finance", "Real Estate", "Marketing", "Education"].map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Switch
                            checked={config.industryFocus.includes(industry)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConfig({
                                  ...config,
                                  industryFocus: [...config.industryFocus, industry]
                                });
                              } else {
                                setConfig({
                                  ...config,
                                  industryFocus: config.industryFocus.filter(i => i !== industry)
                                });
                              }
                            }}
                          />
                          <span className="text-sm">{industry}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="retention">Data Retention (Days)</Label>
                    <Select 
                      value={config.dataRetentionDays.toString()}
                      onValueChange={(value) => setConfig({...config, dataRetentionDays: parseInt(value)})}
                    >
                      <SelectTrigger className="bg-dark-surface/50 border-blue-400/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Buying Stage Configuration */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <TrendingUp className="w-5 h-5" />
                    Buying Stage Detection
                  </CardTitle>
                  <CardDescription>
                    Configure 7-stage funnel mapping
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Target Buying Stages</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {[
                        "Unaware",
                        "Problem-Aware", 
                        "Solution Explorer",
                        "Shortlister",
                        "Decision Maker",
                        "Customer",
                        "Advocate"
                      ].map((stage) => (
                        <div key={stage} className="flex items-center space-x-2">
                          <Switch
                            checked={config.buyingStages.includes(stage)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConfig({
                                  ...config,
                                  buyingStages: [...config.buyingStages, stage]
                                });
                              } else {
                                setConfig({
                                  ...config,
                                  buyingStages: config.buyingStages.filter(s => s !== stage)
                                });
                              }
                            }}
                          />
                          <span className="text-sm">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Psychological Triggers */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Brain className="w-5 h-5" />
                    Psychological Triggers
                  </CardTitle>
                  <CardDescription>
                    9 core motivators identification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Active Trigger Detection</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {[
                        "Status",
                        "Security",
                        "Belonging",
                        "Curiosity",
                        "Idealism",
                        "Competence",
                        "Order",
                        "Independence",
                        "Vengeance"
                      ].map((trigger) => (
                        <div key={trigger} className="flex items-center space-x-2">
                          <Switch
                            checked={config.psychologicalTriggers.includes(trigger)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConfig({
                                  ...config,
                                  psychologicalTriggers: [...config.psychologicalTriggers, trigger]
                                });
                              } else {
                                setConfig({
                                  ...config,
                                  psychologicalTriggers: config.psychologicalTriggers.filter(t => t !== trigger)
                                });
                              }
                            }}
                          />
                          <span className="text-sm">{trigger}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Influence Network Settings */}
              <Card className="holographic border-blue-400/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Users className="w-5 h-5" />
                    Influence Network Mapping
                  </CardTitle>
                  <CardDescription>
                    Configure micro-influencer identification parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="minFollowers">Min Followers</Label>
                      <Input
                        id="minFollowers"
                        type="number"
                        value={config.influenceMinFollowers}
                        onChange={(e) => setConfig({...config, influenceMinFollowers: parseInt(e.target.value)})}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxFollowers">Max Followers</Label>
                      <Input
                        id="maxFollowers"
                        type="number"
                        value={config.influenceMaxFollowers}
                        onChange={(e) => setConfig({...config, influenceMaxFollowers: parseInt(e.target.value)})}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="engagementRate">Min Engagement Rate (%)</Label>
                      <Input
                        id="engagementRate"
                        type="number"
                        step="0.1"
                        value={config.engagementRateThreshold}
                        onChange={(e) => setConfig({...config, engagementRateThreshold: parseFloat(e.target.value)})}
                        className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scoring Formula Weights */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Zap className="w-5 h-5" />
                    Intent Scoring Formula
                  </CardTitle>
                  <CardDescription>
                    Configure weight distribution for lead scoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Keyword Intensity</span>
                      <span>{config.keywordIntensityWeight}%</span>
                    </div>
                    <Slider
                      value={[config.keywordIntensityWeight]}
                      onValueChange={(value) => setConfig({...config, keywordIntensityWeight: value[0]})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Engagement Velocity</span>
                      <span>{config.engagementVelocityWeight}%</span>
                    </div>
                    <Slider
                      value={[config.engagementVelocityWeight]}
                      onValueChange={(value) => setConfig({...config, engagementVelocityWeight: value[0]})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Social Proof Index</span>
                      <span>{config.socialProofWeight}%</span>
                    </div>
                    <Slider
                      value={[config.socialProofWeight]}
                      onValueChange={(value) => setConfig({...config, socialProofWeight: value[0]})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Influence Weight</span>
                      <span>{config.influenceWeight}%</span>
                    </div>
                    <Slider
                      value={[config.influenceWeight]}
                      onValueChange={(value) => setConfig({...config, influenceWeight: value[0]})}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="pt-2 border-t border-dark-accent/20">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Weight</span>
                      <span className={`${
                        config.keywordIntensityWeight + config.engagementVelocityWeight + 
                        config.socialProofWeight + config.influenceWeight === 100 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {config.keywordIntensityWeight + config.engagementVelocityWeight + 
                         config.socialProofWeight + config.influenceWeight}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scoring Thresholds */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Target className="w-5 h-5" />
                    Scoring Thresholds
                  </CardTitle>
                  <CardDescription>
                    Define cold, warm, and hot lead boundaries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cold">🔴 Cold Threshold (0-{config.coldThreshold})</Label>
                    <Input
                      id="cold"
                      type="number"
                      step="0.1"
                      value={config.coldThreshold}
                      onChange={(e) => setConfig({...config, coldThreshold: parseFloat(e.target.value)})}
                      className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="warm">🟡 Warm Threshold ({config.coldThreshold + 0.1}-{config.warmThreshold})</Label>
                    <Input
                      id="warm"
                      type="number"
                      step="0.1"
                      value={config.warmThreshold}
                      onChange={(e) => setConfig({...config, warmThreshold: parseFloat(e.target.value)})}
                      className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="hot">🔥 Hot Threshold ({config.hotThreshold}-10.0)</Label>
                    <Input
                      id="hot"
                      type="number"
                      step="0.1"
                      value={config.hotThreshold}
                      onChange={(e) => setConfig({...config, hotThreshold: parseFloat(e.target.value)})}
                      className="bg-dark-surface/50 border-blue-400/30 text-gray-600"
                    />
                  </div>
                  
                  <div className="mt-4 p-3 bg-dark-surface/30 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Current Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs">Cold: 0-{config.coldThreshold}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs">Warm: {config.coldThreshold + 0.1}-{config.warmThreshold}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs">Hot: {config.hotThreshold}-10.0</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Optimization */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <Brain className="w-5 h-5" />
                    AI Optimization
                  </CardTitle>
                  <CardDescription>
                    Automated parameter tuning and optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Auto Optimization</span>
                      <p className="text-xs text-gray-400">Let AI optimize scoring parameters</p>
                    </div>
                    <Switch
                      checked={config.autoOptimization}
                      onCheckedChange={(checked) => setConfig({...config, autoOptimization: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Real-Time Alerts</span>
                      <p className="text-xs text-gray-400">Instant notifications for hot leads</p>
                    </div>
                    <Switch
                      checked={config.realTimeAlerts}
                      onCheckedChange={(checked) => setConfig({...config, realTimeAlerts: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Compliance & Ethics */}
              <Card className="holographic border-blue-400/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <SettingsIcon className="w-5 h-5" />
                    Compliance & Ethics
                  </CardTitle>
                  <CardDescription>
                    Ethical guardrails and compliance settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">GDPR Compliance Mode</span>
                      <p className="text-xs text-gray-400">Follow GDPR data retention rules</p>
                    </div>
                    <Switch
                      checked={config.complianceMode}
                      onCheckedChange={(checked) => setConfig({...config, complianceMode: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm">Bias Audit System</span>
                      <p className="text-xs text-gray-400">Regular fairness audits and checks</p>
                    </div>
                    <Switch
                      checked={config.biasAuditEnabled}
                      onCheckedChange={(checked) => setConfig({...config, biasAuditEnabled: checked})}
                    />
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