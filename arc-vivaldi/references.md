# References — Arc / Vivaldi research

확인 날짜: 2026-10-10 (KST). 측정 도구: Python PIL 픽셀 샘플링, Vivaldi UI DevTools Protocol(CDP).

## R1. Arc 공식 마케팅 스크린샷 (arc.net)

| 항목 | 내용 |
|---|---|
| 출처 | https://arc.net/ 의 `/space-swiping.png`, `/theme-picker.png`, `/zero-chrome.png` (각 1400×933) |
| 대상 | Arc for macOS (버전 표기 없음, 2026-10 현재 공식 사이트 게시본) |
| 화면 유형 | 기본 브라우징 · 사이드바 펼침 · Favorites 4개 · 폴더 펼침 · 일반 탭 · 라이트(무채색) · 컬러 Space 테마(오렌지/핑크 그라디언트) · Split View |
| 주의 | 실사용 캡처가 아니라 그림자를 입힌 마케팅용 렌더. 원본 배율(pt↔px)이 표기되지 않아 **절대 크기는 추정**, 비율·색은 측정값 |

### 측정값 (`zero-chrome.png`, 라이트/무채색 Space)

| 요소 | 측정값 (이미지 px) | 비고 |
|---|---|---|
| 창 폭 | 139 → 1264 (1126) | |
| 사이드바 폭 (창 왼쪽 → 콘텐츠 시작) | 227 | 창 폭의 약 20% |
| 콘텐츠 카드 여백 (상/우/하) | 8–9 | 좌측은 사이드바에 붙음 |
| 콘텐츠 카드 모서리 | 약 8–10 | 가장자리 안티앨리어싱 4px 구간 |
| 콘텐츠 그림자 | 2–4px 소프트 섀도 | 362–365px 구간 그라디언트 |
| 사이드바 배경 | `#ececec` | 무채색 Space |
| 주소창 배경 | `#dfdfdf`, 높이 33 (184–216), 둥근 모서리 | 사이드바 대비 약 5.5% 어둡게 |
| Favorites 타일 | 폭 46, 간격 7, 4열, 배경 `#dfdfdf` | 아이콘만 표시 |
| 섹션 라벨("Mood Boarding") | `#acacac`, 작은 글자 | Space 이름 |
| 구분선 | `#e3e3e3`, 1–2px, 좌우 인셋 | Pinned / Unpinned 경계 |
| 활성 탭 | 폭 203 (149→351), 높이 37 (511→547), 배경 `#fbfbfb` + 얕은 그림자 | 좌 10 / 우 15 인셋 |
| 탭 행 간격 (pitch) | 약 44 → 탭 사이 공백 ≈ 7 | |
| 하단 | 왼쪽 아이콘(라이브러리), 가운데 Space 점, 오른쪽 `+` | |

### 관찰 (3장 공통)
- 창 전체가 하나의 면(사이드바 = 프레임 배경), 콘텐츠만 둥근 카드로 떠 있음.
- 상단 행: 신호등 버튼, 사이드바 토글, ← → ⟳ (오른쪽 정렬). 그 아래 주소(도메인만 표시) + 링크 복사·사이트 설정 아이콘 2개.
- 탭 제목은 굵은 편(semibold 체감), 비활성 탭도 대비가 높음. 활성 탭만 흰 카드.
- 컬러 Space는 사이드바 전체를 그라디언트로 칠하고, 타일·주소창은 반투명 흰색/검정 오버레이로 표현.
- `theme-picker.png`: 테마 피커는 라이트/다크/자동 + 팔레트(무채색, 핑크, 보라, 빨강, 주황, 노랑, 초록, 파랑, 남색) + 그레인 다이얼.

### 측정하지 못한 것
- **다크 모드**: 공식 사이트에서 측정 가능한 다크 스크린샷을 확보하지 못함 → 다크 토큰(`#1f1f22` 기반)은 **추정치**.
- 사이드바 숨김 상태, 주소창 포커스(Command Bar), 최대화 창, Windows판 UI: 공식 이미지 없음 → 문서·경험 기반 추정.
- 실제 pt 단위 크기: 원본 배율 미상. 아이콘 크기(약 16–18px)로 보아 1:1~1.1 정도로 추정.

## R2. Arc Help Center

| 출처 | 확인한 사실 | 구현 영향 |
|---|---|---|
| [Favorites](https://resources.arc.net/hc/en-us/articles/19230755904151) | 최대 12개, Sidebar 맨 위(Space 제목 위)에 아이콘으로 표시, **모든 Space에서 공유** | Vivaldi 고정 탭은 Workspace별 → 기능은 재현 불가, 모양만 |
| [Pinned Tabs](https://resources.arc.net/hc/en-us/articles/19231060187159) | Space별, 가로 구분선 위에 위치, 폴더 가능, Auto-Archive 제외, 클릭 시 "Reset", 외부 링크는 Peek로 열림 | 구분선만 시각 재현, Reset/Peek는 불가 |
| [Spaces](https://resources.arc.net/hc/en-us/articles/19228064149143) | Space마다 Pinned/Unpinned/테마/아이콘 보유, 사이드바 **하단 아이콘**으로 전환, 단축키·스와이프 | Workspace 버튼을 하단으로 옮기는 툴바 배치 권장 |

## R3. Vivaldi 공식 자료

| 출처 | 확인한 사실 |
|---|---|
| [Vivaldi 8.0 blog](https://vivaldi.com/blog/vivaldi-on-desktop-8-0/) (2026-05-21) | "Unified" 디자인, 6개 레이아웃 프리셋. **Vertical Left = 탭+주소창을 왼쪽에, Panels는 오른쪽 hover** |
| 설치본 소스 `/opt/vivaldi/resources/vivaldi/background-common-bundle.js` | Vertical Left(`id:"vertical"`) 정의: `tabBar:"left", addressBar:"off", panel:"right", statusBar:"overlay", tabStacks:"accordion", autoHide:true, autoHidePosition:["panel"]`, `tabbar_before:[WorkspaceButton, TabButton, Extensions, FlexibleSpacer, Back, Reload, Forward, AddressField, Spacer]`, `tabbar_after:[NewTab, FlexibleSpacer, AccountButton, FlexibleSpacer, VPNButton, UpdateButton]` |
| 설치본 `window.html` | 8.x UI 문서는 `browser.html`이 아니라 **`window.html`**. `<link href="chrome://vivaldi-data/css-mods/css">` 로 사용자 CSS 로드 |
| `vivaldi-bin` 문자열 | 실험 플래그 `vivaldi-css-mods` = **"Allow CSS modifications"**, `vivaldi-horizontal-pinned-tabs` = **"Horizontal pinned tabs in vertical tab bars"** ("Makes pinned tabs smaller and ordered in a grid…") |
| 한국어 로캘 `_locales/ko/messages.json` | 설정 메뉴 이름: 모양 › 레이아웃 › **세로 (왼쪽)**, **커스텀 UI 수정** › 폴더 선택, **툴바 사용자 지정**, **UI 자동 숨김**, **모든 주소 보기**, 닫기 버튼 표시, 고정된 탭 아래에 구분자 표시, 탭 더미로 묶기 |
| help.vivaldi.com (customization / toolbars / workspaces / auto-hide / themes) | 링크로만 참조. 메뉴 이름은 위 설치본 로캘로 교차 확인 |

## R4. 커뮤니티 구현

| 저장소 | 라이선스 | 최종 push | 내용 / 판단 |
|---|---|---|---|
| [jdserenity/vivaldi-css](https://github.com/jdserenity/vivaldi-css) | **없음**(저작권 유보) | 2026-05 | Arc식 탭바 자동 숨김을 CSS `transform`+`clip-path`+`html:active:not(:has(…))`로 구현, `!important` 다수, 비표준 `:visible` 사용. **코드 미사용** — 자동 숨김은 Vivaldi 내장 기능으로 대체 |
| [ortiza5/modding-vivaldi](https://github.com/ortiza5/modding-vivaldi) | Unlicense | 2021-08 | UI DevTools 접근 가이드(구버전, `browser.html` 기준). 개념만 참고 |
| [matfantinel/vivaldi-css-mods](https://github.com/matfantinel/vivaldi-css-mods) | **없음** | 2022-04 | 주소창 크기·탭 전환 효과 등 8.0 이전 선택자(`#tabs-subcontainer`). **코드 미사용** |

외부 코드는 복사하지 않았다. 모든 선택자는 8.2 실 DOM에서 새로 확인했다(`selector-audit.md`).

## R5. Arc ↔ Vivaldi 핵심 차이 (설계 결론)

1. 탭 행 pitch: Arc ≈ 44px(공백 7) / Vivaldi는 JS가 30px+밀도 3px = **33px 고정** → CSS로 바꾸면 드래그·히트 테스트가 어긋나므로 유지. 시각 높이 30px.
2. Favorites 타일: Arc 46px·4열 / Vivaldi 실험 플래그 그리드 46×46·간격 4 → **거의 같음**. 폭은 JS 고정이라 행을 꽉 채우려면 사이드바 폭을 258px(5열) 또는 208px(4열)로.
3. 창 제어 버튼: Arc는 사이드바 왼쪽 위 / Vivaldi Vertical Left(Linux)에서는 상단 자동 숨김 바(`#titlebar`) 안 → CSS 이동 불가(다른 DOM 서브트리).
4. 콘텐츠 카드: Arc 8px 여백 + 10px 모서리 / Vivaldi Unified는 역-모서리 마스크(`#webpage-stack::after`) 보유 → 마스크 반경·색만 조정해 재현.
