# Switches e variáveis

Fonte primária: [`../referencias/switches-huwag.pdf`](../referencias/switches-huwag.pdf) — tabela
`001`–`019` do documento original. Os switches `016`–`019` estavam em branco e receberam as
propostas do [guia de desenvolvimento](guia-de-desenvolvimento.md#7-os-switches-um-a-um-como-montar-cada-um).

Este documento é a **versão de trabalho**: nome usado no banco, condição, efeito e status da
implementação.

## Convenção de nomes

- Formato no RPG Maker MZ: `NNN Nome_curto` (o número é redundante com o ID, mas facilita a
  busca e o cruzamento com esta tabela).
- Nomes sem acentos e sem espaços; `_` separa as palavras.
- O switch `020` é auxiliar e não aparece no PDF original.
- Todos os nomes abaixo já estão gravados em `game/data/System.json`.

## Switches

| # | Nome no banco | Condição | Efeito | Status |
|---|---|---|---|---|
| 001 | `001 Porta_Bombeiros_1a_vez` | Interagir com a porta do corpo de bombeiros pela primeira vez | Desabilita a porta de saída da estação | Nomeado; lógica pendente |
| 002 | `002 Chefe_Ato1_apresentado` | Interagir com o NPC "chefe" pela primeira vez | Habilita a porta de saída, libera o caminho até a floresta e bloqueia nova interação com o "chefe" | Nomeado; lógica pendente |
| 003 | `003 Ovos_sem_derrotar` | Coletar os ovos do monstro na floresta **sem** derrotá-lo | A manhã vira fim de tarde, os NPCs somem e o "chefe" fica interagível | Nomeado; lógica pendente |
| 004 | `004 Ovos_e_derrotou` | Coletar os ovos **e** derrotar o monstro | Mesma função do `003`, mas com diálogo diferente do "chefe" | Nomeado; lógica pendente |
| 005 | `005 Chefe_liberou_cidade` | Interagir com o "chefe" após coletar os ovos | Libera explorar a cidade inteira e interagir com a casa | Nomeado; lógica pendente |
| 006 | `006 Dormir_avancou_para_Ato2` | Interagir com a porta da casa no Ato 1 | Passa o dia, carrega interações/NPCs do Ato 2 e bloqueia a passagem até a floresta | Nomeado; lógica pendente |
| 007 | `007 Chefe_Ato2_apresentado` | Interagir com o "chefe" pela primeira vez no Ato 2 | Libera a interação com `chave1`, `chave2` e `chave3` | Nomeado; lógica pendente |
| 008 | `008 Missao_chave1_aberta` | Falar com `chave1` pela primeira vez | Desbloqueia a missão `chave1` | Nomeado; lógica pendente |
| 009 | `009 Missao_chave1_concluida` | Falar com `chave1` pela segunda vez | Fecha a missão `chave1`, desbloqueia a missão principal e nova interação com o "chefe" | Nomeado; lógica pendente |
| 010 | `010 Missao_chave2_aberta` | Falar com `chave2` pela primeira vez | Desbloqueia a missão `chave2` | Nomeado; lógica pendente |
| 011 | `011 Missao_chave2_concluida` | Falar com `chave2` pela segunda vez | Fecha a missão `chave2`, desbloqueia a missão principal e nova interação com o "chefe" | Nomeado; lógica pendente |
| 012 | `012 Missao_chave3_aberta` | Falar com `chave3` pela primeira vez | Desbloqueia a missão `chave3` | Nomeado; lógica pendente |
| 013 | `013 Missao_chave3_concluida` | Falar com `chave3` pela segunda vez | Fecha a missão `chave3`, desbloqueia a missão principal e nova interação com o "chefe" | Nomeado; lógica pendente |
| 014 | `014 Floresta_liberada` | Falar com a "Velhinha" na sala de espera após completar **qualquer** missão chave | Libera a passagem da floresta e dispara som de chamas ao se aproximar | Nomeado; lógica pendente |
| 015 | `015 Floresta_em_chamas` | Entrar no primeiro corredor da floresta | Bloqueia a volta para a cidade e sorteia fogos pelos mapas da floresta | Nomeado; lógica pendente |
| 016 | `016 Magia_de_agua_obtida` | — | Proposta: fim da batalha do chefe de água | Nomeado (proposta) |
| 017 | `017 Gatinho_encontrado` | — | Proposta: gatinho encontrado na floresta | Nomeado (proposta) |
| 018 | `018 Gatinho_devolvido` | — | Proposta: gatinho devolvido à senhora | Nomeado (proposta) |
| 019 | `019 Ato2_concluido` | — | Proposta: Ato 2 concluído, libera a cidade ou o sono final | Nomeado (proposta) |
| 020 | `020 Alguma_missao_completa` | — | Auxiliar: ligado por `009`, `011` ou `013`; usado no `014` (o MZ não tem "OU" em condição de página) | Nomeado (auxiliar) |

## Variáveis

| # | Nome no banco | Uso |
|---|---|---|
| 001 | `Ato` | `1` ou `2`. Permite condicionar páginas de evento ao ato em vez de depender só de switches. |

As demais variáveis seguem sem nome até serem necessárias.

## Notas de implementação

- O MZ sempre executa a **página mais à direita** cuja condição seja verdadeira. Uma página nova
  do mesmo evento é preferível a um evento novo.
- **Não existe "OU"** nas condições de página. Para o `014` (qualquer missão concluída), use o
  `020` como switch auxiliar ou um `Conditional Branch` com `009 || 011 || 013`.
- `003` e `004` são **mutuamente exclusivos**: vêm do resultado da batalha (fugir × vencer).
- O "virar o dia" dos `003`/`004` cabe em um **Common Event** (`Virar_Tarde`): Tint Screen
  alaranjado, NPCs com página vazia e "chefe" com página nova.
- O `006` faz o oposto: Fadeout, Wait, `Ato = 2`, tint normal, Fadein, Transfer Player e
  reativação da barreira da floresta.
- `016`–`019` são propostas do guia; confirmar com a equipe antes de ligar a lógica.

## Pendências

- [ ] Implementar a lógica dos `001`–`006` (Ato 1) no editor.
- [ ] Implementar a lógica dos `007`–`015` (Ato 2).
- [ ] Confirmar os nomes de `016`–`019` e criar a lógica do gatinho.
- [ ] Criar o Common Event `Virar_Tarde`.
- [ ] Testar cada switch isoladamente (checklist da seção 10 do guia).
