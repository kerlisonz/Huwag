# Huwag

RPG 2D top-down de **terror psicológico e exploração**, desenvolvido no **RPG Maker MZ**.
A história acompanha **Huwag Matitiis**, um bombeiro filipino de 23 anos, em três atos que
contrastam a percepção colorida dos remédios (Atos 1 e 2) com a realidade crua e monocromática
do Ato 3. É uma experiência curta, de aproximadamente 30 minutos.

> **Status:** pré-produção. Os mapas do Ato 1 estão montados, o combate no mapa (J-ABS) está
> validado com uma demo funcional e a documentação de produção está pronta. Arte e áudio ainda
> são placeholders da biblioteca padrão do RPG Maker MZ.

## Sumário

- [O jogo](#o-jogo)
- [Estado atual](#estado-atual)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Como abrir e executar](#como-abrir-e-executar)
- [Documentação](#documentação)
- [Convenções](#convenções)
- [Equipe](#equipe)
- [Licença e créditos](#licença-e-créditos)

## O jogo

| | |
|---|---|
| **Gênero** | RPG top-down / narrativa de terror psicológico |
| **Engine** | RPG Maker MZ (projeto em `game/`) |
| **Plataformas-alvo** | Windows e Linux |
| **Duração prevista** | ~30 minutos |
| **Monetização** | Nenhuma — projeto acadêmico |
| **Influências** | *As Aventuras de Pi* (distorção da realidade pelo trauma) e *Yume Nikki* (estranheza e exploração 2D) |

### Pilares

1. **Quebra de percepção visual** — o colorido dos Atos 1–2 dá lugar ao monocromático no Ato 3,
   acompanhando o fim do efeito dos medicamentos.
2. **Dilemas de resgate** — decisões de bombeiro com consequências ambíguas, sem indicadores
   simplistas de moralidade.
3. **Ambientação filipina** — jeepneys, sari-sari stores, barangay e diálogos locais.
4. **Som artesanal** — trilha instrumental e efeitos gravados com objetos cotidianos.

## Estado atual

| Área | Estado | Observação |
|---|---|---|
| Documentação | ✅ pronta | GDD, guia de implementação, switches e roadmap |
| Banco de dados | 🟡 parcial | ator Huwag, 5 inimigos e skill de ataque; restante é base MZ |
| Mapas | 🟡 parcial | Quarto, Cidade e Quartel montados; floresta e clareira pendentes |
| Switches/variáveis | 🟡 nomeados | `001`–`020` e variável `Ato`; lógica de eventos pendente |
| Combate (J-ABS) | ✅ demo validada | Goblin funcional; falta IA de ataque e balanceamento |
| Arte | ⬜ placeholder | biblioteca RTP do MZ; sem assets autorais |
| Áudio | ⬜ placeholder | biblioteca RTP do MZ; sem BGM/SFX autorais |
| Build (Windows/Linux) | ⬜ pendente | depende da fase de polimento |

## Estrutura do repositório

```text
Huwag/
├── .agents/                   # skills de agentes (Ponytail, MIT)
│   └── skills/ponytail/
├── .github/                   # contribuição, pull request e issues
│   ├── CONTRIBUTING.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── docs/                      # documentação (índice em docs/README.md)
│   ├── design/                # GDD
│   ├── producao/              # guia, switches e roadmap
│   ├── tecnico/               # relatórios de engenharia
│   ├── referencias/           # PDFs e material de origem
│   └── legal/                 # créditos e licenças de terceiros
├── game/                      # projeto RPG Maker MZ (é este que se abre no editor)
│   ├── data/ js/ img/ audio/ effects/ fonts/ css/ icon/ movies/
│   ├── save/                  # saves locais (ignorado pelo Git)
│   └── game.rmmzproject       # marcador de projeto do MZ
├── tools/                     # scripts de apoio (Node.js)
├── .editorconfig
├── .gitattributes
├── .gitignore
├── Huwag.code-workspace
├── LICENSE
└── README.md
```

## Como abrir e executar

**Pré-requisitos:** RPG Maker MZ instalado (Windows 10/11 ou Linux via Steam/Proton).

1. Clone o repositório:
   ```bash
   git clone https://github.com/kerlisonz/Huwag.git
   ```
2. No RPG Maker MZ: **Arquivo → Abrir Projeto**.
3. Selecione `game/game.rmmzproject`.
4. Pressione **F5** (ou **Jogo → Teste de Jogo**) para rodar no editor.

> **Atenção:** feche o editor antes de trocar de branch ou dar `pull`. O MZ mantém os JSON de
> `game/data/` abertos e pode sobrescrever alterações feitas por fora.

**Teste rápido no navegador (opcional, local):**

```bash
node tools/serve.js          # serve a pasta game/ em http://localhost:8080
node tools/validate.js       # confere JSONs, plugins, mapas e links
```

## Documentação

O índice completo está em [docs/README.md](docs/README.md). Atalhos:

| Documento | Para quê |
|---|---|
| [GDD](docs/design/gdd.md) | visão, narrativa, atos e cronograma |
| [Guia de desenvolvimento](docs/producao/guia-de-desenvolvimento.md) | como montar o jogo no editor, switch a switch |
| [Relatório J-ABS](docs/tecnico/relatorio-jabs.md) | como o combate no mapa funciona por dentro |
| [Switches e variáveis](docs/producao/switches.md) | nomes, condições e efeitos de cada switch |
| [Roadmap de produção](docs/producao/roadmap.md) | fases, backlog e definição de pronto |

## Convenções

Resumo; o detalhamento está em [CONTRIBUTING.md](.github/CONTRIBUTING.md).

- **Commits** em [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- **Branches** curtas: `feat/ato-1-eventos`, `fix/hud-hp`, `docs/switches`.
- **Dados do MZ** em UTF-8 sem BOM; nunca commitar `game/save/`.
- **Assets** entram como placeholder até a fase de visual definitivo; ao trocar, manter a posição
  do tile no tileset para não quebrar os mapas.
- **Documentação** separada por assunto em `docs/`; mantenha o índice atualizado.
- **Agentes de IA:** regras sempre-ativas em [AGENTS.md](AGENTS.md); skills de projeto em
  `.agents/skills/`.

## Equipe

- Kerlison Kennedy da Silva Oliveira
- Maria Eduarda Cavalcante Melo
- Wilton Carlos Justino da Costa Filho

## Licença e créditos

Projeto **acadêmico e não comercial**. O código, os mapas, os textos e a documentação originais
deste repositório são de autoria da equipe — ver [LICENSE](LICENSE).

Assets e bibliotecas de terceiros (RTP do RPG Maker MZ, plugins J-*, PixiJS, Effekseer, fontes
M+, entre outros) **não** são cobertos por essa licença e seguem os termos de seus autores —
ver [docs/legal/third-party-notices.md](docs/legal/third-party-notices.md).
