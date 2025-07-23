import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Phone, ArrowLeft, MessageSquare, Mic, PhoneCall, Clock, Brain, Settings, Play, Download, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function VoiceMessagingNegotiator() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const voiceNegotiator = agents?.find(agent => agent.name === "Voice & Messaging Negotiator");

  const handleStartCalls = () => {
    toast({
      title: "Voice Campaign Started",
      description: "Voice & Messaging Negotiator is initiating personalized calls and conversations.",
    });
  };

  const handleOptimizeConversations = () => {
    toast({
      title: "Conversation Optimization",
      description: "AI is optimizing conversation scripts and negotiation strategies.",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-dark-accent/20">
              <Phone className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">VOICE & MESSAGING NEGOTIATOR</h1>
              <p className="text-sm text-gray-400">AI-Powered Conversation Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {voiceNegotiator?.isActive ? "Calling" : "Standby"}
              </span>
            </div>
            
            <button
              onClick={handleOptimizeConversations}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
            >
              <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent" />
            </button>
            
            <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Voice Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Calls Made</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">1.3K</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">total</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Success</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Conversion Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">67%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">success</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Efficient</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Avg Call Duration</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">4.2m</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">optimal</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Mic className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Quality</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Voice Quality</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">96%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">clarity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Conversations */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Active Voice Campaigns</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartCalls}
                  className="p-2 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-dark-accent" />
                </button>
                <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { contact: "Marcus Johnson - InnovateCorp", type: "Sales Call", duration: "5:23", status: "Negotiating", outcome: "Interest: High", conversion: 89 },
                { contact: "Sarah Chen - TechStart Inc", type: "Follow-up", duration: "3:45", status: "Completed", outcome: "Meeting Scheduled", conversion: 95 },
                { contact: "David Kim - ScaleUp Pro", type: "Product Demo", duration: "7:12", status: "In Progress", outcome: "Demo Positive", conversion: 78 },
                { contact: "Elena Rodriguez - GrowthLab", type: "Objection Handling", duration: "4:58", status: "Ongoing", outcome: "Concerns Addressed", conversion: 82 },
                { contact: "Amy Thompson - NextGen", type: "Closing Call", duration: "6:34", status: "Negotiating", outcome: "Price Discussion", conversion: 91 },
              ].map((call, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent/10 hover:border-dark-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white">{call.contact}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          call.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          call.status === 'Negotiating' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-dark-accent/20 text-dark-accent'
                        }`}>
                          {call.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Type: {call.type}</span>
                        <span>Duration: {call.duration}</span>
                        <span className="text-dark-accent">Outcome: {call.outcome}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">{call.conversion}%</div>
                      <div className="text-xs text-gray-400">Conversion</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${call.conversion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 h-1 bg-dark-primary rounded-full overflow-hidden">
              <div className="animation-line bg-dark-accent"></div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            
            {/* Voice Controls */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <Brain className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">Voice Controls</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Auto Dialer</p>
                      <p className="text-xs text-gray-400">Intelligent call sequencing</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Script Optimization</p>
                      <p className="text-xs text-gray-400">AI-powered conversation flow</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Voice Synthesis</p>
                      <p className="text-xs text-gray-400">Natural voice generation</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Call Scheduling</p>
                      <p className="text-xs text-gray-400">Optimal timing analysis</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Negotiation Analytics */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <Phone className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Call Success Rate</span>
                    <span className="text-sm text-dark-accent font-medium">89.3%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[89%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Objection Handling</span>
                    <span className="text-sm text-dark-accent2 font-medium">94.7%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Closing Efficiency</span>
                    <span className="text-sm text-dark-accent font-medium">91.8%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[92%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Conversation Analytics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Call Analytics */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Conversation Analytics</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { metric: "Average Call Duration", value: "4:23", trend: "+12%", optimal: "4-6 min range" },
                { metric: "First Call Resolution", value: "73%", trend: "+8%", optimal: "Above 70%" },
                { metric: "Objection Rate", value: "23%", trend: "-15%", optimal: "Under 25%" },
                { metric: "Follow-up Success", value: "84%", trend: "+18%", optimal: "Above 80%" },
                { metric: "Deal Velocity", value: "12 days", trend: "-6 days", optimal: "Under 14 days" },
              ].map((metric, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{metric.metric}</span>
                    <span className={`text-sm font-medium ${
                      metric.trend.startsWith('+') ? 'text-green-400' : 
                      metric.trend.startsWith('-') && metric.metric === 'Deal Velocity' ? 'text-green-400' :
                      metric.trend.startsWith('-') ? 'text-red-400' : 'text-dark-accent'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-white">{metric.value}</span>
                    <span className="text-xs text-gray-400">{metric.optimal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Negotiator Activity */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Negotiator Activity</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "2 min ago", action: "Closed deal with InnovateCorp - $45K ARR", type: "Success" },
                { time: "8 min ago", action: "Handled pricing objection from TechStart CEO", type: "Objection" },
                { time: "15 min ago", action: "Scheduled follow-up demo for ScaleUp Pro", type: "Follow-up" },
                { time: "23 min ago", action: "Optimized script based on 50 recent calls", type: "Optimization" },
                { time: "31 min ago", action: "Initiated warm call sequence for 12 prospects", type: "Outbound" },
              ].map((activity, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.type === 'Success' ? 'bg-green-500/20 text-green-400' :
                      activity.type === 'Objection' ? 'bg-red-500/20 text-red-400' :
                      activity.type === 'Follow-up' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-dark-accent/20 text-dark-accent'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-sm text-white">{activity.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Status Bar */}
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span>Voice Negotiator: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3 h-3 text-dark-accent" />
              <span>Calls: 1.3K made</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-dark-accent" />
              <span>Conversion: 67% rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-dark-accent" />
              <span>Duration: 4.2m avg</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {voiceNegotiator?.tasksCompleted || 0}</span>
            <span>AI Engine: v3.4</span>
          </div>
        </div>
      </footer>

    </div>
  );
}