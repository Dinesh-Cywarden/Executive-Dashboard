import React, { useState, useEffect } from 'react';
import { 
  Link, 
  Monitor, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Eye, 
  BarChart3, 
  PlusCircle 
} from 'lucide-react';

const DashboardCentralizer = () => {
  const [dashboards, setDashboards] = useState([]);
  const [currentMode, setCurrentMode] = useState('links');
  const [dashboardName, setDashboardName] = useState('');
  const [dashboardUrl, setDashboardUrl] = useState('');
  const [selectedDashboardId, setSelectedDashboardId] = useState('');
  const [embeddedUrl, setEmbeddedUrl] = useState('');

  // Initialize with sample data
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
      }
    ];
    setDashboards(sampleDashboards);
  }, []);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const addDashboard = () => {
    if (!dashboardName.trim() || !dashboardUrl.trim()) {
      alert('Please fill in both dashboard name and URL');
      return;
    }

    if (!isValidUrl(dashboardUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    const newDashboard = {
      id: Date.now(),
      name: dashboardName,
      url: dashboardUrl,
      addedDate: new Date().toLocaleDateString()
    };

    setDashboards(prev => [...prev, newDashboard]);
    setDashboardName('');
    setDashboardUrl('');
  };

  const removeDashboard = (id) => {
    if (window.confirm('Are you sure you want to remove this dashboard?')) {
      setDashboards(prev => prev.filter(d => d.id !== id));
    }
  };

  const openDashboard = (url) => {
    window.open(url, '_blank');
  };

  const embedDashboard = (url, name) => {
    const dashboard = dashboards.find(d => d.url === url);
    if (dashboard) {
      setCurrentMode('embedded');
      setSelectedDashboardId(dashboard.id.toString());
      setEmbeddedUrl(url);
    }
  };

  const loadSelectedDashboard = () => {
    if (!selectedDashboardId) {
      setEmbeddedUrl('');
      return;
    }

    const dashboard = dashboards.find(d => d.id.toString() === selectedDashboardId);
    if (dashboard) {
      setEmbeddedUrl(dashboard.url);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addDashboard();
    }
  };

  const ModeToggle = () => (
    <div className="flex bg-white/90 rounded-xl p-2 mb-8 shadow-lg backdrop-blur-sm">
      <button 
        onClick={() => setCurrentMode('links')}
        className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
          currentMode === 'links' 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
            : 'text-gray-600 hover:bg-blue-50'
        }`}
      >
        <Link size={20} />
        Dashboard Links
      </button>
    </div>
  );

  const StatsBar = () => (
    <div className="flex gap-5 mb-8 flex-wrap">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center flex-1 min-w-40">
        <div className="text-3xl font-bold text-blue-600">{dashboards.length}</div>
        <div className="text-gray-600 text-sm mt-1">Total Dashboards</div>
      </div>
    </div>
  );

 

  const DashboardCard = ({ dashboard }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{dashboard.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => openDashboard(dashboard.url)}
            className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:scale-110 transition-all duration-300"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
          <button
            onClick={() => removeDashboard(dashboard.id)}
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:scale-110 transition-all duration-300"
            title="Remove dashboard"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 break-all mb-3">
        {dashboard.url}
      </div>
      <div className="text-xs text-gray-400">
        Added: {dashboard.addedDate}
      </div>
    </div>
  );

  const DashboardGrid = () => {
    if (dashboards.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-center">
          <PlusCircle size={64} className="mb-5 opacity-50" />
          <h3 className="text-2xl font-semibold mb-2">No Dashboards Added</h3>
          <p className="text-lg">Add your first dashboard using the form above</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dashboards.map(dashboard => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} />
        ))}
      </div>
    );
  };

  


  const LinksMode = () => (
    <div>
      <StatsBar />
      <DashboardGrid />
    </div>
  );

  

  return (
    <div className="h-full self-center m-auto bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Executive Dashboard Hub
          </h1>
          <p className="text-gray-600 text-lg">
            Centralized access to all your dashboards
          </p>
        </div>


        {/* Content Area */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl min-h-[600px]">
          {currentMode === 'links' ? <LinksMode /> : <EmbeddedMode />}
        </div>
      </div>
    </div>
  );
};

export default DashboardCentralizer;