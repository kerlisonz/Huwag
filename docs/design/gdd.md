# GDD — HUWAG (RPG Maker MZ)

**Versão 0.0.2** — RPG 2D Top-Down | Prazo de Desenvolvimento: 6 Semanas

> **Escopo atual:** Atos 1 e 2. O passo a passo de implementação está no
> [guia de desenvolvimento](../producao/guia-de-desenvolvimento.md) e a tabela de switches em
> [switches.md](../producao/switches.md).

## 1. Visão Geral (Overview)

- **Gênero & Estilo:** RPG 2D Top-Down com elementos de aventura, fantasia e terror psicológico.
- **Engine:** RPG Maker MZ.
- **Setting:** Versão hipotética e surreal das Filipinas vista pela perspectiva do protagonista.
- **Tema Central:** Reflexão sobre a necessidade de filtros no cotidiano, fragilidade mental e impactos psicológicos de uma rotina exaustiva.
- **Plataformas:** Windows (PC) e Linux.
- **Monetização:** Não monetizado (Gratuito).
- **Prazo de Execução:** 6 semanas (1 mês e meio) de desenvolvimento.
- **Tempo de Jogo:** Cerca de 30 minutos de gameplay.

---

## 2. Resumo das Mecânicas e Gameplay

- **Exploração 2D:** Movimentação do jogador em mapa 2D top-down com interações por eventos (ação do botão/colisão).
- **Sistema de Encontros:** Encontros com criaturas no mapa, permitindo ao jogador escolher entre Atacar, Conversar, Observar ou Fugir.
- **Diálogos e Consequências:** Árvore de diálogos e escolhas acionadas por eventos e janelas de mensagem, com ramificações via variáveis e interruptores.
- **Dilemas de Resgate:** Missões de bombeiro em que o jogador decide quem e como salvar em cenários de emergência.
- **Filtro Perceptivo:** Mudança visual e estética do mapa do Ato 1/2 (colorido e lúdico) para o Ato 3 (monocromático/desbotado via plugins de tonalidade e tilesets).

---

## 3. Influências

- **As Aventuras de Pi (Filme):** A narração do filme é feita pelo protagonista, revelando ao final como o trauma altera a percepção do ambiente e dos eventos.
- **Yume Nikki (Jogo):** Coleta de itens, estranheza surreal do ambiente e exploração em mapa 2D top-down afetando interações com NPCs.

---

## 4. Elevator Pitch

Um RPG 2D top-down em RPG Maker MZ com presença de terror psicológico ambientado nas Filipinas. Você joga como um jovem bombeiro aparentemente normal enfrentando dilemas e demônios simbólicos em um mundo colorido ilusório, até que o terceiro ato revela a dura realidade cinzenta de sua vida.

---

## 5. Descrição do Projeto

Huwag é uma jornada de RPG 2D top-down em três atos (Introdução, Conflito e Revelação) que acompanha **Huwag Matitiis**, um jovem bombeiro filipino de 23 anos que vive isolado. Enfrentando transtornos mentais e um passado esquecido, ele busca constante ocupação em sua rotina exaustiva para tentar silenciar seus conflitos internos.

Sob o efeito de remédios desconhecidos nos Atos 1 e 2, o mapa 2D é renderizado com cores vibrantes e gráficos lúdicos semelhantes a desenhos infantis. Conforme avança para o Ato 3, o remédio perde o efeito, e o cenário torna-se monocromático e cinzento, revelando a versão sem filtros de suas ações e a continuidade da rotina sem promessas de curas milagrosas.

---

## 6. Diferenciais do Projeto

1. **Transição Visual Narrativa:** Mudança gráfica direta nos mapas 2D (tilesets e tonalidade da tela) atrelada ao término do remédio.
2. **Decisões Complexas:** Sem indicadores simplistas de moralidade; as escolhas têm impactos ambíguos na rotina de resgate.
3. **Paisagem Sonora Lúdica:** Sons gravados com objetos cotidianos (SFX amador) e trilha sonora medieval instrumental.
4. **Sinceridade Temática:** Tratamento empático da saúde mental focado em aceitação e enfrentamento do cotidiano.
5. **Subversão de Expectativas:** Ao contrário de como os primeiros dois atos deixam a entender, não há promessa de um final satisfatório.

---

## 7. História e Estrutura dos Atos

- **Ato 1 (Introdução):** Apresentação de Huwag, das mecânicas de resgate e do ambiente fantástico/colorido do mapa 2D sob remédios.
- **Ato 2 (Conflito):** O núcleo do jogo. Decisões morais de resgate como bombeiro, batalhas/negociações com criaturas e impactos nos NPCs.
- **Ato 3 (Revelação):** Quebra de momentum. O mapa 2D perde a cor, revelando o ambiente escambado e cru, encerrando o dia com a aceitação silenciosa da realidade.

---

## 8. Recursos Necessários no RPG Maker MZ (Assets)

### Assets 2D (Gráficos)
- Tilesets coloridos e lúdicos (Atos 1 e 2); Tilesets cinzentos e desgastados (Ato 3).
- Spritesets / Charsets 2D do Huwag (cabelo espetado descolorido, roupa de bombeiro), NPCs filipinos e criaturas.
- Facesets / Bustos 2D dos personagens para a caixa de diálogo.
- Elementos de UI, ícones de itens e HUD do RPG Maker MZ.

### Áudio (BGM & SE)
- SFX artesanais gravados com objetos cotidianos (passos, mágicas, água, colisões).
- BGMs sem vocais, ênfase no instrumental climático.

### Eventos & Scripts / Plugins
- Eventos de mapa (Map Events) para controle de diálogos, resgates e chaveamento de switches.
- Variables e Switches do RPG Maker MZ para gerenciar ramificações de escolhas e reputação com NPCs.
- Plugins JavaScript (VisuStella ou equivalentes) para manipulação de tonalidade da tela, iluminação e encontros.

---

## 9. Cronograma de Desenvolvimento (6 Semanas)

| Semana   | Fase / Foco                        | Entregáveis e Objetivos Principais                                                                                  |
|----------|------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Semana 1 | Pré-Produção & Database            | Configuração do projeto no RPG Maker MZ, criação de atores, itens e prototipagem dos controles e movimento 2D.      |
| Semana 2 | Mapeamento dos Atos 1 e 2          | Construção dos mapas 2D coloridos (Tilesets das Filipinas), eventos iniciais e árvore de diálogos do Ato 1 e 2.     |
| Semana 3 | Mapeamento do Ato 3 & Filtros      | Criação dos mapas cinzentos/desbotados do Ato 3 e implementação dos plugins de alteração de tonalidade de tela.     |
| Semana 4 | Mecânicas de Resgate & Encontros   | Programação dos eventos de resgate de bombeiro, escolhas morais e batalhas/interações com as criaturas.             |
| Semana 5 | Sonoplastia & Ramificações         | Inclusão das BGMs medievais, gravação e aplicação dos SFX artesanais e testes do fluxo de decisões.                 |
| Semana 6 | Polimento, Bugfix & Exportação     | Ajuste fino dos mapas e iluminação, correção de erros de eventos e geração das compilações finais (Windows/macOS).  |

---

## 10. Integrantes

- Kerlison Kennedy da Silva Oliveira
- Maria Eduarda Cavalcante Melo
- Wilton Carlos Justino da Costa Filho

---

## 11. Indefinidos (a definir)

- Validação final dos tilesets e plugins a serem utilizados.
- Especialização de cada integrante.
- Personagens interativas.
- Missões principais e secundárias.

---

## 12. Notas de Design — Quarto do Protagonista (Huwag)

> Esta seção cresce conforme o projeto avança.

### Perfil do espaço
- **Quem:** Huwag Matitiis, 23 anos, bombeiro, vive isolado.
- **Onde:** Apartamento/quarto simples em ambiente urbano filipino (referência: quitinete em Metro Manila ou Cebu).
- **Estética Ato 1/2:** Colorido, lúdico, quase de desenho animado — reflexo do filtro dos remédios.
- **Estética Ato 3:** Monocromático, desgastado, bare-bones — a realidade crua.

### Elementos obrigatórios no quarto
- Cama de solteiro simples (petate ou colchão no chão / estilo probinsya urbano).
- Mesa com remédios (objeto interativo — gatilho narrativo central).
- Armário com uniforme de bombeiro pendurado.
- Ventilador de mesa ou de chão (detalhe local muito filipino).
- Janela com vista para fora (exterior urbano ou corredor de apartamento).
- Porta de saída para o exterior / corredor.
