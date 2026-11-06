#!/usr/bin/env node
/**
 * Validação geral do repositório Huwag.
 * Confere dados do MZ, plugins, mapas, links de documentação e resíduos.
 * Uso: node tools/validate.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const GAME = path.join(ROOT, 'game');
const DATA = path.join(GAME, 'data');

let errors = 0;
const ok = (msg) => console.log('  ok    ' + msg);
const fail = (msg) => {
  console.error('  ERRO  ' + msg);
  errors++;
};
const section = (title) => console.log('\n' + title);

// ---------------------------------------------------------------- dados
section('Dados (game/data)');
const jsonFiles = fs.readdirSync(DATA).filter((f) => f.endsWith('.json'));
const data = {};
for (const file of jsonFiles) {
  try {
    data[file] = JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf8'));
  } catch (error) {
    fail(`${file}: JSON inválido (${error.message})`);
  }
}
const parsed = Object.keys(data).length;
parsed === jsonFiles.length ? ok(`${parsed} arquivos JSON válidos`) : fail(`${jsonFiles.length - parsed} arquivo(s) inválido(s)`);

// ---------------------------------------------------------------- sistema
section('Sistema');
const system = data['System.json'];
if (!system) {
  fail('System.json ausente');
} else {
  const namedSwitches = system.switches.filter(Boolean).length;
  namedSwitches >= 19 ? ok(`${namedSwitches} switches nomeados`) : fail(`apenas ${namedSwitches} switches nomeados`);
  system.variables[1] === 'Ato' ? ok('variável "Ato" presente') : fail('variável "Ato" ausente');
  const advanced = system.advanced || {};
  advanced.screenWidth === 1920 && advanced.screenHeight === 1080
    ? ok('resolução 1920x1080')
    : fail(`resolução inesperada: ${advanced.screenWidth}x${advanced.screenHeight}`);
}

// ---------------------------------------------------------------- mapas
section('Mapas');
const mapFiles = Object.keys(data).filter((f) => /^Map\d+\.json$/.test(f));
for (const file of mapFiles) {
  const map = data[file];
  const lengthOk = map.data.length === map.width * map.height * 6;
  const eventsOk = map.events[0] === null && map.events.every((e, i) => e == null || e.id === i);
  const count = map.events.filter(Boolean).length;
  lengthOk && eventsOk
    ? ok(`${file} (${map.width}x${map.height}, ${count} eventos)`)
    : fail(`${file}: estrutura inconsistente (tiles ok=${lengthOk}, eventos ok=${eventsOk})`);
}

// ---------------------------------------------------------------- plugins
section('Plugins');
try {
  const ctx = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(GAME, 'js', 'plugins.js'), 'utf8'), ctx);
  const plugins = ctx.$plugins;
  if (!Array.isArray(plugins)) throw new Error('$plugins não é um array');

  const files = new Set(
    fs
      .readdirSync(path.join(GAME, 'js', 'plugins'))
      .filter((f) => f.endsWith('.js'))
      .map((f) => f.slice(0, -3))
  );

  const missing = plugins.filter((p) => !files.has(p.name)).map((p) => p.name);
  missing.length ? fail(`sem arquivo: ${missing.join(', ')}`) : ok(`${plugins.length} plugins registrados com arquivo`);

  const index = (name) => plugins.findIndex((p) => p.name === name);
  const order = [
    ['J-Base', 'J-ABS'],
    ['J-ABS', 'J-Extend'],
    ['J-Extend', 'J-Elementalistics'],
    ['J-ABS', 'J-HUD'],
    ['J-HUD', 'J-HUD-PartyFrame'],
    ['J-ABS', 'J-Pixelistics'],
  ];
  for (const [first, second] of order) {
    index(first) >= 0 && index(first) < index(second)
      ? ok(`${first} antes de ${second}`)
      : fail(`${first} deve vir antes de ${second}`);
  }

  const movement = plugins.find((p) => p.name === 'rmmz_movement');
  !movement || !movement.status ? ok('rmmz_movement desligado') : fail('rmmz_movement deve ficar desligado');

  const orphans = [...files].filter((f) => !plugins.some((p) => p.name === f));
  orphans.length ? fail(`arquivos não registrados: ${orphans.join(', ')}`) : ok('nenhum plugin órfão');
} catch (error) {
  fail(`plugins.js: ${error.message}`);
}

// ---------------------------------------------------------------- links
section('Documentação');
const markdownFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.tmp'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) markdownFiles.push(full);
  }
})(ROOT);

let broken = 0;
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\]\(([^)#]+?)(?:#[^)]*)?\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) {
      fail(`${path.relative(ROOT, file)} -> ${target}`);
      broken++;
    }
  }
}
broken === 0 ? ok(`${markdownFiles.length} arquivos Markdown sem links quebrados`) : null;

// ---------------------------------------------------------------- higiene
section('Higiene');
const leftovers = [];
(function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.tmp', 'save'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (/\.(bak|orig|tmp)$/.test(entry.name) || entry.name === 'Thumbs.db') leftovers.push(path.relative(ROOT, full));
  }
})(ROOT);
leftovers.length ? fail(`resíduos: ${leftovers.join(', ')}`) : ok('sem backups ou temporários versionáveis');

fs.existsSync(path.join(GAME, 'game.rmmzproject'))
  ? ok('game.rmmzproject presente')
  : fail('game.rmmzproject ausente');

// ---------------------------------------------------------------- resumo
console.log('');
if (errors) {
  console.error(`Falha: ${errors} problema(s) encontrado(s).`);
  process.exit(1);
}
console.log('Tudo certo: dados, plugins, mapas, links e higiene validados.');
