import type { PerformanceMetrics } from "@shared/schema";
import { Maximize2 } from "lucide-react";

interface PerformanceMetricsProps {
  metrics?: PerformanceMetrics;
  loading?: boolean;
}

export function PerformanceMetrics({ metrics, loading }: PerformanceMetricsProps) {
  if (loading) {
    return (
      <div className="holographic rounded-xl p-4 lg:p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl lg:text-2xl font-bold text-white">Performance Metrics</h3>
          <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="w-32 h-4 bg-gray-600 rounded"></div>
                <div className="w-16 h-4 bg-gray-600 rounded"></div>
              </div>
              <div className="w-full bg-dark-primary rounded-full h-3">
                <div className="h-3 w-3/4 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl lg:text-2xl font-bold text-white">Performance Metrics</h3>
          <button className="p-2 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors">
            <Maximize2 className="w-4 h-4 text-dark-accent" />
          </button>
        </div>
        
        <div className="text-center py-8">
          <div className="p-4 rounded-lg bg-dark-surface/30 mb-4">
            <i className="fas fa-chart-line w-8 h-8 text-gray-400 mb-2"></i>
            <p className="text-gray-400">No performance data available</p>
          </div>
        </div>
      </div>
    );
  }

  const engagementRate = metrics.engagementRate / 100; // Convert from stored format
  const contentQualityScore = metrics.contentQualityScore / 100; // Convert from stored format
  const responseTime = metrics.responseTime / 1000; // Convert to seconds

  const trendData = Array.isArray(metrics.trendData) ? metrics.trendData : [60, 45, 70, 55, 80, 65, 90, 75, 85, 95];

  return (
    <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl lg:text-2xl font-bold text-white">Performance Metrics</h3>
        <button className="p-2 rounded-lg bg-dark-accent/10 hover:bg-dark-accent/20 transition-colors">
          <Maximize2 className="w-4 h-4 text-dark-accent" />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Engagement Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Engagement Rate</span>
            <span className="text-sm font-bold gradient-text">+{engagementRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-dark-primary rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
              style={{ width: `${Math.min(engagementRate * 6, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Content Quality Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Content Quality Score</span>
            <span className="text-sm font-bold gradient-text">{contentQualityScore.toFixed(1)}/10</span>
          </div>
          <div className="w-full bg-dark-primary rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent transition-all duration-1000"
              style={{ width: `${contentQualityScore * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Response Time */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Avg Response Time</span>
            <span className="text-sm font-bold gradient-text">{responseTime.toFixed(1)}s</span>
          </div>
          <div className="w-full bg-dark-primary rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 transition-all duration-1000"
              style={{ width: `${Math.max(100 - (responseTime * 20), 20)}%` }}
            ></div>
          </div>
        </div>

        {/* Sparkline Visualization */}
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-3">Performance Trend (24h)</p>
          <div className="flex items-end justify-between h-16 gap-1">
            {trendData.map((value, index) => (
              <div
                key={index}
                className="w-2 bg-gradient-to-t from-dark-accent/30 to-dark-accent rounded-full animate-pulse"
                style={{ 
                  height: `${value}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-1 bg-dark-primary rounded-full overflow-hidden">
        <div className="animation-line bg-dark-accent2"></div>
      </div>
    </div>
  );
}
