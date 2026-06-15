#!/usr/bin/env python3
"""Sensor Data Simulator - sends test data to MQTT"""

import paho.mqtt.client as mqtt
import json
import time
import random

MQTT_BROKER = 'localhost'
MQTT_PORT = 1883

client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("✓ Connected to MQTT broker")
    else:
        print(f"✗ Connection failed: {rc}")

client.on_connect = on_connect
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_start()

print("🔄 Sensor Simulator started. Publishing test data...\n")

try:
    while True:
        # Simulate changing sensor values
        light = 200 + random.randint(0, 400)
        noise = 20 + random.randint(0, 60)
        distance = 20 + random.randint(0, 40)

        # Publish light sensor
        light_data = {'illuminance': light, 'raw_value': light}
        client.publish('home/sensors/light', json.dumps(light_data), qos=1)

        # Publish motion/noise sensor
        motion_data = {'noise_level': noise, 'raw_value': noise}
        client.publish('home/sensors/motion', json.dumps(motion_data), qos=1)

        # Publish ultrasonic sensor
        ultrasonic_data = {'distance': distance, 'posture': 'good' if distance > 25 else 'warning'}
        client.publish('home/sensors/ultrasonic', json.dumps(ultrasonic_data), qos=1)

        print(f"📡 Light: {light} lux | Noise: {noise} dB | Distance: {distance} cm")

        time.sleep(2)  # Update every 2 seconds

except KeyboardInterrupt:
    print("\n👋 Simulator stopped")
finally:
    client.loop_stop()
    client.disconnect()
