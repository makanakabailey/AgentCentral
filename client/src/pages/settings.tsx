import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Settings, ArrowLeft, User, Bell, Shield, Database, Palette, Zap, Save, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const { data: agents } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: api.getAgents,
    refetchInterval: 30000,
  });

  const { data: systemMetrics } = useQuery({
    queryKey: ["/api/metrics/system"],
    queryFn: api.getSystemMetrics,
    refetchInterval: 10000,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration changes have been successfully saved.",
    });
  };

  const handleResetToDefaults = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to their default values.",
    });
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "agents", label: "AI Agents", icon: Zap },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "database", label: "Database", icon: Database },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

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
              <Settings className="w-6 h-6 text-dark-accent" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold gradient-text">DASHBOARD SETTINGS</h1>
              <p className="text-sm text-gray-400">Central Configuration Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetToDefaults}
              className="p-2 lg:p-3 rounded-lg bg-dark-surface/50 hover:bg-dark-surface transition-colors text-gray-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 lg:px-6 lg:py-3 rounded-lg bg-dark-accent/20 hover:bg-dark-accent/30 transition-colors text-dark-accent font-medium"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        
        {/* Settings Navigation */}
        <div className="w-64 bg-dark-secondary/50 border-r border-dark-accent/20 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.id
                      ? "bg-dark-accent/20 text-dark-accent border border-dark-accent/30"
                      : "text-gray-400 hover:text-white hover:bg-dark-surface/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 overflow-auto">
          
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="holographic rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">General Configuration</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Dashboard Name</label>
                      <input
                        type="text"
                        defaultValue="Social Connect Central Dashboard"
                        className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white focus:border-dark-accent/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                      <input
                        type="text"
                        defaultValue="AI Analytics Corp"
                        className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white focus:border-dark-accent/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white focus:border-dark-accent/50 focus:outline-none">
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="EST">EST (Eastern Standard Time)</option>
                        <option value="PST">PST (Pacific Standard Time)</option>
                        <option value="GMT">GMT (Greenwich Mean Time)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Refresh Interval</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white focus:border-dark-accent/50 focus:outline-none">
                        <option value="5">5 seconds</option>
                        <option value="10">10 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="60">1 minute</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white focus:border-dark-accent/50 focus:outline-none">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="autoSave"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="autoSave" className="text-sm text-gray-300">Enable auto-save</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Agents Settings */}
          {activeTab === "agents" && (
            <div className="space-y-6">
              <div className="holographic rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">AI Agent Configuration</h3>
                <div className="space-y-6">
                  {agents?.map((agent, index) => (
                    <div key={index} className="bg-dark-surface/30 rounded-lg p-4 border border-dark-accent/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{agent.name}</h4>
                          <p className="text-sm text-gray-400">{agent.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={agent.isActive}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-dark-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dark-accent"></div>
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Priority Level</label>
                          <select className="w-full p-2 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white text-sm">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Max Concurrent Tasks</label>
                          <input
                            type="number"
                            defaultValue="5"
                            min="1"
                            max="20"
                            className="w-full p-2 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Execution Interval</label>
                          <select className="w-full p-2 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white text-sm">
                            <option value="1">1 minute</option>
                            <option value="5">5 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="holographic rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Notification Preferences</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">System Notifications</h4>
                    {[
                      { id: "agent-status", label: "Agent Status Changes", defaultChecked: true },
                      { id: "performance-alerts", label: "Performance Alerts", defaultChecked: true },
                      { id: "error-notifications", label: "Error Notifications", defaultChecked: true },
                      { id: "system-updates", label: "System Updates", defaultChecked: false },
                    ].map((notif) => (
                      <div key={notif.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={notif.id}
                          defaultChecked={notif.defaultChecked}
                          className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                        />
                        <label htmlFor={notif.id} className="text-sm text-gray-300">{notif.label}</label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Email Notifications</h4>
                    {[
                      { id: "daily-reports", label: "Daily Performance Reports", defaultChecked: true },
                      { id: "weekly-summaries", label: "Weekly Summaries", defaultChecked: true },
                      { id: "critical-alerts", label: "Critical Alerts Only", defaultChecked: true },
                      { id: "maintenance-notices", label: "Maintenance Notices", defaultChecked: false },
                    ].map((notif) => (
                      <div key={notif.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={notif.id}
                          defaultChecked={notif.defaultChecked}
                          className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                        />
                        <label htmlFor={notif.id} className="text-sm text-gray-300">{notif.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="holographic rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Security Configuration</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="240">4 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Rate Limit</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white">
                        <option value="100">100 requests/minute</option>
                        <option value="500">500 requests/minute</option>
                        <option value="1000">1000 requests/minute</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="two-factor"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="two-factor" className="text-sm text-gray-300">Enable Two-Factor Authentication</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="audit-logs"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="audit-logs" className="text-sm text-gray-300">Enable Audit Logging</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="ip-whitelist"
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="ip-whitelist" className="text-sm text-gray-300">IP Address Whitelisting</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Settings */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div className="holographic rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Database Configuration</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Backup Frequency</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="custom">Custom Schedule</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Retention Period</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white">
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="180">6 months</option>
                        <option value="365">1 year</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Connection Pool Size</label>
                      <input
                        type="number"
                        defaultValue="10"
                        min="5"
                        max="50"
                        className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="auto-optimize"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="auto-optimize" className="text-sm text-gray-300">Auto-optimize queries</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="compression"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="compression" className="text-sm text-gray-300">Enable compression</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="holographic rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Theme & Appearance</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Color Theme</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 rounded-lg bg-dark-accent/20 border-2 border-dark-accent text-white text-sm font-medium">
                          Performance Oracle
                        </button>
                        <button className="p-4 rounded-lg bg-dark-surface/50 border-2 border-dark-accent/20 text-gray-400 text-sm font-medium hover:border-dark-accent/50">
                          Classic Dark
                        </button>
                        <button className="p-4 rounded-lg bg-dark-surface/50 border-2 border-dark-accent/20 text-gray-400 text-sm font-medium hover:border-dark-accent/50">
                          Neural Blue
                        </button>
                        <button className="p-4 rounded-lg bg-dark-surface/50 border-2 border-dark-accent/20 text-gray-400 text-sm font-medium hover:border-dark-accent/50">
                          Cyber Green
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Animation Speed</label>
                      <select className="w-full p-3 rounded-lg bg-dark-surface/50 border border-dark-accent/20 text-white">
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="holographic-cards"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="holographic-cards" className="text-sm text-gray-300">Holographic card effects</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="gradient-text"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="gradient-text" className="text-sm text-gray-300">Gradient text effects</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="neural-background"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="neural-background" className="text-sm text-gray-300">Neural network background</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="pulse-animations"
                        defaultChecked
                        className="w-4 h-4 rounded border-dark-accent/20 bg-dark-surface/50"
                      />
                      <label htmlFor="pulse-animations" className="text-sm text-gray-300">Pulse animations</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Status Bar */}
      <footer className="bg-dark-secondary/80 backdrop-blur-lg border-t border-dark-accent/20 px-4 lg:px-6 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse"></div>
              <span>Settings: Configuration Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-3 h-3 text-dark-accent" />
              <span>Active Tab: {tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-dark-accent" />
              <span>Agents: {agents?.length || 0} configured</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>System Status: {systemMetrics ? "Optimal" : "Loading"}</span>
            <span>Config Version: v2.1</span>
          </div>
        </div>
      </footer>

    </div>
  );
}