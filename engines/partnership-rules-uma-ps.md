# Partnership Rules — Uma+PS

System-specific rules for the Uma+PS partnership.
On clash with a universal rule, this file wins.

Each rule may either **override** a universal rule (state which one) or be **net-new** logic with no universal counterpart.

---

## PR-UPS-001: GF-transfer-acceptance — only with fit

**type**: net-new (no universal counterpart)
**category**: forcing/acceptance semantics

**when**: a transfer bid is made in a context where gf is already established.

**what**:
- Opener does NOT auto-complete the transfer.
- Opener accepts (bids the target) only with **3+ card fit**.
- Without 3+ card fit, opener bids the next step (typically 3n) to show "no fit".

**contrast with universal default**: in non-gf contexts, transfer acceptance is automatic (universal Transfer-force rule). In gf contexts, this partnership rule replaces the auto-accept.

**variants** (system-defined extensions): some specific gf-transfer sequences in this system use **length-showing** acceptance instead of binary accept/reject — e.g. `2♦-2♠-2n-3♦` (page `xfer-to-3♥-when-gf`): opener bids 3♥ with 2-card ♥, 3n with 3-card ♥. These specific length-showing schemes are **system content** (authored as md), not partnership rules — but they instantiate the broader principle of "gf acceptance is not auto".

**example**: `2♦-3♣` is a gf-transfer to ♦ (5+♦). Opener bids 3♦ with 3+ ♦ fit, else 3n.

---

## PR-UPS-002: Splinter in competition — only in enemy suit

**type**: override
**overrides**: universal default "double jumps in competition = splinter"

**when**: in a competitive auction (opps have bid).

**what**: standard splinter convention is restricted — double jumps are splinters ONLY when showing shortness in the enemy (opp's bid) suit. Other double jumps in competition are not splinters (revert to natural / system-specific meaning).

**rationale**: in competition, shortness in opp's suit is most informative; splintering elsewhere wastes bidding space.

**example**: (1♥)-1♠-(2♥)-4♥ is splinter in ♥ (enemy suit) — fine. But (1♥)-1♠-(p)-4♣ is NOT a splinter under this rule.

---

## Open / pending

(more partnership rules collected here as the user identifies them)
