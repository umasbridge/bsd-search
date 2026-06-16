# Universal Rule Engine

Bridge invariants that apply across all systems. The engine ships with these.
On clash with a partnership rule, the partnership rule wins.

---

## RULE-001: Transfer-force rule

**status**: universal
**category**: forcing semantics

**when**: any artificial bid; or any continuation by the transferer over a completed transfer.

**what**:
- All artificial bids → `bid-forcing: true` (partner must respond).
- Completed transfer sequence (T-xfer-accept) → `auction-commit: none` by default (transferer may pass).
- Any continuation by the transferer over the accept → `auction-commit: gf` is established.

**example**: `1n-2♥-2♠` is nf (responder may pass); `1n-2♥-2♠-3♠` establishes gf.

---

## RULE-002: Inv-carve-out rule

**status**: universal
**category**: forcing derivation

**when**: a bid carries `auction-commit: invite`.

**what**: for the next bidder's response options:
- Continuations explicitly tagged `reject` / `nf` / `signoff` → `auction-commit: none`.
- All other legal continuations → `auction-commit: gf` by default.

**rationale**: authors only enumerate exceptions; gf-default is auto-generated for the rest.

**example**: over a 2n-inv response, opener's authored 3♠=reject → auction dies at 3♠; all other opener bids (3♣/3♦/3♥/4♣/4♦/4♥/4♠) auto-tagged gf.

---

## RULE-003: Transfer-continuation rule

**status**: universal
**category**: auction-commit derivation

**when**: responder's rebid in `<art-transfer>-<accept>-<rebid>` sequences.

**what**:
- If the rebid is annotated **"inv"** → `auction-commit: { min-level: cheapest-level-of-transferred-to-suit }`. Partner accepts by going higher; rejects by passing at that min-level.
- If the rebid is **not annotated "inv"** → `auction-commit: gf` by default.

**example** (transfer to ♠, cheapest level = 3♠):
- `2♦-2♥-2♠-2n "inv"` → commit:{min-level:3♠}
- `2♦-2♥-2♠-3♣` (no "inv") → commit:gf

---

## RULE-004: Game-bid-nf-in-gf rule

**status**: universal (with exceptions)
**category**: forcing derivation

**when**: a game-level bid (3n for NT, 4M for major fit, 5m for minor fit) is made in a gf auction.

**what**: by default → `bid-forcing: false` (partner can pass — the contract is reached).
Explicit "forcing" annotation overrides → `bid-forcing: true` (means "not to play THIS contract — keep bidding").

**exceptions** (these override the default):
- When a major suit is agreed, `5m` bids are NEVER to-play — they're cues / controls.
- Systemic conventions override: splinter jumps, cue bids, Blackwood, etc. keep their conventional meaning.

**example**: `1♠-4♠` is to-play (game). `1♠-4♥` is splinter (not 4-card heart raise). Without "forcing", `2♦-2♠-2n-3n` is to-play; with "forcing", it means keep bidding.

---

## RULE-005: Alternate-drop-is-gf rule

**status**: universal
**category**: auction-commit derivation

**when**: the system provides a lower-level "drop" sequence reaching the same final bid/contract.

**what**: choosing the higher-level alternate path → `auction-commit: gf` is established at the deviation point.

**rationale**: if a drop alternative exists, taking the longer route signals more strength.

**example**: `2♦-3♦` is the nf transfer to ♥. The longer `2♦-2♠-2n-3♦` path also transfers to ♥ but is gf — because the drop alternative `2♦-3♦` was available and rejected.

---

## RULE-006: Slam-try vocabulary

**status**: universal
**category**: vocabulary mapping (not a derivation rule)

**when**: the meaning text uses "slam try" / "mild slam try" / "slam invite".

**what**: maps to:
- `auction-commit: gf` (game force established/required; slam not committed)
- `slam-interest: <level>` — semantic flag for partner (mild / yes / strong)
- `bid-forcing` derived from the bid's level:
  - At or above game level → `bid-forcing: false` (partner can pass; default)
  - Below game level → `bid-forcing: true` (forces past current level to reach game)

**example**: 
- `4♠ "bal slam try"` after major-agreed gf → `commit:gf`, `slam-interest:yes`, `bid-forcing:false`.
- `4♣ "splinter slam try"` (below 4♠ game) → `commit:gf`, `slam-interest:yes`, `bid-forcing:true`.

---

## RULE-007: Three-bucket response pattern

**status**: universal
**category**: descriptive (system design heuristic, not enforced)

**summary**: responses to strong/asking bids tend to fall in three force buckets:
1. **Drop** — `auction-commit: none`
2. **Invite** — `auction-commit: invite` (to game OR to slam, context-dependent)
3. **Game / Slam** — `auction-commit: gf` with slam route accessible via continuations

Convention: the two extremes (drop + slam) often share ONE bid (continuation disambiguates); the middle (invite) is a separate bid.

**use**: helpful when authoring or validating a response tree — every "asking bid" should typically have all three buckets covered. Importer can flag missing buckets for review.

---

## Open / pending

(future rules collected here as we walk more system content)
