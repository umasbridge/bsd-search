import fs from 'node:fs';
import { parseSystemMd } from '/Users/umajalapathy/bsd-lib/lib/parseSystemMd.js';

const SRC = '/Users/umajalapathy/bsd-search/scratch/2d-opening.md';
const OUT = '/Users/umajalapathy/bsd-search/scratch/2d-opening.dump.txt';
const OUT_MD = '/Users/umajalapathy/bsd-search/scratch/2d-opening.dump.md';

const md = fs.readFileSync(SRC, 'utf8');
const { systemName, pages } = parseSystemMd(md);

function tagFragment(part) {
  const tags = [];
  const low = part.toLowerCase();

  // --- Forcing level ---
  if (/\bnf\b/.test(low)) tags.push('forcing:nf');
  if (/\bf1\b/.test(low)) tags.push('forcing:f1');
  if (/\bgf\b/.test(low) || /game\s+force|game\s+forcing/.test(low)) tags.push('forcing:gf');
  if (/\binv\b/.test(low) || /invite|invitat/.test(low)) tags.push('inv');
  if (/forcing/.test(low) && !/non\s*forcing/.test(low) && !/not\s+forcing/.test(low)) tags.push('forcing:f');

  // --- Artificial conventions ---
  if (/\bxfer\b|\btransfer/.test(low)) tags.push('art:transfer');
  if (/\bpuppet\b/.test(low)) tags.push('art:puppet');
  if (/stayman/.test(low)) tags.push('art:stayman');
  if (/\brelay\b/.test(low)) tags.push('art:relay');
  if (/\bcue\b/.test(low)) tags.push('art:cue');
  if (/\bcog\b/.test(low)) tags.push('art:cog');
  if (/rkc|ekc|dkc|3kc|kickback/.test(low)) tags.push('art:keycard');
  if (/\bsplinter\b|\bspl\b/.test(low)) tags.push('art:splinter');
  if (/\bnsst\b/.test(low)) tags.push('art:nsst');
  if (/\bquanti\b/.test(low)) tags.push('art:quanti');
  if (/\bbaron\b/.test(low)) tags.push('art:baron');
  if (/\blebensohl\b/.test(low)) tags.push('art:lebensohl');
  if (/\brubensohl\b/.test(low)) tags.push('art:rubensohl');
  if (/\bsmolen\b/.test(low)) tags.push('art:smolen');
  if (/\bsystems\s+on\b/.test(low)) tags.push('systems-on');

  // --- Asks / shows / denies / promised ---
  if (/\basks?\b/.test(low)) tags.push('asks');
  if (/\bshows?\b|showing/.test(low)) tags.push('shows');
  if (/\bdenies|denied|denying/.test(low)) tags.push('denies');
  if (/promises|promised|promising/.test(low)) tags.push('promises');

  // --- Shape fragments (e.g. 5+♦, 6 ♠, 4+m) ---
  const shapeRe = /(\d)\+?\s*([♠♥♦♣MmSsOom])/g;
  const shapes = [];
  let mMatch;
  while ((mMatch = shapeRe.exec(part)) !== null) shapes.push(`${mMatch[1]}${mMatch[2]}`);
  if (shapes.length) tags.push('shape:' + shapes.join(','));

  // --- Shape patterns (6322, 5332, 4432, 4333, 55M, 66M, etc.) ---
  const patMatch = part.match(/\b([2-8]{4})\b/);
  if (patMatch) tags.push('shape-pattern:' + patMatch[1]);
  if (/\b55M\b/.test(part) || /\b55m\b/.test(part) || /\b66M\b/i.test(part)) {
    const p = part.match(/\b(55M|55m|66M|44M|44m)\b/i);
    if (p) tags.push('shape-pattern:' + p[1]);
  }

  // --- Strength / HCP ---
  const hcpMatch = part.match(/\b(\d{1,2})\s*-\s*(\d{1,2})\b/);
  if (hcpMatch && parseInt(hcpMatch[1]) < 40 && parseInt(hcpMatch[2]) < 40) {
    tags.push(`hcp:${hcpMatch[1]}-${hcpMatch[2]}`);
  }
  if (/\bhcp\b/.test(low)) tags.push('hcp-mentioned');

  // --- Signoff / to play ---
  if (/\bto\s+play\b|signoff|sign\s*off|drop\b/.test(low)) tags.push('signoff');

  // --- Shortness / stiffness ---
  if (/\bshort(ness)?\b/.test(low)) tags.push('short');
  if (/\bstiff\b|\bvoid\b|\bsing(le)?\b/.test(low)) tags.push('stiff-void-sing');

  // --- Slam-try-ish ---
  if (/\bslam\b/.test(low)) tags.push('slam');
  if (/\bcontrol/.test(low)) tags.push('control');

  // --- Cross reference to another page ---
  const refs = [];
  const refRe = /\[([^\]]+?)\|(popup|split)\|(page-[^\]]+)\]/g;
  let rMatch;
  while ((rMatch = refRe.exec(part)) !== null) refs.push(rMatch[3]);
  if (refs.length) tags.push('ref:' + refs.join(','));

  // --- Nat hint (explicit) ---
  if (/\bnat\b/.test(low)) tags.push('nat');
  if (/\bart\b/.test(low)) tags.push('art');

  // --- Continuation hint (has more bids following) ---
  if (/over\b.*?(?:bids|responds|asks)|responder\s+bids\s+as|following\s+bids/i.test(part)) {
    tags.push('has-continuations');
  }

  return tags;
}

function fragmentMeaning(text) {
  // Split on `;` first; then commas are finer-grained. For the dump we use `;`.
  const parts = text.split(/\s*;\s*/).map(s => s.trim()).filter(Boolean);
  return parts.map(p => ({ raw: p, tags: tagFragment(p) }));
}

const lines = [];
lines.push(`System: ${systemName || '(unnamed)'}`);
lines.push('='.repeat(70));
lines.push('');
lines.push('Legend:');
lines.push('  path:  nested auction from page context down to this row');
lines.push('  bid:   this row\'s bid literal');
lines.push('  frag:  one fragment of the meaning text with tentative tags');
lines.push('  tags:  [art:*] artificial convention | [forcing:*] forcing level | [shape:*] suit-length | [shape-pattern:*] HCP distribution | [hcp:*] strength | [shows|denies|asks|promises] | [signoff] | [ref:*] page cross-ref | [has-continuations] text implies more bids follow');
lines.push('');

function walkRow(row, path, depth) {
  const newPath = [...path, row.bid];
  const indent = '  '.repeat(depth);
  lines.push('');
  lines.push(`${indent}path:    ${newPath.join(' > ')}`);
  lines.push(`${indent}bid:     ${row.bid}`);
  lines.push(`${indent}meaning: ${row.meaning}`);
  const frags = fragmentMeaning(row.meaning);
  lines.push(`${indent}fragments:`);
  for (const f of frags) {
    const tagStr = f.tags.length ? `[${f.tags.join(', ')}]` : '[no-tags]';
    lines.push(`${indent}  - ${tagStr}`);
    lines.push(`${indent}      "${f.raw}"`);
  }
  for (const child of row.children || []) {
    walkRow(child, newPath, depth + 1);
  }
}

for (const page of pages) {
  lines.push('');
  lines.push('='.repeat(70));
  lines.push(`PAGE: ${page.name}`);
  lines.push('='.repeat(70));

  // Seed path: for "Strong 2♦ opening", implicit opener bid is 2♦
  let openingPath = [];
  if (/strong\s+2♦\s+opening/i.test(page.name)) openingPath = ['2♦'];
  else if (/interference\s+over\s+strong\s+2♦/i.test(page.name)) openingPath = ['2♦'];
  // Rubensohl / xfer-to-3♥ are context-conditional; leave path empty

  for (const el of page.elements || []) {
    if (el.type === 'table') {
      lines.push('');
      lines.push(`--- Table: ${el.name || '(unnamed)'} ---`);
      for (const row of el.rows) walkRow(row, openingPath, 0);
    } else if (el.type === 'note') {
      lines.push('');
      lines.push(`[note]`);
      lines.push(el.content.split('\n').map(l => '  ' + l).join('\n'));
    }
  }
}

fs.writeFileSync(OUT, lines.join('\n') + '\n');
console.log('Wrote', OUT, `(${lines.length} lines)`);

// ---- Markdown table view: one node per row ----

function pickTag(tags, prefix) {
  const hits = tags.filter(t => t.startsWith(prefix)).map(t => t.slice(prefix.length));
  return hits.join(',');
}
function pickAny(tags, names) {
  return tags.filter(t => names.includes(t)).join(',');
}
function mdEscape(s) {
  return String(s || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

const tableRows = [];

function rowToTableRow(row, pagePath, pageName) {
  const mergedTags = new Set();
  const frags = fragmentMeaning(row.meaning);
  for (const f of frags) for (const t of f.tags) mergedTags.add(t);
  const tagArr = [...mergedTags];

  const forcing = pickTag(tagArr, 'forcing:') || (tagArr.includes('inv') ? 'inv' : '');
  const shape = [pickTag(tagArr, 'shape:'), pickTag(tagArr, 'shape-pattern:')].filter(Boolean).join(' | ');
  const convention = pickTag(tagArr, 'art:');
  const hcp = pickTag(tagArr, 'hcp:');
  const ref = pickTag(tagArr, 'ref:');
  const flags = pickAny(tagArr, [
    'shows', 'denies', 'asks', 'promises',
    'signoff', 'systems-on', 'short', 'stiff-void-sing',
    'slam', 'control', 'nat', 'art',
    'has-continuations', 'hcp-mentioned',
  ]);

  tableRows.push({
    page: pageName,
    path: pagePath.join(' > '),
    bid: row.bid || '(header)',
    shape,
    hcp,
    forcing,
    convention,
    flags: [flags, ref ? 'ref:' + ref : ''].filter(Boolean).join(' | '),
    meaning: row.meaning,
  });
}

function walkForTable(row, pagePath, pageName) {
  const newPath = [...pagePath, row.bid];
  rowToTableRow(row, newPath, pageName);
  for (const child of row.children || []) walkForTable(child, newPath, pageName);
}

for (const page of pages) {
  let seed = [];
  if (/strong\s+2♦\s+opening/i.test(page.name)) seed = ['2♦'];
  else if (/interference\s+over\s+strong\s+2♦/i.test(page.name)) seed = ['2♦'];
  for (const el of page.elements || []) {
    if (el.type === 'table') {
      for (const row of el.rows) walkForTable(row, seed, page.name);
    }
  }
}

const mdLines = [];
mdLines.push(`# Dump — ${systemName || '(unnamed)'}`);
mdLines.push('');
mdLines.push(`One row per node. ${tableRows.length} rows.`);
mdLines.push('');
mdLines.push('| # | Page | Path (auction) | Bid | Shape | HCP | Forcing | Convention | Flags | Meaning |');
mdLines.push('|---|------|----------------|-----|-------|-----|---------|------------|-------|---------|');
tableRows.forEach((r, i) => {
  mdLines.push(`| ${i + 1} | ${mdEscape(r.page)} | ${mdEscape(r.path)} | ${mdEscape(r.bid)} | ${mdEscape(r.shape)} | ${mdEscape(r.hcp)} | ${mdEscape(r.forcing)} | ${mdEscape(r.convention)} | ${mdEscape(r.flags)} | ${mdEscape(r.meaning)} |`);
});

fs.writeFileSync(OUT_MD, mdLines.join('\n') + '\n');
console.log('Wrote', OUT_MD, `(${tableRows.length} node rows)`);
