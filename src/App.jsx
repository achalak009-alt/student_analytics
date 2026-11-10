import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WorkspaceView } from './components/WorkspaceView';
import { ExplorationEnginesView } from './components/ExplorationEnginesView';
import { TopicWindow } from './components/TopicWindow';
import { WhatIfSimulationModal } from './components/WhatIfSimulationModal';
import { PlatformStatusView } from './components/PlatformStatusView';
import { ProfileModal } from './components/ProfileModal';
import { INITIAL_USER, ENGINES_DATA } from './data/mockData';

export function App() {
  // Navigation State (Direct Home Page Entry: starts immediately on 'workspace')
  const [activeSector, setActiveSector] = useState('workspace'); // 'workspace' | 'engines' | 'status' | 'profile'
  
  // Exploration Engine State
  const [activeEngineId, setActiveEngineId] = useState(null); // 'forum' | 'engagement' | 'risk' | 'mooc' | null

  // User & Role State (Student View vs Admin View)
  const [user, setUser] = useState(INITIAL_USER);

  // Modals State
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  // Find active engine if one is selected
  const activeEngine = ENGINES_DATA.find(e => e.id === activeEngineId);

  // Handle engine selection from anywhere in the app
  const handleSelectEngine = (engineId) => {
    setActiveEngineId(engineId);
    setActiveSector('engines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-800 flex flex-col selection:bg-champagne-500 selection:text-burgundy-950">
      
      {/* Persistent Navigation Bar (4 Sectors: Profile, Workspace, Exploration Engines, Platform Status) */}
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
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

      {/* Persistent Luxury Footer */}
      <footer className="mt-auto border-t border-champagne-500/20 bg-cream-50 py-6 text-center text-xs text-charcoal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-burgundy-900">AURA Learning Analytics</span>
            <span className="text-champagne-500">·</span>
            <span>Institutional Luxury Intelligence</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Active Dataset: <strong>student_data.csv (500 records)</strong></span>
            <span>Current Role: <strong className="text-burgundy-800">{user.role} View</strong></span>
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

      {/* Profile Sector Dossier Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        setUser={setUser}
      />

    </div>
  );
}

export default App;
