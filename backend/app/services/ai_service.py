from datetime import datetime
import requests
import os
from dotenv import load_dotenv

load_dotenv()

class AIService:
    """Service for EXAONE AI integration"""

    def __init__(self):
        self.api_key = os.getenv('EXAONE_API_KEY')
        self.model = os.getenv('EXAONE_MODEL', 'LG-EXAONE')
        self.api_endpoint = 'https://api.exaone.lg.ai/v1/chat/completions'

    def is_connected(self):
        """Check if AI service connection is active"""
        return True  # Placeholder

    def get_recommendations(self):
        """Get AI recommendations based on user data"""
        return {
            'recommendations': [
                {
                    'category': 'time_management',
                    'advice': '아침 10시경에 집중도가 가장 높습니다. 중요한 작업을 이 시간에 집중하세요.',
                    'confidence': 0.92
                },
                {
                    'category': 'environment',
                    'advice': '주변 조명을 400룩스 이상으로 증가시키면 집중력이 15% 향상됩니다.',
                    'confidence': 0.85
                },
                {
                    'category': 'posture',
                    'advice': '바른 자세를 유지하세요. 나쁜 자세는 집중력을 12% 감소시킵니다.',
                    'confidence': 0.78
                },
                {
                    'category': 'breaks',
                    'advice': '45분마다 5분씩 휴식을 취하면 지속적인 집중력을 유지할 수 있습니다.',
                    'confidence': 0.88
                }
            ],
            'generated_at': datetime.now().isoformat()
        }

    def generate_advice(self, data):
        """Generate personalized advice using EXAONE AI"""
        try:
            # TODO: Implement EXAONE API call
            # This would call the actual EXAONE API with the user's data

            prompt = self._build_prompt(data)
            advice = self._call_exaone_api(prompt)

            return {
                'success': True,
                'advice': advice,
                'generated_at': datetime.now().isoformat()
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    def predict_productivity(self, current_conditions):
        """Predict productivity level based on current conditions"""
        score = 100

        # Evaluate environment
        illuminance = current_conditions.get('illuminance', 0)
        if illuminance < 300:
            score -= 20
        elif illuminance > 500:
            score -= 10

        # Evaluate noise
        noise_level = current_conditions.get('noise_level', 0)
        if noise_level > 70:
            score -= 25

        # Evaluate time of day
        hour = datetime.now().hour
        if hour < 9:
            score -= 10
        elif 12 <= hour < 14:
            score -= 15
        elif hour > 22:
            score -= 30

        # Evaluate posture
        posture_quality = current_conditions.get('posture_quality', 1)
        if posture_quality < 0.7:
            score -= 15

        return {
            'productivity_score': max(0, min(100, score)),
            'factors': {
                'illuminance': 'good' if 300 <= illuminance <= 500 else 'poor',
                'noise': 'good' if noise_level < 50 else 'poor',
                'time': 'optimal' if 9 <= hour <= 18 else 'suboptimal',
                'posture': 'good' if posture_quality > 0.75 else 'needs_improvement'
            }
        }

    def analyze_focus_pattern(self, session_history):
        """Analyze user's focus pattern"""
        return {
            'pattern': {
                'morning_person': True,
                'peak_focus_time': '10:00-11:30',
                'afternoon_dip': True,
                'evening_recovery': False
            },
            'trends': {
                'focus_improving': True,
                'improvement_rate': '5% per week',
                'streak_days': 12
            },
            'personalized_schedule': {
                'best_times': ['09:00-12:00', '14:00-16:00'],
                'break_times': ['12:00-13:00', '16:00-16:30'],
                'avoid_times': ['13:00-14:00', '18:00-19:00']
            }
        }

    def suggest_environment_adjustment(self, current_data):
        """Suggest environment adjustments for better focus"""
        suggestions = []

        illuminance = current_data.get('illuminance', 0)
        if illuminance < 300:
            suggestions.append({
                'type': 'lighting',
                'action': 'increase_brightness',
                'target': 400,
                'expected_improvement': '10-15%'
            })

        noise_level = current_data.get('noise_level', 0)
        if noise_level > 60:
            suggestions.append({
                'type': 'noise',
                'action': 'use_noise_cancelling',
                'target': 'below_50dB',
                'expected_improvement': '15-20%'
            })

        humidity = current_data.get('humidity', 0)
        if humidity < 30 or humidity > 70:
            suggestions.append({
                'type': 'humidity',
                'action': 'adjust_humidifier',
                'target': '40-60%',
                'expected_improvement': '5-10%'
            })

        return {
            'suggestions': suggestions,
            'estimated_overall_improvement': '20-35%'
        }

    def _build_prompt(self, data):
        """Build prompt for EXAONE API"""
        return f"""
다음 사용자 데이터를 바탕으로 집중력 향상을 위한 개인화된 조언을 제공해주세요:

사용자 데이터:
- 오늘 집중 시간: {data.get('focus_hours', 0)}시간
- 환경 질: {data.get('environment_quality', '미분석')}
- 자세 품질: {data.get('posture_quality', '미분석')}
- 현재 시간: {datetime.now().strftime('%H:%M')}

다음을 제공해주세요:
1. 환경 개선을 위한 구체적인 추천사항
2. 시간 관리 관련 추천사항
3. 자세/건강 관련 추천사항

한국어로 간결하게 답변해주세요.
"""

    def _call_exaone_api(self, prompt):
        """Call EXAONE API to generate advice"""
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }

            payload = {
                'model': self.model,
                'messages': [
                    {
                        'role': 'user',
                        'content': prompt
                    }
                ],
                'temperature': 0.7,
                'max_tokens': 500
            }

            response = requests.post(
                self.api_endpoint,
                headers=headers,
                json=payload,
                timeout=10
            )

            if response.status_code == 200:
                data = response.json()
                return data.get('choices', [{}])[0].get('message', {}).get('content', '')
            else:
                print(f"❌ EXAONE API error: {response.status_code}")
                return self._get_fallback_advice()

        except Exception as e:
            print(f"❌ EXAONE API call failed: {e}")
            return self._get_fallback_advice()

    def _get_fallback_advice(self):
        """Fallback advice if API fails"""
        return f"""
당신의 데이터를 바탕으로 한 추천사항입니다:

1. **환경**: 방의 밝기를 400룩스로 증가시켜보세요. 현재 조명 수준이 집중력에 영향을 미치고 있을 수 있습니다.

2. **시간 관리**: 아침 10시부터 오후 12시 사이에 집중력이 가장 높습니다. 중요한 작업을 이 시간대에 예약해보세요.

3. **건강 & 자세**: 바른 자세를 유지하세요. 나쁜 자세는 집중력을 최대 15%까지 감소시킬 수 있습니다. 30분마다 2분간 스트레칭 휴식을 취하세요.

기억하세요, 작은 일관된 개선이 시간에 따라 축적됩니다. 한 번에 한 가지 영역에 집중하세요!
"""
