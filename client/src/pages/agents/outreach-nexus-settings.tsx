import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Settings, ArrowLeft, Save, RotateCcw, Shield, Bell, Clock, Users, MessageSquare, Mail, Phone, Target, Globe, Database, Key, AlertTriangle, CheckCircle, Info } from "lucide-react";
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

export default function OutreachNexusSettings() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // General Settings
    agentName: "Outreach Nexus Agent",
    timezone: "America/New_York",
    workingHours: {
      start: "09:00",
      end: "17:00",
      workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    
    // Campaign Settings
    dailyContactLimit: [100],
    responseTimeout: [48],
    maxFollowUps: [3],
    personalizationLevel: [80],
    
    // Platform Settings
    platforms: {
      linkedin: {
        enabled: true,
        dailyConnections: [25],
        messagingDelay: [30],
        autoAcceptConnections: false
      },
      email: {
        enabled: true,
        dailyEmails: [50],
        emailSignature: "Best regards,\n[Agent Name]",
        trackOpens: true,
        trackClicks: true
      },
      twitter: {
        enabled: true,
        dailyEngagements: [30],
        autoFollow: false,
        retweetProbability: [20]
      },
      phone: {
        enabled: false,
        callWindow: "10:00-16:00",
        maxCallsPerDay: [10],
        voicemailEnabled: true
      }
    },
    
    // AI & Personalization
    aiModel: "gpt-4",
    contextWindow: [4000],
    creativityLevel: [75],
    toneOfVoice: "professional",
    languagePreference: "en",
    
    // Notifications
    notifications: {
      campaignStart: true,
      responses: true,
      errors: true,
      dailyReports: true,
      weeklyAnalytics: false
    },
    
    // Security & Privacy
    dataRetention: [90],
    encryptMessages: true,
    logLevel: "info",
    ipWhitelist: "",
    
    // Integration Settings
    crmIntegration: {
      enabled: false,
      provider: "",
      syncFrequency: "realtime"
    },
    
    // Advanced Settings
    rateLimiting: {
      enabled: true,
      requestsPerMinute: [30],
      burstLimit: [100]
    },
    
    autoOptimization: true,
    abTestEnabled: true,
    backupFrequency: "daily"
  });

  const saveSettingsMutation = useMutation({
    mutationFn: async (settingsData: any) => {
      // Simulate settings save
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Settings Saved",
        description: "Outreach Nexus settings have been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive",
      });
    }
  });

  const resetSettingsMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Settings Reset",
        description: "All settings have been restored to defaults.",
      });
      // Reset to default values
      window.location.reload();
    }
  });

  const handleSaveSettings = () => {
    saveSettingsMutation.mutate(settings);
  };

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current: any = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setSettings(newSettings);
  };

  const workDays = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

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

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/outreach-nexus">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Settings className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">OUTREACH SETTINGS</h1>
              <p className="text-sm text-gray-400">Agent Configuration & Preferences</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => resetSettingsMutation.mutate()}
              disabled={resetSettingsMutation.isPending}
              className="border-red-400/30 text-red-400 hover:bg-red-500/20"
              data-testid="button-reset-settings"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              onClick={handleSaveSettings}
              disabled={saveSettingsMutation.isPending}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              data-testid="button-save-settings"
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
            <TabsTrigger value="general" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              General
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Platforms
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              AI & Personalization
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Security
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-400" />
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
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-agent-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-timezone">
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
                
                <div>
                  <Label>Working Hours</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="start-time" className="text-sm text-gray-400">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={settings.workingHours.start}
                        onChange={(e) => updateSetting('workingHours.start', e.target.value)}
                        className="mt-1 bg-dark-primary/50 border-dark-accent/20 text-white"
                        data-testid="input-start-time"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-sm text-gray-400">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={settings.workingHours.end}
                        onChange={(e) => updateSetting('workingHours.end', e.target.value)}
                        className="mt-1 bg-dark-primary/50 border-dark-accent/20 text-white"
                        data-testid="input-end-time"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label className="text-sm text-gray-400">Working Days</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workDays.map(day => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={day.value}
                            checked={settings.workingHours.workDays.includes(day.value)}
                            onChange={(e) => {
                              const workDays = settings.workingHours.workDays;
                              if (e.target.checked) {
                                updateSetting('workingHours.workDays', [...workDays, day.value]);
                              } else {
                                updateSetting('workingHours.workDays', workDays.filter(d => d !== day.value));
                              }
                            }}
                            className="rounded border-dark-accent/20"
                            data-testid={`checkbox-${day.value}`}
                          />
                          <Label htmlFor={day.value} className="text-sm text-white">{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  Campaign Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Daily Contact Limit: {settings.dailyContactLimit[0]}</Label>
                  <Slider
                    value={settings.dailyContactLimit}
                    onValueChange={(value) => updateSetting('dailyContactLimit', value)}
                    max={500}
                    min={10}
                    step={10}
                    className="mt-2"
                    data-testid="slider-daily-contact-limit"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Maximum number of new contacts to reach per day
                  </div>
                </div>
                
                <div>
                  <Label>Response Timeout: {settings.responseTimeout[0]} hours</Label>
                  <Slider
                    value={settings.responseTimeout}
                    onValueChange={(value) => updateSetting('responseTimeout', value)}
                    max={168}
                    min={12}
                    step={12}
                    className="mt-2"
                    data-testid="slider-response-timeout"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    How long to wait for a response before follow-up
                  </div>
                </div>
                
                <div>
                  <Label>Maximum Follow-ups: {settings.maxFollowUps[0]}</Label>
                  <Slider
                    value={settings.maxFollowUps}
                    onValueChange={(value) => updateSetting('maxFollowUps', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                    data-testid="slider-max-followups"
                  />
                </div>
                
                <div>
                  <Label>Personalization Level: {settings.personalizationLevel[0]}%</Label>
                  <Slider
                    value={settings.personalizationLevel}
                    onValueChange={(value) => updateSetting('personalizationLevel', value)}
                    max={100}
                    min={25}
                    step={5}
                    className="mt-2"
                    data-testid="slider-personalization-level"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            {/* LinkedIn Settings */}
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  💼 LinkedIn Settings
                  <Switch
                    checked={settings.platforms.linkedin.enabled}
                    onCheckedChange={(checked) => updateSetting('platforms.linkedin.enabled', checked)}
                    data-testid="switch-linkedin-enabled"
                  />
                </CardTitle>
              </CardHeader>
              {settings.platforms.linkedin.enabled && (
                <CardContent className="space-y-4">
                  <div>
                    <Label>Daily Connections: {settings.platforms.linkedin.dailyConnections[0]}</Label>
                    <Slider
                      value={settings.platforms.linkedin.dailyConnections}
                      onValueChange={(value) => updateSetting('platforms.linkedin.dailyConnections', value)}
                      max={100}
                      min={5}
                      step={5}
                      className="mt-2"
                      data-testid="slider-linkedin-connections"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Auto-accept connections</Label>
                    <Switch
                      checked={settings.platforms.linkedin.autoAcceptConnections}
                      onCheckedChange={(checked) => updateSetting('platforms.linkedin.autoAcceptConnections', checked)}
                      data-testid="switch-linkedin-auto-accept"
                    />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Email Settings */}
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-400" />
                  Email Settings
                  <Switch
                    checked={settings.platforms.email.enabled}
                    onCheckedChange={(checked) => updateSetting('platforms.email.enabled', checked)}
                    data-testid="switch-email-enabled"
                  />
                </CardTitle>
              </CardHeader>
              {settings.platforms.email.enabled && (
                <CardContent className="space-y-4">
                  <div>
                    <Label>Daily Emails: {settings.platforms.email.dailyEmails[0]}</Label>
                    <Slider
                      value={settings.platforms.email.dailyEmails}
                      onValueChange={(value) => updateSetting('platforms.email.dailyEmails', value)}
                      max={200}
                      min={10}
                      step={10}
                      className="mt-2"
                      data-testid="slider-email-daily"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email-signature">Email Signature</Label>
                    <Textarea
                      id="email-signature"
                      value={settings.platforms.email.emailSignature}
                      onChange={(e) => updateSetting('platforms.email.emailSignature', e.target.value)}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      rows={3}
                      data-testid="textarea-email-signature"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Track email opens</Label>
                    <Switch
                      checked={settings.platforms.email.trackOpens}
                      onCheckedChange={(checked) => updateSetting('platforms.email.trackOpens', checked)}
                      data-testid="switch-track-opens"
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  AI & Personalization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ai-model">AI Model</Label>
                    <Select value={settings.aiModel} onValueChange={(value) => updateSetting('aiModel', value)}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-ai-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tone-of-voice">Tone of Voice</Label>
                    <Select value={settings.toneOfVoice} onValueChange={(value) => updateSetting('toneOfVoice', value)}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Creativity Level: {settings.creativityLevel[0]}%</Label>
                  <Slider
                    value={settings.creativityLevel}
                    onValueChange={(value) => updateSetting('creativityLevel', value)}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
                    data-testid="slider-creativity"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Higher values produce more creative but less predictable messages
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-400" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.notifications).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Label>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => updateSetting(`notifications.${key}`, checked)}
                      data-testid={`switch-notification-${key}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Data Retention: {settings.dataRetention[0]} days</Label>
                  <Slider
                    value={settings.dataRetention}
                    onValueChange={(value) => updateSetting('dataRetention', value)}
                    max={365}
                    min={30}
                    step={30}
                    className="mt-2"
                    data-testid="slider-data-retention"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Encrypt messages</Label>
                  <Switch
                    checked={settings.encryptMessages}
                    onCheckedChange={(checked) => updateSetting('encryptMessages', checked)}
                    data-testid="switch-encrypt-messages"
                  />
                </div>
                
                <div>
                  <Label htmlFor="log-level">Log Level</Label>
                  <Select value={settings.logLevel} onValueChange={(value) => updateSetting('logLevel', value)}>
                    <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-log-level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-dark-accent/20">
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-orange-400" />
                  Advanced Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-yellow-400/20 bg-yellow-500/10">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <AlertDescription className="text-yellow-300">
                    These settings are for advanced users. Changing them may affect system performance.
                  </AlertDescription>
                </Alert>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Optimization</Label>
                    <div className="text-xs text-gray-400">Automatically optimize campaign performance</div>
                  </div>
                  <Switch
                    checked={settings.autoOptimization}
                    onCheckedChange={(checked) => updateSetting('autoOptimization', checked)}
                    data-testid="switch-auto-optimization"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>A/B Testing</Label>
                    <div className="text-xs text-gray-400">Enable split testing for messages</div>
                  </div>
                  <Switch
                    checked={settings.abTestEnabled}
                    onCheckedChange={(checked) => updateSetting('abTestEnabled', checked)}
                    data-testid="switch-ab-testing"
                  />
                </div>
                
                <div>
                  <Label>Rate Limiting: {settings.rateLimiting.requestsPerMinute[0]} requests/min</Label>
                  <Slider
                    value={settings.rateLimiting.requestsPerMinute}
                    onValueChange={(value) => updateSetting('rateLimiting.requestsPerMinute', value)}
                    max={100}
                    min={10}
                    step={5}
                    className="mt-2"
                    data-testid="slider-rate-limiting"
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