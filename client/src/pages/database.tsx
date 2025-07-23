import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Database, Search, Filter, Download, Upload, RefreshCw, Settings, Table, BarChart3, FileText, Users, Wrench, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function DatabaseManagement() {
  const { toast } = useToast();

  const { data: databaseStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/database/stats"],
    queryFn: api.getDatabaseStats,
    refetchInterval: 30000,
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

  const totalRecords = databaseStats?.reduce((sum, db) => sum + db.records, 0) || 0;
  const totalSize = databaseStats?.reduce((sum, db) => sum + db.sizeBytes, 0) || 0;

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Database export initiated. You'll receive a download link shortly.",
    });
  };

  const handleBackupData = () => {
    toast({
      title: "Backup Created",
      description: "Full database backup completed successfully.",
    });
  };

  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-lg border-b border-dark-accent2/20 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="p-2 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="p-3 rounded-lg bg-dark-accent2/20">
              <Database className="w-6 h-6 text-dark-accent2" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">DATABASE MANAGER</h1>
              <p className="text-sm text-gray-400">Shared Data & Analytics Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
              <span className="text-xs text-gray-400">Synced</span>
            </div>
            
            <button
              onClick={handleBackupData}
              className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
            >
              <Download className="w-4 h-4 lg:w-5 lg:h-5 text-dark-accent2" />
            </button>
            
            <button className="p-2 lg:p-3 rounded-lg bg-dark-secondary/50 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 lg:p-6 space-y-6">
        
        {/* Database Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-dark-accent2/20">
              <BarChart3 className="w-6 h-6 text-dark-accent2" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold gradient-text">System Overview</h2>
              <p className="text-sm lg:text-base text-gray-400">Real-time database metrics and management</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex bg-dark-secondary/50 rounded-lg p-1">
              <button className="px-3 py-1 rounded-md text-sm font-medium transition-all bg-dark-accent2 text-dark-primary">Live</button>
              <button className="px-3 py-1 rounded-md text-sm font-medium transition-all text-gray-400 hover:text-white">Tables</button>
              <button className="px-3 py-1 rounded-md text-sm font-medium transition-all text-gray-400 hover:text-white">Queries</button>
              <button className="px-3 py-1 rounded-md text-sm font-medium transition-all text-gray-400 hover:text-white">Logs</button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Table className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Active</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Total Tables</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">
                  {databaseStats?.length || 0}
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">active</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Total Records</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">
                  {formatNumber(totalRecords)}
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">entries</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent2/10">
                <Database className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                <span className="text-xs text-gray-400">Optimal</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Storage Used</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text info-glow">
                  {formatBytes(totalSize)}
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">total</span>
              </div>
            </div>
          </div>

          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 lg:p-3 rounded-lg bg-dark-accent/10">
                <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6 text-dark-accent" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                <span className="text-xs text-gray-400">Real-time</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs lg:text-sm text-gray-400 font-medium">Sync Status</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white gradient-text metric-glow">
                  100%
                </span>
                <span className="text-sm lg:text-base text-gray-400 font-medium">synced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Database Tables Grid */}
        <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-white">Database Tables</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search tables..." 
                  className="bg-dark-surface/50 border border-dark-accent2/20 rounded-lg px-3 py-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-dark-accent2"
                />
              </div>
              <button 
                onClick={handleExportData}
                className="p-2 rounded-lg bg-dark-accent2/10 hover:bg-dark-accent2/20 transition-colors"
              >
                <Download className="w-4 h-4 text-dark-accent2" />
              </button>
            </div>
          </div>
          
          {statsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-dark-surface/30 rounded-lg p-4 animate-pulse">
                  <div className="h-16 bg-gray-600 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {databaseStats?.map((stats) => (
                <div key={stats.id} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent2/10 hover:border-dark-accent2/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${
                      stats.name.includes('Analytics') || stats.name.includes('User') ? 'bg-dark-accent2/10' : 'bg-dark-accent/10'
                    }`}>
                      <i className={`${stats.icon} w-5 h-5 ${
                        stats.name.includes('Analytics') || stats.name.includes('User') ? 'text-dark-accent2' : 'text-dark-accent'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white">{stats.name}</h4>
                      <p className="text-xs text-gray-400">{stats.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Records</span>
                      <span className="text-sm text-white font-medium">{formatNumber(stats.records)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Size</span>
                      <span className={`text-sm font-medium ${
                        stats.name.includes('Analytics') || stats.name.includes('User') ? 'text-dark-accent2' : 'text-dark-accent'
                      }`}>
                        {formatBytes(stats.sizeBytes)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Last Sync</span>
                      <span className="text-xs text-gray-500">
                        {stats.lastSync ? new Date(stats.lastSync).toLocaleTimeString() : 'Never'}
                      </span>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="w-full bg-dark-primary rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          stats.name.includes('Analytics') || stats.name.includes('User') 
                            ? 'from-dark-accent2 to-dark-accent' 
                            : 'from-dark-accent to-dark-accent2'
                        } transition-all duration-1000`}
                        style={{ width: `${Math.min((stats.records / 100000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 h-1 bg-dark-primary rounded-full overflow-hidden">
            <div className="animation-line bg-dark-accent2"></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Database Tools */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-dark-accent/20">
                <Wrench className="w-6 h-6 text-dark-accent" />
              </div>
              <h3 className="text-xl font-bold text-white">Database Tools</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-dark-accent" />
                  <div>
                    <p className="text-sm font-medium text-white">Optimize Tables</p>
                    <p className="text-xs text-gray-400">Run database optimization</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                <div className="flex items-center gap-3">
                  <Upload className="w-4 h-4 text-dark-accent" />
                  <div>
                    <p className="text-sm font-medium text-white">Import Data</p>
                    <p className="text-xs text-gray-400">Upload CSV or JSON files</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 rounded-lg bg-dark-surface/50 text-left hover:bg-dark-surface transition-colors">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-dark-accent" />
                  <div>
                    <p className="text-sm font-medium text-white">Query Builder</p>
                    <p className="text-xs text-gray-400">Create custom queries</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Agent Database Access */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-dark-accent2/20">
                <Users className="w-6 h-6 text-dark-accent2" />
              </div>
              <h3 className="text-xl font-bold text-white">Agent Access</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-dark-surface/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Discovery Agent</span>
                  </div>
                  <span className="text-xs text-dark-accent">Read/Write</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-dark-surface/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Lead Scout Agent</span>
                  </div>
                  <span className="text-xs text-dark-accent2">Read/Write</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-dark-surface/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Performance Oracle</span>
                  </div>
                  <span className="text-xs text-dark-accent">Read Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-dark-accent2/20">
                <BarChart3 className="w-6 h-6 text-dark-accent2" />
              </div>
              <h3 className="text-xl font-bold text-white">System Health</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Connection Pool</span>
                  <span className="text-sm text-dark-accent2 font-medium">98%</span>
                </div>
                <div className="w-full bg-dark-primary rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[98%] transition-all duration-1000"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Query Performance</span>
                  <span className="text-sm text-dark-accent font-medium">94%</span>
                </div>
                <div className="w-full bg-dark-primary rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent to-dark-accent2 w-[94%] transition-all duration-1000"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Storage Efficiency</span>
                  <span className="text-sm text-dark-accent2 font-medium">91%</span>
                </div>
                <div className="w-full bg-dark-primary rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-dark-accent2 to-dark-accent w-[91%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Status Bar */}
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent2/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent2 animate-pulse"></div>
              <span>Database Status: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-dark-accent2" />
              <span>Tables: {databaseStats?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3 text-dark-accent2" />
              <span>Records: {formatNumber(totalRecords)}</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3 h-3 text-dark-accent2" />
              <span>Last Sync: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>DB Engine: PostgreSQL</span>
            <span>v14.9</span>
          </div>
        </div>
      </footer>

    </div>
  );
}