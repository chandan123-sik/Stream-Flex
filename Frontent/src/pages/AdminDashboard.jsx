import React, { useState } from 'react';
import { 
  Users, 
  Film, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const stats = {
    totalUsers: 15420,
    totalContent: 2847,
    activeSubscriptions: 12350,
    monthlyRevenue: 185420
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subscription: 'Premium', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subscription: 'Standard', joinDate: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subscription: 'Basic', joinDate: '2024-01-13' }
  ];

  const recentContent = [
    { id: 1, title: 'The Dark Knight', type: 'Movie', genre: 'Action', status: 'Active', views: 15420 },
    { id: 2, title: 'Stranger Things', type: 'Series', genre: 'Sci-Fi', status: 'Active', views: 28350 },
    { id: 3, title: 'Inception', type: 'Movie', genre: 'Thriller', status: 'Active', views: 12890 }
  ];

  const renderOverview = () => (
    <div className="overview-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
            <span className="stat-change positive">+12% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon content">
            <Film size={24} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalContent.toLocaleString()}</h3>
            <p>Total Content</p>
            <span className="stat-change positive">+8% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon subscriptions">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>{stats.activeSubscriptions.toLocaleString()}</h3>
            <p>Active Subscriptions</p>
            <span className="stat-change positive">+15% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>${stats.monthlyRevenue.toLocaleString()}</h3>
            <p>Monthly Revenue</p>
            <span className="stat-change positive">+18% from last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Users</h3>
            <button className="btn-secondary">View All</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`subscription-badge ${user.subscription.toLowerCase()}`}>
                        {user.subscription}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit">
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Content</h3>
            <button className="btn-primary">
              <Plus size={16} />
              Add Content
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Genre</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentContent.map(content => (
                  <tr key={content.id}>
                    <td>{content.title}</td>
                    <td>{content.type}</td>
                    <td>{content.genre}</td>
                    <td>{content.views.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${content.status.toLowerCase()}`}>
                        {content.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit">
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-content">
      <div className="content-header">
        <h2>User Management</h2>
        <div className="header-actions">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`subscription-badge ${user.subscription.toLowerCase()}`}>
                    {user.subscription}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="content-management">
      <div className="content-header">
        <h2>Content Management</h2>
        <div className="header-actions">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary">
            <Plus size={16} />
            Add Content
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentContent.map(content => (
              <tr key={content.id}>
                <td>{content.title}</td>
                <td>{content.type}</td>
                <td>{content.genre}</td>
                <td>8.5</td>
                <td>{content.views.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${content.status.toLowerCase()}`}>
                    {content.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: Film },
    { id: 'subscriptions', label: 'Subscriptions', icon: DollarSign }
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your StreamFlix platform</p>
        </div>

        <div className="dashboard-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'content' && renderContent()}
          {activeTab === 'subscriptions' && (
            <div className="coming-soon">
              <h3>Subscription Management</h3>
              <p>Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;