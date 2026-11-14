import React, { useState } from 'react';
import { Bell, Cpu, Menu, Sparkles } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { AIAgentCenterPage } from './components/AIAgentCenterPage';
import { AIMentorPage } from './components/AIMentorPage';
import { AssessmentCenterPage } from './components/AssessmentCenterPage';
import { AuthModal } from './components/AuthModal';
import { CareerExplorerPage } from './components/CareerExplorerPage';
import { DashboardOverview } from './components/DashboardOverview';
import { LandingPage } from './components/LandingPage';
import { LearningRoadmapPage } from './components/LearningRoadmapPage';
import { ProfilePage } from './components/ProfilePage';
import { ProgressAnalyticsPage } from './components/ProgressAnalyticsPage';
import { ResourceLibraryPage } from './components/ResourceLibraryPage';
import { SettingsPage } from './components/SettingsPage';
import { Sidebar } from './components/Sidebar';
import { SkillIntelligencePage } from './components/SkillIntelligencePage';

const WorkspaceShell: React.FC = () => {
  const {
    isAuthenticated,
    showLanding,
    activeTab,
    setActiveTab,
    profile,
    analysis,
    isOrchestrating,
    adaptiveNotifications,
    markAllNotificationsRead,
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);

  if (showLanding || !isAuthenticated) {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  const unreadCount = adaptiveNotifications.filter((n) => !n.read).length;

  const renderPage = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'profile':
        return <ProfilePage />;
      case 'skill-intelligence':
        return <SkillIntelligencePage />;
      case 'career-explorer':
        return <CareerExplorerPage />;
      case 'roadmap':
        return <LearningRoadmapPage />;
      case 'resources':
        return <ResourceLibraryPage />;
      case 'assessments':
        return <AssessmentCenterPage />;
      case 'ai-mentor':
        return <AIMentorPage />;
      case 'analytics':
        return <ProgressAnalyticsPage />;
      case 'agent-center':
        return <AIAgentCenterPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 flex">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Workspace Header */}
        <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 border-b border-slate-800/80 bg-[#0B1020]/85 backdrop-blur-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl bg-[#121A2F] border border-slate-800 text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 truncate">
              <span className="text-slate-300 font-semibold">{profile.targetCareerTitle}</span>
              <span>·</span>
              <span className="text-cyan-300 font-semibold">
                {analysis.careerReadiness}% Ready
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isOrchestrating && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-xs text-violet-200">
                <Cpu className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                <span className="hidden sm:inline">6 Agents Syncing...</span>
              </div>
            )}

            <button
              onClick={() => {
                markAllNotificationsRead();
                setActiveTab('roadmap');
              }}
              title="Adaptive roadmap updates"
              className="relative p-2 rounded-xl bg-[#121A2F] border border-slate-800 hover:border-violet-500/40 text-slate-300 hover:text-white transition"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('agent-center')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600/25 to-cyan-600/20 border border-violet-500/35 text-xs font-semibold text-cyan-200 hover:border-cyan-400/60 flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              <span className="hidden sm:inline">AI Agent Center</span>
            </button>
          </div>
        </header>

        {/* Active Page Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {renderPage()}
        </main>
      </div>

      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <WorkspaceShell />
    </AppProvider>
  );
}

export default App;
