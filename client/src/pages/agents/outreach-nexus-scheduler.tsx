import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Calendar, ArrowLeft, Clock, Plus, Edit, Trash2, Play, Pause, Users, MessageSquare, Mail, Phone, Target, Settings, Bell, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const mockScheduledItems = [
  {
    id: 1,
    title: "LinkedIn Outreach - SaaS Executives",
    type: "campaign",
    platform: "linkedin",
    scheduledTime: "2024-01-20T09:00:00Z",
    status: "scheduled",
    campaignId: 1,
    contactCount: 45,
    description: "First touch point for Q1 SaaS executive campaign"
  },
  {
    id: 2,
    title: "Follow-up Email Sequence",
    type: "email",
    platform: "email",
    scheduledTime: "2024-01-20T14:30:00Z",
    status: "scheduled",
    campaignId: 1,
    contactCount: 23,
    description: "Follow-up for LinkedIn connections from yesterday"
  },
  {
    id: 3,
    title: "Twitter Engagement Push",
    type: "social",
    platform: "twitter",
    scheduledTime: "2024-01-21T10:00:00Z",
    status: "scheduled",
    campaignId: 3,
    contactCount: 67,
    description: "Engage with startup founder tweets and comments"
  },
  {
    id: 4,
    title: "Cold Call Reminder Setup",
    type: "phone",
    platform: "phone",
    scheduledTime: "2024-01-21T16:00:00Z",
    status: "running",
    campaignId: 2,
    contactCount: 12,
    description: "Schedule phone calls for warm leads"
  },
  {
    id: 5,
    title: "Weekend Social Media Check",
    type: "social",
    platform: "multi",
    scheduledTime: "2024-01-22T11:00:00Z",
    status: "scheduled",
    campaignId: 4,
    contactCount: 89,
    description: "Monitor social media for engagement opportunities"
  }
];

const platforms = [
  { value: "linkedin", label: "LinkedIn", icon: "💼", color: "text-blue-400" },
  { value: "email", label: "Email", icon: "📧", color: "text-green-400" },
  { value: "twitter", label: "Twitter", icon: "🐦", color: "text-cyan-400" },
  { value: "phone", label: "Phone", icon: "📞", color: "text-yellow-400" },
  { value: "multi", label: "Multi-Platform", icon: "🌐", color: "text-purple-400" }
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export default function OutreachNexusScheduler() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    type: "",
    platform: "",
    scheduledDate: "",
    scheduledTime: "",
    campaignId: "",
    contactCount: "",
    description: "",
    recurring: false,
    notifications: true
  });

  const createScheduleMutation = useMutation({
    mutationFn: async (scheduleData: any) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, scheduleId: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: (data) => {
      toast({
        title: "Schedule Created",
        description: `New outreach scheduled successfully. ID: ${data.scheduleId}`,
      });
      setIsCreateDialogOpen(false);
      setNewSchedule({
        title: "",
        type: "",
        platform: "",
        scheduledDate: "",
        scheduledTime: "",
        campaignId: "",
        contactCount: "",
        description: "",
        recurring: false,
        notifications: true
      });
    }
  });

  const toggleScheduleMutation = useMutation({
    mutationFn: async ({ scheduleId, action }: { scheduleId: number, action: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, action };
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Schedule Updated",
        description: `Schedule has been ${variables.action === "pause" ? "paused" : "resumed"}.`,
      });
    }
  });

  const getPlatformIcon = (platform: string) => {
    return platforms.find(p => p.value === platform)?.icon || "📋";
  };

  const getPlatformColor = (platform: string) => {
    return platforms.find(p => p.value === platform)?.color || "text-gray-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-500/20 text-blue-400 border-blue-400/30";
      case "running": return "bg-green-500/20 text-green-400 border-green-400/30";
      case "paused": return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "completed": return "bg-gray-500/20 text-gray-400 border-gray-400/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-400/30";
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getScheduledItemsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockScheduledItems.filter(item => 
      item.scheduledTime.split('T')[0] === dateStr
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
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
              <Calendar className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">OUTREACH SCHEDULER</h1>
              <p className="text-sm text-gray-400">Campaign Timing & Automation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-dark-surface/50 border border-dark-accent/20 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("calendar")}
                className={`rounded-r-none ${viewMode === "calendar" ? "bg-orange-500/20 text-orange-400" : ""}`}
                data-testid="button-calendar-view"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-l-none ${viewMode === "list" ? "bg-orange-500/20 text-orange-400" : ""}`}
                data-testid="button-list-view"
              >
                <Clock className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" data-testid="button-schedule-outreach">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Outreach
                </Button>
              </DialogTrigger>
              
              <DialogContent className="bg-dark-surface border-dark-accent/20 text-white sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Schedule New Outreach</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="schedule-title">Title</Label>
                    <Input
                      id="schedule-title"
                      placeholder="Enter outreach title..."
                      value={newSchedule.title}
                      onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-schedule-title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schedule-type">Type</Label>
                      <Select value={newSchedule.type} onValueChange={(value) => setNewSchedule({...newSchedule, type: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-schedule-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          <SelectItem value="campaign">Campaign Launch</SelectItem>
                          <SelectItem value="email">Email Sequence</SelectItem>
                          <SelectItem value="social">Social Engagement</SelectItem>
                          <SelectItem value="phone">Phone Calls</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="schedule-platform">Platform</Label>
                      <Select value={newSchedule.platform} onValueChange={(value) => setNewSchedule({...newSchedule, platform: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white" data-testid="select-schedule-platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          {platforms.map(platform => (
                            <SelectItem key={platform.value} value={platform.value}>
                              {platform.icon} {platform.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schedule-date">Date</Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={newSchedule.scheduledDate}
                        onChange={(e) => setNewSchedule({...newSchedule, scheduledDate: e.target.value})}
                        className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black [color-scheme:dark]"
                        data-testid="input-schedule-date"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="schedule-time">Time</Label>
                      <Select value={newSchedule.scheduledTime} onValueChange={(value) => setNewSchedule({...newSchedule, scheduledTime: value})}>
                        <SelectTrigger className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-black" data-testid="select-schedule-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-surface border-dark-accent/20">
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-count">Contact Count</Label>
                    <Input
                      id="contact-count"
                      type="number"
                      placeholder="Number of contacts to reach"
                      value={newSchedule.contactCount}
                      onChange={(e) => setNewSchedule({...newSchedule, contactCount: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      data-testid="input-contact-count"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="schedule-description">Description</Label>
                    <Textarea
                      id="schedule-description"
                      placeholder="Describe this outreach activity..."
                      value={newSchedule.description}
                      onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                      className="mt-2 bg-dark-primary/50 border-dark-accent/20 text-white"
                      rows={3}
                      data-testid="textarea-schedule-description"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="recurring"
                        checked={newSchedule.recurring}
                        onCheckedChange={(checked) => setNewSchedule({...newSchedule, recurring: checked})}
                        data-testid="switch-recurring"
                      />
                      <Label htmlFor="recurring" className="text-sm">Recurring schedule</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="notifications"
                        checked={newSchedule.notifications}
                        onCheckedChange={(checked) => setNewSchedule({...newSchedule, notifications: checked})}
                        data-testid="switch-notifications"
                      />
                      <Label htmlFor="notifications" className="text-sm">Enable notifications</Label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-dark-accent/20 text-gray-300"
                      onClick={() => setIsCreateDialogOpen(false)}
                      data-testid="button-cancel-schedule"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={() => createScheduleMutation.mutate(newSchedule)}
                      disabled={createScheduleMutation.isPending || !newSchedule.title || !newSchedule.type}
                      data-testid="button-confirm-schedule"
                    >
                      {createScheduleMutation.isPending ? "Scheduling..." : "Schedule"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {viewMode === "calendar" ? (
          <>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white">
                  {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("prev")}
                    className="border-dark-accent/20 hover:bg-dark-accent/20"
                    data-testid="button-prev-month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                    className="border-dark-accent/20 hover:bg-dark-accent/20"
                    data-testid="button-today"
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("next")}
                    className="border-dark-accent/20 hover:bg-dark-accent/20"
                    data-testid="button-next-month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                {mockScheduledItems.length} Scheduled Items
              </Badge>
            </div>

            {/* Calendar Grid */}
            <Card className="holographic border-dark-accent/10">
              <CardContent className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: getFirstDayOfMonth(selectedDate) }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-24 p-2"></div>
                  ))}
                  
                  {/* Days of the month */}
                  {Array.from({ length: getDaysInMonth(selectedDate) }).map((_, index) => {
                    const day = index + 1;
                    const cellDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                    const scheduledItems = getScheduledItemsForDate(cellDate);
                    const isToday = cellDate.toDateString() === new Date().toDateString();
                    
                    return (
                      <div
                        key={day}
                        className={`h-24 p-2 rounded-lg border transition-colors cursor-pointer ${
                          isToday 
                            ? "bg-orange-500/10 border-orange-400/30" 
                            : "bg-dark-surface/30 border-dark-accent/10 hover:border-dark-accent/30"
                        }`}
                        data-testid={`calendar-day-${day}`}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday ? "text-orange-400" : "text-white"}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {scheduledItems.slice(0, 2).map(item => (
                            <div
                              key={item.id}
                              className="text-xs p-1 rounded bg-dark-accent/20 text-dark-accent truncate"
                              title={item.title}
                            >
                              {getPlatformIcon(item.platform)} {formatTime(item.scheduledTime)}
                            </div>
                          ))}
                          {scheduledItems.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{scheduledItems.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* List View */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Scheduled Outreach</h2>
              <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                {mockScheduledItems.length} Items
              </Badge>
            </div>
            
            {mockScheduledItems.map((item) => (
              <Card key={item.id} className="holographic border-dark-accent/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{getPlatformIcon(item.platform)}</span>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div>
                          <span className="text-white">Date:</span> {formatDate(item.scheduledTime)}
                        </div>
                        <div>
                          <span className="text-white">Time:</span> {formatTime(item.scheduledTime)}
                        </div>
                        <div>
                          <span className="text-white">Contacts:</span> {item.contactCount}
                        </div>
                        <div>
                          <span className="text-white">Platform:</span> 
                          <span className={getPlatformColor(item.platform)}> {item.platform}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {item.status === "scheduled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-400/30 text-green-400 hover:bg-green-500/20"
                          onClick={() => toggleScheduleMutation.mutate({ scheduleId: item.id, action: "play" })}
                          data-testid={`button-start-${item.id}`}
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                      )}
                      
                      {item.status === "running" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-500/20"
                          onClick={() => toggleScheduleMutation.mutate({ scheduleId: item.id, action: "pause" })}
                          data-testid={`button-pause-${item.id}`}
                        >
                          <Pause className="w-3 h-3" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-dark-accent/20 hover:bg-dark-accent/20"
                        data-testid={`button-edit-schedule-${item.id}`}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-400/20 text-red-400 hover:bg-red-500/20"
                        data-testid={`button-delete-schedule-${item.id}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}