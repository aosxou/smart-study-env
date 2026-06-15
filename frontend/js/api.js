// EcoMind API Client
class EcoMindAPI {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
  }

  // Get latest sensor data
  async getLatestSensors() {
    try {
      const response = await fetch(`${this.baseURL}/sensors/latest`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest sensors:', error);
      throw error;
    }
  }

  // Get sensor data history
  async getSensorHistory(startDate = null, endDate = null, limit = 100) {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start', startDate);
      if (endDate) params.append('end', endDate);

      const url = `${this.baseURL}/sensors/history?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching sensor history:', error);
      throw error;
    }
  }

  // Get sensor statistics
  async getSensorStats() {
    try {
      const response = await fetch(`${this.baseURL}/sensors/stats`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching sensor stats:', error);
      throw error;
    }
  }

  // Health check
  async getHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

// Create global API instance
const api = new EcoMindAPI();
