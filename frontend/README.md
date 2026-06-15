# Frontend (Web)

HTML/CSS/Vanilla JavaScript 기반의 웹 프론트엔드입니다.

## 기능

- 실시간 대시보드 (센서 데이터 모니터링)
- 집중 시간 및 환경 통계
- MediaPipe를 통한 실시간 포즈/얼굴 감지
- Chart.js를 통한 데이터 시각화
- 웹캠 접근 (MediaDevices API)

## 폴더 구조

```
frontend/
├── public/              # 정적 파일
│   └── assets/         # 이미지, 아이콘 등
├── src/
│   ├── pages/          # HTML 페이지
│   │   ├── index.html         # 메인 페이지
│   │   ├── dashboard.html     # 실시간 대시보드
│   │   ├── stats.html         # 통계/분석
│   │   └── settings.html      # 설정
│   ├── css/            # 스타일시트
│   │   ├── style.css          # 메인 스타일
│   │   └── responsive.css     # 반응형 디자인
│   └── js/             # JavaScript
│       ├── app.js             # 메인 앱 로직
│       ├── api.js             # 백엔드 통신
│       ├── chart.js           # 차트 로직
│       ├── mediapipe.js       # MediaPipe 통합
│       └── mediavices.js      # 웹캠 접근
├── index.html          # 시작 페이지
└── README.md
```

## 실행 방법

```bash
# 간단한 로컬 서버 실행 (Python)
python -m http.server 8000

# 또는 Node.js http-server 사용
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

## 외부 라이브러리

- **Chart.js** (CDN) - 차트 라이브러리
- **MediaPipe** (CDN) - 포즈/얼굴 감지
- **Fetch API** - 백엔드 통신

## 참고

- [기술 스택 상세](../docs/ARCHITECTURE.md)
