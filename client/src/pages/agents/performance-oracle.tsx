import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Brain, ArrowLeft, TrendingUp, BarChart3, Zap, Target, Eye, Settings, Play, Download, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function PerformanceOracle() {
  const { toast } = useToast();

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const { data: performanceMetrics } = useQuery({
    queryKey: ["/api/metrics/performance"],
    queryFn: api.getPerformanceMetrics,
    refetchInterval: 5000,
  });

  const performanceOracle = agents?.find(agent => agent.name === "Performance Oracle");

  const handleRunOptimization = () => {
    toast({
      title: "Optimization Started",
      description: "Performance Oracle is analyzing and optimizing all active campaigns.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Comprehensive performance analysis report has been created.",
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
              <Brain className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">PERFORMANCE ORACLE</h1>
              <p className="text-sm text-gray-400">Predictive Analytics Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span className="text-xs text-gray-400">
                {performanceOracle?.isActive ? "Analyzing" : "Standby"}
              </span>
            </div>
            
            <button
              onClick={handleGenerateReport}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
            >
              <Download className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent" />
            </button>
            
            <Link href="/agents/performance-oracle/settings">
              <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Oracle Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Engagement Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">
                  {performanceMetrics?.engagementRate || '1230'}
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">avg</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Quality</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Content Quality</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">
                  {performanceMetrics?.contentQualityScore || '87'}%
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">score</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Fast</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Response Time</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">
                  {performanceMetrics?.responseTime ? (performanceMetrics.responseTime / 1000).toFixed(1) : '1.8'}s
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">avg</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Target className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Optimal</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Conversion Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">23.4%</span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">avg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link href="/agents/performance-oracle/controls">
            <div className="holographic rounded-xl p-6 group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Oracle Controls</h3>
                  <p className="text-sm text-gray-400">Manage analytics modules and optimization</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/agents/performance-oracle/settings">
            <div className="holographic rounded-xl p-6 group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Settings className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Settings</h3>
                  <p className="text-sm text-gray-400">Configure AI models and thresholds</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Performance Trends */}
          <div className="lg:col-span-2 holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Predictive Performance Analysis</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunOptimization}
                  className="p-2 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-dark-accent" />
                </button>
                <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* Trend Chart Visualization */}
            <div className="bg-dark-surface/30 rounded-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Engagement Trend (7 Days)</h4>
                <div className="text-sm text-dark-accent">+32% improvement</div>
              </div>
              
              <div className="h-32 flex items-end gap-2">
                {(performanceMetrics?.trendData as number[] || [60, 45, 70, 55, 80, 65, 90, 75, 85, 95]).map((value: number, index: number) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-dark-accent to-dark-accent2 rounded-t-sm transition-all duration-1000 min-h-[4px]"
                      style={{ height: `${value}%` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-1">{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { metric: "Campaign Performance", current: 94, predicted: 97, trend: "+3%", status: "Optimizing" },
                { metric: "Content Engagement", current: 87, predicted: 91, trend: "+4%", status: "Improving" },
                { metric: "Lead Conversion", current: 73, predicted: 78, trend: "+5%", status: "Strong" },
                { metric: "Audience Growth", current: 156, predicted: 189, trend: "+21%", status: "Accelerating" },
              ].map((item, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent/10 hover:border-dark-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white">{item.metric}</h4>
                        <span className="px-2 py-1 bg-dark-accent/20 text-dark-accent text-xs rounded-full">
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Current: {item.current}%</span>
                        <span className="text-dark-accent">Predicted: {item.predicted}% ({item.trend})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white gradient-text">{item.predicted}%</div>
                      <div className="text-xs text-gray-400">Forecast</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${item.predicted}%` }}
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
            
            {/* Oracle Controls */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent2/20">
                  <Brain className="w-6 h-6 text-dark-accent2" />
                </div>
                <h3 className="text-xl font-bold text-white">Oracle Controls</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Trend Analysis</p>
                      <p className="text-xs text-gray-400">Deep pattern recognition</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Auto-Optimization</p>
                      <p className="text-xs text-gray-400">Continuous improvement</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Predictive Insights</p>
                      <p className="text-xs text-gray-400">Future performance modeling</p>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-dark-accent" />
                    <div>
                      <p className="text-sm font-medium text-white">Custom Reports</p>
                      <p className="text-xs text-gray-400">Detailed analytics exports</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Oracle Performance */}
            <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-dark-accent/20">
                  <Zap className="w-6 h-6 text-dark-accent" />
                </div>
                <h3 className="text-xl font-bold text-white">Oracle Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Prediction Accuracy</span>
                    <span className="text-sm text-dark-accent font-medium">98.7%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[99%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Analysis Speed</span>
                    <span className="text-sm text-dark-accent2 font-medium">0.8s avg</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Optimization Rate</span>
                    <span className="text-sm text-dark-accent font-medium">96.2%</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[96%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Optimization Recommendations & Recent Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* AI Recommendations */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">AI Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { priority: "High", action: "Increase LinkedIn posting frequency by 40%", impact: "+18% engagement", confidence: 94 },
                { priority: "Medium", action: "Optimize email subject lines using A/B testing", impact: "+12% open rate", confidence: 87 },
                { priority: "High", action: "Shift content timing to 2-4 PM EST", impact: "+24% reach", confidence: 91 },
                { priority: "Low", action: "Experiment with video content format", impact: "+8% retention", confidence: 76 },
                { priority: "Medium", action: "Refine audience targeting parameters", impact: "+15% conversions", confidence: 83 },
              ].map((rec, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                      rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {rec.priority} Priority
                    </span>
                    <span className="text-sm text-dark-accent font-medium">{rec.confidence}% confidence</span>
                  </div>
                  <p className="text-sm text-white mb-2">{rec.action}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Expected Impact:</span>
                    <span className="text-xs text-dark-accent2 font-medium">{rec.impact}</span>
                  </div>
                  <div className="w-full bg-dark-primary rounded-full h-1 mt-2">
                    <div 
                      className="h-1 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
                      style={{ width: `${rec.confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Oracle Activity */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Oracle Activity</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { time: "30s ago", action: "Optimized 5 campaigns for better engagement", improvement: "+32%" },
                { time: "2 min ago", action: "Analyzed content performance across platforms", improvement: "+18%" },
                { time: "8 min ago", action: "Generated predictive model for next quarter", improvement: "94% accuracy" },
                { time: "15 min ago", action: "Identified high-performing content patterns", improvement: "+24%" },
                { time: "23 min ago", action: "Optimized audience targeting parameters", improvement: "+15%" },
              ].map((activity, index) => (
                <div key={index} className="bg-dark-surface/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="text-xs text-dark-accent font-medium">{activity.improvement}</span>
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
              <span>Performance Oracle: Analyzing</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-dark-accent" />
              <span>Engagement: {performanceMetrics?.engagementRate || '1230'}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3 h-3 text-dark-accent" />
              <span>Quality: {performanceMetrics?.contentQualityScore || '87'}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-dark-accent" />
              <span>Speed: {performanceMetrics?.responseTime ? (performanceMetrics.responseTime / 1000).toFixed(1) : '1.8'}s</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Tasks Completed: {performanceOracle?.tasksCompleted || 0}</span>
            <span>AI Engine: v4.2</span>
          </div>
        </div>
      </footer>

    </div>
  );
}