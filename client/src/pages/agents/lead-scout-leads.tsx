import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Users, Download, Filter, Search, Eye, MessageSquare, Linkedin, Twitter, Facebook, Mail, Phone, Star, TrendingUp, Brain, Network, Target, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company: string;
  title: string;
  location: string;
  industry: string;
  intentScore: number;
  temperature: 'cold' | 'warm' | 'hot';
  buyingStage: string;
  platforms: string[];
  lastActive: string;
  followers: number;
  engagementRate: number;
  psychologicalTriggers: string[];
  painPoints: string[];
  contentInterests: string[];
  influenceScore: number;
  connectionDegree: number;
  recentActivity: string;
  contactInfo: {
    email?: string;
    phone?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function LeadScoutLeads() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [temperatureFilter, setTemperatureFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  // Mock lead data based on the detailed specifications
  const leads: Lead[] = [
    {
      id: "1",
      name: "Sarah K. Wilson",
      email: "sarah.wilson@techcorp.com",
      avatar: "/api/placeholder/32/32",
      company: "TechCorp Solutions",
      title: "VP of Operations",
      location: "San Francisco, CA",
      industry: "Technology",
      intentScore: 8.2,
      temperature: "hot",
      buyingStage: "Decision Maker",
      platforms: ["LinkedIn", "Twitter"],
      lastActive: "2 hours ago",
      followers: 3200,
      engagementRate: 6.8,
      psychologicalTriggers: ["Competence", "Status", "Security"],
      painPoints: ["Time-consuming processes", "Manual workflows", "Team inefficiency"],
      contentInterests: ["Automation", "Productivity", "Team Management"],
      influenceScore: 7.5,
      connectionDegree: 2,
      recentActivity: "Commented on automation post",
      contactInfo: {
        email: "sarah.wilson@techcorp.com",
        linkedin: "linkedin.com/in/sarahkwilson",
        twitter: "@sarahkwilson"
      }
    },
    {
      id: "2",
      name: "Mark Thompson",
      email: "mark.t@growthco.io",
      company: "GrowthCo",
      title: "Director of Customer Success",
      location: "Austin, TX",
      industry: "SaaS",
      intentScore: 7.4,
      temperature: "hot",
      buyingStage: "Solution Explorer",
      platforms: ["LinkedIn", "Reddit"],
      lastActive: "4 hours ago",
      followers: 1850,
      engagementRate: 8.2,
      psychologicalTriggers: ["Security", "Belonging", "Competence"],
      painPoints: ["High customer churn", "Retention challenges", "Support bottlenecks"],
      contentInterests: ["Customer Success", "Retention Strategies", "Analytics"],
      influenceScore: 6.8,
      connectionDegree: 1,
      recentActivity: "Shared article about customer retention",
      contactInfo: {
        email: "mark.t@growthco.io",
        phone: "+1-512-555-0123",
        linkedin: "linkedin.com/in/markthompson"
      }
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      email: "e.rodriguez@innovatefast.com",
      company: "InnovateFast",
      title: "Product Manager",
      location: "New York, NY",
      industry: "E-commerce",
      intentScore: 6.1,
      temperature: "warm",
      buyingStage: "Problem-Aware",
      platforms: ["LinkedIn", "Twitter", "Instagram"],
      lastActive: "1 day ago",
      followers: 2100,
      engagementRate: 5.4,
      psychologicalTriggers: ["Curiosity", "Independence", "Order"],
      painPoints: ["Data fragmentation", "Poor analytics", "Team coordination"],
      contentInterests: ["Product Analytics", "User Experience", "Data Visualization"],
      influenceScore: 5.9,
      connectionDegree: 3,
      recentActivity: "Liked posts about product management",
      contactInfo: {
        email: "e.rodriguez@innovatefast.com",
        linkedin: "linkedin.com/in/elenarodriguez",
        twitter: "@elena_pm"
      }
    },
    {
      id: "4",
      name: "David Chen",
      email: "dchen@startupxyz.com",
      company: "StartupXYZ",
      title: "CTO",
      location: "Seattle, WA",
      industry: "Technology",
      intentScore: 5.8,
      temperature: "warm",
      buyingStage: "Shortlister",
      platforms: ["LinkedIn", "Twitter", "Reddit"],
      lastActive: "6 hours ago",
      followers: 4500,
      engagementRate: 7.1,
      psychologicalTriggers: ["Competence", "Independence", "Security"],
      painPoints: ["Scaling challenges", "Infrastructure costs", "Team management"],
      contentInterests: ["DevOps", "Cloud Architecture", "Team Leadership"],
      influenceScore: 8.2,
      connectionDegree: 2,
      recentActivity: "Discussed scaling solutions in tech forum",
      contactInfo: {
        email: "dchen@startupxyz.com",
        linkedin: "linkedin.com/in/davidchen",
        twitter: "@davidchen_cto"
      }
    },
    {
      id: "5",
      name: "Jessica Miller",
      email: "j.miller@marketpro.agency",
      company: "MarketPro Agency",
      title: "Marketing Director",
      location: "Chicago, IL",
      industry: "Marketing",
      intentScore: 3.2,
      temperature: "cold",
      buyingStage: "Unaware",
      platforms: ["LinkedIn", "Instagram"],
      lastActive: "3 days ago",
      followers: 1200,
      engagementRate: 4.1,
      psychologicalTriggers: ["Status", "Belonging", "Curiosity"],
      painPoints: ["Campaign tracking", "ROI measurement", "Client reporting"],
      contentInterests: ["Digital Marketing", "Analytics", "Creative Strategy"],
      influenceScore: 4.3,
      connectionDegree: 4,
      recentActivity: "Posted about marketing trends",
      contactInfo: {
        email: "j.miller@marketpro.agency",
        linkedin: "linkedin.com/in/jessicamiller"
      }
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTemperature = temperatureFilter === "all" || lead.temperature === temperatureFilter;
    const matchesIndustry = industryFilter === "all" || lead.industry === industryFilter;
    
    return matchesSearch && matchesTemperature && matchesIndustry;
  });

  const getTemperatureColor = (temp: string) => {
    switch (temp) {
      case 'hot': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'warm': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'cold': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTemperatureIcon = (temp: string) => {
    switch (temp) {
      case 'hot': return '🔥';
      case 'warm': return '🟡';
      case 'cold': return '🔴';
      default: return '⚪';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return <Linkedin className="w-3 h-3" />;
      case 'Twitter': return <Twitter className="w-3 h-3" />;
      case 'Facebook': return <Facebook className="w-3 h-3" />;
      default: return <Target className="w-3 h-3" />;
    }
  };

  const handleDownload = (format: string, leads?: string[]) => {
    const targetLeads = leads ? leads : selectedLeads.length > 0 ? selectedLeads : ['all'];
    toast({
      title: "Download Started",
      description: `Exporting ${targetLeads.length === 1 && targetLeads[0] === 'all' ? 'all' : targetLeads.length} leads as ${format.toUpperCase()}`,
    });
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === filteredLeads.length 
        ? [] 
        : filteredLeads.map(lead => lead.id)
    );
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
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">LEAD DATABASE</h1>
              <p className="text-sm text-gray-400">Precision Lead Intelligence & Insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              {filteredLeads.length} Leads
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-dark-secondary border-blue-400/30">
                <DropdownMenuItem onClick={() => handleDownload('csv')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('excel')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('json')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDownload('pdf', filteredLeads.filter(l => l.temperature === 'hot').map(l => l.id))}>
                  <Target className="w-4 h-4 mr-2" />
                  Hot Leads Report (PDF)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('csv', selectedLeads)}>
                  <Users className="w-4 h-4 mr-2" />
                  Selected Leads Only
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDownload('crm')}>
                  <Network className="w-4 h-4 mr-2" />
                  CRM Integration Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search leads by name, company, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dark-surface/50 border-blue-400/30 text-gray-600"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={temperatureFilter} onValueChange={setTemperatureFilter}>
              <SelectTrigger className="w-40 bg-dark-surface/50 border-blue-400/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Temperatures</SelectItem>
                <SelectItem value="hot">🔥 Hot Leads</SelectItem>
                <SelectItem value="warm">🟡 Warm Leads</SelectItem>
                <SelectItem value="cold">🔴 Cold Leads</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-40 bg-dark-surface/50 border-blue-400/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={handleSelectAll}
              className="border-blue-400/30 text-gray-400 hover:text-white"
            >
              {selectedLeads.length === filteredLeads.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </div>

        {/* Lead Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="holographic border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Hot Leads</p>
                  <p className="text-2xl font-bold text-red-400">{leads.filter(l => l.temperature === 'hot').length}</p>
                </div>
                <div className="text-2xl">🔥</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="holographic border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Warm Leads</p>
                  <p className="text-2xl font-bold text-yellow-400">{leads.filter(l => l.temperature === 'warm').length}</p>
                </div>
                <div className="text-2xl">🟡</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="holographic border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Cold Leads</p>
                  <p className="text-2xl font-bold text-blue-400">{leads.filter(l => l.temperature === 'cold').length}</p>
                </div>
                <div className="text-2xl">🔴</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="holographic border-blue-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Avg Intent Score</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {(leads.reduce((acc, lead) => acc + lead.intentScore, 0) / leads.length).toFixed(1)}
                  </p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="holographic border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-blue-400/30"
                    />
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback className="bg-blue-500/20 text-blue-300">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{lead.name}</h3>
                      <p className="text-sm text-gray-400">{lead.title}</p>
                      <p className="text-xs text-gray-500">{lead.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`${getTemperatureColor(lead.temperature)} border`}>
                      {getTemperatureIcon(lead.temperature)} {lead.temperature.toUpperCase()}
                    </Badge>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-400">{lead.intentScore}</div>
                      <div className="text-xs text-gray-400">Intent Score</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Location:</span>
                    <p className="text-white">{lead.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Industry:</span>
                    <p className="text-white">{lead.industry}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Buying Stage:</span>
                    <p className="text-white">{lead.buyingStage}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Active:</span>
                    <p className="text-white">{lead.lastActive}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{lead.followers.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{lead.engagementRate}%</div>
                    <div className="text-xs text-gray-400">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-400">{lead.influenceScore}</div>
                    <div className="text-xs text-gray-400">Influence</div>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <span className="text-xs text-gray-400 mb-2 block">Active Platforms:</span>
                  <div className="flex gap-2">
                    {lead.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="bg-dark-surface/50 text-gray-300 text-xs">
                        {getPlatformIcon(platform)}
                        <span className="ml-1">{platform}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Psychological Triggers */}
                <div>
                  <span className="text-xs text-gray-400 mb-2 block">Psychological Triggers:</span>
                  <div className="flex flex-wrap gap-1">
                    {lead.psychologicalTriggers.map((trigger) => (
                      <Badge key={trigger} className="bg-purple-500/20 text-purple-300 text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pain Points */}
                <div>
                  <span className="text-xs text-gray-400 mb-2 block">Pain Points:</span>
                  <div className="flex flex-wrap gap-1">
                    {lead.painPoints.slice(0, 2).map((pain) => (
                      <Badge key={pain} className="bg-red-500/20 text-red-300 text-xs">
                        {pain}
                      </Badge>
                    ))}
                    {lead.painPoints.length > 2 && (
                      <Badge className="bg-gray-500/20 text-gray-400 text-xs">
                        +{lead.painPoints.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-dark-surface/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-blue-400 font-medium">Recent Activity</span>
                  </div>
                  <p className="text-xs text-gray-300">{lead.recentActivity}</p>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-2 pt-2 border-t border-dark-accent/20">
                  {lead.contactInfo.email && (
                    <Button size="sm" variant="outline" className="flex-1 border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  )}
                  {lead.contactInfo.linkedin && (
                    <Button size="sm" variant="outline" className="flex-1 border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <Card className="holographic border-blue-400/30">
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No leads found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}