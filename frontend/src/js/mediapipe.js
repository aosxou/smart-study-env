// MediaPipe Integration - Pose & Face Detection

class MediaPipeManager {
    constructor() {
        this.pose = null;
        this.faceMesh = null;
        this.webcamRunning = false;
        this.videoElement = null;
    }

    // Initialize MediaPipe Pose
    async initPose() {
        const Pose = window.Pose;

        this.pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });

        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.pose.onResults(this.onPoseResults.bind(this));

        console.log('MediaPipe Pose initialized');
    }

    // Initialize MediaPipe Face Mesh
    async initFaceMesh() {
        const FaceMesh = window.FaceMesh;

        this.faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });

        this.faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.faceMesh.onResults(this.onFaceResults.bind(this));

        console.log('MediaPipe Face Mesh initialized');
    }

    // Handle Pose Results
    onPoseResults(results) {
        if (results.landmarks) {
            const landmarks = results.landmarks;

            // Analyze posture
            const postureData = {
                leftShoulder: landmarks[11],
                rightShoulder: landmarks[12],
                leftHip: landmarks[23],
                rightHip: landmarks[24],
                leftKnee: landmarks[25],
                rightKnee: landmarks[26]
            };

            this.analyzePosture(postureData);
        }
    }

    // Handle Face Mesh Results
    onFaceResults(results) {
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const faceLandmarks = results.multiFaceLandmarks[0];

            // Analyze face (eye gaze, attention, etc.)
            this.analyzeFace(faceLandmarks);
        }
    }

    // Analyze Posture
    analyzePosture(data) {
        const attentionScore = this.calculatePostureScore(data);
        console.log('Posture Attention Score:', attentionScore);

        // Send to backend
        this.sendPostureData({
            score: attentionScore,
            timestamp: new Date().toISOString()
        });
    }

    // Analyze Face
    analyzeFace(landmarks) {
        const gazeDirection = this.calculateGazeDirection(landmarks);
        const eyeOpenness = this.calculateEyeOpenness(landmarks);

        console.log('Gaze Direction:', gazeDirection);
        console.log('Eye Openness:', eyeOpenness);

        // Send to backend
        this.sendFaceData({
            gazeDirection: gazeDirection,
            eyeOpenness: eyeOpenness,
            timestamp: new Date().toISOString()
        });
    }

    // Calculate Posture Score (0-100)
    calculatePostureScore(data) {
        // Simple posture scoring based on key points alignment
        let score = 100;

        // Check if person is sitting straight
        if (data.leftShoulder && data.rightShoulder) {
            const shoulderAngle = Math.abs(
                Math.atan2(data.rightShoulder.y - data.leftShoulder.y,
                          data.rightShoulder.x - data.leftShoulder.x)
            );

            if (shoulderAngle > 0.2) {
                score -= 20;
            }
        }

        return Math.max(0, Math.min(100, score));
    }

    // Calculate Gaze Direction
    calculateGazeDirection(faceLandmarks) {
        // Simplified gaze calculation
        const leftEye = faceLandmarks[133]; // Left eye outer corner
        const rightEye = faceLandmarks[33];  // Right eye outer corner
        const noseTip = faceLandmarks[1];   // Nose tip

        if (noseTip.x < (leftEye.x + rightEye.x) / 2 - 0.05) {
            return 'left';
        } else if (noseTip.x > (leftEye.x + rightEye.x) / 2 + 0.05) {
            return 'right';
        }

        return 'center';
    }

    // Calculate Eye Openness (0-100)
    calculateEyeOpenness(faceLandmarks) {
        // Eye landmarks indices
        const topLeft = faceLandmarks[159];   // Eye top left
        const bottomLeft = faceLandmarks[145]; // Eye bottom left
        const topRight = faceLandmarks[386];  // Right eye top
        const bottomRight = faceLandmarks[374]; // Right eye bottom

        const leftEyeOpenness = Math.sqrt(
            Math.pow(topLeft.x - bottomLeft.x, 2) +
            Math.pow(topLeft.y - bottomLeft.y, 2)
        );

        const rightEyeOpenness = Math.sqrt(
            Math.pow(topRight.x - bottomRight.x, 2) +
            Math.pow(topRight.y - bottomRight.y, 2)
        );

        const avgOpenness = (leftEyeOpenness + rightEyeOpenness) / 2;

        return Math.min(100, avgOpenness * 100);
    }

    // Send Posture Data to Backend
    async sendPostureData(data) {
        try {
            // Implement API call here
            console.log('Sending posture data:', data);
        } catch (error) {
            console.error('Error sending posture data:', error);
        }
    }

    // Send Face Data to Backend
    async sendFaceData(data) {
        try {
            // Implement API call here
            console.log('Sending face data:', data);
        } catch (error) {
            console.error('Error sending face data:', error);
        }
    }
}

const mediaPipeManager = new MediaPipeManager();
