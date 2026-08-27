import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';
import Analyze from './screens/Analyze';
import Analysis from './screens/Analysis';
import Results from './screens/Results';
import VideoForensics from './screens/VideoForensics';
import ImageForensics from './screens/ImageForensics';
import AudioForensics from './screens/AudioForensics';
import Investigations from './screens/Investigations';

const SCREEN_TITLES = {
  dashboard: 'Dashboard',
  analyze: 'New Analysis',
  analysis: 'Forensic Analysis',
  results: 'Analysis Report',
  'video-forensics': 'Video Forensics',
  'image-forensics': 'Image Forensics',
  'audio-forensics': 'Audio Forensics',
  investigations: 'Investigations',
};

const NAV_SCREEN_MAP = {
  dashboard: 'dashboard',
  analyze: 'analyze',
  investigations: 'investigations',
  reports: 'results',
  settings: 'dashboard',
};

function activeNav(screen) {
  if (screen === 'dashboard') return 'dashboard';
  if (screen === 'analyze' || screen === 'analysis') return 'analyze';
  if (screen === 'investigations') return 'investigations';
  if (screen === 'results' || screen === 'video-forensics' || screen === 'image-forensics' || screen === 'audio-forensics') return 'reports';
  return 'dashboard';
}

function AppShell({ onLogout }) {
  const [screen, setScreen] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const navigate = (s) => setScreen(s);

  const handleNavClick = (nav) => {
    const target = NAV_SCREEN_MAP[nav];
    if (target) navigate(target);
  };

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ backgroundColor: 'var(--c-bg)' }}
    >
      <Sidebar
        activeNav={activeNav(screen)}
        onNavClick={handleNavClick}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(c => !c)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          title={SCREEN_TITLES[screen] ?? ''}
          navigate={navigate}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-hidden">
          {screen === 'dashboard'       && <Dashboard navigate={navigate} />}
          {screen === 'analyze'         && <Analyze navigate={navigate} />}
          {screen === 'analysis'        && <Analysis navigate={navigate} />}
          {screen === 'results'         && <Results navigate={navigate} />}
          {screen === 'video-forensics' && <VideoForensics navigate={navigate} />}
          {screen === 'image-forensics' && <ImageForensics navigate={navigate} />}
          {screen === 'audio-forensics' && <AudioForensics navigate={navigate} />}
          {screen === 'investigations'  && <Investigations navigate={navigate} />}
        </main>
      </div>
    </div>
  );
}


const LAUNCH_DURATION     = 2000;  // initial page load
const TRANSITION_DURATION = 3000;  // between all screens

function AppWithLoader() {
  // 'launch' | 'login-screen' | 'signup-screen'
  // | 'to-signup' | 'post-login' | 'post-signup' | 'post-logout' | 'app'
  const [phase, setPhase] = useState('launch');

  useEffect(() => {
    const t = setTimeout(() => setPhase('login-screen'), LAUNCH_DURATION);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = () => {
    setPhase('post-login');
    setTimeout(() => setPhase('app'), TRANSITION_DURATION);
  };

  const handleGoToSignup = () => {
    setPhase('signup-screen');
  };

  const handleSignup = () => {
    setPhase('post-signup');
    setTimeout(() => setPhase('app'), TRANSITION_DURATION);
  };

  const handleGoToLogin = () => {
    setPhase('login-screen');
  };

  const handleLogout = () => {
    setPhase('post-logout');
    setTimeout(() => setPhase('login-screen'), TRANSITION_DURATION);
  };

  if (phase === 'launch' || phase === 'post-login' || phase === 'post-signup' || phase === 'post-logout') {
    const dur = phase === 'launch' ? LAUNCH_DURATION : TRANSITION_DURATION;
    return <Loader duration={dur} />;
  }

  if (phase === 'login-screen') {
    return <Login onLogin={handleLogin} onGoToSignup={handleGoToSignup} />;
  }

  if (phase === 'signup-screen') {
    return <Signup onSignup={handleSignup} onGoToLogin={handleGoToLogin} />;
  }

  return <AppShell onLogout={handleLogout} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppWithLoader />
    </ThemeProvider>
  );
}

