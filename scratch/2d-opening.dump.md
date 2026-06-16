# Dump — Strong 2d Slice (test)

One row per node. 52 rows.

| # | Page | Path (auction) | Bid | Shape | HCP | Forcing | Convention | Flags | Meaning |
|---|------|----------------|-----|-------|-----|---------|------------|-------|---------|
| 1 | Strong 2♦ opening | 2♦ > 2♥ | 2♥ | 2♠ |  | nf | transfer | has-continuations | xfer to ♠, nf; over opener's 2♠, responder bids as |
| 2 | Strong 2♦ opening | 2♦ > 2♥ > 2n | 2n | 6♠,3♠ \| 6322 |  | inv | cog |  | 6322 hand with 6 ♠, inv, 3♠ rejects gt, 3n is COG |
| 3 | Strong 2♦ opening | 2♦ > 2♥ > 3m | 3m | 5♠,4m |  |  |  |  | 5 ♠, 4+m |
| 4 | Strong 2♦ opening | 2♦ > 2♥ > 3♥ | 3♥ | 5M \| 55M |  | inv |  |  | 55M, inv |
| 5 | Strong 2♦ opening | 2♦ > 2♥ > 3♠ | 3♠ | 5332 |  |  |  |  | 5332 hand |
| 6 | Strong 2♦ opening | 2♦ > 2♥ > 3n | 3n | 6♠,4♥ |  | f |  |  | 6♠, 4♥, forcing |
| 7 | Strong 2♦ opening | 2♦ > 2♥ > 4x/4♠ | 4x/4♠ | 6♠ |  |  |  | short | 6+ ♠ st; short x/bal st, need source of tricks |
| 8 | Strong 2♦ opening | 2♦ > 2♠ | 2♠ |  |  |  | puppet | has-continuations | puppet to 2n, over opener's 2n, responder bids as |
| 9 | Strong 2♦ opening | 2♦ > 2♠ > 3♣ | 3♣ |  |  |  | stayman |  | stayman, same as over 2n opening |
| 10 | Strong 2♦ opening | 2♦ > 2♠ > 3♦ | 3♦ | 3♥,3♥ |  | gf | transfer | ref:page-xfer-to-3♥-when-gf | xfer to ♥; since gf is established [xfer to 3♥, when gf\|popup\|page-xfer-to-3♥-when-gf] applies |
| 11 | Strong 2♦ opening | 2♦ > 2♠ > 3♥/♠ | 3♥/♠ | 5♣,4♦,5♦,4♣ |  |  |  |  | 5♣4♦/5♦4♣, 22 |
| 12 | Strong 2♦ opening | 2♦ > 2♠ > 3n | 3n |  |  |  |  | signoff | to play |
| 13 | Strong 2♦ opening | 2♦ > 2♠ > 4♣/♦ | 4♣/♦ | 6♦,4♣,6♣,4♦ |  |  |  | slam | 6♦4♣/6♣4♦, slam try |
| 14 | Strong 2♦ opening | 2♦ > 2♠ > 4M | 4M | 5m,5m |  |  | keycard | slam | 55 minors, game+/ 55 minors slam force, 4n over the latter is dkc |
| 15 | Strong 2♦ opening | 2♦ > 2n | 2n | 3♣,6♣,4♦ |  | nf | puppet | short | puppet to 3♣, nf, on which 3x = short; 3n = 6♣, 4♦ (nt doubt; conc val in m) |
| 16 | Strong 2♦ opening | 2♦ > 3♣ | 3♣ | 5♦,3♣,3♦,3♦,3♣ |  | gf |  | short | 5+♦, gf. ...3♣3♦ = 3 card ♦. Over 3♦, 3x = short; 3n = short ♣. ...3♣3n = no fit |
| 17 | Strong 2♦ opening | 2♦ > 3♦ | 3♦ | 3♥ |  | nf | transfer | has-continuations | xfer to ♥, nf, over opener's 3♥ responder bids as |
| 18 | Strong 2♦ opening | 2♦ > 3♦ > 3♠/4m | 3♠/4m |  |  |  |  | stiff-void-sing | Sing s/m |
| 19 | Strong 2♦ opening | 2♦ > 3♦ > 3n | 3n | 6♥,4♠ |  | f |  |  | 6♥4♠, forcing |
| 20 | Strong 2♦ opening | 2♦ > 3♦ > 4♥ | 4♥ | 6♥ |  |  |  | slam | 6♥, mild slam try, need source of tricks |
| 21 | Strong 2♦ opening | 2♦ > 3M | 3M | 4m,4m,5o |  |  |  | short | short M, 3 card OM; 4m over opener's 3n = 4m, 5 om |
| 22 | Strong 2♦ opening | 2♦ > 3n | 3n |  |  |  |  | slam | both Majors; game or slam force |
| 23 | Strong 2♦ opening | 2♦ > 4♣/♦ | 4♣/♦ | 6♥ |  |  |  | slam | 6+♥/♠, game or sure slam |
| 24 | Strong 2♦ opening | 2♦ > 4♥/♠ | 4♥/♠ |  |  |  | quanti |  | ♣/♦ quanti |
| 25 | Strong 2♦ opening | 2♦ >  | (header) | 2♦ |  |  |  |  | Interference over our strong 2♦ opening |
| 26 | Strong 2♦ opening | 2♦ > 2♦(x) | 2♦(x) |  |  |  |  | shows | showing ♦ |
| 27 | Strong 2♦ opening | 2♦ > 2♦(x) > pass | pass | 4♦ |  |  |  |  | weak, 4+♦ ( no interest in game even opp 18/19) |
| 28 | Strong 2♦ opening | 2♦ > 2♦(x) > Xx/2♥ | Xx/2♥ |  |  | gf | transfer | signoff,promises | Xfer to ♥/♠ for drop/gf; if gf promises stop |
| 29 | Strong 2♦ opening | 2♦ > 2♦(x) > 2♠ | 2♠ | 2♦,2♠,3♣ |  |  | transfer |  | xfer to 2n; (may not have stop if seeking M fit); 2♦(x)2♠2n3♣= stopper stay |
| 30 | Strong 2♦ opening | 2♦ > 2♦(x) > 2n | 2n |  |  |  |  | systems-on | ♣, systems on |
| 31 | Strong 2♦ opening | 2♦ > 2♦(x) > 3♣ | 3♣ | 3♦,3M,4♦ |  |  |  | asks | stay no stop; one/both M; 3♦ asks: 3M = OM, 4♦ = both M |
| 32 | Strong 2♦ opening | 2♦ > 2♦(x) > 3♦ | 3♦ |  |  | gf |  |  | No logical bid available, but gf |
| 33 | Strong 2♦ opening | 2♦ > 2♦(x) > 3M | 3M | 5O |  | gf |  |  | 5OM, no stop, gf |
| 34 | Strong 2♦ opening | 2♦ > 2♦(x) > 4m | 4m |  |  |  |  | systems-on | Systems on |
| 35 | Strong 2♦ opening | 2♦ > 2♦(2M) | 2♦(2M) |  |  | gf | rubensohl | ref:page-Rubensohl | x = t/o, wk or gf; rest [Rubensohl\|popup\|page-Rubensohl]; |
| 36 | Strong 2♦ opening | 2♦ > 2♦(3x) | 2♦(3x) |  |  |  |  | nat | x =val, rest nat |
| 37 | Rubensohl |  | (header) |  |  |  |  |  | Responses (pivot suit = M) |
| 38 | Rubensohl | x | x | 2M |  | inv |  |  | inv values+, 1n(2M)x = 4 cards in OM, inv |
| 39 | Rubensohl | 2♠ | 2♠ |  |  | nf |  | nat | nat, nf |
| 40 | Rubensohl | 2n | 2n | 3♣ |  | nf | puppet,cue |  | puppet to 3♣; opener can bypass - any bid other than cue (3y) = nf. Over 3♣ |
| 41 | Rubensohl | 2n > 3x (x<M) | 3x (x<M) |  |  |  |  | signoff | drop |
| 42 | Rubensohl | 2n > 3M | 3M |  |  |  | stayman |  | stayman with stop in x |
| 43 | Rubensohl | 2n > 3♠ (their suit = ♥) | 3♠ (their suit = ♥) | 5♠,2♠ |  | gf |  | signoff | 5+♠, gf ( 2♠ available for drop) |
| 44 | Rubensohl | 2n > 3n | 3n |  |  |  |  | signoff | to play, have stop |
| 45 | Rubensohl | 3♣ | 3♣ | 5♦ |  | gf | transfer |  | xfer to ♦, inv; 5+♦ (gf if over 1n opening by partner) |
| 46 | Rubensohl | 3♦ | 3♦ |  |  | inv | transfer |  | xfer to OM, inv+ |
| 47 | Rubensohl | 3M | 3M |  |  | gf | stayman |  | stayman, gf, no stop |
| 48 | Rubensohl | 3OM | 3OM |  |  | gf |  |  | ♣, inv+ (mostly gf) |
| 49 | Rubensohl | 3n | 3n |  |  |  |  |  | no stop, but have values for game, no 4 card M/ OM also |
| 50 | xfer to 3♥, when gf |  | (header) | 3♦,3♥,3♦ |  | gf | transfer |  | 3♦ = xfer to 3♥. acceptance is not forced since gf is established. Over 3♦ |
| 51 | xfer to 3♥, when gf | 3♥ | 3♥ | 3♠,5M,4m,4♥ \| 55M,5332 |  |  |  | nat,slam | 2 card ♥, over which 3♠ = 55M slammish; 3n = 5332; 4m = nat; 4♥ = mild slam try, need source of tricks |
| 52 | xfer to 3♥, when gf | 3n | 3n | 4m,4♠ |  |  | transfer,cue,nsst |  | 3 card ♥; over this 4m = xfer to ♥, with bs cue; 4♠ = nsst |
