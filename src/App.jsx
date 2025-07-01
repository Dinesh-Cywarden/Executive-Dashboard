import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  BarChart3, 
  Network, 
  FolderX,
  Sun,
  Moon
} from 'lucide-react';

const DashboardCentralizer = () => {
  const [dashboards, setDashboards] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const sampleDashboards = [
      {
        id: 1,
        name: "BadgeCert Dashboard",
        url: "https://c.gle/ANiao5o5uAYOZbqX0njlVLgIRxsvUHmkPboE7xKAIPgpn9Yq-3aO5EPESvT4dKyMzAaw5Lbf1__YrZ8JbcPIK8H29amkodUvKAO71mq7efXg24ya_n7wgzxdNsI2LpU486uMdcwYwyJoMqS58FyYkbI4JFomHtXkvDbE4orOeaUfzG1WGSD2xUc0DPXUGNH0RSMqbra2YBRxU8hmzO8Ew98XvjocOeC5Fc8pbgg",
        addedDate: new Date().toLocaleDateString()
      },
      {
        id: 2,
        name: "Security SLA Dashboard",
        url: "https://c.gle/ANiao5oLv-fRTws9MmLIOXFM6IYRWYS3loFJYB9DfWT7INpIGJAeC8Ms9vCK0eFm0VdA9uIqFPGYIwmT6LLI6yT84IOggg0GUcp5l70tEDVD4szYaI48qI75u7vdOMAbtVMPVY2UdkClkrpm95i82F4dMr8lJC_Nl36mNIHHg6_3gBEp1kvSS3BKciZsC7oQw1UgUwS2w3C0W8AJRtO-jgsXIWWeABRPIozR1UY",
        addedDate: new Date().toLocaleDateString()
      },
      {
        id: 3,
        name: "Guru AI Dashboard",
        url: "https://c.gle/ANiao5rICSXk76ApkyEspTKVmxNHs6GuzmWWrNgurXHh8KeQnsEzRkFnuIWYLI6haJXhYnBDyRtbZgIVfy705ZJiIhhsggJOAVd0bDqreNwRCid702Uy5u0stAvVY-qcEV2BMH-MrEvdNzE9v6dAcBnHc4NpVDXi97nDr5XYYsaypSFPUKiq2bXiOY29gW8cIOwCchG5OAGdwuHAfkVvPMK6a4RHsWwsoMicsyA",
        addedDate: new Date().toLocaleDateString()
      },
      {
        id: 4,
        name: "CW-CG Dashboard",
        url: "https://c.gle/ANiao5qmjWhE0EMEcXbHMIeP_ONMkpc8E4TOJzPcUokaCgdWSb8Bb0szyT_2riBDgYMCVpV5PvZCtbJvIhvICkUCvhDal6iFz4Xhio7gqCc-gxHshKUxyiChzQMFNW5Zp00wT--o491gA-uyc-XLBzcwXwC0v2yIRs1mVUIIi1y2pzZH3rIU4bBQwKFUAk2MeAUTblCDK4C73kzFQimdPdF6WukpcQOQoxDBEmk",
        addedDate: new Date().toLocaleDateString()
      }
    ];
    setDashboards(sampleDashboards);
  }, []);

  const openDashboard = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
        theme === 'dark' 
          ? 'bg-slate-800/50 text-slate-200 hover:bg-slate-700' 
          : 'bg-slate-200/50 text-slate-800 hover:bg-slate-300'
      }`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  const StatsBar = () => (
    <div className="flex justify-center">
      <div className={`p-6 rounded-xl shadow-lg text-center transition-colors ${
        theme === 'dark'
          ? 'bg-slate-900/50 border border-slate-700/50'
          : 'bg-white/50 border border-slate-200'
      }`}>
        <div className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-1 ${
          theme === 'dark'
            ? 'from-purple-400 to-sky-400'
            : 'from-purple-600 to-sky-500'
        }`}>
          {dashboards.length}
        </div>
        <div className={`text-sm tracking-widest uppercase ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Dashboards
        </div>
      </div>
    </div>
  );

  const DashboardCard = ({ dashboard, index }) => (
    <div
      className={`card-animation rounded-2xl p-6 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/50 shadow-lg border border-slate-800 hover:shadow-purple-500/20 hover:border-slate-700'
          : 'bg-white shadow-lg border border-slate-200 hover:shadow-purple-500/10 hover:border-slate-300'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-semibold flex-1 pr-4 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-800'
        }`}>
          {dashboard.name}
        </h3>
        <button
          onClick={() => openDashboard(dashboard.url)}
          className={`p-2 rounded-full transition-colors duration-300 ${
            theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
          title="Open in new tab"
        >
          <ExternalLink size={20} />
        </button>
      </div>
      <div className="text-sm text-slate-500">
        Added: {dashboard.addedDate}
      </div>
    </div>
  );

  const DashboardGrid = () => {
    if (dashboards.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center">
          <FolderX size={64} className="mb-5 opacity-50" />
          <h3 className="text-2xl font-semibold mb-2">No Dashboards Linked</h3>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dashboards.map((dashboard, index) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} index={index} />
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-800'
    }`}>
      {theme === 'dark' && <div className="aurora-background" />}
      
      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
        <header className="text-center mb-8 relative">
          <ThemeToggle />
          <div className="inline-flex items-center justify-center gap-3 mb-3">
             <Network className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={36} />
             <h1 className={`text-4xl sm:text-5xl font-extrabold ${
               theme === 'dark' ? 'bg-gradient-to-r from-slate-50 to-purple-300 bg-clip-text text-transparent' : 'text-slate-900'
             }`}>
                Executive Dashboard Hub
             </h1>
          </div>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Centralized access to all your dashboards
          </p>
        </header>

        <main className={`flex flex-col flex-1 min-h-0 backdrop-blur-md rounded-2xl p-4 sm:p-8 transition-colors ${
          theme === 'dark' ? 'bg-slate-900/40 shadow-2xl border border-slate-800' : 'bg-white/50 shadow-xl border border-slate-200'
        }`}>
          <StatsBar />
          
          {/* CHANGED: Added 'hide-scrollbar' and removed padding classes */}
          <div className="hide-scrollbar flex-1 min-h-0 overflow-y-auto mt-8">
            <DashboardGrid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardCentralizer;
