# 2♦ Slice — Walk Progress

**Status**: paused after R3 (2♠ puppet, including the full stayman expansion).
**Resume at**: R4 (`2♦ > 2n` — puppet to 3♣).

---

## Hand model + universal thresholds

```
hand = { adj_hcp, shape (per suit), points_per_suit }
game = 25 combined adjusted points
slam = 33 combined adjusted points
```

Calibrations for **Strong 2♦** (opener has 18-19 adj):

| English | Adj-HCP for responder |
|---|---|
| pass | ≤ 5 |
| inv | 6–7 |
| gf | ≥ 7 |
| slam try | ≥ 14 |
| slam force | ≥ 15 |

---

## Locked nodes

### R1 — `2♦` Strong 2♦ opening

```
state-key:  vul | <2♦, p2♦, pp2♦, ppp2♦>           (alias = 4)
constraint:
  hcp:           [18, 19]
  shape:         pattern ∈ {
                   4333,
                   4432,
                   5332-with-5m   (5-card suit ∈ {♣,♦}),
                   5422           (♣+♦ ∈ {5+4, 4+5}; ♥=2 AND ♠=2;
                                    each doubleton contains ≥1 of {A,K})
                 }
  vulnerability: true
meaning:
  art:            true
  bid-forcing:    true              (partner cannot pass)
  auction-commit: none              (no destination committed)
  shows:          { hcp:[18,19], near-bal, no-5M }
```

---

### R2 — `2♦ > 2♥` (xfer to ♠)

```
state-key:  vul | 2♦-2♥ × 4 seats   (alias = 4)
constraint: { ♠ ≥ 5 }                // any 5+♠ hand
meaning:    { art, kind:transfer, target:♠,
              bid-forcing:t, auction-commit:none }
```

Universal Transfer-force rule auto-generates opener's 2♠ accept.

**Rebids over 2♠:**

| Rebid | Constraint | Force |
|---|---|---|
| pass 2♠ | any 5+♠ | adj ≤ 5 — signoff |
| 2n | 6♠ / 6322 | adj 6–7, inv (min-forcing-level: 3♠) |
| 3m | 5♠ + 4+m | adj ≥ 7, gf |
| 3♥ | 5♠ + 5♥ (55M) | adj 6–7, inv (min-forcing-level: 3♠) |
| 3♠ | 5♠ / 5332 | adj ≥ 7, gf |
| 3n | 6♠ + 4♥ | adj ≥ 7, gf, bid-forcing:t, **min-forcing-level: 4M** |
| 4♠ | 6+♠ bal, slam-try | adj ≥ 14, bid-forcing:f, slam-interest |
| 4x | 6+♠, short:x, slam-try | adj ≥ 14, bid-forcing:t, slam-interest |

---

### R3 — `2♦ > 2♠` (puppet to 2n)

```
state-key:  vul | 2♦-2♠ × 4         (alias = 4)
constraint: {
  adj ≥ 7,
  NOT 5+♠,                           // → 2♥
  NOT 5+♥ with adj ≤ 6,              // → 3♦ direct (nf)
  NOT 5+♦ as primary,                // → 3♣ direct
  NOT 5-5 in M,                      // → 3n direct (R22)
  NOT short-M shape,                 // → 3♥/3♠ direct
  NOT 6+♥ or 6+♠ texas hand,         // → 4♣/4♦ direct
  NOT 5♣ or 5♦ quanti hand           // → 4♥/4♠ direct
}
meaning:    { art, kind:puppet, target:2n,
              bid-forcing:t, auction-commit:f1,
              min-forcing-level: game }
```

Universal puppet rule: opener forced to 2n.

**Rebids over 2n:**

| Rebid | Constraint | Notes |
|---|---|---|
| 3♣ stayman | max(♥,♠) ∈ [4, 5], NOT 5-5 in M, adj ≥ 7 | covers 4-only / 4-4 / 5-4 (Smolen) |
| 3♦ xfer ♥ | ♥ ≥ 5, ♠ ≤ 3, adj ≥ 7 | gf via alt-drop; copies xfer-to-3♥-when-gf template |
| 3♥ | ♣=5, ♦=4, ♥=2, ♠=2, adj ≥ 7 | exactly 5422 |
| 3♠ | ♦=5, ♣=4, ♥=2, ♠=2, adj ≥ 7 | exactly 5422 |
| 3n to play | bal / 5332-with-5m; no 4-card M; adj 7–13 | signoff |
| 4♣ | ♦=6, ♣=4, adj ≥ 14 | slam-try |
| 4♦ | ♣=6, ♦=4, adj ≥ 14 | slam-try |
| 4♥ | ♣=5, ♦=5, adj 7–14 | gf, slam-interest possible |
| 4♠ | ♣=5, ♦=5, adj ≥ 15 | slam-force; 4n by partner = dkc |

---

### R3 stayman expansion — `2♦ > 2♠ > 2n > 3♣`

Template-copy from `# Stayman over 2n opening`, filtered for our context (opener has no 5M per R1).

```
3♣  STAYMAN
    responder constraint: { max(♥,♠) ∈ [4,5], NOT 5-5 in M, adj ≥ 7 }

├─ 3♦  opener: NO 4-card M    { ♥≤3, ♠≤3 }
│       └─ Smolen route:
│           ├─ 3♥  responder: { ♥=4, ♠=5, adj ≥ 7 }   (Smolen, bid shorter M)
│           └─ 3♠  responder: { ♠=4, ♥=5, adj ≥ 7 }   (Smolen, bid shorter M)
│           [followups: 3M page link not yet walked]
│
├─ 3♥  opener: exactly 4♥, denies 4♠   { ♥=4, ♠≤3 }
│       (md says "4/5♥" but R1 forbids 5M → only ♥=4)
│       ├─ 3♠  responder: good raise in ♥ (4-card ♥ slam try)
│       │       constraint: { ♥=4, adj ≥ 14 }
│       │       meaning:    { trump:♥, slam-interest, min-forcing-level:4♥ }
│       │       (3-card-♥-raise interpretation drops out — opener can't have 5♥)
│       ├─ 3n  responder: to play
│       │       constraint: { ♠=4 only, no ♥ fit, adj 7-13 }
│       └─ 4m  responder: 5+m + 4♠ + <3♥
│              constraint: { ♣≥5 OR ♦≥5, ♠=4, ♥≤2, adj ≥ 7 }
│
├─ 3♠  opener: 4♠, can have 4♥   { ♠=4, ♥≤4 }
│       ├─ 3n  responder: 4♥, no 4♠, signoff values
│       │       constraint: { ♥=4, ♠≤3, adj 7-13 }
│       │       ├─ pass  opener: 4♠ no 4♥, signoff at 3n   { ♠=4, ♥≤3 }
│       │       └─ 4♥   opener: 4-4 in M, corrects to 4♥   { ♠=4, ♥=4 }
│       │              meaning: { trump:♥, bid-forcing:f, auction-commit:gf-at-game }
│       ├─ 4m  responder: 5+m + 4♥        { ♣≥5 OR ♦≥5, ♥=4, ♠≤3, adj ≥ 7 }
│       └─ 4♥  responder: good raise in ♠ (4-card ♠ slam try)
│              constraint: { ♠=4, adj ≥ 14 }
│              meaning:    { trump:♠, slam-interest, min-forcing-level:4♠ }
│
└─ 3n  opener: 5-card ♠   ⚠️ UNLIT (R1 forbids 5M; importer filters this out at template-copy time)
```

---

## Pending nodes (not yet walked)

**Direct rebids over 2♦ (R3 already done; rest below):**
- R4 — `2♦ > 2n` (puppet to 3♣, nf)
- R5 — `2♦ > 3♣` (5+♦, gf, transfer-like with conditional acceptance)
- R6 — `2♦ > 3♦` (xfer ♥, nf — direct path)
- R7 — `2♦ > 3♥` (short ♥, 3♠)
- R8 — `2♦ > 3♠` (short ♠, 3♥)
- R9 — `2♦ > 3n` (5-5 in majors)
- R10 — `2♦ > 4♣` (texas to ♥)
- R11 — `2♦ > 4♦` (texas to ♠)
- R12 — `2♦ > 4♥` (♣ quanti)
- R13 — `2♦ > 4♠` (♦ quanti)

**Sub-trees still to expand under R3 rebids:**
- 3♦ xfer-♥ subtree (copy `# xfer to 3♥, when gf` here, walk all leaves)
- 3♥, 3♠ (5-4 minor 5422) continuations
- 4♣, 4♦, 4♥, 4♠ slam-try / slam-force continuations

**Interference branches:**
- `2♦(x)` (opps double showing ♦) — 9 sub-bids
- `2♦(2M)` (opps overcall 2M) — Rubensohl template-copy
- `2♦(3x)` (opps preempt) — values double + natural

---

## Open questions / gaps in the source

- `2♦-2♠-2n-3♣-3♥-3♠-3n` by opener (minimum, allow correction): not explicitly authored in the stayman page.
- `2♦-2♠-2n-3♣-3♦-3M`-Smolen continuations: link to `page-Smolen` — not yet walked.
- `2♦-2♠-2n-3♦-3♥`/`-3n` (xfer-to-3♥-when-gf opener responses): authored, but inline mentions "if responder corrects 3n to 4♥" imply opener-3n-with-min behavior that isn't its own row. Possible review-queue item.

---

## Where to resume

1. Read this file + the engine files (`engines/universal-rules.md`, `engines/partnership-rules-uma-ps.md`, `engines/meaning-fields.md`).
2. Continue at **R4 — `2♦ > 2n` (puppet to 3♣)**.
3. Pace: 1–2 nodes per round until predicate vocabulary feels stable, then can batch.
