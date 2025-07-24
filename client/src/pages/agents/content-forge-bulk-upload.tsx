import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Hammer, ArrowLeft, Upload, FileUp, Download, CheckCircle, XCircle, Clock, AlertTriangle, File, Archive, FileSpreadsheet, FileCode, Trash2, Eye, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const supportedFormats = [
  { type: "ZIP", description: "Archive with multiple content files", icon: Archive, color: "text-purple-400" },
  { type: "CSV", description: "Spreadsheet with content data", icon: FileSpreadsheet, color: "text-green-400" },
  { type: "JSON", description: "Structured content data", icon: FileCode, color: "text-blue-400" },
];

const uploadHistory = [
  {
    id: 1,
    fileName: "social_media_posts.zip",
    fileType: "ZIP",
    status: "completed",
    totalItems: 45,
    processedItems: 45,
    failedItems: 0,
    uploadedAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T10:32:15Z"
  },
  {
    id: 2,
    fileName: "blog_content.csv",
    fileType: "CSV",
    status: "processing",
    totalItems: 20,
    processedItems: 12,
    failedItems: 1,
    uploadedAt: "2024-01-15T09:45:00Z",
    completedAt: null
  },
  {
    id: 3,
    fileName: "instagram_templates.json",
    fileType: "JSON",
    status: "failed",
    totalItems: 15,
    processedItems: 8,
    failedItems: 7,
    uploadedAt: "2024-01-15T08:20:00Z",
    completedAt: "2024-01-15T08:25:30Z",
    errors: ["Invalid image format in template 3", "Missing required field in template 7", "Unsupported platform type"]
  }
];

export default function ContentForgeBulkUpload() {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState("auto");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const uploadMutation = useMutation({
    mutationFn: async (uploadData: any) => {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      return { 
        success: true, 
        uploadId: Math.random().toString(36).substr(2, 9),
        totalItems: Math.floor(Math.random() * 50) + 10
      };
    },
    onSuccess: (data) => {
      toast({
        title: "Upload Started",
        description: `File uploaded successfully. Processing ${data.totalItems} items. Upload ID: ${data.uploadId}`,
      });
      setSelectedFile(null);
      queryClient.invalidateQueries({ queryKey: ["/api/content/bulk-uploads"] });
    },
    onError: () => {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    uploadMutation.mutate({
      file: selectedFile,
      type: uploadType,
      fileName: selectedFile.name,
      fileSize: selectedFile.size
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-400/30";
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-400/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              <Upload className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">BULK UPLOAD</h1>
              <p className="text-sm text-gray-400">Mass Content Import & Processing</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30">
              {uploadHistory.length} Uploads
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dark-surface/50 border border-dark-accent/20">
            <TabsTrigger value="upload" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              New Upload
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              Upload History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* Upload Area */}
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileUp className="w-5 h-5 text-orange-400" />
                  Upload Content Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Drag & Drop Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? "border-orange-400 bg-orange-500/10" 
                      : "border-dark-accent/30 hover:border-dark-accent/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".zip,.csv,.json"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    data-testid="input-file-upload"
                  />
                  
                  <div className="space-y-4">
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3 text-orange-400">
                        <File className="w-8 h-8" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-gray-400">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-white mb-2">
                            Drop your files here or click to browse
                          </p>
                          <p className="text-sm text-gray-400">
                            Supports ZIP, CSV, and JSON files up to 100MB
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Upload Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="upload-type" className="text-sm font-medium text-gray-300">
                      Processing Type
                    </Label>
                    <Select value={uploadType} onValueChange={setUploadType}>
                      <SelectTrigger className="mt-2 bg-dark-surface/50 border-dark-accent/20 text-white" data-testid="select-upload-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-accent/20">
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="templates">Content Templates</SelectItem>
                        <SelectItem value="posts">Social Media Posts</SelectItem>
                        <SelectItem value="articles">Blog Articles</SelectItem>
                        <SelectItem value="images">Image Assets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {selectedFile && (
                      <span>Ready to upload: {selectedFile.name}</span>
                    )}
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadMutation.isPending}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    data-testid="button-start-upload"
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Start Upload
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Supported Formats */}
            <Card className="holographic border-dark-accent/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {supportedFormats.map((format) => {
                    const IconComponent = format.icon;
                    return (
                      <div key={format.type} className="flex items-center gap-3 p-3 rounded-lg bg-dark-surface/30">
                        <IconComponent className={`w-6 h-6 ${format.color}`} />
                        <div>
                          <p className="font-medium text-white">{format.type}</p>
                          <p className="text-xs text-gray-400">{format.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Upload History */}
            <div className="space-y-4">
              {uploadHistory.map((upload) => (
                <Card key={upload.id} className="holographic border-dark-accent/10">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(upload.status)}
                        <div>
                          <h3 className="font-medium text-white">{upload.fileName}</h3>
                          <p className="text-sm text-gray-400">
                            {upload.fileType} • {new Date(upload.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getStatusColor(upload.status)}>
                          {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                        </Badge>
                        
                        <div className="flex gap-2">
                          {upload.status === "failed" && upload.errors && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-dark-accent/20" data-testid={`button-view-errors-${upload.id}`}>
                                  <AlertTriangle className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-dark-surface border-dark-accent/20 text-white">
                                <DialogHeader>
                                  <DialogTitle className="text-red-400">Upload Errors</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2">
                                  {upload.errors.map((error, index) => (
                                    <Alert key={index} className="border-red-400/20 bg-red-500/10">
                                      <AlertTriangle className="w-4 h-4 text-red-400" />
                                      <AlertDescription className="text-red-300">
                                        {error}
                                      </AlertDescription>
                                    </Alert>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          
                          <Button size="sm" variant="outline" className="border-dark-accent/20" data-testid={`button-retry-${upload.id}`}>
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          
                          <Button size="sm" variant="outline" className="border-dark-accent/20 text-red-400 hover:bg-red-500/20" data-testid={`button-delete-${upload.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Progress: {upload.processedItems}/{upload.totalItems} items
                        </span>
                        <span className={upload.failedItems > 0 ? "text-red-400" : "text-gray-400"}>
                          {upload.failedItems > 0 && `${upload.failedItems} failed`}
                        </span>
                      </div>
                      <Progress 
                        value={(upload.processedItems / upload.totalItems) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {uploadHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 rounded-lg bg-dark-surface/30 max-w-md mx-auto">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Uploads Yet</h3>
                  <p className="text-gray-400 text-sm">
                    Start by uploading your first batch of content files.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}