# Meaning Field Vocabulary

Fields that appear in a bid's meaning record. System-agnostic — these are the *kinds* of facts a meaning can carry, not the values for any specific system.

---

## Core force/intent fields

| Field | Type | Values | Notes |
|---|---|---|---|
| `art` / `nat` | bool (one of two) | mutually exclusive | art = artificial; nat = natural. |
| `bid-forcing` | bool | true / false | Can partner pass THIS bid? Always true for art bids; for nat bids, authored or rule-derived. |
| `auction-commit` | enum | `none` / `invite` / `{min-level:X}` / `gf` / `slam-force` | Where the auction is committed to. `{min-level:X}` for transfer-inv style. |
| `min-forcing-level` | bid (e.g. `4M`, `4♥`, `5m`) | optional refinement of `auction-commit` | Floor — partnership must reach AT LEAST this contract; ceiling open (slam still reachable). For R6/R19-style "3n forcing" bids in gf contexts: `min-forcing-level: 4M` means 3n is excluded as final contract but 4♥/4♠/slam are all fine. |
| `slam-interest` | enum | `none` / `mild` / `yes` / `strong` | Semantic hint, separable from force level. |

## Shape

| Field | Type | Examples | Notes |
|---|---|---|---|
| `shape` | dict | `{♠:5+, ♥:4}` / `{♠:6, short:♥}` / `{majors:2-2}` | Per-suit constraints. |
| `shape-pattern` | string | `6322`, `5332`, `4432`, `55M`, `66M` | Shorthand for distribution patterns. |
| `short` | flag or suit | true / `♥` | Shortness (singleton or void). |
| `stiff-void-sing` | flag | true | Generic shortness flag. |

## Conventions

| Field | Type | Values | Notes |
|---|---|---|---|
| `kind` | string | `transfer` / `puppet` / `stayman` / `cue` / `relay` / `splinter` / `quanti` / `nsst` / `keycard` (rkc/ekc/dkc/3kc) / `lebensohl` / `rubensohl` / `smolen` / `signoff` / `values-double` / `takeout` | What convention this is. Only meaningful when `art:true` (mostly). |
| `target` | suit/bid | `♣` / `♦` / `♥` / `♠` / `2n` / `3♣` | For transfer/puppet — what it points to. |
| `pivot` | suit | `M` / suit | For Rubensohl-like conventions where a pivot suit parameterizes responses. |
| `trump-implied` | suit | `♠` / `♥` | Where the bid sets/implies trump (for slam tries, nsst, etc.). |

## Communication (about hand)

| Field | Type | Examples | Notes |
|---|---|---|---|
| `shows` | dict / list | `{♠:5+}` / `{stopper:♦}` / `{majors:1+}` | Positive info conveyed. |
| `denies` | dict / list | `{♠:4+}` / `{stopper:♦}` | Negative info. |
| `asks` | string / dict | `4+M` / `keycard` | What this bid asks partner to reveal. |
| `promises` | dict | `{stopper:♦}` | Guarantees — typically appears with conditional bids. |
| `strength` | string | `weak` / `invitational-values` / `gf-values` / HCP range like `18-19` | Hand strength. Often correlated with auction-commit but not identical. |

## Continuation / structure

| Field | Type | Notes |
|---|---|---|
| `has-continuations` | bool | Row's meaning text implies more bids follow. |
| `continuations-inlined` | list of `{bid, meaning}` | Sub-bids described in free text rather than child rows — importer lifts to nodes. |
| `continuation-ref` | page-id or named branch | "as over X" / `[Y\|popup\|page-Z]` reference — copy target tree under this parent. |
| `signoff` | flag | This bid is a signoff at its level. |
| `systems-on` | flag | Apply our normal continuation as if no interference. |

## Misc semantic flags

| Field | Type | Notes |
|---|---|---|
| `needs-source-of-tricks` | flag | Hand description: needs partner to have tricks. |
| `slam-accessible` | flag | Slam reachable via continuations from this bid (used for "game/slam bucket" bids). |
| `applies-when` | predicate | Conditional applicability, e.g. `pivot=♥`. |

---

## Notation conventions

- Suits as `♣ ♦ ♥ ♠`. `M` / `OM` / `m` / `om` are variables (major / other-major / minor / other-minor).
- Shape constraints: `5+♠` = 5 or more spades. `5♠` = exactly 5. `short:♣` = stiff or void in clubs.
- Shape patterns are 4-digit (sorted descending) or named (55M = 5-5 in majors).
- HCP ranges as `low-high` (e.g. `18-19`, `15-17`).

---

## Open / pending

- Should `strength` and `auction-commit` be unified or kept separate? Currently separate — strength is hand description, commit is auction trajectory. Keep separate for now.
- Per-context fields (e.g. R45's "gf if over 1n / inv elsewhere") — under template-copy-on-call rule, each instantiation gets its own meaning record so this is no longer needed inside one record. Confirmed.
