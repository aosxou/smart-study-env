# Database

프로젝트의 데이터베이스 설정입니다.

## 구성

### 개발 환경 (H2)
- 인메모리 데이터베이스
- 애플리케이션 실행 시 자동 생성
- H2 콘솔에서 SQL 직접 확인 가능

### 프로덕션 환경 (MySQL)
- 실제 배포용 데이터베이스
- `application-prod.yml`에서 H2를 MySQL로 변경 가능

## 폴더 구조

```
database/
├── h2/
│   └── init.sql       # 개발용 초기 스키마
├── mysql/
│   └── init.sql       # 프로덕션 스키마
└── README.md
```

## 초기화

### H2 (개발)
```bash
# 자동 생성됨 (별도 설정 불필요)
```

### MySQL (프로덕션)
```bash
# init.sql 실행
mysql -u root -p < database/mysql/init.sql
```

## 스키마

- `sensors` - 센서 데이터
- `users` - 사용자 정보
- `statistics` - 통계 데이터

[자세한 스키마 정보](./SCHEMA.md)
