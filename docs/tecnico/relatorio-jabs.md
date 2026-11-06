# Relatório — Ativar o J-ABS no Huwag (RPG Maker MZ)

> Documento didático que registra **o que foi feito**, **porquê**, e **como o J-ABS funciona por dentro**, para que qualquer pessoa consiga reproduzir/expandir o sistema de combate ativo (Active Battle System) de forma correta.

---

## 1. Objetivo

Partiu-se de um jogo RPG Maker MZ (Huwag) com os plugins **J-ABS** instalados mas não funcionais. Os pedidos, por ordem:

1. **Corrigir a visualização do "Remap Control"** (janelas do J-ABS-InputManager com texto cortado).
2. **Tornar o J-ABS funcional** — criar uma demo mínima jogável: player que bate, inimigo que bate, player com vida visível.

Princípios orientadores (regras do projeto):
- **Reproduzir o mecanismo de referência** (o projeto `ca` / `rmmz-plugins` do autor JE), em vez de adivinhar patches.
- O jogo **não pode ser uma cópia** do `ca`; mantém a sua própria identidade.
- **Validar com scripts Node** antes de reportar como concluído.

---

## 2. Resolução de ecrã e o "Remap Control"

### Sintoma
As janelas do menu **Remap Control** (e o próprio comando do menu) cortavam o texto.

### Causa raiz
A resolução do canvas do MZ **não** é definida pelo `window` do `package.json` (isso é apenas o tamanho da janela do NW.js). A alavanca real é:

```
data/System.json → advanced.screenWidth / screenHeight / uiAreaWidth / uiAreaHeight
```

O motor lê estes valores em `rmmz_scenes.js` → `Scene_Boot.prototype.resizeScreen` → `Graphics.resize`.

As janelas do `J-ABS-InputManager` são **frações de `Graphics.boxWidth`**:
- janela de ajuda = `boxWidth * 0.6`
- janela de ações = `boxWidth * 0.6 * 0.7`
- janela de prompt = `boxWidth * 0.6 * 0.3` ≈ **147px** com o canvas antigo de 816 → daí o corte.

### Correção
Elevar a resolução para **1920×1080** (igual ao `ca`):
- `System.json`: `advanced.screenWidth/Height/uiAreaWidth/Height` → `1920`/`1080`.
- `package.json`: `window.width/height` → `1920`/`1080` (para a janela do SO bater certo).

Com 1920 de largura, as frações deixam de apertar o texto e o clipping desaparece.

> **Lição:** em MZ, qualquer problema de dimensão/clipping de UI começa em `System.json → advanced`, não no `package.json`.

---

## 3. Como o J-ABS funciona (a cadeia de combate)

O J-ABS executa combate **no mapa** (sem cena de batalha). A cadeia essencial:

```
Arma equipada  ──<skillId:X>──►  Skill X  ──<actionId:N>──►  Evento N no "Action Map"
                                                                   (visual do golpe)

Evento no mapa real  ──<in comment code 108>──►  <enemyId:E>  ──►  base de dados Enemies.json
                                                                    (HP, battler, IA)
```

### 3.1 Ataque principal (Mainhand)
- A **arma** define `<skillId:X>` no seu `note`. Esse skill é o "ataque básico".
- Pressionar a tecla **Mainhand** (por omissão = tecla de confirmar, **Z / Enter / Espaço**) chama `performMainhandAction`.
- O skill do mainhand é colocado no **slot Mainhand** do `JABS_SkillSlotManager` (`updateMainhandSkill` lê `weapon.jabsSkillId`).

### 3.2 Skill → visual (Action Map)
- O skill tem `<actionId:N>`; `N` é o **id do evento** no *action map* (parâmetro `actionMapId` do J-ABS = **4** → `Map004`).
- O evento N do action map tem uma imagem de sheet (ex.: `!Weapon`) que é "ancorada" ao conjurador para desenhar o golpe.
- `actionId` por omissão = **1** (golpe corpo-a-corpo no conjurador).
- Notetags de combate do skill: `<cooldown> <radius> <degrees> <hitbox:arc|line|circle> <proximity> <knockback> <castTime>`.

### 3.3 Inimigo no mapa
- Um **evento** num mapa real, com um **comando de comentário** (`code 108`, continuação `408`) cujo texto é `<enemyId:E>`.
- O `Enemies.json[E]` fornece HP, battler e IA (`<sight> <pursuit> <prepare>`).

### 3.4 Portões de execução (`getAttackData`)
Antes de um ataque sair, o J-ABS verifica (`J-ABS.js` ~13008):
1. `skillId` resolve (senão devolve `[]`).
2. `meetsSkillConditions` — `occasion` deve permitir uso no mapa (0), custo, selos.
3. `battlerHasPermissionForSlot` → **`actor.hasSkill(skillId)`** — **o ator tem de *aprender* o skill** (ver §6).

---

## 4. Demo mínima jogável — dados autorados

Feito por script idempotente (`.tmp/author-demo.js`), com backups em `.tmp/jabs-demo-backup/`:

| Ficheiro | Alteração |
|---|---|
| `Skills.json` | Novo **skill 235 "Basic Slash"** (`occasion:0`, note: `<actionId:1> <cooldown:30> <radius:1.5> <degrees:120> <hitbox:arc> <proximity:1> <knockback:1>`) |
| `Weapons.json` | **Arma 1 (Short Sword)** → `note = <skillId:235>` |
| `Actors.json` | **Ator 1** → `equips = [1,0,0,0,0]` |
| `Map004.json` (action map) | **Evento 1** `ACT_Melee` @(4,4), sheet `!Weapon` (visual do golpe) |
| `Map002.json` (Cidade) | **Evento 10** `EV_Goblin` @(12,10), `$BigMonster1`, comentário `<enemyId:1>` |

Notas de authoring de dados MZ:
- O **id de skill 0** é sentinela (`if(!skillId) return []`) → não pode ser skillId de arma; usámos 235.
- Formato dos data-files: arrays de objetos = **um `JSON.stringify` por linha**; mapas = objeto compacto mas o array `events` expandido um por linha.
- Os dados de mapa são **LAYER-MAJOR**: `data[layer*W*H + y*W + x]`, com `length = width*height*6`.
- O array `events` tem de estar alinhado ao id: `events[0] = null` (placeholder); para acrescentar sem sobrescrever o evento 1 usa-se `[null, ...events.filter(Boolean)]`.
- **UTF-8 sem BOM**.

---

## 5. Crash 1 — `applyOnCastSelfStates is not a function`

### Sintoma
Ao aproximar do Goblin, crash: `TypeError: gameAction.applyOnCastSelfStates is not a function` (ecrã desfocado + overlay de erro).

### Causa raiz
O **J-ABS v4.26.2** chama, de forma **incondicional**, métodos definidos noutros plugins J:
- `handleOnCastStateEffects` (J-ABS.js ~17022) chama `applyOnCastSelfStates`, `applyOnCastLoseStates`, `applyToggleOnExecuteStates`, `applyOnCastExecuteSkills`, … → **todos definidos no `J-Extend`**.
- Ao morrer um alvo (J-ABS.js ~17647, dentro de `if(targetBattler.isDead())`) chama `getApplicableElements` → **definido no `J-Elementalistics`**.

Estes são **dependências duras (ocultas)** do core J-ABS, não addons opcionais. Dispara quando *qualquer* batalhador executa uma ação — por isso rebentava quando o Goblin (IA) atacava.

### Correção
Instalar **`J-Extend` v1.9.0** e **`J-Elementalistics` v1.5.0** a partir do clone `rmmz-plugins` (pastas `extend/` e `elem/`), registados **logo a seguir ao J-ABS** — obrigatório porque o `J-Extend` aliasa `JABS_SkillSlotManager.prototype.filterActionSkills` (uma classe do J-ABS), logo tem de carregar depois dele.

Ambos têm **0 parâmetros de plugin** (`parameters:{}`) e exigem J-Base ≥3.2.0/4.0.0 (temos 4.2.1).

---

## 6. Crash 2 — "o player não ataca"

### Causa raiz
`getAttackData` exige `actor.hasSkill(235)`. Mas `hasSkill` só consulta os **skills aprendidos** (`Game_Actor.skills()` = `learnings` da classe + `addedSkills`). **Nem o J-ABS nem o J-Extend injetam o skill da arma nessa lista.** A classe Swordsman só aprendia 172–178 (a partir do nível 2), nunca o 235 → `getAttackData` devolvia `[]`.

### Correção (dados, sem código)
Adicionar `{level:1, skillId:235}` às `learnings` da classe **Swordsman** (`Classes.json`). O `Game_Actor.initSkills` aprende-o ao nível 1.

> **Regra de ouro:** o skill referenciado por `<skillId>` da arma **tem de ser aprendido** pelo ator (via `learnings` da classe, ou `learnSkill` em runtime).

---

## 7. "O player não tem vida" — barra de HP

### Causa
O J-ABS core desenha **apenas barras de HP de inimigos** (`defaultEnemyShowHpBar`). A barra do **player/party** é fornecida pelo **`J-HUD`**.

### Correção
Instalar **`J-HUD` v2.4.0** + **`J-HUD-PartyFrame` v1.4.0** (a forma como o `ca` mostra o HP da party). `@base J-ABS`, 0 parâmetros, só referenciam namespaces instalados.

---

## 8. Estado final do `plugins.js` (ordem de load)

Todos **ON**, exceto `rmmz_movement` que **tem de ficar OFF** (conflita com `J-Pixelistics`):

```
1  J-Base              v4.2.1
2  J-Base-Save         v1.0.3
3  J-ABS               v4.26.2   (actionMapId=4, enemyMapId=5)
4  J-Extend            v1.9.0    ← dependência dura do J-ABS
5  J-Elementalistics   v1.5.0    ← dependência dura do J-ABS
6  J-HUD               v2.4.0    ← HP do player
7  J-HUD-PartyFrame    v1.4.0
8  J-ABS-AllyAI        v3.2.0
9  J-ABS-InputManager
10 J-Pixelistics       v1.5.0
11 J-Pixel-ABS         v1.2.0
12 J-ABS-Diagonals
13 J-ABS-Hitstop
14 J-ABS-Tools
```

Regras de ordem:
- `J-Base` → `J-Base-Save` → `J-ABS` (o J-ABS precisa dos codecs de save registados antes).
- `J-Extend` **depois** de `J-ABS` (aliasa uma classe do J-ABS).
- `J-HUD` depois de `J-ABS`; `J-HUD-PartyFrame` depois de `J-HUD`.

---

## 9. Checklist — como implementar corretamente (receita)

Para pôr um ataque corpo-a-corpo funcional:

1. **Skill de ataque** em `Skills.json`: `occasion:0`, note com `<actionId:1>` e os parâmetros de hitbox/cooldown. **Id ≠ 0.**
2. **Arma** com `note = <skillId:<id do skill>>`.
3. **Ator** com a arma equipada (`equips[0] = <id arma>`).
4. **Aprender o skill**: adicionar `<skillId>` às `learnings` da classe ao nível inicial do ator. ⚠️ Sem isto, o player não ataca.
5. **Action map** (`actionMapId`): criar o **evento com id = `actionId`**, com imagem de sheet (ex.: `!Weapon`). O `characterName` **não leva extensão** (o motor acrescenta `.png`). ⚠️ `$BigMonster1.png` → erro "Failed to load ...png.png".
6. **Inimigo**: evento num mapa real com comentário `code 108` → `<enemyId:E>`; `Enemies.json[E]` com HP/battler e IA.
7. **Dependências duras** instaladas: `J-Extend` + `J-Elementalistics` (senão crash ao executar ação/morte).
8. **HP do player visível**: `J-HUD` + `J-HUD-PartyFrame`.
9. **Resolução** adequada em `System.json → advanced` para o UI não cortar.
10. **Testar com New Game** (skills aprendem-se no setup; saves antigos não refletem `learnings` novas).

---

## 10. Armadilhas (resumo)

| Armadilha | Solução |
|---|---|
| Resolução definida no `package.json` | Usar `System.json → advanced.screenWidth/Height` |
| `characterName` com `.png` | Omitir a extensão (motor acrescenta `.png`) |
| `applyOnCastSelfStates is not a function` | Instalar `J-Extend` (+ `J-Elementalistics`) |
| Player não ataca | Ator tem de **aprender** o skill da arma (`learnings`) |
| Sem barra de HP do player | Instalar `J-HUD` + `J-HUD-PartyFrame` |
| `events[0]` sobrescrito | Manter `events[0]=null` e alinhar índice↔id |
| Indexação de tiles toda-zero | Layout **LAYER-MAJOR** `data[layer*W*H + y*W + x]` |
| PowerShell come `$`/regex em `node -e` | Usar scripts `.js` em `.tmp/` |
| BOM em UTF-8 | Escrever UTF-8 **sem BOM** |

---

## 11. Scripts de validação (em `.tmp/`)

> `.tmp/` é a área de trabalho local do desenvolvedor e **não é versionada**. Os scripts abaixo
> existem na máquina que montou o J-ABS; para torná-los permanentes, promova-os para o repositório.

- `author-demo.js` — autoriza a demo (skill/arma/ator/mapas), idempotente, com backups.
- `author-player-attack.js` — adiciona o `learning` do skill 235 à classe.
- `verify-demo.js` — confirma conteúdo dos mapas/dados.
- `verify-plugins.js` — parse do `plugins.js`, ordem de load, ficheiros existentes.
- `check-extend-methods.js` / `check-hud-deps.js` — auditam dependências de métodos/namespaces.

---

## 12. Estado atual

✅ Resolução 1920×1080 (Remap Control sem clipping)
✅ Demo de combate mínima e funcional: **inimigo identifica e bate**, **player bate**, **player tem HP visível**
✅ Dependências duras do J-ABS instaladas e registadas na ordem correta
✅ Validado estaticamente (JSON + plugins.js) e confirmado em runtime pelo utilizador

### Próximos passos possíveis (não feitos — fora do âmbito pedido)
- Fazer o Goblin **retribuir com skills próprios** (ataque básico do inimigo).
- HUD mais rico (`J-HUD-TargetFrame` para HP do alvo, etc.).
- Sistema completo de slots de skills (`J-SkillSlots`) como no `ca`.
- Balanceamento, loot, respawn, mais inimigos/skills.
