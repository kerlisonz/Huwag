#!/usr/bin/env node
/**
 * Verificações da integração J-ABS: ordem de plugins, arquivos e dependências.
 * Uso: node tools/verify-jabs.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const GAME = path.join(__dirname, '..', 'game');

function fail(message) {
  console.error('FALHA: ' + message);
  process.exit(1);
}

// 1) plugins.js
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(GAME, 'js', 'plugins.js'), 'utf8'), ctx);
const plugins = ctx.$plugins;
if (!Array.isArray(plugins)) fail('$plugins não é um array');

const order = plugins.map((p) => p.name);
console.log('Ordem em plugins.js:\n  ' + order.join('\n  '));

// 2) plugins obrigatórios presentes, ligados e com arquivo
const required = [
  'J-Base',
  'J-Base-Save',
  'J-ABS',
  'J-ABS-AllyAI',
  'J-ABS-InputManager',
  'J-Pixelistics',
  'J-Pixel-ABS',
  'J-ABS-Diagonals',
  'J-ABS-Hitstop',
  'J-ABS-Tools',
];
for (const name of required) {
  const entry = plugins.find((p) => p.name === name);
  if (!entry) fail('entrada ausente em plugins.js: ' + name);
  if (!entry.status) fail('plugin desligado: ' + name);
  if (!fs.existsSync(path.join(GAME, 'js', 'plugins', name + '.js'))) {
    fail('arquivo ausente: ' + name + '.js');
  }
}
console.log(`\n[OK] ${required.length} plugins requeridos: presentes, ligados e com arquivo.`);

// 3) workaround antigo não deve voltar
if (order.includes('J-JABS-Compat')) fail('J-JABS-Compat ainda registrado (deve ser removido)');
if (fs.existsSync(path.join(GAME, 'js', 'plugins', 'J-JABS-Compat.js'))) {
  fail('arquivo J-JABS-Compat.js ainda existe');
}
console.log('[OK] workaround J-JABS-Compat removido (registro e arquivo).');

// 4) ordem de dependência
const idx = (name) => order.indexOf(name);
const before = (a, b) => {
  if (!(idx(a) < idx(b))) {
    fail(`ordem: ${a} deve vir antes de ${b} (idx ${idx(a)} vs ${idx(b)})`);
  }
};
before('J-Base', 'J-Base-Save');
before('J-Base-Save', 'J-ABS');
before('J-ABS', 'J-ABS-AllyAI');
before('J-ABS', 'J-ABS-InputManager');
before('J-ABS', 'J-Pixelistics');
before('J-Pixelistics', 'J-Pixel-ABS');
before('J-ABS-AllyAI', 'J-Pixel-ABS');
before('J-Pixel-ABS', 'J-ABS-Diagonals');
console.log('[OK] ordem de dependências respeitada (pixel stack depois de J-ABS/AllyAI, antes de Diagonals).');

// 5) rmmz_movement desligado (conflita com J-Pixelistics)
const movement = plugins.find((p) => p.name === 'rmmz_movement');
if (movement && movement.status) fail('rmmz_movement está LIGADO e conflita com J-Pixelistics');
console.log('[OK] rmmz_movement desligado (sem conflito de movimento).');

// 6) J-Pixelistics define os métodos que o J-ABS chama
const pixel = fs.readFileSync(path.join(GAME, 'js', 'plugins', 'J-Pixelistics.js'), 'utf8');
if (!/Game_CharacterBase\.prototype\.occupiedTileX\s*=/.test(pixel)) {
  fail('J-Pixelistics não define occupiedTileX');
}
if (!/Game_CharacterBase\.prototype\.occupiedTileY\s*=/.test(pixel)) {
  fail('J-Pixelistics não define occupiedTileY');
}
if (!/prototype\.getCollisionPivotX\s*=/.test(pixel)) {
  fail('J-Pixelistics não define getCollisionPivotX (base de occupiedTileX)');
}
console.log('[OK] J-Pixelistics define occupiedTileX/Y + getCollisionPivot*.');

// 7) configuração externa presente
const newFiles = ['J-ABS-AllyAI', 'J-Pixelistics', 'J-Pixel-ABS'];
for (const name of newFiles) {
  const file = path.join(GAME, 'js', 'plugins', name + '.js');
  const source = fs.readFileSync(file, 'utf8');
  const configs = source.match(/data\/(config\.[a-z0-9-]+\.json)/g);
  if (!configs) continue;
  for (const config of new Set(configs)) {
    if (!fs.existsSync(path.join(GAME, config))) fail(`'${name}.js' precisa de ${config}`);
  }
}
if (!fs.existsSync(path.join(GAME, 'data', 'config.jabs.json'))) fail('config.jabs.json ausente');
console.log('[OK] nenhuma configuração externa pendente além de config.jabs.json.');

console.log('\n=== TODAS AS VERIFICAÇÕES PASSARAM ===');
