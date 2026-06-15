from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# Serve static files
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/src/<path:filename>')
def serve_src(filename):
    return send_from_directory(os.path.join(app.static_folder, 'src'), filename)

# Configuration
app.config['DEBUG'] = os.getenv('DEBUG', False)
app.config['ENV'] = os.getenv('FLASK_ENV', 'development')

# Register blueprints
from app.api.routes import api_bp

app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'presentation.html')

@app.errorhandler(404)
def not_found(error):
    return {
        'error': 'Not Found',
        'message': 'The requested endpoint does not exist'
    }, 404

@app.errorhandler(500)
def internal_error(error):
    return {
        'error': 'Internal Server Error',
        'message': 'An error occurred while processing your request'
    }, 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])
