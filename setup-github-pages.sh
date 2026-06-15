#!/bin/bash

# GitHub Pages 자동 설정 스크립트
# Usage: ./setup-github-pages.sh <username> <repository-name>

if [ $# -lt 2 ]; then
    echo "❌ 사용법: ./setup-github-pages.sh <username> <repository-name>"
    echo ""
    echo "예제:"
    echo "  ./setup-github-pages.sh myusername concentration-system"
    exit 1
fi

USERNAME=$1
REPO_NAME=$2
REPO_URL="https://github.com/$USERNAME/$REPO_NAME.git"
GITHUB_PAGES_URL="https://$USERNAME.github.io/$REPO_NAME/presentation/"

echo "🚀 GitHub Pages 설정을 시작합니다..."
echo ""
echo "📋 정보:"
echo "  - GitHub 사용자: $USERNAME"
echo "  - 저장소 이름: $REPO_NAME"
echo "  - 저장소 URL: $REPO_URL"
echo "  - GitHub Pages URL: $GITHUB_PAGES_URL"
echo ""

# Git 설정 확인
if ! command -v git &> /dev/null; then
    echo "❌ Git이 설치되어 있지 않습니다."
    exit 1
fi

# 1단계: Git 초기화 (이미 되어 있으면 스킵)
if [ ! -d ".git" ]; then
    echo "📝 Git 저장소 초기화..."
    git init
else
    echo "✅ Git 저장소 이미 존재"
fi

# 2단계: Remote 설정
echo "🔗 원격 저장소 설정..."
if git remote | grep -q origin; then
    echo "  - Origin 이미 존재, URL 변경..."
    git remote set-url origin $REPO_URL
else
    echo "  - Origin 추가..."
    git remote add origin $REPO_URL
fi

# 3단계: 초기 커밋 준비
echo "📦 변경 사항 준비..."
git add .

# 4단계: 커밋
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 초기 커밋 생성..."
    git commit -m "Initial commit: Add presentation, architecture, and project structure"
else
    echo "✅ 커밋할 변경 사항 없음"
fi

# 5단계: Main 브랜치로 이름 변경
echo "🌳 메인 브랜치 설정..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    git branch -M main
    echo "  ✅ 브랜치 이름 변경: $CURRENT_BRANCH → main"
else
    echo "  ✅ 이미 main 브랜치"
fi

# 6단계: 푸시
echo "📤 GitHub에 푸시..."
git push -u origin main

echo ""
echo "✅ 설정 완료!"
echo ""
echo "📚 다음 단계:"
echo "1. GitHub에서 저장소 Settings 확인"
echo "2. Pages 섹션에서:"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo "   - Save 클릭"
echo ""
echo "3. 3-5분 후 프레젠테이션 접속:"
echo "   🎉 $GITHUB_PAGES_URL"
echo ""
echo "💡 팁:"
echo "  - 프레젠테이션 수정: presentation/index.html"
echo "  - 아키텍처 수정: ARCHITECTURE.md"
echo "  - README 업데이트: README.md"
echo "  - 변경 후 git push origin main"
echo ""
