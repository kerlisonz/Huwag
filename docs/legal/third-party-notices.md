# Créditos e avisos de terceiros

O Projeto Huwag usa assets, plugins e bibliotecas de terceiros. Este documento registra a origem
de cada grupo. **A licença do projeto ([LICENSE](../../LICENSE)) não se estende a eles.**

## RPG Maker MZ — biblioteca padrão (RTP)

- **Titular:** Gotcha Gotcha Games / RPG Maker MZ.
- **O que está no repositório:** todo o conteúdo de `game/img/`, `game/audio/`, `game/effects/`,
  `game/fonts/` e as bibliotecas em `game/js/libs/` (PixiJS, Effekseer, pako, localForage,
  decodificador Vorbis) são os arquivos distribuídos com o RPG Maker MZ.
- **Termos:** uso permitido apenas dentro dos jogos criados com o RPG Maker MZ, conforme o
  EULA da engine. Não podem ser extraídos, redistribuídos nem usados em outra engine.
- **Ação da equipe:** ao substituir os placeholders por arte/áudio autorais, registre aqui a
  origem e a licença de cada asset novo.

## Plugins J-* (JE)

- **Autor:** Jeremy Espinoza (JE) — <https://github.com/je-can-code/rmmz-plugins>.
- **Plugins no projeto:** `J-Base`, `J-Base-Save`, `J-ABS`, `J-Extend`, `J-Elementalistics`,
  `J-HUD`, `J-HUD-PartyFrame`, `J-ABS-AllyAI`, `J-ABS-InputManager`, `J-Pixelistics`,
  `J-Pixel-ABS`, `J-ABS-Diagonals`, `J-ABS-Hitstop`, `J-ABS-Tools`.
- **Termos:** o repositório oficial do autor não inclui um arquivo de licença explícito. O
  projeto de referência do autor (`je-can-code/ca`) é MIT. Antes de redistribuir o jogo fora do
  contexto acadêmico, confirme os termos com o autor e mantenha os créditos nos headers dos
  arquivos `.js` (não os remova).
- **Referência de estudo:** o clone usado durante o desenvolvimento ficou em `.tmp/rmmz-plugins/`
  (não versionado).

## Outros plugins

| Plugin | Autor/origem | Termos |
|---|---|---|
| `CTB_TouchInput.js` | CT_Bolt | Livre para uso comercial e não comercial (header do arquivo) |
| `AltMenuScreen.js`, `AltSaveScreen.js`, `TextPicture.js`, `ButtonPicture.js` | RPG Maker MZ (padrão) | EULA do RPG Maker MZ |
| `rmmz_movement.js` | Plugins padrão/comunidade | Verificar antes de reativar (está desligado) |

## Skills de agentes

| Skill | Autor | Licença | Caminho |
|---|---|---|---|
| Ponytail | Dietrich Gebert ([DietrichGebert](https://github.com/DietrichGebert)) | MIT | `.agents/skills/ponytail/` |
| Agency Agents (5 agentes de game development) | [msitarzewski](https://github.com/msitarzewski/agency-agents) e contribuidores | MIT | `.qoder/skills/` |

Textos e versões fixadas:

- [`AGENTS.md`](../../AGENTS.md) — regras sempre-ativas (Ponytail).
- [`.agents/skills/ponytail/NOTICE.md`](../../.agents/skills/ponytail/NOTICE.md) — commit e licença do Ponytail.
- [`.qoder/skills/README.md`](../../.qoder/skills/README.md) — commit e arquivos importados da Agency.

## Bibliotecas

| Biblioteca | Uso | Licença de origem |
|---|---|---|
| PixiJS | renderização | MIT |
| Effekseer | efeitos | MIT |
| pako | compressão | MIT |
| localForage | armazenamento | Apache-2.0 |
| Decodificador Vorbis | áudio OGG | Ver licença da distribuição original |
| Fontes M+ | UI do MZ | SIL Open Font License 1.1 |

As licenças completas acompanham as distribuições originais do RPG Maker MZ e de cada projeto.

## Documentação

- `docs/design/gdd.md`, `docs/producao/guia-de-desenvolvimento.md`,
  `docs/tecnico/relatorio-jabs.md`, `docs/producao/switches.md` e
  `docs/producao/roadmap.md`: autoria da equipe.
- `docs/referencias/switches-huwag.pdf`: documento de trabalho da equipe.

## Como reportar um crédito faltante

Se algum asset ou trecho de código estiver sem crédito, abra uma issue ou avise a equipe. A
correção entra no próximo commit de documentação.
