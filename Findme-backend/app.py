from flask import Flask, jsonify
from flask_cors import CORS
from auth import auth_bp  # Import our authentication routes

# Create the main Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'findme-secret-key-2024'

# Allow frontend to communicate with backend
CORS(app)

# Register our authentication routes with the app
app.register_blueprint(auth_bp)

# Simple home route to check if API is working
@app.route('/')
def home():
    return jsonify({'message': 'FindMe API is up and running! 🚀'})

# Health check route for monitoring
@app.route('/api/health')
def health_check():
    return jsonify({'status': 'healthy', 'service': 'FindMe API'})

# Start the server
if __name__ == '__main__':
    print("Starting FindMe server...")
    app.run(debug=True, port=5000)