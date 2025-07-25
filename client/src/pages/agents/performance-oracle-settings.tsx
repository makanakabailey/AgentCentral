import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Brain, ArrowLeft, Save, RotateCcw, Shield, Bell, Clock, Users, MessageSquare, Mail, Phone, Target, Globe, Database, Key, AlertTriangle, CheckCircle, Info, Zap, TrendingUp, Activity, BarChart3, Settings } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function PerformanceOracleSettings() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // General Settings
    agentName: "Performance Oracle Agent",
    timezone: "America/New_York",
    updateInterval: [5], // minutes
    dataRetention: [90], // days
    
    // Analytics Settings
    realTimeTracking: true,
    predictiveModeling: true,
    anomalyDetection: true,
    crossPlatformAnalysis: true,
    
    // Performance Thresholds
    engagementRateThreshold: [15], // percentage
    conversionRateThreshold: [5], // percentage
    responseTimeThreshold: [24], // hours
    roiThreshold: [200], // percentage
    
    // Alert Settings
    enableAlerts: true,
    alertChannels: {
      email: true,
      dashboard: true,
      push: false,
      webhook: false
    },
    alertFrequency: "immediate",
    
    // Optimization Settings
    autoOptimization: true,
    optimizationAggressiveness: [70], // percentage
    maxOptimizationsPerDay: [3],
    requireApproval: false,
    
    // Data Sources
    platforms: {
      linkedin: {
        enabled: true,
        apiKey: "",
        refreshRate: [30], // minutes
        metrics: ["engagement", "reach", "clicks", "conversions"]
      },
      email: {
        enabled: true,
        provider: "gmail",
        refreshRate: [15],
        metrics: ["opens", "clicks", "replies", "bounces"]
      },
      twitter: {
        enabled: true,
        apiKey: "",
        refreshRate: [20],
        metrics: ["impressions", "engagements", "clicks", "follows"]
      },
      phone: {
        enabled: false,
        provider: "twilio",
        refreshRate: [60],
        metrics: ["calls", "connects", "durations", "outcomes"]
      }
    },
    
    // AI Model Settings
    predictionModel: "advanced",
    confidenceThreshold: [85], // percentage
    learningRate: [0.01],
    trainingFrequency: "weekly",
    
    // Reporting
    reportGeneration: "automatic",
    reportFrequency: "weekly",
    reportRecipients: ["admin@company.com"],
    includeRecommendations: true,
    
    // Security & Privacy
    dataEncryption: true,
    anonymizeData: false,
    auditLogging: true,
    accessControl: "role-based",
    
    // Advanced Settings
    apiRateLimit: [1000], // requests per hour
    cacheDuration: [300], // seconds
    parallelProcessing: true,
    customMetrics: []
  });

  // Mock mutations for demo purposes
  const saveSettingsMutation = useMutation({
    mutationFn: async (newSettings: typeof settings) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Settings Saved",
        description: "Performance Oracle settings have been updated successfully.",
      });
    }
  });

  const resetSettingsMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Settings Reset",
        description: "All settings have been reset to default values.",
      });
      // Reset to default values
      window.location.reload();
    }
  });

  const testConnectionMutation = useMutation({
    mutationFn: async (platform: string) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, platform };
    },
    onSuccess: (data) => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${data.platform}`,
      });
    }
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => {
      const keys = key.split('.');
      const newSettings = { ...prev };
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i] as keyof typeof current];
      }
      
      current[keys[keys.length - 1] as keyof typeof current] = value;
      return newSettings;
    });
  };

  const handleSaveSettings = () => {
    saveSettingsMutation.mutate(settings);
  };

  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Singapore",
    "Australia/Sydney"
  ];

  const predictionModels = [
    { value: "basic", label: "Basic - Fast, simple predictions" },
    { value: "advanced", label: "Advanced - Deep learning models" },
    { value: "expert", label: "Expert - Custom neural networks" }
  ];

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
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">ORACLE SETTINGS</h1>
              <p className="text-sm text-gray-400">Performance Analytics Configuration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => resetSettingsMutation.mutate()}
              disabled={resetSettingsMutation.isPending}
              className="border-red-400/30 text-red-400 hover:bg-red-500/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={handleSaveSettings}
              disabled={saveSettingsMutation.isPending}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {saveSettingsMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-dark-surface/50 border-dark-accent/20 flex-wrap">
            <TabsTrigger value="general" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              General
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="thresholds" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Thresholds
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              AI Models
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  General Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input
                      id="agent-name"
                      value={settings.agentName}
                      onChange={(e) => updateSetting('agentName', e.target.value)}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        {timezones.map(tz => (
                          <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Update Interval: {settings.updateInterval[0]} minutes</Label>
                    <Slider
                      value={settings.updateInterval}
                      onValueChange={(value) => updateSetting('updateInterval', value)}
                      max={60}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Data Retention: {settings.dataRetention[0]} days</Label>
                    <Slider
                      value={settings.dataRetention}
                      onValueChange={(value) => updateSetting('dataRetention', value)}
                      max={365}
                      min={30}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Settings */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Analytics Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label>Real-time Tracking</Label>
                    <Switch
                      checked={settings.realTimeTracking}
                      onCheckedChange={(checked) => updateSetting('realTimeTracking', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Predictive Modeling</Label>
                    <Switch
                      checked={settings.predictiveModeling}
                      onCheckedChange={(checked) => updateSetting('predictiveModeling', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Anomaly Detection</Label>
                    <Switch
                      checked={settings.anomalyDetection}
                      onCheckedChange={(checked) => updateSetting('anomalyDetection', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Cross-Platform Analysis</Label>
                    <Switch
                      checked={settings.crossPlatformAnalysis}
                      onCheckedChange={(checked) => updateSetting('crossPlatformAnalysis', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Thresholds */}
          <TabsContent value="thresholds" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Performance Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Engagement Rate Threshold: {settings.engagementRateThreshold[0]}%</Label>
                    <Slider
                      value={settings.engagementRateThreshold}
                      onValueChange={(value) => updateSetting('engagementRateThreshold', value)}
                      max={50}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Conversion Rate Threshold: {settings.conversionRateThreshold[0]}%</Label>
                    <Slider
                      value={settings.conversionRateThreshold}
                      onValueChange={(value) => updateSetting('conversionRateThreshold', value)}
                      max={20}
                      min={1}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Response Time Threshold: {settings.responseTimeThreshold[0]} hours</Label>
                    <Slider
                      value={settings.responseTimeThreshold}
                      onValueChange={(value) => updateSetting('responseTimeThreshold', value)}
                      max={72}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>ROI Threshold: {settings.roiThreshold[0]}%</Label>
                    <Slider
                      value={settings.roiThreshold}
                      onValueChange={(value) => updateSetting('roiThreshold', value)}
                      max={1000}
                      min={100}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sources/Platforms */}
          <TabsContent value="platforms" className="space-y-6">
            {Object.entries(settings.platforms).map(([platform, config]) => (
              <Card key={platform} className="holographic border-dark-accent/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {platform === 'linkedin' && <Users className="w-5 h-5 text-blue-400" />}
                      {platform === 'email' && <Mail className="w-5 h-5 text-green-400" />}
                      {platform === 'twitter' && <MessageSquare className="w-5 h-5 text-blue-400" />}
                      {platform === 'phone' && <Phone className="w-5 h-5 text-orange-400" />}
                      {platform.charAt(0).toUpperCase() + platform.slice(1)} Integration
                    </div>
                    <Switch
                      checked={config.enabled}
                      onCheckedChange={(checked) => updateSetting(`platforms.${platform}.enabled`, checked)}
                    />
                  </CardTitle>
                </CardHeader>
                {config.enabled && (
                  <CardContent className="space-y-4">
                    {(platform === 'linkedin' || platform === 'twitter') && (
                      <div>
                        <Label htmlFor={`${platform}-api-key`}>API Key</Label>
                        <Input
                          id={`${platform}-api-key`}
                          type="password"
                          value={(config as any).apiKey || ''}
                          onChange={(e) => updateSetting(`platforms.${platform}.apiKey`, e.target.value)}
                          placeholder="Enter API key..."
                          className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black"
                        />
                      </div>
                    )}
                    
                    {platform === 'email' && (
                      <div>
                        <Label htmlFor="email-provider">Email Provider</Label>
                        <Select value={(config as any).provider || 'gmail'} onValueChange={(value) => updateSetting(`platforms.${platform}.provider`, value)}>
                          <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-surface border-dark-accent/20">
                            <SelectItem value="gmail">Gmail</SelectItem>
                            <SelectItem value="outlook">Outlook</SelectItem>
                            <SelectItem value="custom">Custom SMTP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div>
                      <Label>Refresh Rate: {config.refreshRate[0]} minutes</Label>
                      <Slider
                        value={config.refreshRate}
                        onValueChange={(value) => updateSetting(`platforms.${platform}.refreshRate`, value)}
                        max={120}
                        min={5}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="border-purple-400/30 text-purple-400 hover:bg-purple-500/20"
                        onClick={() => testConnectionMutation.mutate(platform)}
                        disabled={testConnectionMutation.isPending}
                      >
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* AI Models */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Model Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="prediction-model">Prediction Model</Label>
                    <Select value={settings.predictionModel} onValueChange={(value) => updateSetting('predictionModel', value)}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        {predictionModels.map(model => (
                          <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="training-frequency">Training Frequency</Label>
                    <Select value={settings.trainingFrequency} onValueChange={(value) => updateSetting('trainingFrequency', value)}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Confidence Threshold: {settings.confidenceThreshold[0]}%</Label>
                    <Slider
                      value={settings.confidenceThreshold}
                      onValueChange={(value) => updateSetting('confidenceThreshold', value)}
                      max={99}
                      min={50}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Learning Rate: {settings.learningRate[0]}</Label>
                    <Slider
                      value={settings.learningRate}
                      onValueChange={(value) => updateSetting('learningRate', value)}
                      max={0.1}
                      min={0.001}
                      step={0.001}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-400" />
                  Alert Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label>Enable Alerts</Label>
                  <Switch
                    checked={settings.enableAlerts}
                    onCheckedChange={(checked) => updateSetting('enableAlerts', checked)}
                  />
                </div>
                
                {settings.enableAlerts && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(settings.alertChannels).map(([channel, enabled]) => (
                        <div key={channel} className="flex items-center justify-between">
                          <Label>{channel.charAt(0).toUpperCase() + channel.slice(1)}</Label>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(checked) => updateSetting(`alertChannels.${channel}`, checked)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <Label htmlFor="alert-frequency">Alert Frequency</Label>
                      <Select value={settings.alertFrequency} onValueChange={(value) => updateSetting('alertFrequency', value)}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label>Data Encryption</Label>
                    <Switch
                      checked={settings.dataEncryption}
                      onCheckedChange={(checked) => updateSetting('dataEncryption', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Audit Logging</Label>
                    <Switch
                      checked={settings.auditLogging}
                      onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Anonymize Data</Label>
                    <Switch
                      checked={settings.anonymizeData}
                      onCheckedChange={(checked) => updateSetting('anonymizeData', checked)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>API Rate Limit: {settings.apiRateLimit[0]} requests/hour</Label>
                  <Slider
                    value={settings.apiRateLimit}
                    onValueChange={(value) => updateSetting('apiRateLimit', value)}
                    max={10000}
                    min={100}
                    step={100}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}