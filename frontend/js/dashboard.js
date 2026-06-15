// Dashboard state
let dashboardData = {
  latest: null,
  stats: null,
  history: [],
  lastUpdate: null,
  isLoading: false
};

// Configuration
const CONFIG = {
  API_URL: 'http://localhost:3000/api',
  UPDATE_INTERVAL: 2000, // 2 seconds
  HISTORY_LIMIT: 50
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Dashboard initialized');
  initializeDashboard();
});

async function initializeDashboard() {
  // Set API URL
  if (window.api) {
    window.api.baseURL = CONFIG.API_URL;
  }

  // Initial load
  await refreshDashboard();

  // Set up auto-refresh
  setInterval(refreshDashboard, CONFIG.UPDATE_INTERVAL);

  // Add refresh button listener
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', refreshDashboard);
  }
}

async function refreshDashboard() {
  dashboardData.isLoading = true;

  try {
    // Fetch data in parallel
    const [latestResponse, statsResponse, healthResponse] = await Promise.all([
      api.getLatestSensors(),
      api.getSensorStats(),
      api.getHealth()
    ]);

    dashboardData.latest = latestResponse;
    dashboardData.stats = statsResponse;
    dashboardData.health = healthResponse;
    dashboardData.lastUpdate = new Date();

    // Update UI
    updateSensorCards();
    updateStatsCards();
    updateStatusBar();
    updateLastUpdate();

    console.log('✅ Dashboard updated');
  } catch (error) {
    console.error('❌ Error refreshing dashboard:', error);
    showError('데이터를 불러올 수 없습니다. 백엔드 서버가 실행 중인지 확인하세요.');
  } finally {
    dashboardData.isLoading = false;
  }
}

function updateSensorCards() {
  if (!dashboardData.latest) return;

  const latest = dashboardData.latest;

  // Light Sensor
  updateSensorCard('light', {
    value: latest.light_sensor?.illuminance || 0,
    unit: 'lux',
    label: '조도',
    icon: '💡',
    details: [
      { label: 'Raw Value', value: latest.light_sensor?.raw_value || 0 }
    ]
  });

  // Motion/Noise Sensor
  updateSensorCard('motion', {
    value: latest.motion_sensor?.noise_level || 0,
    unit: 'dB',
    label: '소음도',
    icon: '🔊',
    details: [
      { label: 'Raw Value', value: latest.motion_sensor?.raw_value || 0 }
    ]
  });

  // Ultrasonic Sensor
  const distance = latest.ultrasonic_sensor?.distance || -1;
  const postureStatus = distance > 0 && distance < 30 ? 'warning' : 'good';
  updateSensorCard('ultrasonic', {
    value: distance > 0 ? distance : '-',
    unit: distance > 0 ? 'cm' : '',
    label: '거리 (자세)',
    icon: '📏',
    status: postureStatus,
    statusText: distance > 0 && distance < 30 ? '⚠️ 거북목 주의' : '✅ 좋음',
    details: [
      { label: 'Posture', value: latest.ultrasonic_sensor?.posture || 'unknown' }
    ]
  });

  // Microphone Sensor
  updateSensorCard('microphone', {
    value: latest.microphone_sensor?.noise_level || 0,
    unit: '%',
    label: '음성감지',
    icon: '🎤',
    details: [
      { label: 'Raw Value', value: latest.microphone_sensor?.raw_value || 0 }
    ]
  });
}

function updateSensorCard(id, data) {
  const card = document.getElementById(`${id}Card`);
  if (!card) return;

  let html = `
    <div class="card-title">
      <span class="card-icon">${data.icon}</span>
      ${data.label}
    </div>
    <div class="sensor-value">
      ${data.value}
      <span class="sensor-unit">${data.unit}</span>
    </div>
  `;

  if (data.statusText) {
    html += `<div class="status-label status-${data.status}">${data.statusText}</div>`;
  }

  if (data.details) {
    data.details.forEach(detail => {
      html += `
        <div class="sensor-detail">
          <span class="sensor-detail-label">${detail.label}</span>
          <span class="sensor-detail-value">${detail.value}</span>
        </div>
      `;
    });
  }

  card.innerHTML = html;
}

function updateStatsCards() {
  if (!dashboardData.stats) return;

  const stats = dashboardData.stats;

  // Light stats
  updateStatCard('lightStat', {
    label: '평균 조도',
    value: Math.round(stats.light_sensor?.avg_illuminance || 0),
    unit: 'lux'
  });

  // Noise stats
  updateStatCard('noiseStat', {
    label: '최대 소음',
    value: Math.round(stats.motion_sensor?.max_noise_level || 0),
    unit: 'dB'
  });

  // Distance stats
  updateStatCard('distanceStat', {
    label: '평균 거리',
    value: Math.round(stats.ultrasonic_sensor?.avg_distance || 0),
    unit: 'cm'
  });

  // Data points
  updateStatCard('dataStat', {
    label: '데이터 포인트',
    value: stats.light_sensor?.data_points || 0,
    unit: '개'
  });
}

function updateStatCard(id, data) {
  const card = document.getElementById(id);
  if (!card) return;

  card.innerHTML = `
    <div class="stat-label">${data.label}</div>
    <div class="stat-value">${data.value}<span style="font-size: 0.6em; margin-left: 5px;">${data.unit}</span></div>
  `;
}

function updateStatusBar() {
  if (!dashboardData.health) return;

  const health = dashboardData.health;
  const sensors = health.services || {};

  const statusItems = [
    { name: 'Arduino', status: sensors.sensors },
    { name: 'Database', status: sensors.database },
    { name: 'AI', status: sensors.ai },
    { name: 'Backend', status: health.status === 'healthy' }
  ];

  let html = statusItems.map(item => `
    <div class="status-item">
      <div class="status-indicator ${item.status ? '' : 'error'}"></div>
      <span>${item.name}: ${item.status ? '✅ 연결됨' : '❌ 오프라인'}</span>
    </div>
  `).join('');

  html += `<button class="refresh-btn" id="refreshBtn">🔄 새로고침</button>`;

  const statusBar = document.getElementById('statusBar');
  if (statusBar) {
    statusBar.innerHTML = html;

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', refreshDashboard);
    }
  }
}

function updateLastUpdate() {
  const lastUpdateEl = document.getElementById('lastUpdate');
  if (lastUpdateEl && dashboardData.lastUpdate) {
    const time = dashboardData.lastUpdate.toLocaleTimeString('ko-KR');
    lastUpdateEl.textContent = `마지막 업데이트: ${time}`;
  }
}

function showError(message) {
  const container = document.querySelector('.container');
  if (!container) return;

  const errorEl = document.createElement('div');
  errorEl.className = 'error';
  errorEl.textContent = message;

  container.insertBefore(errorEl, container.firstChild);

  setTimeout(() => {
    errorEl.remove();
  }, 5000);
}

// Export for testing
window.dashboardData = dashboardData;
window.refreshDashboard = refreshDashboard;
