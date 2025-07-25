import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { 
  Target, 
  ArrowLeft, 
  Plus, 
  Users, 
  Link2, 
  Mail, 
  MessageSquare, 
  Phone, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook,
  Edit3, 
  Trash2, 
  Eye, 
  Settings, 
  Filter, 
  Search, 
  Download, 
  Upload, 
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  TrendingUp,
  Zap,
  Globe
} from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface ConnectedAccount {
  id: number;
  platform: string;
  accountName: string;
  accountId?: string;
  isActive: boolean;
  lastSync?: Date;
  permissions: string[];
  profileData?: {
    followers?: number;
    profilePicture?: string;
    verified?: boolean;
  };
}

interface AudienceSegment {
  id: number;
  name: string;
  description?: string;
  criteria: {
    demographics?: {
      ageRange?: [number, number];
      location?: string[];
      interests?: string[];
    };
    behavior?: {
      engagement?: string;
      activityLevel?: string;
    };
    platforms?: string[];
  };
  estimatedSize?: number;
  platforms: string[];
  tags: string[];
  isActive: boolean;
  lastUpdated: Date;
}

export default function OutreachNexusAudience() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("accounts");
  const [selectedSegment, setSelectedSegment] = useState<AudienceSegment | null>(null);
  const [isConnectingAccount, setIsConnectingAccount] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: "",
    description: "",
    platforms: [] as string[],
    tags: [] as string[],
    criteria: {}
  });

  // Mock data for connected accounts
  const [connectedAccounts] = useState<ConnectedAccount[]>([
    {
      id: 1,
      platform: "linkedin",
      accountName: "john.doe@company.com",
      accountId: "john-doe-123",
      isActive: true,
      lastSync: new Date(),
      permissions: ["read", "write", "message"],
      profileData: {
        followers: 2500,
        verified: true
      }
    },
    {
      id: 2,
      platform: "email",
      accountName: "outreach@company.com",
      isActive: true,
      lastSync: new Date(),
      permissions: ["send", "track"],
      profileData: {}
    },
    {
      id: 3,
      platform: "twitter",
      accountName: "@company_handle",
      accountId: "company_handle",
      isActive: false,
      permissions: ["read", "tweet", "dm"],
      profileData: {
        followers: 15000,
        verified: false
      }
    }
  ]);

  // Mock data for audience segments
  const [audienceSegments] = useState<AudienceSegment[]>([
    {
      id: 1,
      name: "Tech Startup Founders",
      description: "Founders of early-stage tech companies seeking investment",
      criteria: {
        demographics: {
          ageRange: [25, 45],
          location: ["San Francisco", "New York", "Austin"],
          interests: ["entrepreneurship", "technology", "venture capital"]
        },
        behavior: {
          engagement: "high",
          activityLevel: "daily"
        }
      },
      estimatedSize: 2500,
      platforms: ["linkedin", "email", "twitter"],
      tags: ["founders", "tech", "startups"],
      isActive: true,
      lastUpdated: new Date()
    },
    {
      id: 2,
      name: "Marketing Directors",
      description: "Senior marketing professionals in B2B companies",
      criteria: {
        demographics: {
          ageRange: [30, 55],
          interests: ["marketing", "lead generation", "analytics"]
        },
        behavior: {
          engagement: "medium",
          activityLevel: "weekly"
        }
      },
      estimatedSize: 8500,
      platforms: ["linkedin", "email"],
      tags: ["marketing", "b2b", "directors"],
      isActive: true,
      lastUpdated: new Date()
    }
  ]);

  const platformIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
    phone: Phone,
    instagram: Instagram,
    facebook: Facebook
  };

  const platformColors = {
    linkedin: "text-blue-400",
    twitter: "text-sky-400",
    email: "text-green-400",
    phone: "text-purple-400",
    instagram: "text-pink-400",
    facebook: "text-blue-500"
  };

  const handleConnectAccount = (platform: string) => {
    setIsConnectingAccount(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnectingAccount(false);
      toast({
        title: "Account Connected",
        description: `Successfully connected your ${platform} account for outreach campaigns.`,
      });
    }, 2000);
  };

  const handleCreateSegment = () => {
    if (!newSegment.name) return;
    
    toast({
      title: "Audience Segment Created",
      description: `"${newSegment.name}" segment created with targeting criteria.`,
    });
    
    setNewSegment({
      name: "",
      description: "",
      platforms: [],
      tags: [],
      criteria: {}
    });
  };

  const renderAccountCard = (account: ConnectedAccount) => {
    const PlatformIcon = platformIcons[account.platform as keyof typeof platformIcons];
    const colorClass = platformColors[account.platform as keyof typeof platformColors];

    return (
      <Card key={account.id} className="holographic group hover:scale-105 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-dark-surface/50 ${colorClass}`}>
                <PlatformIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">{account.accountName}</h3>
                <p className="text-xs text-gray-400 capitalize">{account.platform}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {account.isActive ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Connected
                </Badge>
              ) : (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  Disconnected
                </Badge>
              )}
            </div>
          </div>
          
          {account.profileData?.followers && (
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {account.profileData.followers.toLocaleString()} followers
              </span>
              {account.profileData.verified && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  Verified
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {account.permissions.map(permission => (
                <Badge key={permission} variant="outline" className="text-xs">
                  {permission}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Settings className="w-3 h-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className={`h-8 w-8 p-0 ${account.isActive ? 'text-red-400 hover:bg-red-500/20' : 'text-green-400 hover:bg-green-500/20'}`}
              >
                {account.isActive ? <Trash2 className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSegmentCard = (segment: AudienceSegment) => {
    return (
      <Card key={segment.id} className="holographic group hover:scale-105 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-dark-accent/20">
                <Target className="w-5 h-5 text-dark-accent" />
              </div>
              <div>
                <h3 className="font-medium text-white">{segment.name}</h3>
                <p className="text-xs text-gray-400">{segment.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={segment.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}>
                {segment.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <BarChart3 className="w-3 h-3" />
              <span>{segment.estimatedSize?.toLocaleString() || 'Unknown'} targets</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe className="w-3 h-3" />
              <span>{segment.platforms.length} platforms</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {segment.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {segment.platforms.map(platform => {
                const PlatformIcon = platformIcons[platform as keyof typeof platformIcons];
                const colorClass = platformColors[platform as keyof typeof platformColors];
                return PlatformIcon ? (
                  <div key={platform} className={`p-1 rounded ${colorClass}`}>
                    <PlatformIcon className="w-3 h-3" />
                  </div>
                ) : null;
              })}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Eye className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Edit3 className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
            <div className="p-3 rounded-lg bg-dark-accent/20">
              <Target className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">AUDIENCE TARGETING</h1>
              <p className="text-sm text-gray-400">Account Linking & Audience Segmentation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-dark-accent/30 text-dark-accent hover:bg-dark-accent/20">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-dark-accent/20 hover:bg-dark-accent/30 text-dark-accent border-dark-accent/30">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-secondary/50 border border-dark-accent/20">
            <TabsTrigger value="accounts" className="data-[state=active]:bg-dark-accent/20 data-[state=active]:text-dark-accent">
              <Link2 className="w-4 h-4 mr-2" />
              Connected Accounts
            </TabsTrigger>
            <TabsTrigger value="segments" className="data-[state=active]:bg-dark-accent/20 data-[state=active]:text-dark-accent">
              <Users className="w-4 h-4 mr-2" />
              Audience Segments
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-dark-accent/20 data-[state=active]:text-dark-accent">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Connected Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Connected Accounts</h2>
                <p className="text-gray-400">Link your social media and messaging accounts for outreach campaigns</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-dark-accent/20 hover:bg-dark-accent/30 text-dark-accent border-dark-accent/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Connect Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-secondary border border-dark-accent/20">
                  <DialogHeader>
                    <DialogTitle className="text-white">Connect New Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(platformIcons).map(([platform, Icon]) => (
                        <Button
                          key={platform}
                          variant="outline"
                          onClick={() => handleConnectAccount(platform)}
                          disabled={isConnectingAccount}
                          className="h-16 flex-col gap-2 border-dark-accent/30 hover:bg-dark-accent/20"
                        >
                          <Icon className={`w-6 h-6 ${platformColors[platform as keyof typeof platformColors]}`} />
                          <span className="capitalize">{platform}</span>
                        </Button>
                      ))}
                    </div>
                    {isConnectingAccount && (
                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          Redirecting to authentication... Please complete the OAuth flow.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedAccounts.map(renderAccountCard)}
            </div>
          </TabsContent>

          {/* Audience Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Audience Segments</h2>
                <p className="text-gray-400">Create and manage targeted audience groups for personalized outreach</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-dark-accent/20 hover:bg-dark-accent/30 text-dark-accent border-dark-accent/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Segment
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-secondary border border-dark-accent/20 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create Audience Segment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="segment-name" className="text-gray-300">Segment Name</Label>
                        <Input
                          id="segment-name"
                          value={newSegment.name}
                          onChange={(e) => setNewSegment({...newSegment, name: e.target.value})}
                          placeholder="e.g., Tech Executives"
                          className="bg-dark-surface/50 border-dark-accent/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="estimated-size" className="text-gray-300">Estimated Size</Label>
                        <Input
                          id="estimated-size"
                          placeholder="e.g., 2500"
                          className="bg-dark-surface/50 border-dark-accent/30 text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="text-gray-300">Description</Label>
                      <Textarea
                        id="description"
                        value={newSegment.description}
                        onChange={(e) => setNewSegment({...newSegment, description: e.target.value})}
                        placeholder="Describe your target audience..."
                        className="bg-dark-surface/50 border-dark-accent/30 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-gray-300">Target Platforms</Label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {Object.entries(platformIcons).map(([platform, Icon]) => (
                          <Button
                            key={platform}
                            variant="outline"
                            size="sm"
                            className={`h-12 flex-col gap-1 border-dark-accent/30 ${
                              newSegment.platforms.includes(platform) 
                                ? 'bg-dark-accent/20 text-dark-accent' 
                                : 'hover:bg-dark-accent/20'
                            }`}
                            onClick={() => {
                              const platforms = newSegment.platforms.includes(platform)
                                ? newSegment.platforms.filter(p => p !== platform)
                                : [...newSegment.platforms, platform];
                              setNewSegment({...newSegment, platforms});
                            }}
                          >
                            <Icon className={`w-4 h-4 ${platformColors[platform as keyof typeof platformColors]}`} />
                            <span className="text-xs capitalize">{platform}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" className="border-gray-600 text-gray-400">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateSegment}
                        className="bg-dark-accent/20 hover:bg-dark-accent/30 text-dark-accent border-dark-accent/30"
                      >
                        Create Segment
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audienceSegments.map(renderSegmentCard)}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Audience Analytics</h2>
              <p className="text-gray-400">Track performance and engagement across your audience segments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="holographic">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Reach</p>
                      <p className="text-2xl font-bold text-white">11,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="holographic">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Engagement Rate</p>
                      <p className="text-2xl font-bold text-white">78%</p>
                    </div>
                    <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="holographic">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Segments</p>
                      <p className="text-2xl font-bold text-white">12</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}