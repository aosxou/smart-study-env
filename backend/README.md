# Backend (Python)

Python 기반의 백엔드 서버입니다.

## 기능

- Arduino 센서 데이터 수집 (MQTT/Serial)
- 데이터 처리 및 분석
- EXAONE AI를 통한 자연어 조언 생성
- REST API 제공
- 데이터베이스 관리

## 폴더 구조

```
backend/
├── app/
│   ├── api/              # API 라우트
│   │   ├── routes.py     # 엔드포인트 정의
│   │   └── handlers.py   # 요청 처리
│   ├── services/         # 비즈니스 로직
│   │   ├── ai_service.py      # EXAONE AI 통합
│   │   ├── data_service.py    # 데이터 처리
│   │   └── sensor_service.py  # 센서 데이터
│   ├── models/           # 데이터 모델
│   └── config/           # 설정
├── requirements.txt      # 의존성
├── main.py              # 메인 서버
└── README.md
```

## 설치 및 실행

```bash
# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python main.py
```

## API 문서

[API_DOCS.md](../docs/API_DOCS.md) 참고
