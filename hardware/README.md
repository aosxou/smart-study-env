# Hardware (Arduino)

Arduino 기반의 센서 시스템입니다.

## 센서 구성

- **지동 센서** - 타이핑/뭉킹 감지, 외부 소음, 패턴 감지
- **조도 센서** - 실내 조명 감지, 수면 패턴 추적
- **초음파 센서** - 앉은 자세 감지, 거리 모니터링
- **버튼/릴레이** - 조명 제어, 수동 조작

## 폴더 구조

```
hardware/
├── firmware/           # Arduino 스케치
│   └── main.ino       # 메인 코드
├── libraries/         # 외부 라이브러리
│   └── (필요한 라이브러리 폴더)
└── docs/             # 하드웨어 문서
    ├── WIRING.md     # 배선도
    └── COMPONENTS.md # 부품 목록
```

## 데이터 전송

- **MQTT** 또는 **Serial** 통신으로 백엔드에 데이터 전송
- 포맷: JSON

## 설치 및 업로드

1. Arduino IDE 설치
2. 필요한 라이브러리 설치
3. `firmware/main.ino` 파일 열기
4. 보드 및 포트 선택 후 업로드

## 참고

- [배선도](./docs/WIRING.md)
- [부품 목록](./docs/COMPONENTS.md)
