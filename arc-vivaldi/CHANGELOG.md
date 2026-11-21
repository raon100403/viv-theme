# Changelog

## 1.0.0 — 2026-10-10

검증: Vivaldi 8.2.4133.83 stable (Chromium 152), Fedora 44 KDE Wayland.

자체 검토(v0.1 초안 대비) 후 수정:

- **비통합 테마 대응**: `colorPosition`이 "통합"이 아닌 테마(사용자 테마 Sayu x Elaina)에서 탭바·주소창이 강조색으로 칠해지고 콘텐츠 모서리가 각지던 문제 → 탭바/`#webview-container` 배경 투명화(arc 모드), `#webpage-stack { overflow: clip }`, 주소창 규칙 특이도 상향(ID 3개).
- **Favorites 타일 hover 무효** 버그: 일반 탭 hover 규칙이 같은 특이도로 뒤에 있어 타일 hover를 덮음 → 특이도 수정.
- **타일 아이콘 6px 치우침**: `.tab-header` 패딩이 `.in-pinned-group`에도 적용 → 제외.
- **"+ 새 탭" 라벨 색** 특이도 버그 수정.
- theme 모드에서 다크 테마일 때 `.theme-dark` 토큰이 이기던 문제 → `#browser.theme-light, #browser.theme-dark` 로 특이도 맞춤. `prefers-contrast` 블록도 동일.
- 추가: 페이지 액션 아이콘 흐림(보안 버튼 제외), Favorites 하단 hairline(배경 방식), 닫기 버튼 반경, 상단 툴바 여백, 다크 틴트 12%→7%, 라이트 틴트 8%→5%(측정한 Arc `#ececec`에 근접).
- 탭 제목 굵기 500→600: Arc 레퍼런스와 나란히 비교했을 때 Arc 제목이 semibold라 대비가 부족했음.
- 섹션 구조 1–14 정리, 사용자 토글 섹션 0 추가.

## 0.1.0 — 2026-10-10 (초안)

- 토큰, 프레임 카드, 탭·주소창·타일 기본 스타일, 자동 숨김 표면, compact/theme 스타일 쿼리 토글.

## 호환성 메모

| Vivaldi | 상태 |
|---|---|
| 8.2.4133.83 stable (Linux) | 검증 |
| 8.0–8.1 | 미검증 (같은 Unified DOM이면 동작 예상) |
| 7.x 이하 | 비대상 (세로 레이아웃 프리셋·Unified UI 없음) |
| Windows / macOS 8.2 | 미검증. OS 전용 규칙 없음 |
