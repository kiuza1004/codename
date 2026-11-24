@echo off
chcp 65001 > nul
title CODENAMES SPYMASTER AI

echo ========================================================
echo  🕵️  CODENAMES : SPYMASTER AI (코드네임 연습 웹앱)
echo ========================================================
echo.
echo [1/2] 로컬 서버 구동 준비 중...

if not exist node_modules (
    echo [*] 최초 실행을 위한 패키지를 설치합니다...
    call npm install
)

echo [2/2] 브라우저를 열고 게임을 시작합니다...
echo.
echo 브라우저 주소: http://localhost:3000
echo.

start http://localhost:3000
call npm run dev

pause
