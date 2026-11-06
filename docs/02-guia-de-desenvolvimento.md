# Huwag — Guia de Desenvolvimento no RPG Maker MZ

Atos 1 e 2 · baseado no [GDD](01-gdd.md) v0.0.2, na [tabela de switches](04-switches.md) e no áudio de 05/11/2026

## 1. Objetivo e escopo atual

Este documento explica **como o jogo seria montado dentro do editor do RPG Maker MZ**: o que fica no banco de dados, como os mapas são feitos, como os eventos e switches amarram a história e onde entra a parte visual (tilesets, charsets, tonalidade de tela). Ele junta três fontes: o GDD, a tabela de switches e as decisões que você falou no áudio.

**Decisões já tomadas (do áudio):**

- Foco só nos **Atos 1 e 2**. O Ato 3 está fora por enquanto, por não ser necessário para o aprendizado do jogo agora.
- O que importa primeiro é o **jogo base**: combate, eventos essenciais e as três missões secundárias.
- **Sem diálogos longos e sem construir a história por enquanto.** Diálogos e NPCs vêm depois, em volta das mecânicas.
- Eventos que não podem faltar: conversar com o chefe, caminhar de casa até os bombeiros e até a floresta, batalhar o monstro.
- Mapa da cidade **único e grande**, baseado em uma cidade real pequena (com a feirinha ao lado do departamento de bombeiros), em vez de vários pedaços de rua.
- Cidade pobre e simples: estradas de concreto, poucas variações de casa, telhados remendados, paredes azuis e portas de madeira no corpo de bombeiros. A casa do protagonista é só um espaço pequeno (tipo kitnet).
- **Nada de mensagem sobre drogas ou medicamentos.** Os vícios ficam abstratos. Os itens de cura que o boss dropa parecem cura, mas poderão ser reinterpretados num futuro Ato 3.
- Primeiro usar **assets provisórios (placeholders)** e trocar pelos oficiais depois.

## 2. O que é cada parte do editor (mapa mental)

Para quem vai montar o jogo, o MZ se resume a seis áreas. Quase tudo neste documento acontece nelas.

| Área do editor | Para que serve no Huwag |
| --- | --- |
| **Database (F9)** | Atores, classes, habilidades, itens, inimigos (boss), grupos de inimigos (Troops), estados, tilesets e switches/variáveis (aba System). |
| **Árvore de mapas** | Lista dos mapas: casa, corpo de bombeiros, cidade, floresta (corredores e clareira). |
| **Editor de mapa** | Pintar o cenário com tilesets, em camadas, e posicionar eventos. |
| **Modo Evento** | Colocar eventos no mapa: portas, NPCs, ovos, fogos, monstros, gatilhos de transferência. |
| **Resource Manager** | Importar e organizar charsets, facesets, tilesets, BGM, SE. |
| **Plugin Manager** | Plugins (VisuStella ou equivalentes) para tonalidade, iluminação, encontros e outros ajustes. |

## 3. Ordem de trabalho sugerida

A ideia é trabalhar com tarefas pequenas e bem feitas antes de ir para as grandes. A ordem abaixo segue essa lógica.

| Fase | O que fazer | Resultado |
| --- | --- | --- |
| 1. Base | Criar o projeto, nomear todos os switches e variáveis, definir o ator Huwag e a movimentação. | Projeto limpo, switches legíveis. |
| 2. Mapas provisórios | Montar casa, corpo de bombeiros, cidade (blocagem simples), floresta e clareira com tilesets padrão. | Dá para andar de ponta a ponta. |
| 3. Fluxo do Ato 1 | Eventos dos switches 001 a 006 sem diálogo (só mensagens curtas). | Ato 1 jogável do início ao fim. |
| 4. Boss de água | Inimigo, grupo, eventos de batalha e perseguição. | Combate funcionando. |
| 5. Fluxo do Ato 2 | Switches 007 a 015, três missões chave, floresta em chamas. | Ato 2 jogável. |
| 6. Mecânica do fogo | Fogos aleatórios, magia de água, resgate do gatinho. | Final do Ato 2. |
| 7. Visual definitivo | Trocar placeholders por tilesets, charsets e facesets oficiais. | Aparência final. |
| 8. Polimento | Áudio, diálogos, NPCs, testes e correção de bugs. | Versão de entrega. |

## 4. Database: o que cadastrar

### 4.1 Atores e classes

- **Huwag Matitiis**, 23 anos, bombeiro. Um único ator jogável. Classe simples (por exemplo, “Bombeiro”).
- Charset com cabelo espetado descolorido e roupa de bombeiro. Faceset para as caixas de diálogo (pode ficar para a fase 8).

### 4.2 Habilidades

- **Magia de água**: ganha-se do monstro do Ato 1 e é usada para apagar o fogo no Ato 2. Precisa existir como habilidade de batalha e também como interação no mapa (ver seção 8).
- Habilidades básicas de combate para o jogo base.

### 4.3 Inimigo e grupo (Troop)

- **Boss de água**: meio peixe, meio monstro. É o centro do Ato 1.
- Um grupo (Troop) só com ele. Configurar a batalha como **escapável**, porque o jogador pode fugir sem derrotá-lo (ver switches 003 e 004).
- Inimigos de fogo comuns para o “boss rush” do Ato 2.

### 4.4 Itens

- **Ovos do monstro** (item-chave do Ato 1).
- **Itens de cura** que o boss dropa durante a luta. Na lógica do jogo parecem cura, mas é uma fuga da realidade; por isso mantenha a descrição neutra e abstrata.

### 4.5 Switches e variáveis

Na aba **System → Switches/Variables**, dê nome a tudo logo no início. Sugestão de padrão: número + nome curto.

- `001 Porta_Bombeiros_1a_vez`
- `003 Ovos_sem_derrotar`
- `004 Ovos_e_derrotou`
- `014 Floresta_liberada`

Sugestão adicional: criar uma **variável “Ato”** (1 ou 2). Ela facilita bastante: em vez de depender só de switches para saber em que ato o jogador está, cada evento pode ter páginas condicionadas a “Ato = 1” ou “Ato = 2”.

## 5. Mapas

### 5.1 Lista de mapas

| Mapa | Uso | Observações |
| --- | --- | --- |
| Casa do Huwag | Início e fim de cada dia | Espaço pequeno e simples, só o suficiente para a porta de saída. |
| Corpo de bombeiros | Chefe, sala de espera (velhinha no Ato 2), porta da estação | Praticamente uma casa comum: paredes azuis, portas de madeira. |
| Cidade | Exploração, NPCs chave, feirinha | Um único mapa grande, baseado numa cidade real pequena. |
| Floresta (corredores) | Caminho até a clareira; no Ato 2 recebe os fogos | Mais de um mapa pequeno, ligados por transferências. |
| Clareira | Batalha do Ato 1 e ovos | Evento do boss e dos ovos. |

### 5.2 Como montar o mapa grande da cidade

1. Em **Map Properties** escolha o tamanho. Mapas gigantes pesam no editor e no jogo; vale começar com algo moderado (por exemplo, algumas dezenas de tiles de lado) e crescer se precisar.
2. Pinte em camadas: chão (concreto), casas, detalhes. Poucas variações de casa, reaproveitadas, já dão a sensação de bairro.
3. Use **Region IDs** para marcar áreas bloqueadas (por exemplo, a saída para a floresta) e depois controlar passagem por eventos.
4. Barreiras abstratas (um carro no meio da rua, rua bloqueada) podem ser eventos sem aparência, com colisão ligada, ou tiles intransponíveis.
5. Referência visual: use a cidade real que você mencionou, mas simplifique. O foco é a organização do espaço, não a fidelidade.

### 5.3 Troca de placeholders por assets oficiais

Antes de pintar tudo, defina quais tiles vão ser usados e **mantenha a mesma posição no tileset ao trocar depois**. Assim a troca de visual não quebra o mapa. Ideia do áudio: estradas de concreto, três tipos de casa e variações delas.

## 6. Eventos: as peças que fazem o jogo funcionar

Todo comportamento do jogo é um **evento**. Um evento tem **páginas**, e cada página tem uma condição (switch, variável, item ou self-switch). O MZ mostra sempre a página mais à direita cuja condição esteja verdadeira.

Conceitos que serão usados o tempo todo:

- **Gatilho (Trigger):** Action Button (apertar OK), Player Touch (encostar), Event Touch, Autorun e Parallel.
- **Control Switches:** liga ou desliga um switch.
- **Conditional Branch:** se… então… senão.
- **Transfer Player:** muda o jogador de mapa (portas, entrada da floresta).
- **Tint Screen:** muda a tonalidade da tela (usado para a manhã virar fim de tarde).
- **Self-Switch A/B/C/D:** estado interno de um único evento, bom para coisas que acontecem uma vez (pegar um item, por exemplo).
- **Erase Event:** remove o evento do mapa até o jogador voltar a ele.

**Regra prática:** cada ação importante vira uma página nova do mesmo evento, não um evento novo. Assim o objeto muda de comportamento conforme o progresso.

## 7. Os switches, um a um (como montar cada um)

A tabela abaixo parte do seu [documento de switches](04-switches.md). A coluna da direita é a sugestão de **como montar no editor**.

### Ato 1

| Switch | Condição → efeito (do seu documento) | Como montar |
| --- | --- | --- |
| 001 | Interagir com a porta do corpo de bombeiros pela primeira vez → desabilita a porta de saída | Evento da porta, página 1 (Action Button): mensagem curta e liga o 001. Página 2 (condição 001): porta bloqueada. |
| 002 | Interagir com o chefe pela primeira vez → habilita a porta de saída, libera o caminho até a floresta e bloqueia nova interação com o chefe | Chefe: ao falar, liga o 002; página 2 (condição 002) sem diálogo. Porta: página nova (condição 002) com Transfer Player. Caminho da floresta: barreira (evento ou Region) apagada pelo 002. |
| 003 | Coletar os ovos sem derrotar o monstro → a manhã vira fim de tarde, os NPCs somem e o chefe fica interagível | Evento dos ovos liga o 003. Um **Common Event** “Virar\_Tarde” aplica Tint Screen alaranjado. NPCs ganham página vazia (condição 003). Chefe ganha página nova (condição 003). |
| 004 | Coletar os ovos e derrotar o monstro → mesma função, mas o diálogo do chefe muda | Mesmo Common Event. No chefe, a página do 004 tem um diálogo diferente (por enquanto, só uma linha). |
| 005 | Interagir com o chefe após coletar os ovos → libera explorar a cidade inteira e interagir com a casa | Chefe liga o 005. A barreira da cidade e a porta da casa têm página liberada com condição 005. |
| 006 | Interagir com a porta da casa no Ato 1 → passa o dia, carrega as interações e NPCs do Ato 2 e bloqueia a passagem até a floresta | Porta da casa: Fadeout, Wait, liga o 006, define a variável “Ato” = 2, Fadein e Transfer Player. Reativar a barreira da floresta. |

**Detalhe da batalha (003 e 004):** o jogador pode fugir ou lutar. Use **Battle Processing** com as opções “Can Escape” e ramificação **If Win / If Escape**. Em “Win” liga o 004; em “Escape” liga o 003. Se o jogador fugiu, o monstro deve **perseguir pelos mapas** (evento com movimento “Approach” e gatilho Event Touch para reiniciar a batalha). Quem pegar os ovos depois de derrotar o monstro cai direto no 004.

### Ato 2

| Switch | Condição → efeito (do seu documento) | Como montar |
| --- | --- | --- |
| 007 | Interagir com o chefe pela primeira vez no Ato 2 → libera os três NPCs chave (chave1, chave2, chave3) | Chefe: página com “Ato = 2”. Liga o 007. Os três NPCs ganham página ativa com condição 007. |
| 008 | Falar com o chave1 pela primeira vez → desbloqueia a missão chave1 | Self-Switch A ou switch próprio; mensagem curta de missão. |
| 009 | Falar com o chave1 pela segunda vez → fecha a missão chave1, desbloqueia a missão principal e uma nova interação com o chefe | Segunda página do NPC (condição 008). Liga o 009. Chefe ganha página extra. |
| 010 e 011 | Mesma lógica para o chave2 | Repetir o padrão do chave1. |
| 012 e 013 | Mesma lógica para o chave3 | Repetir o padrão. No PDF, as linhas do 012 e do 013 aparecem coladas; vale conferir se estão corretas. |
| 014 | Falar com a Velhinha na sala de espera, depois de completar qualquer missão chave → libera a passagem da floresta e toca som de chamas quando o jogador chega perto | O MZ não aceita “OU” nas condições de página. Use **Conditional Branch** com 009 OU 011 OU 013, ou um switch auxiliar “Alguma\_missao\_completa”. O som: evento Player Touch perto da entrada tocando um **BGS** de fogo. |
| 015 | Entrar no primeiro corredor da floresta → bloqueia a volta para a cidade e sorteia fogos pelos mapas da floresta | Evento Player Touch na entrada: liga o 015 e fecha a saída. Os fogos: vários eventos de fogo; um evento Parallel usa **Control Variables → Random** e **Set Event Location** para espalhá-los de forma diferente a cada vez. |

### Switches 016 a 019 (em branco no documento)

O documento deixa quatro switches vazios. Sugestões para preencher, **a confirmar por você** — já nomeados no banco como proposta (ver [04-switches.md](04-switches.md)):

| Switch | Sugestão |
| --- | --- |
| 016 | Magia de água obtida (ligado ao fim do boss do Ato 1). |
| 017 | Gatinho encontrado na floresta (final do Ato 2). |
| 018 | Gatinho devolvido à senhora. |
| 019 | Ato 2 concluído, liberando a cidade ou o sono final. |

## 8. Mecânicas específicas

### 8.1 Boss de água e itens de cura por dano

Pelo áudio, o boss “dropa” um item de cura a cada certa quantidade de dano. No MZ, drops normais só vêm ao morrer. Duas formas de resolver:

- **Sem plugin:** nos **Troop Events**, criar páginas com condição “HP do inimigo ≤ 75%, 50%, 25%” e, em cada uma, **Change Items** para dar um item de cura. Cada página roda uma vez por batalha.
- **Com plugin:** usar um plugin de eventos de batalha mais flexível, se a equipe já tiver um.

### 8.2 Perseguição do monstro

Se o jogador não matar o boss, ele fica perseguindo o personagem pelos mapas da floresta. Use um evento de aparência do monstro com **Movement Type: Approach**, gatilho **Event Touch** e **Battle Processing** ao encostar. Ao vencer, apagar o evento (Erase Event) e ligar o 004.

### 8.3 Fogo na floresta (Ato 2)

- Cada fogo é um evento com gráfico de chama e colisão ligada.
- **Apagar:** evento Action Button. Se o jogador tem a magia de água (switch 016 sugerido ou habilidade aprendida), toca SE de água, executa Erase Event e dá ao jogador a sensação de progresso. Se não tiver, mensagem curta.
- **Perigo:** Player Touch no fogo causa dano pequeno.
- **Boss rush de fogo:** perto do gatinho, uma sequência de grupos de inimigos de fogo.
- Os fogos aleatórios do switch 015 usam a técnica de Control Variables + Set Event Location.

### 8.4 Virar o dia (switch 006)

Quando o jogador dorme no Ato 1: **Fadeout Screen**, **Wait**, mudança da variável “Ato”, **Tint Screen** de volta ao normal, **Fadein** e **Transfer Player** para dentro da casa. Reabilitar a barreira da floresta até a Velhinha liberar (switch 014).

## 9. Parte visual: o que importa nos Atos 1 e 2

### 9.1 Estilo

Colorido, lúdico, quase de desenho infantil. É o “filtro” dos remédios no Ato 1 e no Ato 2.

### 9.2 Assets

- **Tilesets:** coloridos e simples (cidade, interior de casa, floresta).
- **Charsets:** Huwag, NPCs filipinos, monstro, criaturas de fogo, gatinho.
- **Facesets:** só quando entrarem os diálogos.
- **UI:** ícones de itens (ovos, cura, magia de água) e HUD padrão do MZ.

### 9.3 Tonalidade e iluminação

- **Tint Screen** resolve tons suaves (manhã, fim de tarde).
- Plugins (VisuStella ou equivalentes) entram para iluminação, fogo e efeitos mais ricos.
- A arquitetura para o futuro Ato 3 (cinza e dessaturado) já pode ser preparada deixando as cores controladas por tonalidade, mas **não precisa ser implementada agora**.

### 9.4 Áudio

- Trilha instrumental, sem vocais, clima medieval.
- SFX caseiros gravados com objetos do dia a dia (passos, água, fogo).
- **BGS de chamas** para o switch 014.

## 10. Checklist de testes

Teste cada switch isoladamente, em ordem.

1. Porta da estação bloqueia antes do chefe e libera depois (001, 002).
2. Chefe só fala uma vez (página 2 vazia).
3. Ovos: testar os dois caminhos — lutar e vencer (004), fugir (003).
4. A manhã vira fim de tarde e os NPCs somem nos dois caminhos.
5. Chefe após ovos libera cidade e casa (005).
6. Dormir carrega o Ato 2 e bloqueia a floresta (006).
7. As três missões chave abrem e fecham sem travar o jogo (007–013).
8. A Velhinha libera a floresta com qualquer missão completa (014).
9. Entrar na floresta fecha a volta e sorteia fogos diferentes a cada vez (015).
10. Salvar e carregar no meio de cada ato mantém o estado.

## 11. Pontos em aberto e inconsistências

Coisas que apareceram ao cruzar os três materiais e vale decidir antes de construir.

- **Magia de água vs. fugir do boss.** Pelo documento de switches, o jogador pode pegar os ovos e fugir sem derrotar o monstro (switch 003). Pelo áudio, a magia de água vem do monstro e é necessária no Ato 2. Se o jogador fugiu, como obtém a magia? Possibilidades: o jogador ganha a magia de qualquer forma; o monstro volta como inimigo obrigatório no Ato 2; ou há um segundo jeito de aprender a habilidade.
- **Ato 3.** O GDD descreve três atos e a transição visual cinza no Ato 3. O áudio tira o Ato 3 do escopo por agora. O GDD deve ser atualizado para refletir isso.
- **Três missões chave vs. três missões secundárias.** O documento fala em três NPCs chave que liberam a missão principal; o áudio fala em três mini missões espalhadas pelo mapa. Parece ser a mesma coisa, mas vale confirmar.
- **Plataformas.** O GDD cita Windows e Linux na visão geral e Windows/macOS no cronograma. Padronizar.
- **Switches 016–019.** Estão em branco; a seção 7 traz uma proposta.
- **Itens de cura.** A ideia futura é que eles representem fuga da realidade. Por enquanto, nada na descrição do item deve sugerir isso.
