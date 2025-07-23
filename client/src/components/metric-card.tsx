interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  status: string;
  percentage?: number;
  badge?: string;
  badgeText?: string;
  progressValue?: number;
  color: "dark-accent" | "dark-accent2" | "dark-accent3";
  loading?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  status,
  percentage,
  badge,
  badgeText,
  progressValue,
  color,
  loading
}: MetricCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "dark-accent2":
        return {
          iconBg: "bg-dark-accent2/10",
          iconText: "text-dark-accent2",
          statusDot: "bg-dark-accent2",
          statusText: "text-dark-accent2",
          badgeBg: "bg-dark-accent2/20",
          badgeText: "text-dark-accent2",
          progressBg: "bg-dark-accent2",
          animationLine: "bg-dark-accent2",
          glow: "info-glow"
        };
      case "dark-accent3":
        return {
          iconBg: "bg-dark-accent3/10",
          iconText: "text-dark-accent3",
          statusDot: "bg-dark-accent3",
          statusText: "text-dark-accent3",
          badgeBg: "bg-dark-accent3/20",
          badgeText: "text-dark-accent3",
          progressBg: "bg-dark-accent3",
          animationLine: "bg-dark-accent3",
          glow: "warning-glow"
        };
      default:
        return {
          iconBg: "bg-dark-accent/10",
          iconText: "text-dark-accent",
          statusDot: "bg-dark-accent",
          statusText: "text-dark-accent",
          badgeBg: "bg-dark-accent/20",
          badgeText: "text-dark-accent",
          progressBg: "bg-dark-accent",
          animationLine: "bg-dark-accent",
          glow: "metric-glow"
        };
    }
  };

  const colors = getColorClasses(color);

  if (loading) {
    return (
      <div className="holographic rounded-xl p-4 lg:p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 lg:p-3 rounded-lg ${colors.iconBg}`}>
            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gray-600 rounded"></div>
          </div>
          <div className="w-16 h-4 bg-gray-600 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-20 h-4 bg-gray-600 rounded"></div>
          <div className="w-32 h-8 bg-gray-600 rounded"></div>
          <div className="w-24 h-4 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="holographic rounded-xl p-4 lg:p-6 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 lg:p-3 rounded-lg ${colors.iconBg}`}>
          <i className={`${icon} w-5 h-5 lg:w-6 lg:h-6 ${colors.iconText}`}></i>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colors.statusDot} animate-pulse`}></div>
          <span className="text-xs text-gray-400">{status}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs lg:text-sm text-gray-400 font-medium">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl lg:text-3xl font-bold text-white gradient-text ${colors.glow}`}>
            {value}
          </span>
          <span className="text-sm lg:text-base text-gray-400 font-medium">{subtitle}</span>
        </div>
        
        {badge && badgeText && (
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
              {badge}
            </span>
            <span className="text-xs text-gray-400">{badgeText}</span>
          </div>
        )}

        {percentage !== undefined && (
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
              {percentage}%
            </span>
            <span className="text-xs text-gray-400">System Health</span>
          </div>
        )}

        {progressValue !== undefined && (
          <div className="w-full bg-dark-primary rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r from-${color} to-dark-accent transition-all duration-1000`}
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="mt-4 h-1 bg-dark-primary rounded-full overflow-hidden">
        <div className={`animation-line ${colors.animationLine}`}></div>
      </div>
    </div>
  );
}
