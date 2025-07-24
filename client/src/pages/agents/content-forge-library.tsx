import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Download, 
  Share2, 
  Copy,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  BarChart3,
  Archive,
  Star,
  ArrowLeft,
  Plus,
  CheckSquare,
  Square
} from "lucide-react";
import { Link } from "wouter";
import type { GeneratedContent } from "@shared/schema";

export default function ContentForgeLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [selectedContent, setSelectedContent] = useState<GeneratedContent[]>([]);
  const [viewContent, setViewContent] = useState<GeneratedContent | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Queries
  const { data: generatedContent = [], isLoading } = useQuery<GeneratedContent[]>({
    queryKey: ["/api/content/generated"],
  });

  // Mutations
  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/content/generated/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/generated"] });
      toast({
        title: "Content Updated",
        description: "Content status has been updated successfully.",
      });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/content/generated/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete content");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content/generated"] });
      toast({
        title: "Content Deleted",
        description: "Content has been removed from the library.",
      });
    },
  });

  // Filter and search logic
  const filteredContent = generatedContent.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || content.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || content.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Group content by status
  const contentByStatus = {
    draft: filteredContent.filter(c => c.status === "draft"),
    approved: filteredContent.filter(c => c.status === "approved"),
    published: filteredContent.filter(c => c.status === "published"),
    archived: filteredContent.filter(c => c.status === "archived"),
  };

  // Handlers
  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateContentMutation.mutate({
      id,
      data: { status: newStatus },
    });
  };

  const handleBulkAction = (action: string) => {
    selectedContent.forEach((content) => {
      if (action === "approve") {
        handleStatusChange(content.id, "approved");
      } else if (action === "archive") {
        handleStatusChange(content.id, "archived");
      } else if (action === "delete") {
        deleteContentMutation.mutate(content.id);
      }
    });
    setSelectedContent([]);
  };

  const toggleContentSelection = (content: GeneratedContent) => {
    setSelectedContent(prev => 
      prev.find(c => c.id === content.id)
        ? prev.filter(c => c.id !== content.id)
        : [...prev, content]
    );
  };

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      tiktok: "🎵",
      instagram: "📸",
      linkedin: "💼",
      twitter: "🐦",
      youtube: "📹",
      blog: "📝",
    };
    return icons[platform] || "📄";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-yellow-500",
      approved: "bg-green-500",
      published: "bg-blue-500",
      archived: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getStatusIcon = (status: string) => {
    const icons: { [key: string]: any } = {
      draft: Edit3,
      approved: CheckSquare,
      published: Share2,
      archived: Archive,
    };
    return icons[status] || Square;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#1a1a2e] to-[#16213e] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/agents/content-forge">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="p-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] rounded-lg">
              <Archive className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-white bg-clip-text text-transparent">
                Content Library
              </h1>
              <p className="text-gray-400">Manage and organize your generated content</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/agents/content-forge/create">
              <Button className="bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Content</p>
                  <p className="text-2xl font-bold text-[#00ff9d]">{generatedContent.length}</p>
                </div>
                <Archive className="h-8 w-8 text-[#00ff9d]/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {contentByStatus.published.length}
                  </p>
                </div>
                <Share2 className="h-8 w-8 text-blue-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Virality</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {generatedContent.length > 0 
                      ? Math.round(generatedContent.reduce((sum, c) => sum + (c.viralityPrediction || 0), 0) / generatedContent.length)
                      : 0}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Engagement</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {generatedContent.length > 0 
                      ? Math.round(generatedContent.reduce((sum, c) => sum + (c.engagementPrediction || 0), 0) / generatedContent.length)
                      : 0}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-400/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search content..."
                    className="pl-10 bg-black/40 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-black/40 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-40 bg-black/40 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700">
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                    <SelectItem value="instagram">📸 Instagram</SelectItem>
                    <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                    <SelectItem value="twitter">🐦 Twitter</SelectItem>
                    <SelectItem value="youtube">📹 YouTube</SelectItem>
                    <SelectItem value="blog">📝 Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedContent.length > 0 && (
              <div className="mt-4 p-3 bg-[#00ff9d]/10 border border-[#00ff9d]/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#00ff9d]">
                    {selectedContent.length} item{selectedContent.length > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("approve")}
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <CheckSquare className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("archive")}
                      className="border-gray-500 text-gray-400 hover:bg-gray-500/10"
                    >
                      <Archive className="h-3 w-3 mr-1" />
                      Archive
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction("delete")}
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              All ({filteredContent.length})
            </TabsTrigger>
            <TabsTrigger value="draft" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Draft ({contentByStatus.draft.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Approved ({contentByStatus.approved.length})
            </TabsTrigger>
            <TabsTrigger value="published" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Published ({contentByStatus.published.length})
            </TabsTrigger>
            <TabsTrigger value="archived" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
              Archived ({contentByStatus.archived.length})
            </TabsTrigger>
          </TabsList>

          {/* All Content Tab */}
          <TabsContent value="all">
            <ContentGrid
              content={filteredContent}
              selectedContent={selectedContent}
              onToggleSelection={toggleContentSelection}
              onViewContent={setViewContent}
              onStatusChange={handleStatusChange}
              onCopyContent={handleCopyContent}
              onDeleteContent={(id) => deleteContentMutation.mutate(id)}
            />
          </TabsContent>

          {/* Status-specific Tabs */}
          {Object.entries(contentByStatus).map(([status, content]) => (
            <TabsContent key={status} value={status}>
              <ContentGrid
                content={content}
                selectedContent={selectedContent}
                onToggleSelection={toggleContentSelection}
                onViewContent={setViewContent}
                onStatusChange={handleStatusChange}
                onCopyContent={handleCopyContent}
                onDeleteContent={(id) => deleteContentMutation.mutate(id)}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Content View Dialog */}
        <Dialog open={!!viewContent} onOpenChange={() => setViewContent(null)}>
          <DialogContent className="bg-black border-gray-800 text-white max-w-2xl">
            {viewContent && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span className="text-lg">{getPlatformIcon(viewContent.platform)}</span>
                    {viewContent.title}
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className={`${getStatusColor(viewContent.status)} text-white`}>
                        {viewContent.status}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Created: {new Date(viewContent.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {viewContent.content}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                      <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-400" />
                      <p className="text-sm text-gray-400">Virality Prediction</p>
                      <p className="text-lg font-bold text-green-400">{viewContent.viralityPrediction}%</p>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <BarChart3 className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                      <p className="text-sm text-gray-400">Engagement Prediction</p>
                      <p className="text-lg font-bold text-blue-400">{viewContent.engagementPrediction}%</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopyContent(viewContent.content)}
                      variant="outline"
                      className="flex-1 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d]/10"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Content
                    </Button>
                    <Select
                      value={viewContent.status}
                      onValueChange={(value) => handleStatusChange(viewContent.id, value)}
                    >
                      <SelectTrigger className="w-40 bg-black/40 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Content Grid Component
interface ContentGridProps {
  content: GeneratedContent[];
  selectedContent: GeneratedContent[];
  onToggleSelection: (content: GeneratedContent) => void;
  onViewContent: (content: GeneratedContent) => void;
  onStatusChange: (id: number, status: string) => void;
  onCopyContent: (content: string) => void;
  onDeleteContent: (id: number) => void;
}

function ContentGrid({
  content,
  selectedContent,
  onToggleSelection,
  onViewContent,
  onStatusChange,
  onCopyContent,
  onDeleteContent,
}: ContentGridProps) {
  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      tiktok: "🎵",
      instagram: "📸",
      linkedin: "💼",
      twitter: "🐦",
      youtube: "📹",
      blog: "📝",
    };
    return icons[platform] || "📄";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-yellow-500",
      approved: "bg-green-500",
      published: "bg-blue-500",
      archived: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  if (content.length === 0) {
    return (
      <Card className="bg-black/40 border-gray-800 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="text-center text-gray-500">
            <Archive className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No content found</h3>
            <p className="text-sm">Try adjusting your filters or create new content</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {content.map((item) => (
        <Card key={item.id} className="bg-black/40 border-gray-800 backdrop-blur-sm hover:border-[#00ff9d]/50 transition-colors">
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedContent.find(c => c.id === item.id) !== undefined}
                    onCheckedChange={() => onToggleSelection(item)}
                    className="border-gray-600"
                  />
                  <span className="text-lg">{getPlatformIcon(item.platform)}</span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></div>
                </div>
                <Badge variant="secondary" className="bg-gray-700 text-xs">
                  {item.status}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>

              {/* Content Preview */}
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                {item.content}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-gray-400">{item.viralityPrediction}% viral</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-400">{item.engagementPrediction}% eng.</span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{new Date(item.createdAt!).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewContent(item)}
                  className="flex-1 h-8 text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopyContent(item.content)}
                  className="h-8 px-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteContent(item.id)}
                  className="h-8 px-2 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}