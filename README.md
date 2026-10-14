# Huwag

RPG 2D de terror psicológico e exploração desenvolvido no RPG Maker MZ.

O jogo acompanha a rotina de **Huwag Matitiis**, um jovem bombeiro de 23 anos em um cenário urbano inspirado nas Filipinas. A narrativa é dividida em três atos e trabalha o contraste de percepção: sob o efeito de remédios (Atos 1 e 2), Huwag enxerga a cidade e seus colegas de forma lúdica e colorida. No Ato 3, o efeito cessa, revelando o ambiente cru, desgastado e monocromático, sem promessas de soluções fáceis ou finais mágicos.

O projeto foi planejado para uma experiência curta e direta, com cerca de 30 minutos de gameplay.

---

## O Jogo

- **Gênero:** RPG top-down / narrativa de terror psicológico
- **Engine:** RPG Maker MZ
- **Plataformas:** Windows e Linux
- **Duração prevista:** ~30 minutos
- **Influências narrativas e estéticas:** *As Aventuras de Pi* (distorção da realidade pelo trauma) e *Yume Nikki* (estranheza e exploração em mapas 2D).

### Elementos Centrais
- **Quebra de percepção visual:** A passagem do colorido para o monocromático reflete o estado mental do protagonista e o fim do efeito dos medicamentos.
- **Dilemas de resgate:** Como bombeiro, o jogador precisa tomar decisões em situações de emergência que afetam a rotina dos moradores e companheiros de equipe.
- **Ambientação cultural:** Cenários e interações com elementos cotidianos filipinos, incluindo veículos típicos (*jeepneys*), comércio de bairro (*sari-sari stores*) e diálogos locais.
- **Trilha e efeitos sonoros:** Músicas instrumentais e sonoplastia com objetos do dia a dia para compor o clima dos cenários.

---

## Estrutura dos Mapas Implementados

Os mapas base do projeto foram estruturados nos arquivos de dados (`data/`):

- **Map001 — Quarto de Huwag:** Quitinete simples do protagonista. Ponto de partida da narrativa, contendo objetos interativos como a mesa de remédios, o uniforme de bombeiro e a janela para a rua.
- **Map002 — Cidade:** Área urbana externa com trânsito de jeepney, pedestres, moradores e a loja sari-sari, servindo de transição para o serviço.
- **Map003 — Quartel dos Bombeiros:** Local de trabalho de Huwag, com interações com o Capitão Reyes, a enfermeira Maria e os colegas de equipe (Ato e Santos).

---

## Como Abrir e Executar

### Pré-requisitos
- **RPG Maker MZ** instalado no computador.
- Sistema operacional Windows (10/11) ou ambiente Linux compatível.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/kerlisonz/Huwag.git
   ```
2. Abra o RPG Maker MZ.
3. No menu principal, vá em **Arquivo → Abrir Projeto** (ou `File → Open Project`).
4. Navegue até a pasta clonada e selecione o arquivo `game.rmmzproject`.
5. Para testar o jogo dentro do editor, pressione **F5** ou acesse **Jogo → Teste de Jogo**.

> **Nota para colaboradores:** Mantenha os arquivos das pastas `data/`, `audio/` e `img/` sincronizados antes de abrir o projeto no editor para evitar conflitos de mapeamento no RPG Maker MZ.

---

## Organização do Repositório

```text
Huwag/
├── data/              # Mapas (Map001 a Map003), eventos e banco de dados JSON
├── js/                # Núcleo da engine e configuração de plugins (plugins.js)
├── img/               # Tilesets, sprites de personagens, rostos e interface
├── audio/             # BGMs e efeitos sonoros
├── .kiro/steering/    # Game Design Document (gdd.md) e referências
├── game.rmmzproject   # Arquivo descritor de projeto do RPG Maker MZ
├── package.json       # Configuração da janela do executável (NW.js / Chromium)
└── README.md          # Documentação principal
```

---

## Cronograma e Andamento

O desenvolvimento segue um cronograma de 6 semanas:

- [x] Semana 1: Pré-produção, banco de dados base e documentação (GDD)
- [x] Semana 2: Mapeamento dos Atos 1 e 2 (Quarto, Cidade e Quartel com NPCs e diálogos)
- [ ] Semana 3: Mapeamento do Ato 3 e configuração de filtros/tonalidade monocromática
- [ ] Semana 4: Programação dos eventos e dilemas de resgate
- [ ] Semana 5: Sonoplastia artesanal e integração da trilha sonora
- [ ] Semana 6: Testes gerais, ajustes de iluminação e compilação final

---

## Equipe

- **Kerlison Kennedy da Silva Oliveira**
- **Maria Eduarda Cavalcante Melo**
- **Wilton Carlos Justino da Costa Filho**

---

## Licença

Projeto desenvolvido para fins acadêmicos e não comerciais. Os assets padrão e bibliotecas da engine pertencem à Gotcha Gotcha Games / RPG Maker MZ sob seus respectivos termos de uso.

