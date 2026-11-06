# Contribuindo com Huwag

Este documento vale para a equipe e para qualquer pessoa que abra o projeto. O objetivo é manter
o repositório previsível: sem saves, sem backups soltos, sem conflito de dados do RPG Maker MZ.

## Antes de tudo

- **RPG Maker MZ** instalado e o projeto aberto por `game/game.rmmzproject`.
- **Nunca** commite `game/save/`, builds ou exports. Eles já estão no `.gitignore`.
- **Feche o editor** antes de trocar de branch, dar `pull` ou rodar scripts que gravam em
  `game/data/`. O MZ mantém os dados em memória e sobrescreve o que encontrar no disco.
- Ao abrir o projeto depois de um `pull`, confira se o editor não pediu para "recarregar" dados.

## Fluxo de trabalho

1. Atualize a base:
   ```bash
   git switch master
   git pull
   ```
2. Crie uma branch curta e descritiva:
   ```bash
   git switch -c feat/ato-1-eventos
   ```
   Prefixos: `feat/`, `fix/`, `docs/`, `chore/`, `refactor/`.
3. Trabalhe em blocos pequenos e valide no editor (**F5**) antes de commitar.
4. Commit com mensagem no padrão Conventional Commits (ver abaixo).
5. Abra o pull request descrevendo **o que muda**, **como testar** e **o que ficou de fora**.

## Commits

Formato: `tipo(escopo opcional): descrição no imperativo`.

```text
feat(data): nomeia switches 001-020 e variável Ato
fix(map002): corrige passagem bloqueada sem switch 002
docs(switches): documenta lógica do switch 014
chore(repo): adiciona gitattributes e editorconfig
```

- Uma mudança lógica por commit.
- Não misture reorganização de arquivos com mudança de conteúdo.
- Se o commit alterar dados do jogo, diga no corpo o que foi testado.

## Regras do RPG Maker MZ

### Dados

- `game/data/*.json` são **UTF-8 sem BOM**. Scripts de autoria devem gravar assim.
- Mapas são **layer-major**: `data[layer * width * height + y * width + x]`, com
  `length = width * height * 6`.
- O array `events` de um mapa é alinhado ao ID: `events[0]` é `null` e `events[n]` é o evento `n`.
- O editor é a fonte da verdade para mapas e banco. Prefira editar pelo editor; se usar script,
  rode com o jogo **fechado** e valide o JSON depois.

### Plugins

- A ordem em `game/js/plugins.js` importa:
  `J-Base` → `J-Base-Save` → `J-ABS` → `J-Extend` → `J-Elementalistics` → `J-HUD` →
  `J-HUD-PartyFrame` → demais J-*.
- `J-Extend` **deve** vir depois de `J-ABS` (ele aliasa classes do J-ABS).
- `rmmz_movement` fica **desligado**: conflita com `J-Pixelistics`.
- Não registre plugin sem o arquivo `.js` correspondente em `game/js/plugins/`.
- Plugins J-* são de terceiros: atualize só com autorização e testando o combate.

### Resolução e UI

- A resolução do jogo fica em `game/data/System.json → advanced`
  (`screenWidth`, `screenHeight`, `uiAreaWidth`, `uiAreaHeight`), **não** no `package.json`.
  O valor atual é 1920×1080.

## Documentação

- Tudo em `docs/`, organizado por assunto (`design/`, `producao/`, `tecnico/`, `referencias/`,
  `legal/`) e um assunto por arquivo.
- Ao criar ou renomear um documento, atualize [docs/README.md](../docs/README.md).
- A fonte da verdade dos switches é [docs/producao/switches.md](../docs/producao/switches.md):
  se mudar um nome no banco, mude lá também.
- PDFs e material de origem ficam em `docs/referencias/`.

## Agentes de IA

- Regras sempre-ativas para qualquer agente: [`AGENTS.md`](../AGENTS.md) na raiz.
- Skills de projeto ficam em `.agents/skills/<nome>/SKILL.md`, com `name` e `description` no
  frontmatter YAML. O harness descobre essa pasta automaticamente.
- O **Ponytail** é vendorizado (MIT). Para atualizar, siga
  [`.agents/skills/ponytail/NOTICE.md`](../.agents/skills/ponytail/NOTICE.md) e registre o novo
  commit no aviso.

## Assets

- Até a fase de visual definitivo, use os placeholders da biblioteca do MZ.
- Ao trocar um placeholder por arte final, **mantenha a posição do tile no tileset** — assim os
  mapas existentes não quebram.
- Nomes de arquivo em `snake_case` ou no padrão do MZ; sem acentos e sem espaços.
- Registre no PR a origem e a licença de qualquer asset externo.

## Checklist antes do commit

- [ ] O jogo abre e roda com **F5** sem erro no console.
- [ ] Os JSON alterados são válidos (`node tools/validate.js`).
- [ ] Nenhum `game/save/`, `*.bak`, build ou arquivo de `.tmp/` entrou no commit.
- [ ] `git status` só mostra o que deveria.
- [ ] Documentação atualizada (README, índice de docs ou `docs/producao/switches.md`).
- [ ] Mensagem de commit descreve a mudança.
