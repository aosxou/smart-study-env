from datetime import datetime, timedelta

class DataService:
    """Service for data processing and analysis"""

    def __init__(self):
        self.db_connection = None

    def is_connected(self):
        """Check if database connection is active"""
        return True  # Placeholder

    def get_daily_stats(self, date=None):
        """Get daily statistics"""
        if date is None:
            date = datetime.now().date().isoformat()

        return {
            'date': date,
            'focus_time': {
                'total_hours': 6.5,
                'morning': 2.5,
                'afternoon': 2.3,
                'evening': 1.7
            },
            'environment': {
                'avg_illuminance': 340,
                'avg_noise_level': 42,
                'avg_humidity': 45
            },
            'posture': {
                'good_posture_percentage': 78,
                'break_count': 12,
                'avg_session_time': 25  # minutes
            },
            'ai_score': 82  # Overall productivity score
        }

    def get_weekly_stats(self):
        """Get weekly statistics"""
        today = datetime.now().date()
        monday = today - timedelta(days=today.weekday())

        return {
            'week_start': monday.isoformat(),
            'daily_focus_hours': {
                'Monday': 5.2,
                'Tuesday': 6.5,
                'Wednesday': 4.8,
                'Thursday': 7.2,
                'Friday': 6.1,
                'Saturday': 3.5,
                'Sunday': 2.8
            },
            'total_focus_hours': 36.1,
            'best_focus_time': '10:00 - 12:00',
            'environment_quality': {
                'avg_illuminance': 345,
                'avg_noise_level': 41,
                'avg_humidity': 44
            },
            'focus_pattern': [65, 72, 58, 80, 75, 45, 30],  # % by day
            'weekly_score': 78
        }

    def get_monthly_stats(self):
        """Get monthly statistics"""
        today = datetime.now().date()
        month_start = today.replace(day=1)

        return {
            'month': month_start.strftime('%Y-%m'),
            'total_focus_hours': 145,
            'avg_daily_focus_hours': 6.5,
            'focus_days': 22,  # Days with focus session
            'best_day': {
                'date': '2024-05-15',
                'focus_hours': 8.2
            },
            'weekly_comparison': [
                {'week': 1, 'hours': 35.2},
                {'week': 2, 'hours': 38.5},
                {'week': 3, 'hours': 36.1},
                {'week': 4, 'hours': 35.2}
            ],
            'environment_trends': {
                'illuminance_trend': 'improving',
                'noise_trend': 'stable',
                'humidity_trend': 'decreasing'
            },
            'monthly_score': 79
        }

    def calculate_focus_quality(self, session_data):
        """Calculate focus quality score for a session"""
        score = 100

        # Deduct for environmental issues
        if session_data.get('noise_level', 0) > 60:
            score -= 10

        if session_data.get('illuminance', 0) < 300:
            score -= 10

        # Deduct for posture issues
        if session_data.get('posture_quality', 1) < 0.7:
            score -= 15

        # Add bonus for good focus
        if session_data.get('focus_duration', 0) > 50:
            score += 5

        return max(0, min(100, score))

    def predict_best_focus_time(self):
        """Predict best time for focus based on historical data"""
        # TODO: Implement ML model for prediction
        return {
            'best_times': [
                {'start': '09:00', 'end': '11:30', 'confidence': 0.85},
                {'start': '14:00', 'end': '16:30', 'confidence': 0.78}
            ],
            'worst_times': [
                {'start': '12:00', 'end': '13:30', 'reason': 'lunch break'},
                {'start': '18:00', 'end': '19:30', 'reason': 'fatigue'}
            ]
        }

    def generate_insights(self):
        """Generate insights from data"""
        return {
            'insights': [
                'You focus best between 9-11 AM',
                'Afternoon sessions are 15% less productive',
                'Proper lighting improves focus by 20%',
                'Your posture affects concentration by 10%'
            ],
            'recommendations': [
                'Schedule important tasks before 11 AM',
                'Take a 5-minute break every 25 minutes',
                'Adjust light level to 350+ lux',
                'Maintain proper sitting posture'
            ]
        }
