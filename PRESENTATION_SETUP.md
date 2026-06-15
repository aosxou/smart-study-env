# 📊 프레젠테이션 설정 가이드

집중력 강화 시스템의 프레젠테이션을 GitHub Pages에 배포하는 완전한 가이드입니다.

## 📋 생성된 파일 목록

```
📦 프로젝트 루트
├── 🎬 presentation/
│   ├── index.html           ← 메인 프레젠테이션 (Reveal.js)
│   ├── README.md            ← 프레젠테이션 가이드
│   └── assets/              ← 이미지 및 리소스 폴더
│
├── 📖 문서
│   ├── README.md            ← 프로젝트 전체 소개 (업데이트됨)
│   ├── ARCHITECTURE.md      ← 시스템 아키텍처 (Mermaid 다이어그램)
│   └── PRESENTATION_SETUP.md ← 이 파일
│
├── ⚙️ 설정 파일
│   ├── .gitignore           ← Git 무시 파일
│   ├── _config.yml          ← GitHub Pages 설정
│   └── setup-github-pages.sh ← 자동 설정 스크립트
│
└── 📁 기타
    ├── hardware/
    ├── backend/
    ├── frontend/
    └── database/
```

## 🚀 빠른 시작 (3단계)

### 방법 1: 자동 스크립트 (권장) ⭐

```bash
# 1. 스크립트 실행
./setup-github-pages.sh <GitHub-username> <repository-name>

# 예시:
./setup-github-pages.sh park concentration-system
```

스크립트가 자동으로:
- ✅ Git 저장소 초기화
- ✅ Remote origin 설정
- ✅ 모든 파일 커밋
- ✅ Main 브랜치로 변경
- ✅ GitHub에 푸시

### 방법 2: 수동 설정

#### Step 1: Git 저장소 설정

```bash
# 저장소가 없으면 초기화
git init

# GitHub 저장소 연결 (처음 한 번만)
git remote add origin https://github.com/yourusername/concentration-system.git

# 현재 상태 확인
git remote -v
```

#### Step 2: GitHub에 푸시

```bash
# 모든 변경 사항 스테이징
git add .

# 초기 커밋
git commit -m "Initial commit: Add presentation, architecture, and project structure"

# 메인 브랜치 이름 설정 (GitHub 기본 브랜치)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

#### Step 3: GitHub Pages 활성화

1. GitHub 저장소 → **Settings**
2. 왼쪽 사이드바에서 **Pages** 클릭
3. **Source** 설정:
   - Branch: **main**
   - Folder: **/ (root)**
4. **Save** 버튼 클릭
5. 3-5분 대기

## 🎉 프레젠테이션 접속

배포 완료 후, 다음 URL에서 프레젠테이션을 볼 수 있습니다:

```
https://<GitHub-username>.github.io/<repository-name>/presentation/
```

**예시:**
```
https://park.github.io/concentration-system/presentation/
```

## 📊 프레젠테이션 구성

### Slide 1: 제목 (Title)
- 프로젝트 제목
- 부제목
- 연도

### Slide 2-5: 프로젝트 비전 (Vision & Goals)
- 프로젝트 개요
- 핵심 가치 (4가지)
- 기대 효과

### Slide 6-11: 시스템 아키텍처 (Architecture)
- Hardware Layer 상세
- Backend Layer 상세
- Frontend Layer 상세
- Database Layer 상세
- 데이터 흐름

### Slide 12-14: WBS (Work Breakdown Structure)
- 프로젝트 구조 (5가지 주요 부분)
- 프로젝트 일정 (6가지 Phase)

### Slide 15-16: 기술 스택 (Technology Stack)
- 전체 기술 스택
- 외부 라이브러리 & API

### Slide 17-18: 프로젝트 구조 & 배포
- 디렉토리 구조
- 개발 및 프로덕션 환경

### Slide 19: 결론
- 최종 메시지

## 🎮 프레젠테이션 사용법

### 키보드 단축키

| 키 | 기능 |
|----|------|
| **Space** | 다음 슬라이드 |
| **→** | 다음 슬라이드 |
| **←** | 이전 슬라이드 |
| **↑ ↓** | 위/아래로 이동 |
| **F** | 전체화면 |
| **S** | 발표자 보기 |
| **Esc** | 슬라이드 맵 |
| **?** | 도움말 |
| **B / .** | 화면 검게 |
| **W** | 화면 하얀색 |

### 발표 팁

1. **전체화면**: F 키 누르기
2. **발표자 보기**: S 키 (이 화면에서만 보여짐)
3. **슬라이드 맵**: Esc 키로 전체 슬라이드 구조 보기
4. **프로젝터 연결**: 화면 미러링 후 프레젠테이션 시작

## ✏️ 프레젠테이션 커스터마이징

### 슬라이드 수정

`presentation/index.html` 파일을 텍스트 에디터로 열어 수정:

```html
<!-- 새 슬라이드 추가 -->
<section>
    <h2>새로운 제목</h2>
    <p>슬라이드 내용</p>
</section>

<!-- 중첩된 슬라이드 (세로 이동) -->
<section>
    <section>
        <h2>메인 주제</h2>
    </section>
    <section>
        <h2>서브 주제</h2>
    </section>
</section>
```

### 색상 변경

`<style>` 섹션에서 색상 값 변경:

```css
/* 기본 파란색 */
.custom-title {
    color: #4DB8FF;  /* 이 값을 원하는 색상으로 변경 */
}
```

**추천 색상:**
- 주요 색상 (파란색): `#4DB8FF`, `#1E90FF`, `#00BFFF`
- 강조 색상 (빨강): `#FF6B6B`, `#FF4444`
- 보조 색상 (초록): `#4ECDC4`, `#95E1D3`

### 테마 변경

테마 CDN 링크 변경:

```html
<!-- 현재 (검은 배경) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css">

<!-- 다른 테마 옵션 -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/white.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/league.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/sky.css"> -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/beige.css"> -->
```

## 📝 변경 후 업데이트

프레젠테이션을 수정한 후 GitHub에 푸시:

```bash
# 변경 사항 커밋
git add presentation/index.html
git commit -m "Update presentation content"

# 푸시
git push origin main
```

**주의:** GitHub Pages는 캐시를 사용하므로 변경이 반영되기까지 1-5분 소요될 수 있습니다.

## 🔗 관련 파일

- **presentation/index.html** - 프레젠테이션 메인 파일
- **ARCHITECTURE.md** - Mermaid 다이어그램 포함 시스템 아키텍처
- **README.md** - 프로젝트 전체 개요
- **_config.yml** - GitHub Pages 메타데이터

## 📚 참고 자료

- [Reveal.js 공식 문서](https://revealjs.com/)
- [GitHub Pages 가이드](https://pages.github.com/)
- [마크다운 가이드](https://guides.github.com/features/mastering-markdown/)
- [Git 튜토리얼](https://git-scm.com/book/ko/v2)

## ❓ 자주 묻는 질문

**Q: 프레젠테이션이 안 보여요**
- A: GitHub Pages가 활성화되어 있는지 확인하세요 (Settings → Pages)
- A: 3-5분 대기 후 URL을 다시 새로고침하세요

**Q: 수정 사항이 반영 안 돼요**
- A: 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
- A: Private Browsing 모드에서 확인해보세요

**Q: 프레젠테이션이 느려요**
- A: 불필요한 이미지나 스크립트 제거
- A: 번들 크기 최적화 (이미지 압축)

**Q: 다른 사람들과 공유하고 싶어요**
- A: GitHub Pages URL을 공유하면 됩니다
- A: 저장소를 Public으로 유지하세요

## ✅ 체크리스트

배포 전에 확인하세요:

- [ ] Git 저장소 초기화됨 (`git status` 실행)
- [ ] 모든 파일 커밋됨
- [ ] GitHub에 푸시됨 (`git log` 확인)
- [ ] GitHub Pages 활성화됨 (Settings → Pages)
- [ ] 프레젠테이션 URL 접속 가능
- [ ] 각 슬라이드 내용 확인
- [ ] 키보드 단축키 테스트

## 🎓 발표 준비 팁

1. **사전 확인**: 발표 30분 전에 프로젝터에서 테스트
2. **백업**: 로컬 폴더에도 HTML 파일 보관
3. **인터넷 연결**: CDN에서 Reveal.js 로드하므로 필요
4. **발표자 모드**: S 키로 노트 보면서 발표
5. **연습**: 실제 발표 전에 몇 번 연습

---

질문이 있으시면 GitHub Issues를 이용해주세요! 🙏
