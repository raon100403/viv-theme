# Test checklist

환경: Vivaldi 8.2.4133.83 stable · Fedora 44 KDE Plasma (Wayland) · 1920×1080 @1x · 2026-10-10
방법: 격리 임시 프로필(Vertical Left, 실험 플래그 2개, CSS 폴더 = 이 폴더)을 CDP로 조작. 클릭·드래그·hover는
`Input.dispatchMouseEvent`(합성 입력). **사용자 실제 프로필에서는 아직 테스트하지 않음.**

결과: ✅ 통과 · ❌ 실패 · ⏳ 미검증(이유 기재)

## 정적 검증

| 항목 | 결과 | 근거 |
|---|---|---|
| CSS 문법 (Chromium 엔진 파서) | ✅ | 233개 선택자/선언 `CSS.supports` 검사 불량 0, `replaceSync` 오류 없음, 최상위 규칙 54 |
| 실제 폴더 로드 | ✅ | 재시작 후 `chrome://vivaldi-data/css-mods/css` 시트 로드, `--arc-ui-gap: 8px` 계산됨 |
| 하위 폴더 미로드 | ✅ | `modes/probe-sub.css` 변수 미적용 확인 → 단일 파일 구조 채택 |
| 웹 페이지 영향 없음 | ✅ | css-mods 링크는 `window.html`에만 존재. 규칙은 `#browser`/`#tabs-tabbar-container` 스코프 |
| `display:none` / `order` / 위치 이동 | ✅ | 사용 0건 |

## 기능 (Priority 0)

| 항목 | 결과 | 근거 / 비고 |
|---|---|---|
| "+ 새 탭" 버튼 클릭 | ✅ | 탭 수 11 → 12 |
| 탭 닫기 버튼(hover 후 클릭) | ✅ | 12 → 11 |
| 탭 클릭 전환 | ✅ | 활성 탭 URL 변경 |
| 인셋 여백(x=3px) 클릭 | ✅ | 해당 탭 활성화 — 죽은 클릭 영역 없음 |
| Favorites 타일 클릭 | ✅ | wikipedia.org 활성, pinned=true |
| 탭 드래그 정렬 | ✅ | 합성 드래그로 순서 변경됨 |
| 주소 입력 + 자동완성 | ✅ | 입력 "git"/"wiki" → `.OmniDropdown` 항목 표시 |
| Workspace 생성/전환 | ✅ | 팝업에서 "Work" 생성 → 탭 1개 / 원래 Workspace 복귀 → 탭 8개 |
| 고정 탭 생성/해제 | ✅ | `chrome.tabs.update(pinned)` 후 그리드 반영 (UI 메뉴 경로는 ⏳) |
| 최대화 ↔ 일반 ↔ 최대화 | ✅ | 1400×900 일반 창에서도 레이아웃 정상, 카드 여백 유지 |
| 전체 화면 | ✅ | `.fullscreen` 에서 여백 0, 마스크 제거, 복귀 후 8px |
| 탭 hover 미리보기 툴팁 | ✅ | 썸네일 툴팁 정상 표시 |
| 사이트 정보(보안) 버튼 가시성 | ✅ | 흐림 제외 확인 |
| 키보드 단축키 (Ctrl+T/W, F6) | ⏳ | CDP 합성 키는 Vivaldi 네이티브 단축키 처리기에 도달하지 않음. CSS는 단축키와 무관하지만 실기기 확인 필요 |
| 키보드 포커스 이동/표시 | ⏳ | 위와 같은 이유. 포커스 outline 규칙은 변경하지 않음 |
| 우클릭 메뉴 | ⏳ | Linux에서 네이티브 메뉴 → CSS 영향 없음(예상) |
| 다운로드, 팝업 창 | ⏳ | 미실행 |
| Tab Stack 펼침/접힘 | ⏳ | 임시 프로필에서 스택 생성 실패(API·드래그). 규칙은 `.colored` 제외로 충돌 회피만 |
| Web Panel 열기/닫기 | ⏳ | 오른쪽 자동 숨김 패널 — 실제 마우스 가장자리 hover 필요 |
| 창 이동/크기 조절 (마우스) | ⏳ | 실제 창 관리자 상호작용 필요. drag 영역(`app-region`)은 변경하지 않음 |

## 시각 / 모드

| 항목 | 결과 | 근거 |
|---|---|---|
| 라이트 (Vivaldi 기본 테마) | ✅ | 프레임 ≈ `#e7e7ed`, 활성 탭 흰 카드, 콘텐츠 모서리 안티앨리어싱 확인 |
| 다크 (Vivaldi Dark) | ✅ | `.theme-dark` 토큰 적용, 텍스트 `#f2f2f4` |
| 사용자 테마 "Sayu x Elaina" (비통합) | ✅ | v1.0 수정 후 arc 모드에서 탭바·주소창 강조색 제거, `overflow: clip` 둥근 모서리 확인 |
| `--arc-palette-mode: theme` | ✅ | 토큰이 테마 변수로 전환(라이트·다크 모두) |
| `--arc-compact: 1` | ✅ | gap 6px, 탭 제목 12px |
| hover (탭/타일/주소창) | ✅ | 계산값 확인 (탭 `rgba(0,0,0,.043)`, 타일 `.08`) |
| 주소창 포커스 | ✅ | 드롭다운 + 흰 배경 |
| 자동 숨김 사이드바 표면 | ✅ (부분) | `.show` 강제 시 둥근 떠 있는 패널 확인. **실제 가장자리 hover 등장은 ⏳** (합성 mousemove로는 트리거 안 됨) |
| `prefers-contrast` / `prefers-reduced-motion` | ⏳ | OS 설정 변경 필요. 규칙 문법만 검증 |
| HiDPI(125%/200%), Windows, macOS | ⏳ | 해당 환경 없음 |

## 사용자가 직접 확인할 항목 (README 설치 후 5분)

1. 새 탭(Ctrl+T)·닫기(Ctrl+W)·Ctrl+Tab 전환
2. 탭을 끌어 순서 바꾸기, 탭을 다른 탭 위에 놓아 스택 만들기 → 펼치기/접기
3. 왼쪽 가장자리 / 오른쪽 가장자리 hover (자동 숨김을 켠 경우)
4. 화면 위쪽 가장자리 hover → 창 버튼(최소화/최대화/닫기) 동작, 그 막대를 끌어 창 이동
5. 파일 다운로드 1회, 우클릭 메뉴, F11 전체 화면, F6 포커스 순환
6. 자물쇠(사이트 정보) 아이콘이 항상 선명한지
