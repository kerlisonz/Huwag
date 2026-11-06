# game/ — projeto RPG Maker MZ

Esta pasta **é** o projeto do RPG Maker MZ. Abra `game.rmmzproject` pelo editor
(**Arquivo → Abrir Projeto**). O restante do repositório (documentação, licenças, automação)
fica fora dela de propósito: o MZ só precisa desta pasta para rodar.

## Pontos de atenção

- `data/` — banco de dados e mapas em JSON (UTF-8 sem BOM). Não edite com o editor aberto.
- `js/plugins/` — 18 plugins; a ordem de carregamento está em `js/plugins.js`. Leia
  [`../docs/tecnico/relatorio-jabs.md`](../docs/tecnico/relatorio-jabs.md) antes de mexer nos `J-*`.
- `js/libs/` — bibliotecas da engine (PixiJS, Effekseer, pako, localForage).
- `save/` — saves locais; **não versionado**.
- `img/`, `audio/`, `effects/`, `fonts/` — biblioteca padrão do MZ (placeholders). Ver
  [`../docs/legal/third-party-notices.md`](../docs/legal/third-party-notices.md).
- Resolução: `data/System.json → advanced` (1920×1080), não `package.json`.

## Mapas

| ID | Nome | Papel |
|---|---|---|
| 001 | Quarto de Huwag | início e fim de cada dia |
| 002 | Cidade | exploração, NPCs, sari-sari store |
| 003 | Quartel dos Bombeiros | chefe, colegas, sala de espera |
| 004 | JABS_ActionMap | técnico: visuais de skill do J-ABS |
| 005 | JABS_EnemyMap | técnico: mapa de inimigos do J-ABS |

Regras de edição e convenções: [`../.github/CONTRIBUTING.md`](../.github/CONTRIBUTING.md).
