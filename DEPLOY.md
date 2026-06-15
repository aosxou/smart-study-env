# 🚀 EcoMind 배포 가이드

## Render에 배포하기 (무료)

### 1️⃣ Render 회원가입
- https://render.com 접속
- GitHub 계정으로 회원가입

### 2️⃣ 새로운 Web Service 생성
- "New+" 클릭 → "Web Service"
- GitHub 저장소 연결: `Study-environment-checking-ystem`
- Branch: `main`

### 3️⃣ 배포 설정
- **Name**: `ecomind-backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn -w 4 -b 0.0.0.0:$PORT main:app`

### 4️⃣ 환경 변수 설정
- Environment 탭에서 추가:
  ```
  DEMO_MODE=true
  PORT=3000
  FLASK_ENV=production
  ```

### 5️⃣ Deploy!
- "Create Web Service" 클릭
- 약 2-5분 후 배포 완료
- 제공된 URL: `https://ecomind-backend.onrender.com`

---

## 📋 배포된 URL

### 프레젠테이션
- GitHub Pages: `https://HyeRyeong125.github.io/Study-environment-checking-ystem/presentation.html`

### 백엔드 API (Render)
- Base URL: `https://ecomind-backend.onrender.com`
- Sensor API: `https://ecomind-backend.onrender.com/api/sensors/latest`
- Dashboard: `https://ecomind-backend.onrender.com/src/pages/dashboard.html`

---

## 🔧 로컬에서 데모 모드 실행

```bash
cd backend
DEMO_MODE=true python main.py
```

데모 모드에서는:
- ✅ 실제 센서 대신 랜덤 테스트 데이터 반환
- ✅ MQTT 브로커 연결 안 함
- ✅ Arduino 없어도 작동

---

## 📊 배포 후 테스트

```bash
# API 테스트
curl https://ecomind-backend.onrender.com/api/sensors/latest

# 대시보드 접속
https://ecomind-backend.onrender.com/src/pages/dashboard.html
```

---

## 💡 학교 발표 시 사용

1. **프레젠테이션**: GitHub Pages URL 공유
2. **시연 데모**: Render 배포 URL로 대시보드 보여주기
3. **인터넷만 있으면 어디서나 접속 가능!**

---

## ⚠️ 주의사항

- **Render 무료 티어**: 15분 이상 요청이 없으면 수면 모드
- 학교에서 발표 전에 URL 한 번 열어서 깨워두기!
- DEMO_MODE=true 필수 (실제 하드웨어 없음)

---

**발표 URL 정리:**
```
프레젠테이션: https://HyeRyeong125.github.io/Study-environment-checking-ystem/presentation.html
대시보드: https://ecomind-backend.onrender.com/src/pages/dashboard.html
API: https://ecomind-backend.onrender.com/api/sensors/latest
```
