from datetime import datetime, timedelta
import json
import paho.mqtt.client as mqtt
import threading
import os
import random
from dotenv import load_dotenv

load_dotenv()

class SensorService:
    """Service for handling sensor data from Arduino via MQTT"""

    def __init__(self):
        self.mqtt_client = None
        self.mqtt_connected = False
        self.latest_data = {}
        self.data_history = []
        self.lock = threading.Lock()

        # Demo mode (배포 환경용)
        self.demo_mode = os.getenv('DEMO_MODE', 'false').lower() == 'true'

        # MQTT Configuration
        self.mqtt_broker = os.getenv('MQTT_BROKER', 'localhost')
        self.mqtt_port = int(os.getenv('MQTT_PORT', 1883))

        # Start MQTT connection in background thread (데모 모드가 아닐 때만)
        if not self.demo_mode:
            self.connect_mqtt()
        else:
            print("[DEMO MODE] MQTT 연결 건너뜀")

    def connect_mqtt(self):
        """Connect to MQTT broker and subscribe to topics"""
        try:
            self.mqtt_client = mqtt.Client()
            self.mqtt_client.on_connect = self.on_connect
            self.mqtt_client.on_message = self.on_message
            self.mqtt_client.on_disconnect = self.on_disconnect

            self.mqtt_client.connect(self.mqtt_broker, self.mqtt_port, keepalive=60)

            # Start MQTT loop in background thread
            mqtt_thread = threading.Thread(target=self.mqtt_client.loop_forever, daemon=True)
            mqtt_thread.start()

            print("[OK] MQTT client initialized")
        except Exception as e:
            print(f"[WARN] MQTT initialization error: {e}")
            print("[INFO] Running in standalone mode (MQTT disabled)")

    def on_connect(self, client, userdata, flags, rc):
        """Callback for when MQTT client connects"""
        if rc == 0:
            print(f"[OK] Connected to MQTT broker ({self.mqtt_broker}:{self.mqtt_port})")
            self.mqtt_connected = True

            # Subscribe to sensor topics
            topics = [
                'home/sensors/light',
                'home/sensors/motion',
                'home/sensors/microphone'
            ]
            for topic in topics:
                client.subscribe(topic)
                print(f"[INFO] Subscribed to: {topic}")
        else:
            print(f"[ERROR] MQTT connection failed with code {rc}")
            self.mqtt_connected = False

    def on_message(self, client, userdata, msg):
        """Callback for when MQTT message is received"""
        try:
            payload = json.loads(msg.payload.decode())
            topic = msg.topic

            with self.lock:
                # Update latest data
                if 'light' in topic:
                    self.latest_data['light_sensor'] = payload
                elif 'motion' in topic:
                    self.latest_data['motion_sensor'] = payload
                elif 'microphone' in topic:
                    self.latest_data['microphone_sensor'] = payload

                # Add timestamp if not present
                if 'timestamp' not in self.latest_data:
                    self.latest_data['timestamp'] = datetime.now().isoformat()

                # Store in history (keep last 1000 records)
                self.data_history.append({
                    'topic': topic,
                    'data': payload,
                    'timestamp': datetime.now().isoformat()
                })
                if len(self.data_history) > 1000:
                    self.data_history.pop(0)

        except json.JSONDecodeError as e:
            print(f"[ERROR] JSON decode error in MQTT message: {e}")
        except Exception as e:
            print(f"[ERROR] Error processing MQTT message: {e}")

    def on_disconnect(self, client, userdata, rc):
        """Callback for when MQTT client disconnects"""
        self.mqtt_connected = False
        if rc != 0:
            print(f"[WARN] Unexpected MQTT disconnection (code: {rc})")

    def is_connected(self):
        """Check if MQTT connection is active"""
        return self.mqtt_connected

    def get_latest(self):
        """Get latest sensor data"""
        # Demo mode: return simulated sensor data
        if self.demo_mode:
            return {
                'timestamp': datetime.now().isoformat(),
                'light_sensor': {
                    'illuminance': random.uniform(200, 500),
                    'raw_value': random.randint(200, 500),
                    'timestamp': datetime.now().isoformat()
                },
                'microphone_sensor': {
                    'noise_level': random.uniform(10, 60),
                    'raw_value': random.randint(80, 480),
                    'timestamp': datetime.now().isoformat()
                },
                'motion_sensor': {
                    'detected': random.choice([True, False]),
                    'raw_value': random.randint(30, 100),
                    'timestamp': datetime.now().isoformat()
                }
            }

        with self.lock:
            if self.latest_data:
                return {
                    **self.latest_data,
                    'timestamp': datetime.now().isoformat()
                }

        # Fallback if no data yet
        return {
            'timestamp': datetime.now().isoformat(),
            'motion_sensor': {
                'detected': False,
                'raw_value': 0,
                'timestamp': datetime.now().isoformat()
            },
            'light_sensor': {
                'illuminance': 0,
                'raw_value': 0,
                'timestamp': datetime.now().isoformat()
            },
            'microphone_sensor': {
                'noise_level': 0,
                'raw_value': 0,
                'timestamp': datetime.now().isoformat()
            }
        }

    def get_history(self, start_date=None, end_date=None, limit=100):
        """Get sensor data history for date range"""
        with self.lock:
            if not self.data_history:
                return {
                    'start_date': start_date or datetime.now().isoformat(),
                    'end_date': end_date or datetime.now().isoformat(),
                    'data_points': 0,
                    'data': []
                }

            # Filter by date range if provided
            filtered_data = self.data_history
            if start_date or end_date:
                start = datetime.fromisoformat(start_date) if start_date else datetime.min
                end = datetime.fromisoformat(end_date) if end_date else datetime.max

                filtered_data = [
                    d for d in self.data_history
                    if start <= datetime.fromisoformat(d['timestamp']) <= end
                ]

            # Return last 'limit' records
            return {
                'start_date': start_date,
                'end_date': end_date,
                'data_points': len(filtered_data[-limit:]),
                'data': filtered_data[-limit:]
            }

    def get_stats(self):
        """Get sensor statistics"""
        with self.lock:
            if not self.data_history:
                return {
                    'motion_sensor': {'avg_noise_level': 0, 'max_noise_level': 0},
                    'light_sensor': {'avg_illuminance': 0, 'min_illuminance': 0, 'max_illuminance': 0},
                    'ultrasonic_sensor': {'avg_distance': 0, 'posture_quality': 0}
                }

            light_values = []
            noise_values = []

            for record in self.data_history:
                data = record.get('data', {})
                if 'illuminance' in data:
                    light_values.append(data['illuminance'])
                if 'noise_level' in data:
                    noise_values.append(data['noise_level'])

            return {
                'motion_sensor': {
                    'avg_noise_level': sum(noise_values) / len(noise_values) if noise_values else 0,
                    'max_noise_level': max(noise_values) if noise_values else 0,
                    'data_points': len(noise_values)
                },
                'light_sensor': {
                    'avg_illuminance': sum(light_values) / len(light_values) if light_values else 0,
                    'min_illuminance': min(light_values) if light_values else 0,
                    'max_illuminance': max(light_values) if light_values else 0,
                    'data_points': len(light_values)
                }
            }

    def save(self, data):
        """Save new sensor data"""
        try:
            if not data:
                raise ValueError('No data provided')

            if 'timestamp' not in data:
                data['timestamp'] = datetime.now().isoformat()

            with self.lock:
                self.latest_data.update(data)
                self.data_history.append({
                    'data': data,
                    'timestamp': datetime.now().isoformat()
                })
                if len(self.data_history) > 1000:
                    self.data_history.pop(0)

            return {
                'success': True,
                'message': 'Sensor data saved',
                'timestamp': data['timestamp']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
