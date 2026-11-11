import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WorkspaceView } from './components/WorkspaceView';
import { ExplorationEnginesView } from './components/ExplorationEnginesView';
import { TopicWindow } from './components/TopicWindow';
import { WhatIfSimulationModal } from './components/WhatIfSimulationModal';
import { PlatformStatusView } from './components/PlatformStatusView';
import { ProfileModal } from './components/ProfileModal';
import { CollegeHonorsModal } from './components/CollegeHonorsModal';
import { AuthScreen } from './components/AuthScreen';
import { INITIAL_USER, ENGINES_DATA } from './data/mockData';

export function App() {
  // Authentication State: Portal opens directly with the login page
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Navigation State (starts on 'workspace' once authenticated)
  const [activeSector, setActiveSector] = useState('workspace'); // 'workspace' | 'engines' | 'status' | 'profile'
  
  // Exploration Engine State
  const [activeEngineId, setActiveEngineId] = useState(null); // 'forum' | 'engagement' | 'risk' | 'mooc' | null

  // User & Role State (Student View vs Admin View)
  const [user, setUser] = useState(INITIAL_USER);

  // Modals State
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCollegeHonorsOpen, setIsCollegeHonorsOpen] = useState(false);

  // Handler for updating student metrics (Admin Mode)
  const handleUpdateUserMetrics = (updatedMetrics) => {
    setUser(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        ...updatedMetrics
      }
    }));
  };

  // Handler for logging in from AuthScreen
  const handleLogin = (userOrRole) => {
    if (typeof userOrRole === 'object' && userOrRole !== null) {
      setUser(userOrRole);
    } else {
      setUser(prev => ({
        ...prev,
        role: userOrRole || 'Student'
      }));
    }
    setIsAuthenticated(true);
  };

  // Find active engine if one is selected
  const activeEngine = ENGINES_DATA.find(e => e.id === activeEngineId);

  // Handle engine selection from anywhere in the app
  const handleSelectEngine = (engineId) => {
    setActiveEngineId(engineId);
    setActiveSector('engines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user explicitly logged out, render the Luxury Campus Auth Screen
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} initialUser={user} />;
  }

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-800 flex flex-col selection:bg-champagne-500 selection:text-burgundy-950">
      
      {/* Persistent Fixed Navigation Bar (4 Sectors: Profile, Workspace, Exploration Engines, Platform Status) */}
      <Navbar
        activeSector={activeSector}
        setActiveSector={(sector) => {
          setActiveSector(sector);
          if (sector !== 'engines') {
            setActiveEngineId(null);
          }
        }}
        user={user}
        setUser={setUser}
        activeEngineId={activeEngineId}
        setActiveEngineId={setActiveEngineId}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenCollegeHonors={() => setIsCollegeHonorsOpen(true)}
      />

      {/* Main Content Area with Fixed Task Bar Offset */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 ${activeEngineId ? 'pt-32 sm:pt-36' : 'pt-24 sm:pt-28'}`}>
        
        {/* Render Dedicated Topic Window if an Engine is active */}
        {activeEngine ? (
          <TopicWindow
            engine={activeEngine}
            user={user}
            onBack={() => setActiveEngineId(null)}
            onOpenWhatIf={() => setIsWhatIfOpen(true)}
            onUpdateUserMetrics={handleUpdateUserMetrics}
          />
        ) : (
          /* Sector Switcher */
          <>
            {activeSector === 'workspace' && (
              <WorkspaceView 
                onSelectEngine={handleSelectEngine} 
                user={user} 
                onOpenCollegeHonors={() => setIsCollegeHonorsOpen(true)}
              />
            )}

            {activeSector === 'engines' && (
              <ExplorationEnginesView 
                onSelectEngine={handleSelectEngine} 
                user={user} 
              />
            )}

            {activeSector === 'status' && (
              <PlatformStatusView />
            )}
          </>
        )}

      </main>

      {/* Persistent Corporate Luxury EdTech Footer */}
      <footer className="mt-auto border-t border-champagne-500/25 bg-cream-50 py-6 text-center text-xs text-charcoal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 text-center sm:text-left">
            <span className="font-serif font-extrabold text-burgundy-900 tracking-wide text-sm">ASPIRE</span>
            <span className="text-champagne-500 hidden sm:inline">·</span>
            <span className="text-charcoal-600 font-medium text-[11px]">
              Automated Student Performance Identification for Risk and Engagement (Multi-Modal Learning Approach)
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Dataset: <strong>student_data.csv (500 records)</strong></span>
            <span>Role: <strong className="text-burgundy-800">{user.role} View</strong></span>
          </div>
        </div>
      </footer>

      {/* What If Simulation Modal */}
      <WhatIfSimulationModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        user={user}
        engine={activeEngine || ENGINES_DATA[0]}
      />

      {/* Profile Sector Dossier Modal with Log Out */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        setUser={setUser}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* College Academic Honors Pop-Up Graphic Modal */}
      <CollegeHonorsModal
        isOpen={isCollegeHonorsOpen}
        onClose={() => setIsCollegeHonorsOpen(false)}
        user={user}
      />

    </div>
  );
}

export default App;

