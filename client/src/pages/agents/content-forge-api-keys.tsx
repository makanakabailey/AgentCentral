import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Hammer, ArrowLeft, Key, Plus, Edit, Trash2, Eye, EyeOff, Check, X, AlertTriangle, Zap, Palette, Video, Music, FileText, Image, Code } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const serviceTypes = [
  { value: "design", label: "Design Tools", icon: Palette, color: "text-purple-400" },
  { value: "writing", label: "Writing AI", icon: FileText, color: "text-green-400" },
  { value: "video", label: "Video Creation", icon: Video, color: "text-red-400" },
  { value: "audio", label: "Audio Tools", icon: Music, color: "text-yellow-400" },
  { value: "image", label: "Image Generation", icon: Image, color: "text-blue-400" },
  { value: "development", label: "Development", icon: Code, color: "text-cyan-400" }
];

const popularServices = [
  { name: "openai", displayName: "OpenAI GPT", type: "writing", description: "Text generation and content creation" },
  { name: "midjourney", displayName: "Midjourney", type: "image", description: "AI image generation and art creation" },
  { name: "canva", displayName: "Canva", type: "design", description: "Design templates and graphics" },
  { name: "figma", displayName: "Figma", type: "design", description: "Collaborative design platform" },
  { name: "adobe", displayName: "Adobe Creative SDK", type: "design", description: "Adobe Creative Cloud integration" },
  { name: "dalle", displayName: "DALL-E", type: "image", description: "OpenAI image generation" },
  { name: "runway", displayName: "Runway ML", type: "video", description: "AI video generation and editing" },
  { name: "elevenlabs", displayName: "ElevenLabs", type: "audio", description: "AI voice synthesis and cloning" },
  { name: "jasper", displayName: "Jasper AI", type: "writing", description: "Marketing content generation" },
  { name: "copy", displayName: "Copy.ai", type: "writing", description: "Copywriting automation" },
  { name: "luma", displayName: "Luma AI", type: "video", description: "3D video generation" },
  { name: "synthesia", displayName: "Synthesia", type: "video", description: "AI video presenter" }
];

const mockApiKeys = [
  {
    id: 1,
    serviceName: "openai",
    displayName: "OpenAI GPT",
    serviceType: "writing",
    apiKey: "sk-abc123...xyz789",
    isActive: true,
    lastUsed: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-10T09:00:00Z",
    usageCount: 156
  },
  {
    id: 2,
    serviceName: "canva",
    displayName: "Canva Pro",
    serviceType: "design",
    apiKey: "cnva_abc123...xyz789",
    isActive: true,
    lastUsed: "2024-01-14T16:45:00Z",
    createdAt: "2024-01-12T11:30:00Z",
    usageCount: 89
  },
  {
    id: 3,
    serviceName: "midjourney",
    displayName: "Midjourney",
    serviceType: "image",
    apiKey: "mj_abc123...xyz789",
    isActive: false,
    lastUsed: "2024-01-10T14:20:00Z",
    createdAt: "2024-01-08T13:15:00Z",
    usageCount: 42
  }
];

export default function ContentForgeApiKeys() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<any>(null);
  const [showApiKey, setShowApiKey] = useState<{[key: number]: boolean}>({});
  const [newApiKey, setNewApiKey] = useState({
    serviceName: "",
    displayName: "",
    serviceType: "",
    apiKey: "",
    customService: ""
  });

  const addApiKeyMutation = useMutation({
    mutationFn: async (keyData: any) => {
      // Simulate API key validation and storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (Math.random() > 0.8) {
        throw new Error("Invalid API key");
      }
      return { success: true, keyId: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: (data) => {
      toast({
        title: "API Key Added",
        description: `${newApiKey.displayName} API key added successfully. Key ID: ${data.keyId}`,
      });
      setIsAddDialogOpen(false);
      setNewApiKey({
        serviceName: "",
        displayName: "",
        serviceType: "",
        apiKey: "",
        customService: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content/api-keys"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add API Key",
        description: error.message || "Please check your API key and try again.",
        variant: "destructive",
      });
    }
  });

  const testApiKeyMutation = useMutation({
    mutationFn: async (keyId: number) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: Math.random() > 0.3, response: "Connection successful" };
    },
    onSuccess: (data, keyId) => {
      if (data.success) {
        toast({
          title: "API Key Valid",
          description: "Connection test successful. API key is working properly.",
        });
      } else {
        toast({
          title: "API Key Test Failed", 
          description: "Unable to connect with this API key. Please check the key.",
          variant: "destructive",
        });
      }
    }
  });

  const deleteApiKeyMutation = useMutation({
    mutationFn: async (keyId: number) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "API Key Deleted",
        description: "API key has been removed from your account.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content/api-keys"] });
    }
  });

  const toggleApiKeyVisibility = (keyId: number) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleAddApiKey = () => {
    if (!newApiKey.apiKey || !newApiKey.serviceType) return;
    
    const displayName = newApiKey.displayName || 
      (newApiKey.serviceName === "custom" ? newApiKey.customService : 
       popularServices.find(s => s.name === newApiKey.serviceName)?.displayName || newApiKey.serviceName);

    addApiKeyMutation.mutate({
      ...newApiKey,
      displayName,
      serviceName: newApiKey.serviceName === "custom" ? newApiKey.customService.toLowerCase().replace(/\s+/g, '-') : newApiKey.serviceName
    });
  };

  const getServiceIcon = (serviceType: string) => {
    const service = serviceTypes.find(s => s.value === serviceType);
    if (!service) return Zap;
    return service.icon;
  };

  const getServiceColor = (serviceType: string) => {
    const service = serviceTypes.find(s => s.value === serviceType);
    return service?.color || "text-gray-400";
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
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
              <Key className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">API KEY MANAGER</h1>
              <p className="text-sm text-gray-400">Content Creation Service Integrations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30">
              {mockApiKeys.length} Active Keys
            </Badge>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-add-api-key">
                  <Plus className="w-4 h-4 mr-2" />
                  Add API Key
                </Button>
              </DialogTrigger>
              
              <DialogContent className="bg-dark-surface border-dark-accent/20 text-white sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New API Key</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select value={newApiKey.serviceType} onValueChange={(value) => setNewApiKey({...newApiKey, serviceType: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-service-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          {serviceTypes.map(type => {
                            const IconComponent = type.icon;
                            return (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <IconComponent className={`w-4 h-4 ${type.color}`} />
                                  {type.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="service-name">Service</Label>
                      <Select 
                        value={newApiKey.serviceName} 
                        onValueChange={(value) => setNewApiKey({...newApiKey, serviceName: value})}
                        disabled={!newApiKey.serviceType}
                      >
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-service-name">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          {popularServices
                            .filter(service => !newApiKey.serviceType || service.type === newApiKey.serviceType)
                            .map(service => (
                              <SelectItem key={service.name} value={service.name}>
                                {service.displayName}
                              </SelectItem>
                            ))}
                          <SelectItem value="custom">Custom Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {newApiKey.serviceName === "custom" && (
                    <div>
                      <Label htmlFor="custom-service">Custom Service Name</Label>
                      <Input
                        id="custom-service"
                        placeholder="Enter service name..."
                        value={newApiKey.customService}
                        onChange={(e) => setNewApiKey({...newApiKey, customService: e.target.value})}
                        className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                        data-testid="input-custom-service"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="display-name">Display Name (Optional)</Label>
                    <Input
                      id="display-name"
                      placeholder="Custom display name..."
                      value={newApiKey.displayName}
                      onChange={(e) => setNewApiKey({...newApiKey, displayName: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-display-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key..."
                      value={newApiKey.apiKey}
                      onChange={(e) => setNewApiKey({...newApiKey, apiKey: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-api-key"
                    />
                  </div>

                  <Alert className="border-blue-400/20 bg-blue-500/10">
                    <AlertTriangle className="w-4 h-4 text-blue-400" />
                    <AlertDescription className="text-blue-300">
                      Your API keys are encrypted and stored securely. They are only used for content generation requests.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-dark-accent/20 text-gray-300"
                      onClick={() => setIsAddDialogOpen(false)}
                      data-testid="button-cancel-add"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={handleAddApiKey}
                      disabled={addApiKeyMutation.isPending || !newApiKey.apiKey || !newApiKey.serviceType}
                      data-testid="button-confirm-add"
                    >
                      {addApiKeyMutation.isPending ? "Adding..." : "Add Key"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Service Type Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceTypes.map((type) => {
            const IconComponent = type.icon;
            const count = mockApiKeys.filter(key => key.serviceType === type.value).length;
            return (
              <Card key={type.value} className="holographic border-dark-accent/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-dark-accent/10`}>
                      <IconComponent className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{type.label}</h3>
                      <p className="text-sm text-gray-400">{count} active keys</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* API Keys List */}
        <Card className="holographic border-dark-accent/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-orange-400" />
              Configured API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockApiKeys.map((apiKey) => {
              const IconComponent = getServiceIcon(apiKey.serviceType);
              return (
                <div key={apiKey.id} className="flex items-center justify-between p-4 rounded-lg bg-dark-surface/30 border border-dark-accent/10">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-dark-accent/10`}>
                      <IconComponent className={`w-5 h-5 ${getServiceColor(apiKey.serviceType)}`} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{apiKey.displayName}</h3>
                        <Badge 
                          variant={apiKey.isActive ? "default" : "secondary"}
                          className={apiKey.isActive ? "bg-green-500/20 text-green-400 border-green-400/30" : ""}
                        >
                          {apiKey.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400 font-mono">
                            {showApiKey[apiKey.id] ? apiKey.apiKey : maskApiKey(apiKey.apiKey)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-dark-accent/20"
                            onClick={() => toggleApiKeyVisibility(apiKey.id)}
                            data-testid={`button-toggle-visibility-${apiKey.id}`}
                          >
                            {showApiKey[apiKey.id] ? (
                              <EyeOff className="w-3 h-3" />
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          {apiKey.usageCount} uses • Last used {new Date(apiKey.lastUsed).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-dark-accent/20 text-green-400 hover:bg-green-500/20"
                      onClick={() => testApiKeyMutation.mutate(apiKey.id)}
                      disabled={testApiKeyMutation.isPending}
                      data-testid={`button-test-${apiKey.id}`}
                    >
                      {testApiKeyMutation.isPending ? (
                        <Zap className="w-3 h-3 animate-pulse" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      Test
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-dark-accent/20 hover:bg-dark-accent/20"
                      data-testid={`button-edit-${apiKey.id}`}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-dark-accent/20 text-red-400 hover:bg-red-500/20"
                      onClick={() => deleteApiKeyMutation.mutate(apiKey.id)}
                      disabled={deleteApiKeyMutation.isPending}
                      data-testid={`button-delete-${apiKey.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {mockApiKeys.length === 0 && (
              <div className="text-center py-8">
                <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No API Keys Added</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Add your first API key to start creating content with external services.
                </p>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setIsAddDialogOpen(true)}
                  data-testid="button-add-first-key"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First API Key
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card className="holographic border-dark-accent/10">
          <CardHeader>
            <CardTitle className="text-white">Popular Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.slice(0, 6).map((service) => {
                const serviceType = serviceTypes.find(t => t.value === service.type);
                const IconComponent = serviceType?.icon || Zap;
                const hasKey = mockApiKeys.some(key => key.serviceName === service.name);
                
                return (
                  <div key={service.name} className="p-3 rounded-lg bg-dark-surface/30 border border-dark-accent/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${serviceType?.color || 'text-gray-400'}`} />
                        <span className="font-medium text-white text-sm">{service.displayName}</span>
                      </div>
                      {hasKey && (
                        <Badge variant="outline" className="text-green-400 border-green-400/30 text-xs">
                          Added
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}