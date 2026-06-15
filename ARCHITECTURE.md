# 집중력 강화 시스템 - 시스템 아키텍처

## 전체 시스템 다이어그램

```mermaid
graph TB
    subgraph Hardware["🔧 Hardware Layer (Arduino)"]
        Vibration["진동 센서<br/>Vibration Sensor"]
        Light["조도 센서<br/>Light Sensor"]
        Ultrasonic["초음파 센서<br/>Ultrasonic Sensor"]
        Button["버튼/릴레이<br/>Button/Relay"]
    end

    subgraph Communication["🔌 Communication"]
        MQTT["MQTT/Serial<br/>JSON 형식"]
    end

    subgraph Backend["⚙️ Backend (Python)"]
        API["REST API<br/>routes.py"]
        SensorService["센서 서비스<br/>sensor_service.py"]
        DataService["데이터 처리<br/>data_service.py"]
        AIService["AI 서비스<br/>ai_service.py"]
        Models["데이터 모델<br/>models/"]
    end

    subgraph Database["💾 Database"]
        H2["H2<br/>개발 환경"]
        MySQL["MySQL<br/>프로덕션"]
    end

    subgraph Frontend["🎨 Frontend (Web)"]
        Dashboard["대시보드<br/>dashboard.html"]
        Stats["통계/분석<br/>stats.html"]
        Settings["설정<br/>settings.html"]
        AppJS["메인 앱 로직<br/>app.js"]
        APIClient["API 클라이언트<br/>api.js"]
        Charts["차트 시각화<br/>Chart.js"]
        MediaPipe["포즈/얼굴 감지<br/>MediaPipe"]
        WebcamAPI["웹캠 접근<br/>MediaDevices API"]
    end

    subgraph ExternalServices["🌐 External Services"]
        EXAONE["EXAONE AI<br/>자연어 조언"]
    end

    %% Hardware to Backend
    Vibration --> MQTT
    Light --> MQTT
    Ultrasonic --> MQTT
    Button --> MQTT
    MQTT --> SensorService

    %% Backend internal flow
    SensorService --> DataService
    DataService --> Models
    Models --> API
    DataService --> AIService
    AIService --> EXAONE

    %% Backend to Database
    DataService --> H2
    DataService --> MySQL

    %% Frontend to Backend
    APIClient --> API
    AppJS --> APIClient
    AppJS --> Charts
    AppJS --> MediaPipe
    AppJS --> WebcamAPI
    AppJS --> Dashboard
    AppJS --> Stats
    AppJS --> Settings

    %% Database to Frontend (via API)
    API --> Charts
    API --> Stats

    %% Styling
    classDef hardware fill:#FFA07A,stroke:#FF6347,stroke-width:2px
    classDef backend fill:#87CEEB,stroke:#4169E1,stroke-width:2px
    classDef frontend fill:#98FB98,stroke:#228B22,stroke-width:2px
    classDef database fill:#DDA0DD,stroke:#9932CC,stroke-width:2px
    classDef external fill:#FFD700,stroke:#FFA500,stroke-width:2px

    class Vibration,Light,Ultrasonic,Button hardware
    class SensorService,DataService,AIService,Models,API backend
    class Dashboard,Stats,Settings,AppJS,APIClient,Charts,MediaPipe,WebcamAPI frontend
    class H2,MySQL database
    class EXAONE external
```

## 데이터 흐름

```mermaid
graph LR
    A["Arduino<br/>센서 데이터 수집"] -->|MQTT/Serial| B["Python Backend<br/>데이터 처리"]
    B -->|저장| C["Database<br/>H2/MySQL"]
    B -->|분석 요청| D["EXAONE AI<br/>자동 조언 생성"]
    B -->|REST API| E["Web Frontend<br/>실시간 대시보드"]
    E -->|웹캠/포즈| F["MediaPipe<br/>사용자 모니터링"]
    E -->|시각화| G["Chart.js<br/>통계 표시"]
    F -->|분석 결과| E
```

## 컴포넌트 상세

### Hardware (Arduino)
- **진동 센서**: 타이핑/사용 감지, 외부 소음, 패턴 분석
- **조도 센서**: 실내 조명 감지, 수면 패턴 추적
- **초음파 센서**: 앉은 자세 감지, 거리 모니터링
- **버튼/릴레이**: 조명 제어, 수동 조작
- **통신**: MQTT 또는 Serial 프로토콜로 JSON 형식 전송

### Backend (Python)
- **api/** - REST API 엔드포인트 정의 및 요청 처리
- **services/** - 비즈니스 로직
  - `sensor_service.py` - 센서 데이터 수집/처리
  - `data_service.py` - 데이터 분석 및 통계
  - `ai_service.py` - EXAONE AI 통합
- **models/** - 데이터 모델 (Sensor, User, Statistics)
- **config/** - 환경 설정

### Frontend (Web)
- **페이지**
  - Dashboard: 실시간 센서 데이터 모니터링
  - Stats: 집중 시간, 환경 통계 분석
  - Settings: 사용자 설정
- **기능**
  - Chart.js: 실시간 차트 시각화
  - MediaPipe: 포즈/얼굴 감지로 사용자 상태 모니터링
  - MediaDevices API: 웹캠 접근
  - Fetch API: 백엔드 통신

### Database
- **개발 환경**: H2 (인메모리, 자동 생성)
- **프로덕션**: MySQL
- **테이블**
  - `sensors` - 센서 데이터
  - `users` - 사용자 정보
  - `statistics` - 통계 데이터

## 기술 스택

| 계층 | 기술 |
|------|------|
| **Hardware** | Arduino, 다양한 센서 |
| **Backend** | Python, REST API |
| **Frontend** | HTML, CSS, Vanilla JavaScript |
| **AI** | EXAONE (LLM) |
| **Database** | H2 (dev), MySQL (prod) |
| **Libraries** | Chart.js, MediaPipe |

## 배포 아키텍처

```mermaid
graph TB
    subgraph Dev["개발 환경"]
        Arduino1["Arduino<br/>로컬 테스트"]
        Backend1["Python Backend<br/>localhost:5000"]
        Frontend1["Web Server<br/>localhost:8000"]
        DB1["H2 Database<br/>인메모리"]
    end

    subgraph Prod["프로덕션 환경"]
        Arduino2["Arduino<br/>실제 배포"]
        Backend2["Python Backend<br/>프로덕션 서버"]
        Frontend2["Web Server<br/>CDN"]
        DB2["MySQL Database<br/>프로덕션"]
    end

    Arduino1 -->|로컬 MQTT| Backend1
    Backend1 --> DB1
    Frontend1 -->|API| Backend1
    
    Arduino2 -->|프로덕션 MQTT| Backend2
    Backend2 --> DB2
    Frontend2 -->|API| Backend2
```
