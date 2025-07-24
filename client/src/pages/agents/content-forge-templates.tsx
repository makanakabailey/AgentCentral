import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Hammer, ArrowLeft, FileImage, Download, Upload, Search, Filter, Grid3x3, List, Edit, Trash2, Copy, Share2, Eye, Plus, Tags, Calendar, User } from "lucide-react";
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
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";

const platformIcons = {
  "canva": "🎨",
  "figma": "🔧",
  "adobe": "🌟",
  "sketch": "💎",
  "photoshop": "🖼️",
  "instagram": "📷",
  "facebook": "👥",
  "youtube": "🎬",
  "twitter": "🐦",
  "linkedin": "💼"
};

const templateCategories = [
  "Social Media Post",
  "Instagram Story",
  "Facebook Cover",
  "YouTube Thumbnail",
  "Blog Header",
  "Email Newsletter",
  "Presentation Slide",
  "Infographic",
  "Logo Design",
  "Business Card",
  "Flyer",
  "Banner"
];

const mockTemplates = [
  {
    id: 1,
    name: "Modern Instagram Post Template",
    description: "Clean, minimalist design perfect for lifestyle brands",
    category: "Social Media Post",
    platform: "canva",
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUExQTFBIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiMzMzMzMzMiIHJ4PSI4Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmaWxsPSIjRkY2QzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5UZW1wbGF0ZTwvdGV4dD4KPC9zdmc+",
    tags: ["modern", "clean", "lifestyle"],
    createdBy: "Design Team",
    createdAt: "2024-01-10T10:00:00Z",
    isPublic: true,
    usageCount: 45
  },
  {
    id: 2,
    name: "Tech YouTube Thumbnail",
    description: "Bold, eye-catching thumbnail for tech content",
    category: "YouTube Thumbnail",
    platform: "figma",
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzMzMzMzMyIgcng9IjQiLz4KPHR5eHQgeD0iMTAwIiB5PSI2OCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiI+VEVDSDwvdGV4dD4KPC9zdmc+",
    tags: ["youtube", "tech", "bold"],
    createdBy: "Content Creator",
    createdAt: "2024-01-12T14:30:00Z",
    isPublic: false,
    usageCount: 23
  },
  {
    id: 3,
    name: "Email Newsletter Header",
    description: "Professional header design for business newsletters",
    category: "Email Newsletter",
    platform: "adobe",
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMDA3RkZGIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRkZGRiIgcng9IjQiLz4KPHR5eHQgeD0iMTAwIiB5PSI0NSIgZmlsbD0iIzAwN0ZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCI+TkVXU0xFVFRFUjwvdGV4dD4KPC9zdmc+",
    tags: ["email", "business", "professional"],
    createdBy: "Marketing Team",
    createdAt: "2024-01-08T09:15:00Z",
    isPublic: true,
    usageCount: 67
  }
];

export default function ContentForgeTemplates() {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [showPublicOnly, setShowPublicOnly] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    platform: "",
    tags: "",
    isPublic: false
  });

  const uploadTemplateMutation = useMutation({
    mutationFn: async (templateData: any) => {
      // Simulate template upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, templateId: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: (data) => {
      toast({
        title: "Template Uploaded",
        description: `Template uploaded successfully. ID: ${data.templateId}`,
      });
      setIsUploadDialogOpen(false);
      setNewTemplate({
        name: "",
        description: "",
        category: "",
        platform: "",
        tags: "",
        isPublic: false
      });
    },
    onError: () => {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your template. Please try again.",
        variant: "destructive",
      });
    }
  });

  const duplicateTemplateMutation = useMutation({
    mutationFn: async (templateId: number) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, newTemplateId: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: (data) => {
      toast({
        title: "Template Duplicated",
        description: `Template copied successfully. New ID: ${data.newTemplateId}`,
      });
    }
  });

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === "all" || template.category === filterCategory;
    const matchesPlatform = filterPlatform === "all" || template.platform === filterPlatform;
    const matchesVisibility = !showPublicOnly || template.isPublic;
    
    return matchesSearch && matchesCategory && matchesPlatform && matchesVisibility;
  });

  const handleUploadTemplate = () => {
    if (!newTemplate.name || !newTemplate.category) return;
    
    uploadTemplateMutation.mutate({
      ...newTemplate,
      tags: newTemplate.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/agents/content-forge">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-orange-500/20">
              <FileImage className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">TEMPLATE LIBRARY</h1>
              <p className="text-sm text-gray-400">Import & Manage Content Templates</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30">
              {filteredTemplates.length} Templates
            </Badge>
            
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-upload-template">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Template
                </Button>
              </DialogTrigger>
              
              <DialogContent className="bg-dark-surface border-dark-accent/20 text-white sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Template</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      placeholder="Enter template name..."
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-template-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="template-description">Description</Label>
                    <Textarea
                      id="template-description"
                      placeholder="Describe your template..."
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      rows={3}
                      data-testid="textarea-template-description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="template-category">Category</Label>
                      <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-template-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          {templateCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="template-platform">Platform</Label>
                      <Select value={newTemplate.platform} onValueChange={(value) => setNewTemplate({...newTemplate, platform: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-template-platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          {Object.keys(platformIcons).map(platform => (
                            <SelectItem key={platform} value={platform}>
                              {platformIcons[platform as keyof typeof platformIcons]} {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="template-tags">Tags (comma separated)</Label>
                    <Input
                      id="template-tags"
                      placeholder="modern, clean, business..."
                      value={newTemplate.tags}
                      onChange={(e) => setNewTemplate({...newTemplate, tags: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-template-tags"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-dark-accent/20 text-gray-300"
                      onClick={() => setIsUploadDialogOpen(false)}
                      data-testid="button-cancel-upload"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={handleUploadTemplate}
                      disabled={uploadTemplateMutation.isPending || !newTemplate.name || !newTemplate.category}
                      data-testid="button-confirm-upload"
                    >
                      {uploadTemplateMutation.isPending ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark-surface/50 border-dark-accent/20 text-white placeholder:text-gray-400"
                data-testid="input-search-templates"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 bg-dark-surface/50 border-dark-accent/20 text-white" data-testid="select-filter-category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-accent/20">
                <SelectItem value="all">All Categories</SelectItem>
                {templateCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-48 bg-dark-surface/50 border-dark-accent/20 text-white" data-testid="select-filter-platform">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-accent/20">
                <SelectItem value="all">All Platforms</SelectItem>
                {Object.keys(platformIcons).map(platform => (
                  <SelectItem key={platform} value={platform}>
                    {platformIcons[platform as keyof typeof platformIcons]} {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 bg-dark-surface/50 border border-dark-accent/20 rounded-lg px-3 py-2">
              <Toggle
                pressed={showPublicOnly}
                onPressedChange={setShowPublicOnly}
                className="data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400"
                data-testid="toggle-public-only"
              >
                Public Only
              </Toggle>
            </div>
            
            <div className="flex items-center bg-dark-surface/50 border border-dark-accent/20 rounded-lg">
              <Toggle
                pressed={viewMode === "grid"}
                onPressedChange={() => setViewMode("grid")}
                className="data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400 rounded-r-none"
                data-testid="toggle-grid-view"
              >
                <Grid3x3 className="w-4 h-4" />
              </Toggle>
              <Toggle
                pressed={viewMode === "list"}
                onPressedChange={() => setViewMode("list")}
                className="data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400 rounded-l-none"
                data-testid="toggle-list-view"
              >
                <List className="w-4 h-4" />
              </Toggle>
            </div>
          </div>
        </div>

        {/* Templates Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="holographic group hover:scale-105 transition-all duration-300 border-dark-accent/10">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-dark-surface/30">
                    <img 
                      src={template.thumbnail} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-sm line-clamp-1">{template.name}</h3>
                      <span className="text-xl">{platformIcons[template.platform as keyof typeof platformIcons]}</span>
                    </div>
                    
                    <p className="text-xs text-gray-400 line-clamp-2">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          +{template.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <User className="w-3 h-3" />
                        <span>{template.createdBy}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-orange-500/20" data-testid={`button-preview-${template.id}`}>
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-orange-500/20"
                          onClick={() => duplicateTemplateMutation.mutate(template.id)}
                          disabled={duplicateTemplateMutation.isPending}
                          data-testid={`button-duplicate-${template.id}`}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="holographic border-dark-accent/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-surface/30 flex-shrink-0">
                      <img 
                        src={template.thumbnail} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white truncate">{template.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{platformIcons[template.platform as keyof typeof platformIcons]}</span>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 line-clamp-1 mb-2">{template.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 border-dark-accent/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{template.usageCount} uses</span>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-orange-500/20" data-testid={`button-list-preview-${template.id}`}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 hover:bg-orange-500/20"
                            onClick={() => duplicateTemplateMutation.mutate(template.id)}
                            data-testid={`button-list-duplicate-${template.id}`}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 rounded-lg bg-dark-surface/30 max-w-md mx-auto">
              <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Templates Found</h3>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or upload your first template.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}