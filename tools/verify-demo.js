#!/usr/bin/env node
/**
 * Confere os dados autorados para a demo de combate do J-ABS.
 * Uso: node tools/verify-demo.js
 */
const fs = require('fs');
const path = require('path');

const D = path.join(__dirname, '..', 'game', 'data') + path.sep;

const skills = JSON.parse(fs.readFileSync(D + 'Skills.json', 'utf8'));
const skill = skills.find((x) => x && x.id === 235);
console.log('Skill235:', skill && skill.name, '| note=', JSON.stringify(skill && skill.note), '| occasion=', skill && skill.occasion);

const weapons = JSON.parse(fs.readFileSync(D + 'Weapons.json', 'utf8'));
console.log('Weapon1 note:', JSON.stringify(weapons[1].note));

const actors = JSON.parse(fs.readFileSync(D + 'Actors.json', 'utf8'));
console.log('Actor1 equips:', JSON.stringify(actors[1].equips));

const m2 = JSON.parse(fs.readFileSync(D + 'Map002.json', 'utf8'));
console.log('\nMap002 events (count=' + m2.events.filter(Boolean).length + '):');
m2.events.forEach((e, i) => {
  if (!e) return;
  const comments = e.pages[0].list.filter((c) => c.code === 108).map((c) => c.parameters[0]);
  console.log('  idx' + i + ' id=' + e.id + ' @(' + e.x + ',' + e.y + ') "' + e.name + '" note/cmt=' + JSON.stringify(comments));
});

const m4 = JSON.parse(fs.readFileSync(D + 'Map004.json', 'utf8'));
console.log('\nMap004 events (count=' + m4.events.filter(Boolean).length + '):');
m4.events.forEach((e, i) => {
  if (!e) return;
  const page = e.pages[0];
  console.log('  idx' + i + ' id=' + e.id + ' @(' + e.x + ',' + e.y + ') "' + e.name + '" char=' + page.image.characterName + '#' + page.image.characterIndex + ' through=' + page.through);
});

console.log('\nMap002 data length=', m2.data.length, 'expected=', m2.width * m2.height * 6);
