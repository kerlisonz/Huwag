# Documentação — Huwag

Índice e convenções da documentação do projeto. Leia na ordem indicada.

## Ordem de leitura

| # | Documento | Conteúdo | Quando usar |
|---|---|---|---|
| 01 | [GDD](01-gdd.md) | visão, tema, atos, assets necessários, cronograma | entender o jogo |
| 02 | [Guia de desenvolvimento](02-guia-de-desenvolvimento.md) | database, mapas, eventos, switch a switch, checklist | produzir |
| 03 | [Relatório J-ABS](03-relatorio-jabs.md) | combate no mapa por dentro, dependências e armadilhas | mexer em plugins |
| 04 | [Switches e variáveis](04-switches.md) | nomes no banco + condição → efeito + status | implementar eventos |
| 05 | [Roadmap de produção](05-roadmap-de-producao.md) | fases, backlog, definição de pronto | planejar |

Fonte primária da tabela de switches: [`referencias/switches-huwag.pdf`](referencias/switches-huwag.pdf).

## Convenções

- Nomes numerados (`01-`, `02-`, ...) definem a ordem de leitura; um assunto por arquivo.
- Idioma: português (Brasil). Termos da engine (switch, variable, event page, tileset) ficam em
  inglês, como aparecem no editor.
- Links **relativos**; nunca caminhos absolutos da máquina.
- Ao criar, renomear ou remover um documento, atualize este índice e o
  [README](../README.md) principal.
- PDFs e material de origem ficam em `referencias/`; o texto de trabalho fica em Markdown.

## Área de trabalho local

`.tmp/` guarda os clones de referência ([je-can-code/ca](https://github.com/je-can-code/ca) e
[je-can-code/rmmz-plugins](https://github.com/je-can-code/rmmz-plugins)), backups de dados e
scripts de validação. Ela **não é versionada** e não é fonte de verdade: se um script de `.tmp/`
for útil de forma permanente, ele deve ser promovido para o repositório.
