import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Database, Maximize2 } from "lucide-react";

export function DatabaseStatus() {
  const { data: databaseStats, isLoading } = useQuery({
    queryKey: ["/api/database/stats"],
    queryFn: api.getDatabaseStats,
    refetchInterval: 60000, // Refresh every minute
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="holographic rounded-xl p-4 lg:p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-white">Database Status</h3>
          <div className="w-20 h-4 bg-gray-600 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-dark-surface/30 rounded-lg p-4">
              <div className="h-16 bg-gray-600 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl lg:text-2xl font-bold text-white">Database Status</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
            <span className="text-xs text-gray-400">Synced</span>
          </div>
          <button className="p-2 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors">
            <Database className="w-4 h-4 text-dark-accent2" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {databaseStats?.map((stats) => (
          <div key={stats.id} className="bg-dark-surface/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                stats.name.includes('Analytics') || stats.name.includes('User') ? 'bg-dark-accent2/10' : 'bg-dark-accent/10'
              }`}>
                <i className={`${stats.icon} w-4 h-4 ${
                  stats.name.includes('Analytics') || stats.name.includes('User') ? 'text-dark-accent2' : 'text-dark-accent'
                }`}></i>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{stats.name}</h4>
                <p className="text-xs text-gray-400">{stats.description}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Records</span>
                <span className="text-xs text-white font-medium">{formatNumber(stats.records)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Size</span>
                <span className={`text-xs font-medium ${
                  stats.name.includes('Analytics') || stats.name.includes('User') ? 'text-dark-accent2' : 'text-dark-accent'
                }`}>
                  {formatBytes(stats.sizeBytes)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 h-1 bg-dark-primary rounded-full overflow-hidden">
        <div className="animation-line bg-dark-accent2"></div>
      </div>
    </div>
  );
}
