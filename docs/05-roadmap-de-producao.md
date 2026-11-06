# Roadmap de produção — Huwag

Plano de execução derivado do [GDD](01-gdd.md), do [guia de desenvolvimento](02-guia-de-desenvolvimento.md)
e das decisões de escopo: **Atos 1 e 2 agora; Ato 3 fora do escopo**.

## Fase 0 — Fundação (concluída)

- [x] Repositório organizado (`game/`, `docs/`, `.tmp/` separados)
- [x] Documentação com índice, switches transcritos e roadmap
- [x] Higiene de Git (`.gitignore`, `.gitattributes`, `.editorconfig`, licença, créditos)
- [x] Switches `001`–`020` e variável `Ato` nomeados no banco
- [x] J-ABS funcional: player ataca, inimigo ataca, HP visível

## Fase 1 — Base do projeto

- [x] Projeto MZ criado, resolução 1920×1080
- [x] Ator Huwag, classe, arma inicial e skill de ataque
- [ ] Itens-chave (ovos do monstro, itens de cura) no banco
- [ ] Tilesets definitivos escolhidos (posições travadas antes de repintar)
- [ ] Save/load testado no Ato 1

## Fase 2 — Mapas provisórios

- [x] Quarto de Huwag
- [x] Cidade (mapa único grande, baseado em cidade real pequena)
- [x] Quartel dos bombeiros
- [ ] Floresta — corredores ligados por transferências
- [ ] Clareira (batalha do Ato 1 e ovos)
- [ ] Bloqueios de passagem revisados (Region IDs / eventos sem gráfico)

## Fase 3 — Ato 1 (switches 001–006)

- [ ] Porta do quartel bloqueia antes do chefe e libera depois
- [ ] Chefe só fala uma vez (página 2 sem diálogo)
- [ ] Batalha do boss de água com "Can Escape" e ramificação Win/Escape
- [ ] Common Event `Virar_Tarde` (tint + NPCs + chefe)
- [ ] Chefe após os ovos libera cidade e casa
- [ ] Dormir avança para o Ato 2 e reativa a barreira da floresta

## Fase 4 — Combate

- [ ] Skills de ataque dos inimigos (Goblin retribuir)
- [ ] Item de cura dropado por dano (Troop Events em 75/50/25%)
- [ ] Perseguição do monstro pelos mapas (Approach + Event Touch)
- [ ] Balanceamento de HP/dano e respawn
- [ ] HUD: alvo e estados (opcional: `J-HUD-TargetFrame`)

## Fase 5 — Ato 2 (switches 007–015)

- [ ] Três NPCs chave abrem e fecham missões sem travar
- [ ] Chefe do Ato 2 libera os três
- [ ] Velhinha libera a floresta com qualquer missão completa (via switch `020`)
- [ ] Entrada da floresta fecha a volta e sorteia fogos (Control Variables + Set Event Location)

## Fase 6 — Mecânica do fogo

- [ ] Apagar fogo com a magia de água (SE de água + Erase Event)
- [ ] Fogo causa dano por Player Touch
- [ ] Boss rush de fogo perto do gatinho
- [ ] Gatinho encontrado e devolvido (`017`/`018`)

## Fase 7 — Visual definitivo

- [ ] Trocar placeholders por tilesets/charsets/facesets finais
- [ ] Tonalidade e iluminação dos Atos 1 e 2
- [ ] Preparar a arquitetura de dessaturação do Ato 3 (sem implementar)
- [ ] Tela de título, battlebacks e ícones próprios

## Fase 8 — Áudio

- [ ] Trilha instrumental por ato/cenário
- [ ] SFX artesanais (passos, água, fogo, colisões)
- [ ] BGS de chamas na aproximação da floresta

## Fase 9 — Polimento e entrega

- [ ] Checklist de testes do guia (10 itens) passando
- [ ] Save/load no meio de cada ato mantém o estado
- [ ] Correção de bugs e ajustes de ritmo
- [ ] Build Windows e Linux (Deployment)
- [ ] Créditos finais e `THIRD-PARTY-NOTICES` revisado

## Backlog por área

| Área | Itens |
|---|---|
| Banco | itens (ovos, cura), inimigos de fogo, classes próprias, estados |
| Mapas | floresta, clareira, cidade final, interiores |
| Eventos | 001–015, Common Events, transferências, NPCs |
| Arte | tilesets, charsets, facesets, título, HUD |
| Áudio | BGM, BGS, SE, mixagem |
| Plugins | HUD completo, skill slots, iluminação |
| Entrega | builds, testes, créditos |

## Definição de pronto (por fase)

Uma fase só é considerada pronta quando:

1. O jogo abre com **F5** sem erro no console.
2. O fluxo da fase roda do início ao fim, sem travar nem precisar de switch manual.
3. Salvar e carregar mantém o estado.
4. Os documentos afetados foram atualizados (guia, switches, roadmap).
5. O commit não inclui saves, backups nem arquivos de `.tmp/`.

## Decisões em aberto

- **Magia de água × fugir do boss:** se o jogador fugir, como ele aprende a magia?
- **Ato 3:** confirmar que fica fora do escopo desta entrega e ajustar o GDD.
- **Três missões chave × três missões secundárias:** confirmar que são a mesma coisa.
- **Plataformas:** o GDD cita Windows/Linux e Windows/macOS — padronizar em Windows e Linux.
- **Switches `016`–`019`:** confirmar as propostas antes de implementar.
- **Itens de cura:** manter descrição neutra, sem sugerir fuga da realidade.
