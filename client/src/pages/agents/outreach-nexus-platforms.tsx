import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { 
  Monitor, 
  ArrowLeft, 
  Send, 
  Eye, 
  Edit3, 
  Copy, 
  Mail, 
  MessageSquare, 
  Phone, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook,
  Smartphone,
  Clock,
  User,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Calendar,
  Settings,
  Play,
  Pause,
  Save
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface OutreachTemplate {
  id: number;
  platform: string;
  subject?: string;
  message: string;
  variables: Record<string, string>;
  previewData: {
    recipientName: string;
    companyName: string;
    position: string;
    profilePicture?: string;
  };
}

interface PlatformPreview {
  platform: string;
  isActive: boolean;
  messageCount: number;
  lastSent: Date;
  responseRate: number;
  templates: OutreachTemplate[];
}

export default function OutreachNexusPlatforms() {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState("linkedin");
  const [selectedTemplate, setSelectedTemplate] = useState<OutreachTemplate | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for platform previews
  const [platformPreviews] = useState<PlatformPreview[]>([
    {
      platform: "linkedin",
      isActive: true,
      messageCount: 45,
      lastSent: new Date(),
      responseRate: 78,
      templates: [
        {
          id: 1,
          platform: "linkedin",
          message: "Hi {{firstName}}, I noticed your work at {{companyName}} in {{industry}}. I'd love to connect and discuss potential collaboration opportunities in {{specificArea}}.",
          variables: {
            firstName: "Sarah",
            companyName: "TechCorp",
            industry: "AI/ML",
            specificArea: "machine learning automation"
          },
          previewData: {
            recipientName: "Sarah Johnson",
            companyName: "TechCorp",
            position: "AI Engineering Manager",
            profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b332c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
          }
        }
      ]
    },
    {
      platform: "email",
      isActive: true,
      messageCount: 120,
      lastSent: new Date(),
      responseRate: 65,
      templates: [
        {
          id: 2,
          platform: "email",
          subject: "Quick question about {{companyName}}'s {{department}} strategy",
          message: "Hi {{firstName}},\n\nI've been following {{companyName}}'s growth in {{industry}} and was impressed by your recent {{achievement}}.\n\nI'd love to share some insights that might be relevant to your {{department}} strategy. Would you be open to a brief 15-minute call this week?\n\nBest regards,\n[Your Name]",
          variables: {
            firstName: "Michael",
            companyName: "InnovateLabs",
            department: "marketing",
            industry: "fintech",
            achievement: "Series B funding announcement"
          },
          previewData: {
            recipientName: "Michael Chen",
            companyName: "InnovateLabs",
            position: "VP of Marketing"
          }
        }
      ]
    },
    {
      platform: "twitter",
      isActive: false,
      messageCount: 0,
      lastSent: new Date(),
      responseRate: 0,
      templates: [
        {
          id: 3,
          platform: "twitter",
          message: "Hey @{{handle}}, loved your recent thread about {{topic}}! Would love to connect and share some insights on {{relatedTopic}}. DM me if interested! 🚀",
          variables: {
            handle: "alexdeveloper",
            topic: "startup scaling",
            relatedTopic: "team automation"
          },
          previewData: {
            recipientName: "Alex Rivera",
            companyName: "StartupCo",
            position: "Founder & CEO"
          }
        }
      ]
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

  const selectedPlatformData = platformPreviews.find(p => p.platform === selectedPlatform);
  const currentTemplate = selectedPlatformData?.templates[0];

  const processMessage = (template: string, variables: Record<string, string>) => {
    let processed = template;
    Object.entries(variables).forEach(([key, value]) => {
      processed = processed.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return processed;
  };

  const renderLinkedInPreview = (template: OutreachTemplate) => {
    const processedMessage = processMessage(template.message, template.variables);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 max-w-md mx-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img 
                src={template.previewData.profilePicture || `https://ui-avatars.com/api/?name=${template.previewData.recipientName}&background=random`}
                alt={template.previewData.recipientName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{template.previewData.recipientName}</h3>
                <p className="text-sm text-gray-600">{template.previewData.position}</p>
                <p className="text-xs text-gray-500">{template.previewData.companyName}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
              Connect
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Connection Request</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">{processedMessage}</p>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex gap-4 text-gray-500">
              <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                <Heart className="w-4 h-4" />
                Like
              </button>
              <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                Comment
              </button>
              <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                <Share className="w-4 h-4" />
                Share
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEmailPreview = (template: OutreachTemplate) => {
    const processedSubject = template.subject ? processMessage(template.subject, template.variables) : "No Subject";
    const processedMessage = processMessage(template.message, template.variables);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Inbox</span>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Just now
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-1">{processedSubject}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>From: outreach@yourcompany.com</span>
              <span>•</span>
              <span>To: {template.previewData.recipientName.toLowerCase().replace(' ', '.')}@{template.previewData.companyName.toLowerCase()}.com</span>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-line text-gray-800 leading-relaxed">
              {processedMessage}
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <Button size="sm" variant="outline">
              <Mail className="w-3 h-3 mr-1" />
              Reply
            </Button>
            <Button size="sm" variant="outline">
              <Share className="w-3 h-3 mr-1" />
              Forward
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="w-3 h-3 mr-1" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderTwitterPreview = (template: OutreachTemplate) => {
    const processedMessage = processMessage(template.message, template.variables);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 max-w-md mx-auto">
        <div className="p-4">
          <div className="flex gap-3">
            <img 
              src={`https://ui-avatars.com/api/?name=Your+Company&background=1DA1F2&color=fff`}
              alt="Your Company"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">Your Company</span>
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-gray-500 text-sm">@yourcompany</span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">2m</span>
              </div>
              <p className="text-gray-800 leading-relaxed mb-3">{processedMessage}</p>
              <div className="flex justify-between max-w-xs">
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">12</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-green-500">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-sm">5</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">23</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlatformPreview = (template: OutreachTemplate) => {
    switch (template.platform) {
      case "linkedin":
        return renderLinkedInPreview(template);
      case "email":
        return renderEmailPreview(template);
      case "twitter":
        return renderTwitterPreview(template);
      default:
        return (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">Preview not available for this platform</p>
          </div>
        );
    }
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Queued",
      description: `Outreach message queued for delivery on ${selectedPlatform}. It will be sent according to your campaign schedule.`,
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Your message template has been saved and will be used for future outreach campaigns.",
    });
    setIsEditing(false);
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
              <Monitor className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">PLATFORM PREVIEWS</h1>
              <p className="text-sm text-gray-400">Preview & Send Outreach Messages</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-dark-surface/30 rounded-lg p-1">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                className="h-8"
              >
                <Monitor className="w-3 h-3 mr-1" />
                Desktop
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className="h-8"
              >
                <Smartphone className="w-3 h-3 mr-1" />
                Mobile
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              className="bg-dark-accent/20 hover:bg-dark-accent/30 text-dark-accent border-dark-accent/30"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Platform Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Platforms</h2>
            <div className="space-y-3">
              {platformPreviews.map((platform) => {
                const PlatformIcon = platformIcons[platform.platform as keyof typeof platformIcons];
                const colorClass = platformColors[platform.platform as keyof typeof platformColors];
                
                return (
                  <Card 
                    key={platform.platform}
                    className={`holographic cursor-pointer transition-all duration-300 ${
                      selectedPlatform === platform.platform ? 'ring-2 ring-dark-accent scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedPlatform(platform.platform)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-dark-surface/50 ${colorClass}`}>
                          <PlatformIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white capitalize">{platform.platform}</h3>
                            <Badge className={platform.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                              {platform.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                            <span>{platform.messageCount} sent</span>
                            <span>{platform.responseRate}% response</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Stats */}
            <Card className="holographic">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Campaign Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Campaigns</span>
                  <span className="text-white font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Messages Queued</span>
                  <span className="text-white font-medium">124</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Daily Limit</span>
                  <span className="text-white font-medium">250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400 font-medium">78.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Message Template</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="border-dark-accent/30 text-dark-accent hover:bg-dark-accent/20"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            {currentTemplate && (
              <Card className="holographic">
                <CardContent className="p-4 space-y-4">
                  {currentTemplate.subject && (
                    <div>
                      <Label className="text-gray-300">Subject Line</Label>
                      {isEditing ? (
                        <Input
                          defaultValue={currentTemplate.subject}
                          className="bg-dark-surface/50 border-dark-accent/30 text-black placeholder:text-gray-500 mt-1"
                        />
                      ) : (
                        <p className="text-white mt-1 p-2 bg-dark-surface/30 rounded">
                          {processMessage(currentTemplate.subject, currentTemplate.variables)}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-gray-300">Message</Label>
                    {isEditing ? (
                      <Textarea
                        defaultValue={currentTemplate.message}
                        rows={6}
                        className="bg-dark-surface/50 border-dark-accent/30 text-black placeholder:text-gray-500 mt-1"
                      />
                    ) : (
                      <div className="text-white mt-1 p-3 bg-dark-surface/30 rounded whitespace-pre-line">
                        {processMessage(currentTemplate.message, currentTemplate.variables)}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300">Variables</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(currentTemplate.variables).map(([key, value]) => (
                        <div key={key} className="text-xs">
                          <span className="text-gray-400">{`{{${key}}}`}</span>
                          <span className="text-white ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleSaveTemplate}
                        className="bg-dark-accent/20 hover:bg-dark-accent/30 text-dark-accent"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-3 h-3 mr-1" />
                        Duplicate
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Scheduling */}
            <Card className="holographic">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Auto-send</Label>
                  <Switch />
                </div>
                <div>
                  <Label className="text-gray-300">Send Time</Label>
                  <Select defaultValue="09:00">
                    <SelectTrigger className="bg-dark-surface/50 border-dark-accent/30 text-black mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Live Preview</h2>
              <Badge variant="outline" className="text-gray-400">
                {previewMode === "desktop" ? "Desktop View" : "Mobile View"}
              </Badge>
            </div>

            <div className={`${previewMode === "mobile" ? "max-w-sm" : "max-w-full"} mx-auto`}>
              {currentTemplate ? (
                <div className="bg-dark-surface/30 rounded-lg p-4">
                  {renderPlatformPreview(currentTemplate)}
                </div>
              ) : (
                <Card className="holographic">
                  <CardContent className="p-8 text-center">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Select a platform to preview messages</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Preview Controls */}
            {currentTemplate && (
              <div className="space-y-3">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This is how your message will appear to recipients on {selectedPlatform}.
                  </AlertDescription>
                </Alert>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}