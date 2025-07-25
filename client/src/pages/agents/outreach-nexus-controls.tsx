import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Send, ArrowLeft, Play, Pause, RotateCcw, Settings, Target, MessageSquare, Users, Calendar, Zap, Filter, Search, Eye, Edit, Trash2, Copy, Download, Upload, TrendingUp, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const campaignTemplates = [
  {
    id: 1,
    name: "LinkedIn Connection + Follow-up",
    platform: "linkedin",
    steps: 3,
    conversion: 24.5,
    description: "Professional networking approach with value-first messaging"
  },
  {
    id: 2,
    name: "Cold Email Sequence",
    platform: "email",
    steps: 5,
    conversion: 18.2,
    description: "Multi-touch email campaign with personalized content"
  },
  {
    id: 3,
    name: "Twitter Engagement Campaign",
    platform: "twitter",
    steps: 4,
    conversion: 31.7,
    description: "Social media engagement leading to direct conversations"
  },
  {
    id: 4,
    name: "Multi-Platform Outreach",
    platform: "multi",
    steps: 7,
    conversion: 41.3,
    description: "Coordinated approach across LinkedIn, email, and social"
  }
];

const activeCampaigns = [
  {
    id: 1,
    name: "SaaS Decision Makers Q1",
    template: "LinkedIn Connection + Follow-up",
    status: "active",
    progress: 67,
    totalContacts: 850,
    contacted: 570,
    responded: 89,
    converted: 23,
    startDate: "2024-01-10",
    nextAction: "Follow-up sequence"
  },
  {
    id: 2,
    name: "Tech Startup Founders",
    template: "Multi-Platform Outreach",
    status: "paused",
    progress: 34,
    totalContacts: 425,
    contacted: 145,
    responded: 31,
    converted: 8,
    startDate: "2024-01-15",
    nextAction: "Resume campaign"
  },
  {
    id: 3,
    name: "Enterprise HR Directors",
    template: "Cold Email Sequence",
    status: "completed",
    progress: 100,
    totalContacts: 200,
    contacted: 200,
    responded: 42,
    converted: 15,
    startDate: "2023-12-20",
    nextAction: "Generate report"
  }
];

export default function OutreachNexusControls() {
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    template: "",
    targetAudience: "",
    contactList: "",
    startDate: "",
    dailyLimit: [50],
    personalizeLevel: [75]
  });

  const controlCampaignMutation = useMutation({
    mutationFn: async ({ campaignId, action }: { campaignId: number, action: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, action };
    },
    onSuccess: (data, variables) => {
      const actionLabels = {
        play: "started",
        pause: "paused",
        stop: "stopped",
        restart: "restarted"
      };
      toast({
        title: "Campaign Updated",
        description: `Campaign has been ${actionLabels[variables.action as keyof typeof actionLabels]}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/outreach/campaigns"] });
    }
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: any) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, campaignId: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: (data) => {
      toast({
        title: "Campaign Created",
        description: `New campaign created successfully. ID: ${data.campaignId}`,
      });
      setIsCreateDialogOpen(false);
      setNewCampaign({
        name: "",
        template: "",
        targetAudience: "",
        contactList: "",
        startDate: "",
        dailyLimit: [50],
        personalizeLevel: [75]
      });
    }
  });

  const filteredCampaigns = activeCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.template.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Play className="w-4 h-4 text-green-400" />;
      case "paused": return <Pause className="w-4 h-4 text-yellow-400" />;
      case "completed": return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-400/30";
      case "paused": return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "completed": return "bg-blue-500/20 text-blue-400 border-blue-400/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-400/30";
    }
  };

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
              <Send className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">OUTREACH CONTROLS</h1>
              <p className="text-sm text-gray-400">Campaign Management & Automation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30">
              {activeCampaigns.length} Campaigns
            </Badge>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-create-campaign">
                  <Target className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              
              <DialogContent className="bg-dark-surface border-dark-accent/20 text-white sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input
                      id="campaign-name"
                      placeholder="Enter campaign name..."
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-campaign-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="campaign-template">Template</Label>
                    <Select value={newCampaign.template} onValueChange={(value) => setNewCampaign({...newCampaign, template: value})}>
                      <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-campaign-template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        {campaignTemplates.map(template => (
                          <SelectItem key={template.id} value={template.name}>
                            {template.name} ({template.conversion}% conversion)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Textarea
                      id="target-audience"
                      placeholder="Describe your target audience..."
                      value={newCampaign.targetAudience}
                      onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      rows={3}
                      data-testid="textarea-target-audience"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-list">Contact List</Label>
                      <Select value={newCampaign.contactList} onValueChange={(value) => setNewCampaign({...newCampaign, contactList: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-contact-list">
                          <SelectValue placeholder="Select list" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          <SelectItem value="saas-executives">SaaS Executives (1,240 contacts)</SelectItem>
                          <SelectItem value="startup-founders">Startup Founders (856 contacts)</SelectItem>
                          <SelectItem value="hr-directors">HR Directors (423 contacts)</SelectItem>
                          <SelectItem value="tech-leads">Tech Leads (1,087 contacts)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newCampaign.startDate}
                        onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                        className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                        data-testid="input-start-date"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Daily Contact Limit: {newCampaign.dailyLimit[0]}</Label>
                    <Slider
                      value={newCampaign.dailyLimit}
                      onValueChange={(value) => setNewCampaign({...newCampaign, dailyLimit: value})}
                      max={200}
                      min={10}
                      step={10}
                      className="mt-2"
                      data-testid="slider-daily-limit"
                    />
                  </div>
                  
                  <div>
                    <Label>Personalization Level: {newCampaign.personalizeLevel[0]}%</Label>
                    <Slider
                      value={newCampaign.personalizeLevel}
                      onValueChange={(value) => setNewCampaign({...newCampaign, personalizeLevel: value})}
                      max={100}
                      min={25}
                      step={5}
                      className="mt-2"
                      data-testid="slider-personalization"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-dark-accent/20 text-gray-300"
                      onClick={() => setIsCreateDialogOpen(false)}
                      data-testid="button-cancel-create"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={() => createCampaignMutation.mutate(newCampaign)}
                      disabled={createCampaignMutation.isPending || !newCampaign.name || !newCampaign.template}
                      data-testid="button-confirm-create"
                    >
                      {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="bg-dark-surface/50 border-dark-accent/20">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Active Campaigns
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Templates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-dark-surface/50 border-dark-accent/20 text-white placeholder:text-gray-400"
                    data-testid="input-search-campaigns"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-dark-surface/50 border-dark-accent/20 text-white" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-accent/20">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campaign List */}
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="holographic border-dark-accent/10">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Campaign Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                          <Badge variant="outline" className={getStatusColor(campaign.status)}>
                            {getStatusIcon(campaign.status)}
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-400">
                          <p>Template: <span className="text-white">{campaign.template}</span></p>
                          <p>Started: <span className="text-white">{new Date(campaign.startDate).toLocaleDateString()}</span></p>
                          <p>Next: <span className="text-orange-400">{campaign.nextAction}</span></p>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} className="h-2" />
                        </div>
                      </div>
                      
                      {/* Campaign Metrics */}
                      <div>
                        <div className="space-y-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{campaign.contacted}</div>
                            <div className="text-xs text-gray-400">of {campaign.totalContacts} contacted</div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-400">{campaign.responded}</div>
                              <div className="text-xs text-gray-400">Responses</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-green-400">{campaign.converted}</div>
                              <div className="text-xs text-gray-400">Converted</div>
                            </div>
                          </div>
                          
                          <div className="text-center pt-2 border-t border-dark-accent/10">
                            <div className="text-sm text-orange-400 font-medium">
                              {((campaign.converted / campaign.contacted) * 100).toFixed(1)}% conversion
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Campaign Controls */}
                      <div className="flex flex-col gap-2">
                        {campaign.status === "active" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-500/20"
                            onClick={() => controlCampaignMutation.mutate({ campaignId: campaign.id, action: "pause" })}
                            disabled={controlCampaignMutation.isPending}
                            data-testid={`button-pause-${campaign.id}`}
                          >
                            <Pause className="w-3 h-3 mr-2" />
                            Pause
                          </Button>
                        )}
                        
                        {campaign.status === "paused" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-400/30 text-green-400 hover:bg-green-500/20"
                            onClick={() => controlCampaignMutation.mutate({ campaignId: campaign.id, action: "play" })}
                            disabled={controlCampaignMutation.isPending}
                            data-testid={`button-resume-${campaign.id}`}
                          >
                            <Play className="w-3 h-3 mr-2" />
                            Resume
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-dark-accent/20 hover:bg-dark-accent/20"
                          data-testid={`button-view-${campaign.id}`}
                        >
                          <Eye className="w-3 h-3 mr-2" />
                          View
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-dark-accent/20 hover:bg-dark-accent/20"
                          data-testid={`button-edit-${campaign.id}`}
                        >
                          <Edit className="w-3 h-3 mr-2" />
                          Edit
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-blue-400/30 text-blue-400 hover:bg-blue-500/20"
                          data-testid={`button-duplicate-${campaign.id}`}
                        >
                          <Copy className="w-3 h-3 mr-2" />
                          Clone
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaignTemplates.map((template) => (
                <Card key={template.id} className="holographic border-dark-accent/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        {template.conversion}% conversion
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        <span className="text-white">{template.steps}</span> steps • 
                        <span className="text-orange-400 ml-1">{template.platform}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-dark-accent/20" data-testid={`button-preview-template-${template.id}`}>
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-orange-400/30 text-orange-400" data-testid={`button-use-template-${template.id}`}>
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="holographic border-dark-accent/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-white">Overall Performance</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Contacted</span>
                      <span className="text-white font-medium">1,475</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Rate</span>
                      <span className="text-green-400 font-medium">28.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="text-orange-400 font-medium">3.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="holographic border-dark-accent/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Response Times</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Response</span>
                      <span className="text-white font-medium">2.3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fastest Response</span>
                      <span className="text-green-400 font-medium">4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best Day</span>
                      <span className="text-orange-400 font-medium">Tuesday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="holographic border-dark-accent/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Platform Performance</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">LinkedIn</span>
                      <span className="text-green-400 font-medium">24.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-blue-400 font-medium">18.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Twitter</span>
                      <span className="text-purple-400 font-medium">31.7%</span>
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