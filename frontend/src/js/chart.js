// Chart.js Integration - Data Visualization

class ChartManager {
    constructor() {
        this.charts = {};
        this.colors = {
            primary: '#3498db',
            secondary: '#2ecc71',
            danger: '#e74c3c',
            warning: '#f39c12',
            info: '#9b59b6'
        };
    }

    // Create Focus Time Chart (Weekly)
    createFocusTimeChart(canvasId, data) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');

        if (!ctx) {
            console.error(`Canvas element ${canvasId} not found`);
            return null;
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['월', '화', '수', '목', '금', '토', '일'],
                datasets: [{
                    label: '집중 시간 (시간)',
                    data: data || [5, 6.5, 4.8, 7.2, 6.1, 3.5, 2.8],
                    backgroundColor: this.colors.primary,
                    borderColor: '#2980b9',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: '주간 집중 시간'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: '시간'
                        }
                    }
                }
            }
        });

        this.charts[canvasId] = chart;
        return chart;
    }

    // Create Environment Quality Chart
    createEnvironmentChart(canvasId, data) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');

        if (!ctx) {
            console.error(`Canvas element ${canvasId} not found`);
            return null;
        }

        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['조도', '소음', '온도', '습도', '공기질'],
                datasets: [{
                    label: '환경 질 (0-100)',
                    data: data || [85, 72, 80, 65, 88],
                    borderColor: this.colors.secondary,
                    backgroundColor: `${this.colors.secondary}20`,
                    borderWidth: 2,
                    pointBackgroundColor: this.colors.secondary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: '현재 환경 질'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        this.charts[canvasId] = chart;
        return chart;
    }

    // Create Focus Pattern Chart
    createFocusPatternChart(canvasId, data) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');

        if (!ctx) {
            console.error(`Canvas element ${canvasId} not found`);
            return null;
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
                datasets: [{
                    label: '시간대별 집중도 (%)',
                    data: data || [15, 20, 65, 55, 80, 45, 25],
                    borderColor: this.colors.primary,
                    backgroundColor: `${this.colors.primary}10`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: this.colors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: '일일 집중 패턴'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: '집중도 (%)'
                        }
                    }
                }
            }
        });

        this.charts[canvasId] = chart;
        return chart;
    }

    // Create Posture Analysis Chart
    createPostureChart(canvasId, data) {
        const ctx = document.getElementById(canvasId)?.getContext('2d');

        if (!ctx) {
            console.error(`Canvas element ${canvasId} not found`);
            return null;
        }

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['올바른 자세', '약간 구부러짐', '많이 구부러짐'],
                datasets: [{
                    data: data || [65, 25, 10],
                    backgroundColor: [
                        this.colors.secondary,
                        this.colors.warning,
                        this.colors.danger
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: '자세 분석'
                    }
                }
            }
        });

        this.charts[canvasId] = chart;
        return chart;
    }

    // Update chart data
    updateChart(canvasId, newData) {
        const chart = this.charts[canvasId];

        if (chart) {
            chart.data.datasets[0].data = newData;
            chart.update();
        }
    }

    // Destroy chart
    destroyChart(canvasId) {
        const chart = this.charts[canvasId];

        if (chart) {
            chart.destroy();
            delete this.charts[canvasId];
        }
    }

    // Destroy all charts
    destroyAllCharts() {
        Object.keys(this.charts).forEach(canvasId => {
            this.destroyChart(canvasId);
        });
    }
}

const chartManager = new ChartManager();
