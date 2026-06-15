// Backend API Communication

const API_BASE_URL = 'http://localhost:5000/api';

class APIClient {
    static async get(endpoint) {
        return this.request(endpoint, 'GET');
    }

    static async post(endpoint, data) {
        return this.request(endpoint, 'POST', data);
    }

    static async put(endpoint, data) {
        return this.request(endpoint, 'PUT', data);
    }

    static async delete(endpoint) {
        return this.request(endpoint, 'DELETE');
    }

    static async request(endpoint, method = 'GET', data = null) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

// Sensor Data API
const SensorAPI = {
    async getLatest() {
        return APIClient.get('/sensors/latest');
    },

    async getHistory(startDate, endDate) {
        return APIClient.get(`/sensors/history?start=${startDate}&end=${endDate}`);
    },

    async getStats() {
        return APIClient.get('/sensors/stats');
    }
};

// Statistics API
const StatsAPI = {
    async getDailyStats() {
        return APIClient.get('/stats/daily');
    },

    async getWeeklyStats() {
        return APIClient.get('/stats/weekly');
    },

    async getMonthlyStats() {
        return APIClient.get('/stats/monthly');
    }
};

// AI API
const AIAPI = {
    async getRecommendations() {
        return APIClient.get('/ai/recommendations');
    },

    async generateAdvice(data) {
        return APIClient.post('/ai/advice', data);
    }
};
