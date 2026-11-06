# Documentação — Huwag

Índice da documentação do projeto. A ordem sugerida de leitura é a da primeira tabela.

## Mapa da documentação

| # | Documento | Conteúdo | Quando usar |
|---|---|---|---|
| 01 | [GDD](design/gdd.md) | visão, tema, atos, assets necessários, cronograma | entender o jogo |
| 02 | [Guia de desenvolvimento](producao/guia-de-desenvolvimento.md) | database, mapas, eventos, switch a switch, checklist | produzir |
| 03 | [Relatório J-ABS](tecnico/relatorio-jabs.md) | combate no mapa por dentro, dependências e armadilhas | mexer em plugins |
| 04 | [Switches e variáveis](producao/switches.md) | nomes no banco + condição → efeito + status | implementar eventos |
| 05 | [Roadmap de produção](producao/roadmap.md) | fases, backlog, definição de pronto | planejar |

Fonte primária da tabela de switches: [`referencias/switches-huwag.pdf`](referencias/switches-huwag.pdf).

## Organização das pastas

| Pasta | O que guarda |
|---|---|
| `design/` | documento de design — o "porquê" do jogo |
| `producao/` | guia de implementação, switches e roadmap |
| `tecnico/` | relatórios de engenharia e integração de plugins |
| `referencias/` | PDFs e material de origem |
| `legal/` | licenças, créditos e avisos de terceiros |

## Convenções

- Um assunto por arquivo; o nome do arquivo descreve o assunto (sem numeração — a ordem está na
  tabela acima).
- Idioma: português (Brasil). Termos da engine (switch, variable, event page, tileset) ficam em
  inglês, como aparecem no editor.
- Links **relativos**; nunca caminhos absolutos da máquina.
- Ao criar, renomear ou remover um documento, atualize este índice e o
  [README](../README.md) principal.
- PDFs e material de origem ficam em `referencias/`; o texto de trabalho fica em Markdown.

## Área de trabalho local

`.tmp/` guarda os clones de referência ([je-can-code/ca](https://github.com/je-can-code/ca) e
[je-can-code/rmmz-plugins](https://github.com/je-can-code/rmmz-plugins)), backups de dados e
scripts de validação. Ela **não é versionada** e não é fonte de verdade: os scripts úteis foram
promovidos para [`tools/`](../tools/README.md).
