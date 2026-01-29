const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(name, email, password) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(data) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Content endpoints
  async getContent(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/content${queryParams ? `?${queryParams}` : ''}`);
  }

  async getContentById(id) {
    return this.request(`/content/${id}`);
  }

  async likeContent(id) {
    return this.request(`/content/${id}/like`, {
      method: 'POST',
    });
  }

  async getGenres() {
    return this.request('/content/meta/genres');
  }

  async getLanguages() {
    return this.request('/content/meta/languages');
  }

  async getYears() {
    return this.request('/content/meta/years');
  }

  // User endpoints
  async toggleFavorite(contentId) {
    return this.request(`/users/favorites/${contentId}`, {
      method: 'POST',
    });
  }

  async getFavorites() {
    return this.request('/users/favorites');
  }

  async addToWatchHistory(contentId, progress = 0) {
    return this.request(`/users/watch-history/${contentId}`, {
      method: 'POST',
      body: JSON.stringify({ progress }),
    });
  }

  async getWatchHistory() {
    return this.request('/users/watch-history');
  }

  async getContinueWatching() {
    return this.request('/users/continue-watching');
  }

  async updateSubscription(subscription) {
    return this.request('/users/subscription', {
      method: 'PUT',
      body: JSON.stringify({ subscription }),
    });
  }

  async getUserStats() {
    return this.request('/users/stats');
  }

  logout() {
    this.setToken(null);
  }
}

export default new ApiService();