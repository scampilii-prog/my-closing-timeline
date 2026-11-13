#!/usr/bin/env node
'use strict';
// Read-only static checks for the isolated Clean Build PRO source.
// Run: node clean-project/tests/pro-v5-source-audit.cjs
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'real-estate-pro-v5.html');
const html = fs.readFileSync(file, 'utf8');
const errors = [], warnings = [];
const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) errors.push('Duplicate HTML id: ' + id);
  seen.add(id);
}
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)]
  .map(m => m[1].split('?')[0]).filter(s => !/^https?:\/\//.test(s));
for (const src of scripts) {
  const absolute = path.resolve(root, src);
  if (!absolute.startsWith(root + path.sep) || !fs.existsSync(absolute))
    errors.push('Missing or invalid local script: ' + src);
}
for (const heading of ['Contract Tasks', 'Follow-Up Tasks', 'Closing Timeline Summary'])
  if (!html.includes(heading)) errors.push('Missing expected heading: ' + heading);
const styleBlocks = (html.match(/<style\b/gi) || []).length;
const importants = (html.match(/!important/gi) || []).length;
if (styleBlocks > 10) warnings.push(styleBlocks + ' inline style blocks; review cascade');
if (importants > 100) warnings.push(importants + ' !important declarations; review cascade');
if (scripts.length > 3) warnings.push(scripts.length + ' local script dependencies; check event ownership');
console.log(JSON.stringify({file: 'clean-project/real-estate-pro-v5.html',
  htmlIds: ids.length, localScripts: scripts, styleBlocks, importants,
  errors, warnings}, null, 2));
if (errors.length) process.exitCode = 1;
// These are structural checks, not proof that UI behavior or deployment works.
