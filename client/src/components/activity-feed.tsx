import type { Activity } from "@shared/schema";

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
}

export function ActivityFeed({ activities, loading }: ActivityFeedProps) {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-dark-accent text-dark-accent";
      case "warning":
        return "bg-dark-accent3 text-dark-accent3";
      case "error":
        return "bg-red-500 text-red-500";
      default:
        return "bg-dark-accent2 text-dark-accent2";
    }
  };

  const formatTimeAgo = (timestamp: string | Date) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  if (loading) {
    return (
      <div className="holographic rounded-xl p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl lg:text-2xl font-bold text-white">Activity Feed</h3>
          <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-dark-surface/30 animate-pulse">
              <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="w-48 h-4 bg-gray-600 rounded"></div>
                <div className="w-20 h-3 bg-gray-600 rounded"></div>
              </div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl lg:text-2xl font-bold text-white">Activity Feed</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
          <span className="text-xs text-gray-400">Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="p-4 rounded-lg bg-dark-surface/30 mb-4">
              <i className="fas fa-clock w-8 h-8 text-gray-400 mb-2"></i>
              <p className="text-gray-400">No recent activities</p>
            </div>
          </div>
        ) : (
          activities.map((activity) => {
            const colorClass = getActivityColor(activity.type);
            return (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-dark-surface/30">
                <div className={`p-2 rounded-lg ${colorClass.replace('text-', 'bg-').replace('dark-accent', 'dark-accent/10').replace('dark-accent2', 'dark-accent2/10').replace('dark-accent3', 'dark-accent3/10')}`}>
                  <i className={`${activity.icon} w-4 h-4 ${colorClass.split(' ')[1]}`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.message}</p>
                  <p className="text-xs text-gray-400">
                    {activity.timestamp ? formatTimeAgo(activity.timestamp) : "Recently"}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full ${colorClass.split(' ')[0]}`}></div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-4 h-1 bg-dark-primary rounded-full overflow-hidden">
        <div className="animation-line bg-dark-accent"></div>
      </div>
    </div>
  );
}
