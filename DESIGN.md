# Bid Lookup Engine — Design Document

## Purpose

A deterministic, programmatic bid lookup engine that returns all matching bid candidates for a given bidding situation. No AI inference at query time — the engine is purely a structured lookup against a decision tree populated with bridge bidding knowledge.

The engine answers: **"Given this auction and these hand features, what are all the bids that could apply?"**

---

## Architecture Overview

```
Hand Evaluator (separate program)       Auction Parser (separate program)
        |                                        |
        v                                        v
  Hand features ──────────────┬──── Auction facts
                              |
                              v
                    Bid Lookup Engine ──> List of bid candidates
                              |
                        Reads from:
                        1. Base system tree (SAYC, 2/1 GF, etc.)
                        2. Conventions library (Stayman, Jacoby, etc.)
                        3. User's system overlay (ultimate truth)
```

### What the engine does NOT do
- No hand evaluation or card-level analysis
- No auction parsing — auction facts are provided as input
- No ranking or elimination of candidates (future feature)
- No AI or heuristic reasoning
- Never sees the actual hand (only pre-computed features)

### What the engine DOES do
1. **Match inputs against tree entries** — find all bids where the hand features + auction facts satisfy the entry conditions
2. **Return all matching candidates** — tagged with which system/convention produced them

---

## Inputs

All inputs are pre-computed before calling the engine:

### Hand Features

| Input | Type | Example | Notes |
|-------|------|---------|-------|
| hand_value | number | `13` | HCP for now; evaluator can evolve |
| shape | string | `"3451"` | Card count per suit in S-H-D-C order |
| shape_type | string | `"balanced"` | `balanced`, `semibalanced`, `unbalanced` |
| has_singleton | boolean | `true` | |
| has_void | boolean | `false` | |
| longest_suit | object | `{ "suit": "D", "length": 5 }` | |
| honors | object | `{ "S": "AK", "H": "Q", "D": "JT", "C": "A" }` | Honor cards per suit (A, K, Q, J, T) |

### Auction Facts

| Input | Type | Example | Notes |
|-------|------|---------|-------|
| vulnerability | string | `"NS"` | `all`, `none`, `EW`, `NS` |
| dealer | string | `"N"` | |
| seat | string | `"S"` | My position |
| auction | string | `"P-1H-2C-?"` | Raw auction string, `?` = my turn |
| partner_bid | string | `"1H"` | Partner's last bid (null if none) |
| partner_hcp | array | `[12, 21]` | Inferred HCP range |
| partner_suit | string | `"H"` | Partner's implied suit (null if none) |
| partner_suit_length | array | `[5, 99]` | Inferred suit length range |
| partner_forcing | boolean | `true` | Whether partner's bid is forcing |
| opponent_bid | string | `"2C"` | RHO's last bid (null if none) |
| contested | boolean | `true` | Whether opponents have bid |
| my_support | number | `3` | Cards I hold in partner's suit |
| my_seat_position | string | `"3"` | 1st, 2nd, 3rd, or 4th seat |

---

## Auction Notation

Normalized format: bids separated by `-`, one per seat in clockwise order starting from dealer.

- `P` = pass
- `?` = my turn (the position we're finding a bid for)
- Standard bid notation: `1C`, `1D`, `1H`, `1S`, `1NT`, `2C`, etc.
- `X` = double, `XX` = redouble

### Examples

| Auction string | Meaning |
|----------------|---------|
| `?` | I am dealer, no bids yet |
| `P-?` | Dealer passed, my turn (2nd seat) |
| `1H-P-?` | Dealer opened 1H, 2nd seat passed, my turn (partner opened) |
| `P-1H-2C-?` | Dealer passed, partner opened 1H, RHO overcalled 2C, my turn |

---

## Tree Entry Schema

Each entry in the tree represents one possible bid in one auction situation:

```json
{
  "id": "sayc-1H-resp-2NT-jacoby",
  "system": "sayc",
  "convention": "jacoby_2nt",
  "auctionPattern": "1H-P-?",
  "bid": "2NT",
  "requires": {
    "hand_value": [13, 99],
    "my_support": [4, 99],
    "partner_suit": "major",
    "contested": false
  },
  "announces": {
    "hand_value": [13, 99],
    "support": [4, 99],
    "forcing": true
  },
  "description": "Jacoby 2NT — game-forcing raise with 4+ card support",
  "children": ["1H-2NT-3C", "1H-2NT-3D", "1H-2NT-3H", "1H-2NT-3S", "1H-2NT-3NT", "1H-2NT-4H"]
}
```

### Field definitions

| Field | Purpose |
|-------|---------|
| `id` | Unique identifier |
| `system` | Which base system this belongs to (`sayc`, `2over1`, etc.) |
| `convention` | Convention name if applicable (null for natural bids) |
| `auctionPattern` | The auction sequence this entry applies to |
| `bid` | The bid this entry produces |
| `requires` | Conditions on hand features + auction facts that must all be met |
| `announces` | What this bid tells partner about my hand — becomes auction facts for the next round |
| `description` | Human-readable explanation |
| `children` | IDs of continuation entries (next level of auction) |

### Requires — condition types

| Condition | Format | Example |
|-----------|--------|---------|
| `hand_value` | `[min, max]` | `[6, 10]` |
| `shape` | exact shape string | `"4432"` |
| `shape_type` | enum | `"balanced"`, `"unbalanced"`, `"any"` |
| `my_support` | `[min, max]` | `[3, 3]` |
| `longest_suit` | suit + length range | `{ "suit": "H", "length": [5, 99] }` |
| `has_singleton` | boolean | `true` |
| `has_void` | boolean | `true` |
| `suit_honors` | suit + specific honors | `{ "suit": "S", "has": ["A", "K"] }` |
| `vulnerability` | enum | `"favorable"`, `"unfavorable"`, `"any"` |
| `my_seat_position` | list or `"any"` | `["1", "2"]` |
| `contested` | boolean | `false` |
| `partner_forcing` | boolean | `true` |

---

## Three-Layer System

### Layer 1: Base Systems
Complete bidding systems stored as collections of tree entries.
- **SAYC** (Standard American Yellow Card)
- **2/1 Game Forcing**
- Others can be added

Each base system covers natural bidding — what bids mean without any special conventions.

### Layer 2: Conventions Library
Standalone, pluggable convention modules. Each convention:
- Defines which auction patterns it applies to
- Provides its own tree entries (including continuations)
- Specifies what it overrides in the base system
- Can be mixed and matched

Examples: Stayman, Jacoby Transfers, Jacoby 2NT, Blackwood/RKC, Gerber, Michael's, Unusual 2NT, Negative Doubles, Weak 2s, New Minor Forcing, Fourth Suit Forcing, etc.

### Layer 3: User's System Overlay
The user's own system document, parsed or manually configured:
- **Overrides everything** — user's system is the ultimate truth
- If user specifies a convention (e.g., Jacoby 2NT), pull it from the conventions library for any details the user's document doesn't specify
- Any explicit bid definition in the user's system replaces the corresponding tree entry

### Merge order
```
Base System → + Conventions → + User Overlay = Final Tree
```
Later layers override earlier layers for any conflicting entries.

---

## Engine Flow (Pseudocode)

```
function lookupBids(handFeatures, auctionFacts, finalTree):
    candidates = []
    for entry in finalTree:
        if matchesAuctionPattern(entry.auctionPattern, auctionFacts.auction)
           and matchesRequirements(entry.requires, handFeatures, auctionFacts):
            candidates.push(entry)
    return candidates
```

The engine is a pure matching function. All intelligence lives in the tree data and in the upstream programs that compute the inputs.

---

## Next Steps

1. **Create sample base systems** — Start with SAYC, populate Level 1 (openings) through Level 4 (responder's rebid)
2. **Create conventions library** — Each convention as a standalone JSON module
3. **Use these samples to validate and refine the schema** — let the data shape the model
4. **Build the engine** — feature matcher
5. **Build the merge logic** — base + conventions + user overlay
6. **Integrate with bsd-app** — wire into the search UI

---

## Open Questions (to resolve during data creation)

- **Auction pattern wildcards**: How flexible do patterns need to be? (e.g., "partner opened any suit at 1-level" vs. explicit patterns for 1C, 1D, 1H, 1S)
- **Competitive auction handling**: Build uncontested first, add competitive branches as a second pass?
- **Vulnerability-dependent bids**: How many entries vary by vulnerability? (Mainly preempts and overcalls?)
- **Ranking**: Future feature — how to rank candidates once we have them all. Not in scope for initial build.
