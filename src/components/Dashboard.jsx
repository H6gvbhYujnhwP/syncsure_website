import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  Users, 
  Shield, 
  AlertTriangle, 
  AlertCircle, 
  Plus, 
  Search, 
  Download,
  Settings,
  CreditCard,
  FileText,
  LogOut,
  BarChart3,
  CheckCircle,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import syncSureLogo from '../assets/Syncsure_Logo_1.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('syncsure_token');
      const userStr = localStorage.getItem('syncsure_user');
      
      if (token && userStr) {
        try {
          JSON.parse(userStr); // Validate user data
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid user data:', error);
          localStorage.removeItem('syncsure_token');
          localStorage.removeItem('syncsure_user');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Get user data from localStorage with safe property access
  const getUserData = () => {
    try {
      const userStr = localStorage.getItem('syncsure_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return {
          companyName: user.companyName || 'SYNC-TEST-123',
          email: user.email || 'test@syncsure.com',
          firstName: user.firstName || 'Test',
          lastName: user.lastName || 'User'
        };
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return {
      companyName: 'SYNC-TEST-123',
      email: 'test@syncsure.com',
      firstName: 'Test',
      lastName: 'User'
    };
  };

  const userData = getUserData();

  // Safe function to get user initials
  const getUserInitials = () => {
    const firstName = userData.firstName || 'T';
    const lastName = userData.lastName || 'U';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Dashboard stats - placeholder data
  const stats = {
    activeLicenses: 1,
    totalSeats: 10,
    activeDevices: 0,
    healthyDevices: 0
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'licenses', label: 'License Management', icon: Shield },
    { id: 'billing', label: 'Billing & Seats', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('syncsure_token');
    localStorage.removeItem('syncsure_user');
    
    // Navigate to login page
    navigate('/login');
  };

  const handleAddDevice = () => {
    // Placeholder function - will be implemented later
    alert('Add Device functionality will be implemented in the next phase');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src={syncSureLogo} 
              alt="SyncSure" 
              className="h-8 w-8 mr-3"
            />
            <div>
              <div className="text-lg font-semibold text-gray-900">SyncSure</div>
              <div className="text-sm text-gray-500">Monitoring Platform</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {getUserInitials()}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900">{userData.companyName}</div>
              <div className="text-xs text-gray-500">{userData.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Monitor your OneDrive health across all devices</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-sm text-gray-500">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                System Healthy
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeSection === 'dashboard' && (
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.activeLicenses}</div>
                    <div className="text-sm text-gray-500">Active Licenses</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalSeats}</div>
                    <div className="text-sm text-gray-500">Total Seats</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.activeDevices}</div>
                    <div className="text-sm text-gray-500">Active Devices</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.healthyDevices}</div>
                    <div className="text-sm text-gray-500">Healthy Devices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Health Chart and Recent Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Device Health Over Time</h3>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No heartbeat data available</p>
                    <p className="text-sm text-gray-400">Device data will appear here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Events</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No recent events</p>
                    <p className="text-sm text-gray-400">Device events will appear here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Devices Table */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Devices for {userData.companyName}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Device</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Last Seen</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Event</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No devices yet
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Active Devices Section */}
            <div className="bg-white rounded-lg shadow-sm border mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Active Devices</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search devices..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
                      />
                    </div>
                    <Button
                      onClick={handleAddDevice}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <Monitor className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No devices found</h4>
                  <p className="text-gray-500 mb-4">Install the SyncSure agent to start monitoring</p>
                  <p className="text-sm text-gray-400">Device events will appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other sections placeholder */}
        {activeSection !== 'dashboard' && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h3>
              <p className="text-gray-500">This section will be implemented in the next phase</p>
              <p className="text-sm text-gray-400 mt-2">All functionality will be added as placeholders are connected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

