from flask import Blueprint, request, jsonify
from app.services.sensor_service import SensorService
from app.services.data_service import DataService
from app.services.ai_service import AIService

api_bp = Blueprint('api', __name__)

# Initialize services
sensor_service = SensorService()
data_service = DataService()
ai_service = AIService()

# ============ Sensor Routes ============

@api_bp.route('/sensors/latest', methods=['GET'])
def get_latest_sensors():
    """Get latest sensor data"""
    try:
        data = sensor_service.get_latest()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/sensors/history', methods=['GET'])
def get_sensor_history():
    """Get sensor data history"""
    try:
        start_date = request.args.get('start')
        end_date = request.args.get('end')

        data = sensor_service.get_history(start_date, end_date)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/sensors/stats', methods=['GET'])
def get_sensor_stats():
    """Get sensor statistics"""
    try:
        stats = sensor_service.get_stats()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/sensors', methods=['POST'])
def save_sensor_data():
    """Save new sensor data from Arduino"""
    try:
        data = request.get_json()
        result = sensor_service.save(data)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ Statistics Routes ============

@api_bp.route('/stats/daily', methods=['GET'])
def get_daily_stats():
    """Get daily statistics"""
    try:
        stats = data_service.get_daily_stats()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/stats/weekly', methods=['GET'])
def get_weekly_stats():
    """Get weekly statistics"""
    try:
        stats = data_service.get_weekly_stats()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/stats/monthly', methods=['GET'])
def get_monthly_stats():
    """Get monthly statistics"""
    try:
        stats = data_service.get_monthly_stats()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ AI Routes ============

@api_bp.route('/ai/recommendations', methods=['GET'])
def get_recommendations():
    """Get AI recommendations"""
    try:
        recommendations = ai_service.get_recommendations()
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/ai/advice', methods=['POST'])
def generate_advice():
    """Generate AI advice based on data"""
    try:
        data = request.get_json()
        advice = ai_service.generate_advice(data)
        return jsonify(advice), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ Health Check ============

@api_bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'services': {
            'sensors': sensor_service.is_connected(),
            'database': data_service.is_connected(),
            'ai': ai_service.is_connected()
        }
    }), 200
