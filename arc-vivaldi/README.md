# Arc-inspired Vivaldi UI

Vivaldi 8.x의 **세로 (왼쪽)** 레이아웃 위에 얹는 Arc(macOS) 스타일 Custom UI CSS.
기능은 Vivaldi 내장 기능을 그대로 쓰고, CSS는 색·간격·모서리·상태 표현만 바꾼다.

- 한 파일: `arc.css` (이 폴더 최상위의 `.css`만 Vivaldi가 읽음)
- 검증 환경: Vivaldi **8.2.4133.83 stable**, Fedora 44 KDE (Wayland), 1920×1080 @1x
- 문서: `references.md`(레퍼런스·측정) · `selector-audit.md`(DOM 선택자) · `feasibility.md`(가능/불가) · `test-checklist.md`(테스트) · `CHANGELOG.md`

> 이 폴더에는 `arc.css` 외의 `.css` 파일을 두지 말 것. 모두 함께 로드된다.

---

## 1. Vivaldi 버전 확인

메뉴 › 도움말 › Vivaldi 정보 (또는 주소창에 `vivaldi://about`). **8.0 이상**이어야 한다(세로 레이아웃 프리셋, Unified UI).
터미널: `vivaldi --version`

## 2. 현재 설정 백업 (권장)

레이아웃 프리셋을 적용하면 툴바 배치가 바뀐다. 먼저:

1. 설정 › 모양 › 레이아웃 에서 현재 상태를 **저장**(저장된 레이아웃으로 남음).
2. 추가로 안전하게 하려면 Vivaldi를 끈 상태에서 프로필 폴더를 복사:
   Linux `~/.config/vivaldi/Default/Preferences` · Windows `%LOCALAPPDATA%\Vivaldi\User Data\Default\Preferences` · macOS `~/Library/Application Support/Vivaldi/Default/Preferences`

이 패키지는 설정 파일을 자동으로 수정하지 않는다.

## 3. 기본 레이아웃 설정 (Vivaldi 설정만 사용)

1. **설정 › 모양 › 레이아웃 › 세로 (왼쪽)** 선택
   → 탭·주소창이 왼쪽, 패널은 오른쪽(hover), 상태 표시줄 overlay, 탭 더미 = 아코디언.
2. **툴바 사용자 지정** (탭 표시줄 빈 곳 우클릭 › 툴바 사용자 지정, 또는 설정 › 모양)
   Arc 순서에 맞춘 권장 배치:
   - 탭 표시줄 **위**: `탭`(Tab Button) · `가변 간격` · `이전 페이지` · `다음 페이지` · `새로고침` · `주소 표시줄`
   - 탭 표시줄 **아래**: `새 탭` · `가변 간격` · `워크스페이스`
   (내부 ID: 위 `TabButton, FlexibleSpacer, Back, Forward, Reload, AddressField` / 아래 `NewTab, FlexibleSpacer, WorkspaceButton` — 이 배치로 실제 테스트함)
   (계정·VPN 버튼은 원하면 유지. 아래쪽에 두면 줄이 하나 더 생긴다.)
3. **사이드바 폭**: 사이드바 오른쪽 가장자리를 끌어서 조절.
   - 기본 권장 **약 258px** (Favorites 타일 5개가 한 줄을 꽉 채움)
   - Compact 권장 **약 208px** (타일 4개)
4. 선택 설정
   - 설정 › 탭 › **닫기 버튼 표시** → hover 시 표시 (Arc와 동일)
   - 설정 › 주소 표시줄 › **모든 주소 보기** 해제 → 도메인 위주 표시
   - 설정 › 모양 › 사용자 인터페이스 밀도 → **보통**(on) 유지 권장 (탭 pitch 33px 기준으로 맞춤)

## 4. `vivaldi://experiments`

주소창에 `vivaldi://experiments` 입력 후 체크:

- **Allow CSS modifications** (필수) — 일부 문서에 나오는 "Allow for using CSS modifications"와 같은 항목. 8.2 실제 표기는 *Allow CSS modifications*.
- **Horizontal pinned tabs in vertical tab bars** (권장) — 고정 탭을 Arc Favorites 같은 아이콘 그리드로 표시.

## 5. CSS 폴더 지정

**설정 › 모양 › 커스텀 UI 수정 › 폴더 선택** → 이 `arc-vivaldi` 폴더 선택.
(4단계의 실험 항목을 켜야 이 항목이 보인다.)

## 6. 브라우저 재시작

Vivaldi를 완전히 종료 후 다시 실행. (CSS는 재시작 때 다시 읽힌다.)

## 7. 적용 확인

- 창 전체가 한 가지 회색(또는 다크 차콜) 면이고, 웹 페이지가 8px 여백의 **둥근 카드**로 보이면 적용됨.
- 활성 탭이 흰(다크: 밝은 반투명) 카드, 아래쪽에 `+ 새 탭` 행.
- 자물쇠(사이트 정보) 아이콘이 주소창 왼쪽에 선명하게 보이는지 확인.
- 고급: `vivaldi://inspect/#apps` 에서 `window.html` 항목 inspect → `#browser` 계산값에 `--arc-ui-gap: 8px` (이 경로 자체는 8.2에서 직접 시험하지 않음; 테스트는 원격 디버깅으로 같은 문서에 접속해 수행).

## 8. 설정 변경 방법

`arc.css` 맨 위 두 블록만 고치면 된다. 저장 후 Vivaldi 재시작.

```css
body {
  --arc-palette-mode: arc;   /* arc | theme  (theme = Vivaldi 테마 색을 그대로 사용) */
  --arc-compact: 0;          /* 1 = Compact */
}
#browser {
  --arc-tint: var(--arc-tint-lavender);  /* lavender | slate | sage | peach | neutral */
  --arc-tint-strength: 5%;               /* 0% = 순수 Arc 회색, 10~14% = 파스텔 Space 느낌 */
  --arc-ui-gap: 8px;                     /* 콘텐츠 카드 여백 */
  --arc-content-radius: 10px;
  --arc-tab-radius: 8px;
  --arc-motion-duration: 160ms;
}
```

| 모드 | 켜는 법 |
|---|---|
| A. Expanded (기본) | 3단계 그대로 |
| B. Auto-hide | 설정 › 모양 › **UI 자동 숨김** 켜고 **탭 표시줄** 체크. CSS 변경 불필요 — 떠 있는 사이드바 스타일이 자동 적용 |
| Compact | `--arc-compact: 1` + 사이드바 폭 ≈208px |
| 테마 색 사용 | `--arc-palette-mode: theme` (Theme Editor 배경 이미지·강조색 유지) |

세 모드는 서로 독립적이며 동시에 켜도 충돌하지 않는다.

## 9. 라이트 / 다크

CSS는 OS 설정이 아니라 **현재 Vivaldi 테마의 명도**(`.theme-light` / `.theme-dark`)를 따른다.

- 설정 › 테마 에서 밝은/어두운 테마 선택, 또는 **테마 변경 주기 › 운영체제 설정에 따라** 로 라이트·다크 테마를 각각 지정.
- 현재 쓰는 "Sayu x Elaina"처럼 어두운 사용자 테마는 자동으로 다크 팔레트가 적용된다(검증됨). 테마의 보라 색감을 살리고 싶으면 `--arc-palette-mode: theme`.

## 10. 스타일 끄기

- 빠른 방법: 설정 › 모양 › 커스텀 UI 수정 의 폴더 지정을 비우거나, `vivaldi://experiments` 에서 **Allow CSS modifications** 해제 → 재시작.
- 또는 `arc.css` 이름을 `arc.css.off` 로 바꾸고 재시작.

## 11. 원래 설정으로 복구

1. 10단계로 CSS 끄기.
2. 설정 › 모양 › 레이아웃 에서 2단계에 저장한 레이아웃(또는 클래식) 선택.
3. 실험 항목 Horizontal pinned tabs 해제(선택).
4. 그래도 다르면 Vivaldi 종료 후 백업한 `Preferences` 파일 복원.

## 12. Vivaldi 업데이트 후 확인

1. `vivaldi://experiments` 두 항목이 여전히 켜져 있는지 (실험 기능은 이름이 바뀌거나 정식 설정으로 옮겨질 수 있음).
2. 7단계 확인 항목.
3. 깨졌다면 `selector-audit.md` 의 선택자를 `vivaldi://inspect/#apps` › `window.html` 에서 다시 확인. 특히 `.tab-position`, `.pinned-group`, `.UrlBar-AddressField`, `#webpage-stack::after`.
4. 탭이 겹치거나 클릭이 어긋나면 즉시 10단계로 끄고 `CHANGELOG.md`에 버전을 기록.

---

## 알려진 차이 (요약, 자세히는 `feasibility.md`)

- Favorites는 **Workspace별** 고정 탭이다(Arc처럼 모든 Space 공유 아님).
- 창 제어 버튼은 사이드바가 아니라 Vivaldi의 **상단 자동 숨김 바**에 있다(Linux, 세로 레이아웃). 화면 위 가장자리에 마우스를 올리면 나타나며, 그 바를 끌어 창을 옮길 수 있다.
- 탭 행 간격은 Vivaldi가 33px로 계산 → Arc(≈44px)보다 촘촘하다.
- `+ 새 탭`은 탭 목록 아래에 있다(Arc는 위).
- Auto-Archive, Peek, Command Bar는 CSS로 불가 → Vivaldi 탭 절전 모드, Follower Tab, 퀵 커맨드(F2)로 대체.

## 보안·안전

- 설치 파일·`window.html`·번들 JS를 수정하지 않는다. JavaScript 주입·확장 설치 없음.
- 사이트 정보(보안) 버튼, 권한 표시, 경고는 가리거나 흐리게 하지 않는다.
- UI 자동 숨김을 켜면 Vivaldi가 "잠재적인 보안 위험" 안내를 띄운다: 숨겨진 사이 웹 페이지가 가짜 주소창을 그릴 수 있으므로, 중요한 사이트에서는 사이드바를 열어 실제 주소를 확인할 것.

---

## 부록: 2026-10-11 자동 적용 기록 / 복구 명령

적용한 변경 (Vivaldi 종료 상태에서 편집):
- `Preferences`: `vivaldi.appearance.css_ui_mods_directory` = 이 폴더, `vivaldi.tabs.bar.width` = 258,
  `vivaldi.toolbars.tabbar_before` = `TabButton, AccountButton, VPNButton, Extensions, FlexibleSpacer, Back, Forward, Reload, AddressField`,
  `vivaldi.toolbars.tabbar_after` = `NewTab, FlexibleSpacer, WorkspaceButton, UpdateButton`
- `Local State`: 실험 `vivaldi-css-mods@1`, `vivaldi-horizontal-pinned-tabs@1`
- 레이아웃(세로 왼쪽)·테마는 사용자가 이미 설정해 두어 변경하지 않음.

원래대로 되돌리기 (Vivaldi를 먼저 완전히 종료):

```bash
B="$HOME/문서/viv_theme/arc-vivaldi/backup-20261011"
cp -p "$B/Preferences" ~/.config/vivaldi/Default/Preferences
cp -p "$B/Local State" ~/.config/vivaldi/"Local State"
```

2단계 변경 (2026-10-11 01:09): `vivaldi.auto_hide.bookmarks_bar` = true (북마크 표시줄은 화면 위 가장자리 hover 시 표시),
`tabbar_before`에서 `VPNButton` 제거. 이 단계 직전 상태는 `backup-20261011-step2/Preferences`.

3단계 변경 (2026-10-11 01:17): `vivaldi.tabs.close_pinned` = 2("닫기 대신 최소화"), `vivaldi.tabs.dim_hibernated` = true.
직전 상태는 `backup-20261011-step3/Preferences`.

4단계 변경 (2026-10-11 02:1x): `vivaldi.actions[0].COMMAND_CLOSE_TAB.shortcuts`에서 `ctrl+w` 제거(Ctrl+F4 유지) —
Ctrl+W는 `extensions/arc-close-tab` 확장이 담당. 직전 상태는 `backup-20261011-step4/Preferences`.
