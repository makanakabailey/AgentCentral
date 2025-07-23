import type { Agent } from "@shared/schema";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case "dark-accent2":
        return "text-dark-accent2 bg-dark-accent2/10";
      case "dark-accent3":
        return "text-dark-accent3 bg-dark-accent3/10";
      default:
        return "text-dark-accent bg-dark-accent/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-dark-accent";
      case "warning":
        return "bg-dark-accent3";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-dark-accent";
    }
  };

  const colorClass = getColorClass(agent.color);
  const statusColorClass = getStatusColor(agent.status);

  return (
    <div className="holographic rounded-xl p-4 group hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`p-2 lg:p-3 rounded-lg ${colorClass}`}>
          <i className={`${agent.icon} w-4 h-4 lg:w-5 lg:h-5`}></i>
        </div>
        <div className="flex-1">
          <h4 className="text-sm lg:text-base font-semibold text-white">{agent.name}</h4>
          <p className="text-xs text-gray-400">{agent.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${statusColorClass} ${agent.status === 'active' ? 'animate-pulse' : ''}`}></div>
            <span className={`text-xs ${agent.status === 'active' ? 'text-dark-accent' : agent.status === 'warning' ? 'text-dark-accent3' : 'text-gray-500'}`}>
              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
            {agent.tasksCompleted && (
              <>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-400">{agent.tasksCompleted} tasks</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 h-1 bg-dark-primary rounded-full overflow-hidden">
        <div className={`animation-line ${agent.color === 'dark-accent2' ? 'bg-dark-accent2' : 'bg-dark-accent'}`}></div>
      </div>
    </div>
  );
}
