// MediaDevices API - Webcam Access

class WebcamManager {
    constructor(videoElementId) {
        this.videoElement = document.getElementById(videoElementId);
        this.stream = null;
        this.constraints = {
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        };
    }

    // Request webcam access
    async startWebcam() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            if (this.videoElement) {
                this.videoElement.srcObject = this.stream;
                this.videoElement.play();

                console.log('Webcam started successfully');
                return true;
            }
        } catch (error) {
            console.error('Error accessing webcam:', error);

            // Handle specific errors
            if (error.name === 'NotAllowedError') {
                console.error('Camera access denied by user');
            } else if (error.name === 'NotFoundError') {
                console.error('No camera found');
            } else if (error.name === 'NotReadableError') {
                console.error('Camera is already in use');
            }

            return false;
        }
    }

    // Stop webcam
    stopWebcam() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
            console.log('Webcam stopped');
        }
    }

    // Get video dimensions
    getVideoDimensions() {
        if (this.videoElement) {
            return {
                width: this.videoElement.videoWidth,
                height: this.videoElement.videoHeight
            };
        }
        return null;
    }

    // Capture frame as image
    captureFrame() {
        if (!this.videoElement) {
            console.error('Video element not found');
            return null;
        }

        const canvas = document.createElement('canvas');
        canvas.width = this.videoElement.videoWidth;
        canvas.height = this.videoElement.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.videoElement, 0, 0);

        return canvas.toDataURL('image/jpeg');
    }

    // Get device list
    async getDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log('Available cameras:', videoDevices);
            return videoDevices;
        } catch (error) {
            console.error('Error enumerating devices:', error);
            return [];
        }
    }

    // Change camera
    async switchCamera(deviceId) {
        this.stopWebcam();

        this.constraints.video.deviceId = { exact: deviceId };

        return await this.startWebcam();
    }

    // Enable/disable device permissions listener
    async listenForDeviceChanges(callback) {
        navigator.mediaDevices.addEventListener('devicechange', () => {
            console.log('Device changes detected');
            if (callback) callback();
        });
    }

    // Check camera availability
    static async hasCameraSupport() {
        return !!(
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia
        );
    }

    // Check permission status
    static async checkPermissionStatus() {
        try {
            const result = await navigator.permissions.query({ name: 'camera' });
            return result.state;
        } catch (error) {
            console.error('Error checking camera permission:', error);
            return 'unknown';
        }
    }
}

// Screen sharing (optional feature)
class ScreenShareManager {
    static async startScreenShare() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: 'always' },
                audio: false
            });

            console.log('Screen share started');
            return stream;
        } catch (error) {
            console.error('Error starting screen share:', error);
            return null;
        }
    }

    static async stopScreenShare(stream) {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            console.log('Screen share stopped');
        }
    }
}
