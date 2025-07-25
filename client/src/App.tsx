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
import ContentForgeControls from "@/pages/agents/content-forge-controls";
import ContentForgeCreator from "@/pages/agents/content-forge-creator";
import ContentForgeStock from "@/pages/agents/content-forge-stock";
import ContentForgeQuickActions from "@/pages/agents/content-forge-quick-actions";
import ContentForgeBulkUpload from "@/pages/agents/content-forge-bulk-upload";
import ContentForgeTemplates from "@/pages/agents/content-forge-templates";
import ContentForgeApiKeys from "@/pages/agents/content-forge-api-keys";
import OutreachNexusAgent from "@/pages/agents/outreach-nexus-agent";
import OutreachNexusControls from "@/pages/agents/outreach-nexus-controls";
import OutreachNexusScheduler from "@/pages/agents/outreach-nexus-scheduler";
import OutreachNexusSettings from "@/pages/agents/outreach-nexus-settings";
import OutreachNexusAudience from "@/pages/agents/outreach-nexus-audience";
import OutreachNexusPlatforms from "@/pages/agents/outreach-nexus-platforms";
import PerformanceOracle from "@/pages/agents/performance-oracle";
import PerformanceOracleControls from "@/pages/agents/performance-oracle-controls";
import PerformanceOracleSettings from "@/pages/agents/performance-oracle-settings";
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
      <Route path="/agents/content-forge/controls" component={ContentForgeControls} />
      <Route path="/agents/content-forge/creator" component={ContentForgeCreator} />
      <Route path="/agents/content-forge/stock" component={ContentForgeStock} />
      <Route path="/agents/content-forge/quick-actions" component={ContentForgeQuickActions} />
      <Route path="/agents/content-forge/bulk-upload" component={ContentForgeBulkUpload} />
      <Route path="/agents/content-forge/templates" component={ContentForgeTemplates} />
      <Route path="/agents/content-forge/api-keys" component={ContentForgeApiKeys} />
      <Route path="/agents/outreach-nexus" component={OutreachNexusAgent} />
      <Route path="/agents/outreach-nexus/controls" component={OutreachNexusControls} />
      <Route path="/agents/outreach-nexus/scheduler" component={OutreachNexusScheduler} />
      <Route path="/agents/outreach-nexus/settings" component={OutreachNexusSettings} />
      <Route path="/agents/outreach-nexus/audience" component={OutreachNexusAudience} />
      <Route path="/agents/outreach-nexus/platforms" component={OutreachNexusPlatforms} />
      <Route path="/agents/performance-oracle" component={PerformanceOracle} />
      <Route path="/agents/performance-oracle/controls" component={PerformanceOracleControls} />
      <Route path="/agents/performance-oracle/settings" component={PerformanceOracleSettings} />
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
