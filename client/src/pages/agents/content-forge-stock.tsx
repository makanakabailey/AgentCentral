import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Search, Filter, Eye, Download, Edit, Trash2, Archive, Calendar, Tag, FileText, TrendingUp, Star, Share } from "lucide-react";
import { Link } from "wouter";

export default function ContentForgeStock() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Sample content data
  const [contentItems] = useState([
    {
      id: 1,
      title: "The Future of AI in Marketing",
      type: "blog-post",
      status: "published",
      createdAt: "2024-01-15",
      wordCount: 1250,
      tags: ["AI", "Marketing", "Technology"],
      quality: 94,
      engagement: 87,
      views: 2450,
      preview: "Artificial intelligence is revolutionizing the marketing landscape..."
    },
    {
      id: 2,
      title: "10 Social Media Trends for 2024",
      type: "article",
      status: "draft",
      createdAt: "2024-01-14",
      wordCount: 890,
      tags: ["Social Media", "Trends", "2024"],
      quality: 91,
      engagement: 0,
      views: 0,
      preview: "Social media continues to evolve at breakneck speed..."
    },
    {
      id: 3,
      title: "Introducing Our New Product Line",
      type: "press-release",
      status: "published",
      createdAt: "2024-01-13",
      wordCount: 650,
      tags: ["Product", "Launch", "News"],
      quality: 96,
      engagement: 92,
      views: 1890,
      preview: "We're excited to announce the launch of our innovative..."
    },
    {
      id: 4,
      title: "Customer Success Story: TechCorp",
      type: "case-study",
      status: "review",
      createdAt: "2024-01-12",
      wordCount: 1100,
      tags: ["Case Study", "Success", "Customer"],
      quality: 89,
      engagement: 0,
      views: 0,
      preview: "Discover how TechCorp increased their conversion rate by 40%..."
    },
    {
      id: 5,
      title: "Weekly Newsletter #47",
      type: "email",
      status: "published",
      createdAt: "2024-01-11",
      wordCount: 420,
      tags: ["Newsletter", "Weekly", "Updates"],
      quality: 88,
      engagement: 95,
      views: 5670,
      preview: "This week's highlights include new feature releases..."
    },
    {
      id: 6,
      title: "Product Demo Video Script",
      type: "script",
      status: "archived",
      createdAt: "2024-01-10",
      wordCount: 320,
      tags: ["Video", "Demo", "Script"],
      quality: 92,
      engagement: 0,
      views: 0,
      preview: "Welcome to our comprehensive product demo..."
    },
  ]);

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "quality":
        return b.quality - a.quality;
      case "engagement":
        return b.engagement - a.engagement;
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400";
      case "draft":
        return "bg-blue-500/20 text-blue-400";
      case "review":
        return "bg-yellow-500/20 text-yellow-400";
      case "archived":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog-post":
      case "article":
        return <FileText className="w-4 h-4" />;
      case "email":
        return <span className="text-sm">📧</span>;
      case "press-release":
        return <span className="text-sm">📰</span>;
      case "case-study":
        return <span className="text-sm">📊</span>;
      case "script":
        return <span className="text-sm">🎬</span>;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleDownload = (item: any) => {
    toast({
      title: "Download Started",
      description: `Downloading "${item.title}" as PDF.`,
    });
  };

  const handleArchive = (item: any) => {
    toast({
      title: "Content Archived",
      description: `"${item.title}" has been moved to archive.`,
    });
  };

  const handleDelete = (item: any) => {
    toast({
      title: "Content Deleted",
      description: `"${item.title}" has been permanently deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/content-forge">
              <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Archive className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">CONTENT STOCK</h1>
              <p className="text-sm text-gray-400">Content Library & Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-500/20 text-orange-400">
              {filteredContent.length} Items
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Filters and Search */}
        <Card className="holographic-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Filter className="w-5 h-5" />
              Content Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search content, tags, or titles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-dark-surface border-dark-accent/30"
                  />
                </div>
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="blog-post">Blog Posts</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="press-release">Press Release</SelectItem>
                  <SelectItem value="case-study">Case Study</SelectItem>
                  <SelectItem value="script">Script</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="quality">Quality Score</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredContent.map((item) => (
            <Card key={item.id} className="holographic-card group hover:scale-[1.02] transition-transform">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <Badge variant="outline" className="text-xs">
                      {item.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg line-clamp-2 text-white group-hover:text-orange-400 transition-colors">
                  {item.title}
                </CardTitle>
                
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span>{item.wordCount} words</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-400 line-clamp-2">{item.preview}</p>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-dark-surface">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-dark-surface">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Quality</span>
                    <span className="text-orange-400 font-medium">{item.quality}%</span>
                  </div>
                  {item.status === "published" && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Views</span>
                      <span className="text-white font-medium">{item.views.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-dark-accent/20">
                  <div className="flex items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={() => setSelectedContent(item)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-dark-secondary border-dark-accent/30 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-orange-400">{item.title}</DialogTitle>
                          <DialogDescription>
                            {item.type.replace('-', ' ')} • {item.wordCount} words • Created {new Date(item.createdAt).toLocaleDateString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-96 overflow-auto p-4 bg-white text-black rounded">
                          <p>{item.preview}</p>
                          <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                      onClick={() => handleDownload(item)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {item.status !== "archived" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400"
                        onClick={() => handleArchive(item)}
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <Card className="holographic-card">
            <CardContent className="py-12">
              <div className="text-center">
                <Archive className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-white mb-2">No Content Found</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "No content matches your current filters. Try adjusting your search criteria."
                    : "Your content library is empty. Start creating content to see it here."}
                </p>
                <Link href="/agents/content-forge/creator">
                  <Button className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Content
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Summary */}
        {filteredContent.length > 0 && (
          <Card className="holographic-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <TrendingUp className="w-5 h-5" />
                Content Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-4">
                <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                  <div className="text-2xl font-bold text-orange-400">
                    {contentItems.filter(item => item.status === "published").length}
                  </div>
                  <div className="text-sm text-gray-400">Published</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                  <div className="text-2xl font-bold text-orange-400">
                    {Math.round(contentItems.reduce((acc, item) => acc + item.quality, 0) / contentItems.length)}%
                  </div>
                  <div className="text-sm text-gray-400">Avg Quality</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                  <div className="text-2xl font-bold text-orange-400">
                    {contentItems.reduce((acc, item) => acc + item.views, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Views</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-dark-surface/30">
                  <div className="text-2xl font-bold text-orange-400">
                    {contentItems.reduce((acc, item) => acc + item.wordCount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Words</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}