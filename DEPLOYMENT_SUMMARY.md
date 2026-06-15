# 🎉 GitHub Pages 프레젠테이션 배포 완료

프로젝트를 위한 인터랙티브 프레젠테이션이 준비되었습니다!

## 📦 생성된 파일 목록

### 🎬 프레젠테이션
```
presentation/
├── index.html          🆕 인터랙티브 프레젠테이션 (Reveal.js 기반)
│                          • 프로젝트 비전
│                          • 시스템 아키텍처 (상세 설명)
│                          • WBS (Work Breakdown Structure)
│                          • 기술 스택
│                          • 배포 정보
│
└── README.md           🆕 프레젠테이션 사용 가이드
```

### 📖 문서
```
├── ARCHITECTURE.md        🆕 시스템 아키텍처 (Mermaid 다이어그램)
│                             • 전체 시스템 다이어그램
│                             • 데이터 흐름
│                             • 컴포넌트 상세 설명
│                             • 기술 스택 표
│                             • 배포 아키텍처
│
├── README.md              ✏️ 업데이트됨 (GitHub Pages 배포 가이드 추가)
│
└── PRESENTATION_SETUP.md  🆕 프레젠테이션 설정 완전 가이드
```

### ⚙️ 설정 & 스크립트
```
├── _config.yml            🆕 GitHub Pages 설정 (Jekyll)
├── .gitignore             🆕 Git 무시 파일 (IDE, 캐시 등)
└── setup-github-pages.sh  🆕 자동 배포 스크립트 (권장)
```

## ✨ 프레젠테이션 특징

### 🎨 설계
- **Reveal.js** 기반 인터랙티브 프레젠테이션
- 검은 배경 (Black theme) - 프로페셔널한 룩
- 반응형 디자인 - 모든 기기에서 완벽하게 표시
- 부드러운 애니메이션 및 전환 효과

### 📊 포함된 내용

**총 19개 슬라이드:**

1. **Title Slide** - 프로젝트 제목 및 소개
2-5. **Vision & Goals** (4 슬라이드)
   - 프로젝트 비전
   - 핵심 가치 4가지
   - 기대 효과

6-11. **System Architecture** (6 슬라이드)
   - Hardware Layer (Arduino 센서)
   - Backend Layer (Python API)
   - Frontend Layer (웹 인터페이스)
   - Database Layer (H2/MySQL)
   - 데이터 흐름

12-14. **WBS** (3 슬라이드)
   - 상세 프로젝트 구조
   - 프로젝트 일정

15-16. **Technology Stack** (2 슬라이드)
   - 기술 스택 표
   - 외부 라이브러리

17-18. **Deployment & Structure** (2 슬라이드)
   - 프로젝트 구조
   - 배포 환경

19. **Conclusion** - 프로젝트 요약

### 🎮 기능
- ✅ 마우스 클릭 네비게이션
- ✅ 키보드 단축키 (Space, 화살표, F, S 등)
- ✅ 발표자 모드 (S 키)
- ✅ 슬라이드 맵 (Esc 키)
- ✅ 전체화면 (F 키)
- ✅ 터치 제스처 지원

## 🚀 배포 방법 (3가지)

### 방법 1️⃣: 자동 스크립트 (가장 간단) ⭐

```bash
./setup-github-pages.sh <GitHub-username> <repository-name>

# 예시:
./setup-github-pages.sh park concentration-system
```

완전 자동화:
- ✅ Git 저장소 초기화
- ✅ Remote 설정
- ✅ 파일 커밋
- ✅ 메인 브랜치 설정
- ✅ GitHub 푸시

### 방법 2️⃣: 수동 명령어

```bash
# 1. Git 설정
git init
git add .
git commit -m "Initial commit: presentation and architecture"

# 2. Remote 연결
git remote add origin https://github.com/yourusername/concentration-system.git

# 3. 메인 브랜치로 변경 및 푸시
git branch -M main
git push -u origin main
```

### 방법 3️⃣: GitHub Pages 활성화
1. GitHub 저장소 → Settings
2. Pages 섹션 선택
3. Source: main branch, / (root)
4. Save

## 📍 프레젠테이션 URL

배포 후 다음 URL에서 접근:

```
https://<GitHub-username>.github.io/<repository-name>/presentation/
```

**예시:**
```
https://park.github.io/concentration-system/presentation/
```

## 📋 배포 체크리스트

- [ ] GitHub 계정 준비
- [ ] 새 저장소 생성 (또는 기존 저장소 사용)
- [ ] `setup-github-pages.sh` 실행 또는 수동 명령어 실행
- [ ] GitHub Pages Settings 확인 (Branch: main)
- [ ] 3-5분 대기
- [ ] 프레젠테이션 URL 접속 확인
- [ ] 모든 슬라이드 확인
- [ ] 키보드 단축키 테스트

## 🎓 프레젠테이션 사용법

### 키보드 단축키
| 키 | 기능 |
|----|----|
| Space / → | 다음 슬라이드 |
| ← | 이전 슬라이드 |
| F | 전체화면 |
| S | 발표자 모드 |
| Esc | 슬라이드 맵 |
| ? | 도움말 |

### 발표 팁
1. **전체화면 모드로 시작** (F 키)
2. **발표자 모드 사용** (S 키 - 별도 윈도우)
3. **프로젝터 미리 테스트** (발표 30분 전)
4. **인터넷 연결 필수** (CDN에서 Reveal.js 로드)

## ✏️ 프레젠테이션 커스터마이징

### 색상 변경
`presentation/index.html`의 `<style>` 섹션에서:
```css
.custom-title {
    color: #4DB8FF;  /* ← 이 값을 변경 */
}
```

### 슬라이드 추가/수정
```html
<section>
    <h2>새로운 제목</h2>
    <p>내용</p>
</section>
```

### 테마 변경
```html
<!-- black.css → white.css, league.css, sky.css 등으로 변경 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/black.css">
```

## 📚 참고 문서

- **PRESENTATION_SETUP.md** - 상세 설정 가이드
- **ARCHITECTURE.md** - 시스템 아키텍처 (Mermaid 다이어그램)
- **presentation/README.md** - 프레젠테이션 가이드
- **README.md** - 프로젝트 전체 개요

## 🔗 관련 링크

- [Reveal.js 공식 문서](https://revealjs.com/)
- [GitHub Pages 가이드](https://pages.github.com/)
- [Git 기본 가이드](https://git-scm.com/book/ko/v2)

## ❓ 자주 묻는 질문

**Q: 프레젠테이션이 안 보여요**
- A: GitHub Pages 활성화 확인 (Settings → Pages)
- A: URL이 정확한지 확인
- A: 3-5분 대기 후 재시도

**Q: 수정 사항이 안 보여요**
- A: 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
- A: 파일을 git push 했는지 확인

**Q: 인터넷 없이 실행할 수 있나요?**
- A: 로컬에서는 `python -m http.server 8000` 실행 후 localhost 접속 가능
- A: 다만 외부 CDN (Reveal.js)은 인터넷 필요

## 🎁 추가 기능

### 이 프로젝트에는 다음도 포함되어 있습니다:

1. **ARCHITECTURE.md** - Mermaid 다이어그램으로 시스템 구조 시각화
2. **자동화 스크립트** - GitHub Pages 배포 완전 자동화
3. **.gitignore** - 불필요한 파일 자동 제외
4. **_config.yml** - Jekyll 기반 GitHub Pages 설정
5. **완전한 문서** - 시작부터 배포까지 모든 단계 설명

## 💡 다음 단계

1. ✅ **배포**: 위의 3가지 방법 중 선택하여 배포
2. 📊 **발표**: 프레젠테이션 연습 및 프로젝트 소개
3. ✏️ **수정**: 필요시 슬라이드 내용 업데이트
4. 📱 **공유**: GitHub Pages URL을 팀과 공유

## 📞 지원

질문이나 문제가 있으시면:
- GitHub Issues 이용
- 이메일: cs012_c@ainuri.kr

---

**축하합니다!** 🎉 프레젠테이션이 준비되었습니다!
이제 GitHub Pages에 배포하고 멋진 프레젠테이션을 세상과 공유하세요! 🚀
