# Selector audit

환경: Vivaldi **8.2.4133.83 stable** (Chromium 152), Fedora 44 KDE Plasma (Wayland), 1920×1080 @1x, UI zoom 1.
방법: 격리된 임시 프로필(`--user-data-dir=/tmp/…`, 127.0.0.1 전용 원격 디버깅)로 Vivaldi를 별도 실행하고, UI 문서
`chrome-extension://mpognobbkildjkofajifpdfhcoklimli/window.html`에 CDP로 접속해 `querySelectorAll`·`getComputedStyle`·
`getBoundingClientRect`로 확인했다. 사용자 프로필은 읽기만 했고 변경하지 않았다.

검증 상태: **✔ 실DOM** = 해당 상태에서 요소 존재·스타일 적용을 직접 확인 / **◐ 정적** = common.css·bundle.js 소스에서만 확인(해당 상태를 재현 못함)

## 상태 클래스 (`#browser`)

| 선택자 | 의미 | 상태 | 사용처 |
|---|---|---|---|
| `#browser` | UI 루트. 테마 변수(`--colorBg` 등)와 **inline background-***가 여기 설정됨 | ✔ | 토큰, 프레임 |
| `.tabs-left` | 탭 표시줄 왼쪽 | ✔ | 거의 모든 규칙의 스코프 |
| `.theme-light` / `.theme-dark` | Vivaldi 테마 명도(JS `isThemeDark`)로 결정. OS `prefers-color-scheme`과 무관 | ✔ (Vivaldi1↔Vivaldi2↔사용자 테마 전환으로 확인) | §10 |
| `.unified-ui` | 테마 색상 위치 "통합". 사용자 테마(Sayu x Elaina, colorPosition `""`)에서는 **없음** | ✔ | §2 비통합 대응 |
| `.color-behind-tabs-on` | 탭 뒤 강조색. 탭바·주소창을 강조색으로 칠함 | ✔ | §2, §4 특이도 |
| `.fullscreen` | 전체 화면 | ✔ (창 fullscreen 전환) | 카드 여백 해제 |
| `.maximized` / `.normal`, `.linux` / `.win` / `.mac` | 창 상태·OS | ✔(linux) / ◐(win, mac) | 미사용(문서용) |

## 레이아웃

| 역할 | 선택자 | 상태 | 규칙 / 충돌 가능성 |
|---|---|---|---|
| 사이드바 래퍼 | `#main > .inner > .tabbar-wrapper` | ✔ | 배경 투명. 자동 숨김 시 이 위치에서 사라짐 → `:has()` 로 판별 |
| 탭바 컨테이너 | `#tabs-tabbar-container.left` (+`.accordion.wide`, `.horizontal-pinned-tabs`) | ✔ | 글자색, 비통합 테마 배경 투명화 |
| 탭바 내부 | `#tabs-container` (role=toolbar) | ✔ | |
| 상단/하단 툴바 | `.toolbar-tabbar-before` / `.toolbar-tabbar-after` (`.toolbar-vertical`) | ✔ | padding만 변경 |
| 툴바 버튼 | `.button-toolbar > .ToolbarButton-Button` | ✔ | 반경·hover |
| 새 탭 | `.button-toolbar.newtab > .ToolbarButton-Button` (aria-label="새 탭") | ✔ | `::after { content: attr(aria-label) }` — 실제 버튼 내부 |
| Workspace 버튼 | `.tabbar-workspace-button` (`.workspace-popup.button-menu`), `.button-title` | ✔ | 라벨 글꼴만 |
| Workspace 팝업 | `.ToolbarButtonPopup-DefaultStyles .WorkspacePopup`, `.workspace-item-wrapper.selected` | ✔ (생성·전환 실행) | 반경만 |
| 웹 콘텐츠 | `#webview-container` › `#webpage-stack` › `.webpageview` › `webview` | ✔ | stack에 margin/radius/shadow. **webview 자체는 건드리지 않음** |
| 콘텐츠 둥근 마스크 | `#webpage-stack::after` (`--mask-box-radius`, `-webkit-mask-box-image`) — `.unified-ui` 에서만 존재 | ✔ | 반경·색만 변경 |
| 비통합 테마 클립 | `#browser.tabs-left:not(.unified-ui) #webpage-stack { overflow: clip }` | ✔ (모서리 픽셀 안티앨리어싱 확인) | 마스크 없는 테마 전용 |
| 자동 숨김 래퍼 | `#browser > .auto-hide-wrapper.left.has-tabbar` / `.right` / `.top` (`.show`는 JS 토글) | ✔ (강제 `.show` 로 표시 확인) | 배경·반경·그림자만. transform 애니메이션은 Vivaldi 것 |
| 창 제어 | `.auto-hide-wrapper.top #titlebar .window-buttongroup` (Linux, Vertical Left) | ✔ | **변경 없음** |
| 상태 오버레이 | `.StatusInfo-Content` | ✔ | 반경·그림자 |
| 패널 | `.auto-hide-wrapper.right #panels-container` | ✔ | 래퍼 반경만 |

## 주소창

| 역할 | 선택자 | 상태 | 비고 |
|---|---|---|---|
| 주소 필드 | `#tabs-tabbar-container #tabs-container .UrlBar-AddressField` | ✔ | Vivaldi의 `.color-behind-tabs-on … .UrlBar-AddressField:not(:focus-within)`(2,4,0)를 이기려고 ID 3개 사용 |
| 입력 | `#urlFieldInput` (placeholder "DuckDuckGo 검색 또는 주소 입력") | ✔ | 색만 |
| URL 조각 | `.UrlFragment--Highlight` / `.UrlFragment--Lowlight` | ✔ | 색만 |
| 사이트 정보(보안) | `.toolbar-insideinput > .SiteInfoButton` | ✔ | **흐리게 하지 않음** (`:not(:has(.SiteInfoButton))`로 제외) |
| 페이지 액션 | 두 번째 `.toolbar-insideinput` (피드·리더·번역·PWA·북마크) | ✔ | 기본 opacity .6, hover/focus 시 1. 클릭 가능 유지 |
| 자동완성 | `.OmniDropdown`, `.OmniLinkItem--Highlighted` | ✔ (입력 "git"/"wiki") | 배경·반경·그림자 |

## 탭

| 역할 | 선택자 | 상태 | 비고 |
|---|---|---|---|
| 탭 슬롯 | `.tab-strip > span > .tab-position` — **inline `--PositionX/Y`, `--Height:33px`, `--Width`** | ✔ | 절대 위치. **절대 덮어쓰지 않음** |
| 탭 | `.tab-wrapper[role=tab][aria-selected]` › `.tab` › `.tab-header` › `.favicon`, `.title`, `button.close` | ✔ | |
| 활성 | `.tab-wrapper.active`, `.tab.active` | ✔ | 흰 카드 |
| 고정(목록형) | `.tab-position.is-pinned`, `.tab.pinned`, 구분선 `.tab-strip .separator hr` | ✔ (실험 플래그 off 상태) | |
| 고정(그리드) | `.pinned-group` › `.tab-position.is-pinned` (46×46) › `.tab-wrapper.in-pinned-group` › `.tab-header.in-pinned-group` | ✔ (플래그 on) | 타일 배경, hover; 구분선은 background gradient |
| 스택(아코디언) | `.tab-position.accordion-toggle-arrow(.closed.active)`, `.tab-wrapper.accordion / .in-accordion`, `.tab-in-accordion` | ◐ | 임시 프로필에서 스택 생성 실패(API·드래그 모두). 소스 규칙 기준으로 충돌 회피만 |
| 색 스택 | `.tab-position.colored` | ◐ | 우리 규칙에서 제외(`:not(.colored)`) |
| 드롭 대상 | `#browser#browser .tab.tab-acceptsdrop` | ◐ | 모든 배경 규칙에 `:not(.tab-acceptsdrop)` |
| 읽지 않음 | `.tab.unread` (모서리 삼각형 배경) | ✔ | 유지 |
| 다중 선택 | `.svg-tab-selection`(SVG 오버레이), `.tab.marked` | ◐ | 배경과 무관한 SVG라 유지됨(소스 기준) |
| 키보드 포커스 | `.tabs-left .tab:focus-visible` outline | ◐ | 변경 없음 |

## 조사했지만 사용하지 않은 후보

| 후보 | 결과 |
|---|---|
| `.mainbar`, `.toolbar-addressbar` | Vertical Left에서는 높이 0(주소창 off). 미사용 |
| `#panels-container` 직접 스타일 | Vivaldi 자체 규칙이 많아 래퍼 반경만 |
| `#header`, `#footer` | 높이 0 |
| `-webkit-app-region` | Vertical Left·최대화/일반 모두 탭바에 drag 영역 없음, 보이는 `.auto-hide-wrapper.show` 가 drag. 변경하지 않음 |

## 확인된 Vivaldi 동작 (CSS 설계 근거)

- CSS mods 폴더의 **최상위 `*.css`만** 로드(하위 폴더 파일은 로드 안 됨, 프로브 변수로 확인).
- 사이드바 폭은 `vivaldi.tabs.bar.width` 설정값 → JS가 `--Width` 계산. CSS 폭 강제 시 탭 폭과 어긋남.
- 고정 타일 크기: `HAe()` = 46px(밀도 on), 그리드 gap 4px, 좌우 패딩 6px.
- 탭 pitch: `RAe(30) + 밀도(3)` = 33px.
