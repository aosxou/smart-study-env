# 🌿 EcoMind - 집중력 강화 시스템

IoT 센서와 AI를 활용한 **개인화된 집중력 모니터링 및 추천 시스템**입니다.
실시간 환경 분석, 포모도로 타이머, 얼굴 인식 기반 집중도 분석 등의 기능을 제공합니다.

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시스템 요구사항](#-시스템-요구사항)
- [설치 및 셋업](#-설치-및-셋업)
- [실행 방법](#-실행-방법)
- [프로젝트 구조](#-프로젝트-구조)
- [API 엔드포인트](#-api-엔드포인트)
- [문제 해결](#-문제-해결)

## ✨ 주요 기능

### 🎯 센서 모니터링
- **조도 센서**: 주변 조명 레벨 실시간 감지 (lux 단위)
- **소음 센서**: 환경 소음 레벨 측정 (dB 단위)
- **동작 감지**: 사용자 활동 여부 감지

### ⏱️ 포모도로 타이머
- 25분 집중 / 5분 휴식 자동 반복
- 집중도 기반 자동 일시정지/재개
- 일일 세션 통계 추적

### 😊 AI 기반 집중도 분석
- **MediaPipe Face Mesh**를 이용한 얼굴 인식
- 시선 추적 (정면/아래/옆 감지)
- 자세 분석
- 개인화된 집중 점수 계산

### 🤖 AI 추천 시스템
- **EXAONE AI** 기반 개인화 추천
- 최적 작업 시간대 제안
- 환경 개선 제안
- 휴식 및 건강 조언

### 📊 통계 및 분석
- 주간/월간 집중도 추이
- 환경 점수 그래프
- 월간 달력 뷰
- 일일 상세 통계

## 🛠️ 기술 스택

### Backend
- **Python 3.8+**: Flask, MQTT, PySerial
- **Flask**: REST API 서버
- **MQTT (Mosquitto)**: 센서 데이터 브로커
- **PySerial**: Arduino 시리얼 통신

### Frontend
- **HTML5, CSS3, JavaScript**: 웹 인터페이스
- **MediaPipe**: 얼굴 인식 및 랜드마크 감지
- **JavaScript Canvas**: 실시간 시각화

### Hardware
- **Arduino Uno**: 마이크로컨트롤러
- **CdS 포토레지스터**: 조도 센서
- **마이크**: 소음 센서
- **USB-to-Serial 케이블**

## 📦 시스템 요구사항

### 소프트웨어
- Python 3.8 이상
- MQTT 브로커 (Mosquitto)
- 최신 웹 브라우저 (Chrome, Firefox, Safari)

### 하드웨어
- Arduino Uno 마이크로컨트롤러
- 센서 모듈 (조도, 소음)
- USB 케이블
- Webcam (집중도 분석 기능 사용 시)

### 포트 요구사항
- **3000**: Flask 웹 서버
- **1883**: MQTT 브로커

## 🚀 설치 및 셋업

### 1️⃣ 저장소 클론

```bash
git clone https://github.com/HyeRyeong125/Study-environment-checking-ystem.git
cd 앱프_프젝
```

### 2️⃣ Python 의존성 설치

```bash
cd backend
pip install -r requirements.txt
```

### 3️⃣ MQTT 브로커 설치

**macOS:**
```bash
brew install mosquitto
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mosquitto mosquitto-clients
```

### 4️⃣ Arduino 설정

1. Arduino IDE 다운로드
2. `arduino/sensor_sketch/sensor_sketch.ino` 파일 업로드
3. 보드: Arduino Uno 선택
4. 포트: USB 포트 선택

### 5️⃣ 환경 변수 설정

`.env` 파일 생성 (backend 디렉토리):

```env
ARDUINO_SERIAL_PORT=/dev/cu.usbserial-1130
ARDUINO_BAUD_RATE=9600
MQTT_BROKER=localhost
MQTT_PORT=1883
PORT=3000
```

## ⚙️ 실행 방법

### 터미널 1️⃣: MQTT 브로커

```bash
mosquitto
```

### 터미널 2️⃣: Arduino Gateway

```bash
cd backend
python arduino_gateway.py
```

### 터미널 3️⃣: Flask 백엔드

```bash
cd backend
python main.py
```

### 브라우저 접속

```
http://localhost:3000
```

## 📁 프로젝트 구조

```
앱프_프젝/
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── sensor_service.py
│   │   │   ├── ai_service.py
│   │   │   └── data_service.py
│   │   ├── api/
│   │   │   └── routes.py
│   │   └── __init__.py
│   ├── arduino_gateway.py
│   ├── main.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── dashboard.html
│   │   │   ├── stats.html
│   │   │   └── settings.html
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── responsive.css
│   │   └── js/
│   │       └── mediadevices.js
│   ├── presentation.html
│   └── index.html
│
├── arduino/
│   └── sensor_sketch/
│       └── sensor_sketch.ino
│
└── README.md
```

## 🔌 API 엔드포인트

**GET `/api/sensors/latest`** - 최신 센서 데이터

**GET `/api/ai/recommendations`** - AI 추천사항

**GET `/api/stats/summary`** - 통계 요약

**GET `/api/stats/history`** - 기간별 히스토리

## 🎨 사용법

### 📊 대시보드
1. 좌측: AI 추천사항 확인
2. 중앙: 웹캠 켜서 집중도 모니터링
3. 우측: 포모도로 타이머 및 센서 상태

### ⏰ 포모도로 타이머
- 카메라 켜기 → 자동 시작
- 집중도 기반 자동 일시정지/재개
- 일일 통계 추적

### 📈 통계 페이지
- 월간 요약
- 주간 집중 시간 그래프
- 환경 점수 추이
- 일일 상세 통계

## 🔧 문제 해결

### Arduino 연결 불가
```bash
# 포트 확인
ls /dev/cu.usbserial-*

# .env 파일의 ARDUINO_SERIAL_PORT 수정
```

### MQTT 연결 불가
```bash
# Mosquitto 실행 확인
ps aux | grep mosquitto

# 실행 안 되면 시작
mosquitto
```

### 포트 3000 이미 사용 중
```bash
lsof -i :3000
kill -9 <PID>
```

## 📝 환경 변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `ARDUINO_SERIAL_PORT` | `/dev/cu.usbserial-140` | Arduino USB 포트 |
| `MQTT_BROKER` | `localhost` | MQTT 브로커 주소 |
| `MQTT_PORT` | `1883` | MQTT 포트 |
| `PORT` | `3000` | Flask 포트 |

## 📄 라이선스

MIT License

## 👤 개발자

- **개발**: HyeRyeong125
- **프로젝트**: EcoMind (집중력 강화 시스템)
- **마지막 업데이트**: 2026-06-15

---

**행운을 빕니다! 집중의 시간을 즐기세요 🌿**
