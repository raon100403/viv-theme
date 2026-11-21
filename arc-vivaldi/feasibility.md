# Feasibility matrix

A = Vivaldi 설정으로 구현 · B = Custom UI CSS로 구현 · C = CSS만으로 불가
위험도: 업데이트 시 깨질 가능성 (낮음/중간/높음)

## A. Vivaldi 설정

| 기능 | 방법 | 예상 결과 | 제약 | 위험 | 우선 |
|---|---|---|---|---|---|
| 왼쪽 통합 사이드바 (탭+주소창) | 설정 › 모양 › 레이아웃 › **세로 (왼쪽)** | 주소창·내비 버튼·탭이 왼쪽 탭 표시줄 안으로 | 프리셋 적용 시 툴바 배치가 바뀜(먼저 현재 레이아웃 저장) | 낮음 | P1 |
| Arc식 배치 순서 | **툴바 사용자 지정**: 위 `TabButton · FlexibleSpacer · Back · Forward · Reload · AddressField`, 아래 `NewTab · FlexibleSpacer · WorkspaceButton` | 상단 내비 → 주소 → Favorites → 탭 → 하단 Space | 창 제어 버튼은 사이드바로 못 옴 | 낮음 | P1 |
| Favorites 그리드 | vivaldi://experiments › **Horizontal pinned tabs in vertical tab bars** | 고정 탭이 46px 아이콘 타일 그리드로 | 실험 기능. 타일 폭 고정(행을 채우지 않음) | 중간 | P1 |
| 사이드바 폭 | 사이드바 오른쪽 가장자리 드래그 | 258px(타일 5열) / 208px(4열) 권장 | CSS 변수로는 바꿀 수 없음 | 낮음 | P1 |
| 자동 숨김 (Mode B) | 설정 › 모양 › **UI 자동 숨김** › 탭 표시줄 체크 (또는 `UI 자동 숨김 토글` 명령) | 가장자리 hover 시 Vivaldi 자체 슬라이드 | 자동 숨김 사용 시 보안 경고(가짜 UI 위험) 고지됨 | 낮음 | P4 |
| 닫기 버튼 hover 표시 | 설정 › 탭 › 닫기 버튼 표시 | Arc처럼 hover/활성 시만 | — | 낮음 | P2 |
| 도메인만 표시 | 설정 › 주소 표시줄 › **모든 주소 보기** 해제 | Arc처럼 짧은 주소 | — | 낮음 | P2 |
| Spaces | Workspaces (기본 활성) | Space 이름·아이콘·전환 | Arc 테마별 Space 색 없음 | 낮음 | P2 |
| 탭 그룹(폴더 비슷) | 탭 더미로 묶기 › 아코디언 | 펼침/접힘 목록 | Arc 폴더(영구 저장)와 다름 | 낮음 | P2 |
| 상태 표시줄 최소화 | Vertical Left 기본 "overlay" | 링크 hover 시만 표시 | — | 낮음 | P2 |
| 라이트/다크 | 테마 / 테마 변경 주기(시스템) | `.theme-light/.theme-dark` 자동 전환 | — | 낮음 | P4 |

## B. Custom UI CSS (`arc.css`)

| 기능 | 방법 | 예상 결과 | 제약 | 위험 | 우선 |
|---|---|---|---|---|---|
| 연속 프레임 + 둥근 콘텐츠 카드 | `#webpage-stack` margin/radius/shadow, `::after` 마스크 반경·색 | Arc의 8px 여백·10px 모서리 카드 | 비통합 테마는 `overflow: clip` 경로 | 중간 | P1 |
| Arc 팔레트 (라이트/다크/틴트) | 토큰 + `#browser` 배경 (`!important` 2곳) | 무채색 + 은은한 틴트 | Theme Editor 배경 이미지 무시(arc 모드) — theme 모드로 전환 가능 | 중간 | P2 |
| 탭 스타일 | 투명 기본, hover 오버레이, 활성 흰 카드 + 그림자, 5px 시각 인셋 | Arc 탭 리듬 | 행 pitch 33px 고정(Arc ≈44) | 중간 | P2 |
| Favorites 타일 | `.in-pinned-group` 배경·반경, 그리드 하단 hairline | Arc Favorites | 실험 플래그 필요 | 중간 | P2 |
| 주소창 | 반투명 배경, 포커스 링, 페이지 액션 아이콘 흐리게 | Arc 주소 박스 | 사이트 정보 버튼은 항상 선명 | 중간 | P2 |
| "+ 새 탭" 행 | 실제 버튼에 aria-label 표시 | Arc "New Tab" 행 | Arc는 탭 목록 **위**, Vivaldi는 **아래** | 낮음 | P2 |
| Space 제목 스타일 | Workspace 버튼 라벨 12px/600/muted | Arc Space 이름 | — | 낮음 | P3 |
| 팝오버 | OmniDropdown·버튼 팝업 반경/그림자 | 부드러운 메뉴 | 우클릭 메뉴는 네이티브라 CSS 불가 | 낮음 | P3 |
| 자동 숨김 표면 | `.auto-hide-wrapper.left` 배경·반경·그림자 | 떠 있는 사이드바 | 표시/숨김 로직은 Vivaldi | 낮음 | P4 |
| Compact / theme 모드 | `@container style()` 토글 (`body` 변수) | 한 파일에서 모드 전환 | Chromium 111+ 필요(8.2 = 152 확인) | 낮음 | P4 |
| 접근성 | `prefers-contrast: more`, `prefers-reduced-motion` | 대비 강화, 전환 제거 | — | 낮음 | P4 |

## C. CSS만으로는 불가 (시각 재현 ↔ 실제 기능 구분)

| Arc 기능 | 시각 재현 | 실제 기능 | 대안 |
|---|---|---|---|
| **Favorites의 전체 Space 공유** | 가능(타일 모양) | **불가** — Vivaldi 고정 탭은 Workspace마다 별도. CSS는 탭을 다른 Workspace에 보여줄 수 없음 | 자주 쓰는 사이트는 각 Workspace에 고정하거나 **웹 패널**(모든 Workspace 공통) 사용 |
| **Today Tabs 자동 보관(Auto-Archive)** | 불가 | **불가** — 시간 경과에 따른 탭 닫기는 로직 필요 | 탭 › "비활성 탭 정리"류 확장 또는 탭 우클릭 › 절전 모드로 전환(Hibernate) |
| **Peek** (고정 탭에서 외부 링크를 오버레이 창으로) | 불가 | **불가** | Vivaldi **Follower Tab**, 팝업 창으로 열기, Tab Tiling |
| **Command Bar** (⌘T 통합 명령/검색) | 불가 | **불가** — CSS로 입력 동작을 만들 수 없음 | Vivaldi **퀵 커맨드(Quick Commands, F2)** — 탭·북마크·명령 통합 검색 |
| Pinned Tab "Reset"(원래 URL로) | 불가 | 불가 | 고정 탭 대신 북마크/웹 패널 |
| 신호등 버튼을 사이드바 상단으로 | 불가 | 불가 — `#titlebar`는 별도 서브트리, 이동 시 클릭·드래그 판정 손상 위험 | Vivaldi 기본 상단 자동 숨김 바 / KDE 단축키(Meta+드래그) |
| Space별 사이드바 색 | 부분 | 불가 — Workspace별 CSS 훅 없음 | 수동으로 `--arc-tint` 변경, 또는 테마 변경 주기 |
| 탭 행 pitch 44px | 불가(안전하게는) | JS 레이아웃이 33px 고정 | 수용. 밀도 off는 31px로 더 촘촘해짐 |
| Favorites 타일이 행 폭을 채움 | 불가 | JS가 46px 고정 | 사이드바 폭 258px(5열)/208px(4열)로 맞춤 |

CSS 가상 요소로 위 기능이 있는 것처럼 꾸미지 않았다.
