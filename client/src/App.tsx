import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import DatabaseManagement from "@/pages/database";
import SettingsPage from "@/pages/settings";
import DiscoveryAgent from "@/pages/agents/discovery-agent";
import DiscoveryControls from "@/pages/agents/discovery-controls";
import DiscoverySettings from "@/pages/agents/discovery-settings";
import LeadScoutAgent from "@/pages/agents/lead-scout-agent";
import LeadScoutControls from "@/pages/agents/lead-scout-controls";
import LeadScoutSettings from "@/pages/agents/lead-scout-settings";
import LeadScoutLeads from "@/pages/agents/lead-scout-leads";
import ContentForgeAgent from "@/pages/agents/content-forge-agent";
import ContentForgeSettings from "@/pages/agents/content-forge-settings";
import OutreachNexusAgent from "@/pages/agents/outreach-nexus-agent";
import PerformanceOracle from "@/pages/agents/performance-oracle";
import UGCCatalystAgent from "@/pages/agents/ugc-catalyst-agent";
import VoiceMessagingNegotiator from "@/pages/agents/voice-messaging-negotiator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/database" component={DatabaseManagement} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/agents/discovery" component={DiscoveryAgent} />
      <Route path="/agents/discovery/controls" component={DiscoveryControls} />
      <Route path="/agents/discovery/settings" component={DiscoverySettings} />
      <Route path="/agents/lead-scout" component={LeadScoutAgent} />
      <Route path="/agents/lead-scout/controls" component={LeadScoutControls} />
      <Route path="/agents/lead-scout/settings" component={LeadScoutSettings} />
      <Route path="/agents/lead-scout/leads" component={LeadScoutLeads} />
      <Route path="/agents/content-forge" component={ContentForgeAgent} />
      <Route path="/agents/content-forge/settings" component={ContentForgeSettings} />
      <Route path="/agents/outreach-nexus" component={OutreachNexusAgent} />
      <Route path="/agents/performance-oracle" component={PerformanceOracle} />
      <Route path="/agents/ugc-catalyst" component={UGCCatalystAgent} />
      <Route path="/agents/voice-messaging" component={VoiceMessagingNegotiator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
