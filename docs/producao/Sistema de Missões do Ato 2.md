# Huwag — Sistema de Missões do Ato 2

Baseado no GDD v0.0.2, no documento de switches (switch001–015) e nos dois áudios de 05/11/2026. Complementa o guia de desenvolvimento no RPG Maker MZ e **substitui** o que ele diz sobre as missões chave (switches 008 a 014).

## 1. O que mudou

No primeiro áudio, o Ato 2 tinha três mini missões espalhadas pelo mapa (ajudar alguém a pegar uma coisa, enviar uma mensagem, mini game, ajudar na cozinha, vender itens). No documento de switches, cada NPC chave (chave1, chave2, chave3) abria uma missão e, ao fechá-la, liberava a missão principal.

No segundo áudio você percebeu um problema: **fazer três missões em sequência antes de continuar a história principal prejudicaria a dinâmica do jogo.** A solução:

- As três missões são **opcionais**, cada uma em um canto do mapa.
- O jogador precisa completar **pelo menos uma** para o tempo passar e a missão principal ficar disponível.
- Quem quiser pode fazer todas, mas não é obrigado.
- O chefe do departamento **promete uma recompensa** caso o protagonista resolva uma missão.
- Ao voltar ao corpo de bombeiros, o jogador já vai para a missão principal (ajudar a senhora a resgatar o gatinho).
- Depois de sair da floresta, o jogador pode explorar o mapa e fazer as outras duas missões.

## 2. Fluxo do Ato 2

1. **Começo do dia.** O jogador acorda em casa, vai até o corpo de bombeiros e fala com o chefe pela primeira vez no Ato 2 (switch 007). O chefe apresenta as três pessoas que precisam de ajuda e promete uma recompensa se o jogador resolver uma delas.
2. **Exploração livre.** A cidade está aberta. Os três NPCs chave estão cada um em um canto do mapa.
3. **Primeira missão concluída.** Ao fechar qualquer uma das três, o tempo passa (a manhã vira tarde) e a missão principal fica disponível.
4. **Volta ao corpo de bombeiros.** O chefe entrega a recompensa prometida e a Velhinha, na sala de espera, conta sobre o gatinho desaparecido (switch 014). A passagem da floresta se abre.
5. **Floresta em chamas.** Ao entrar no primeiro corredor (switch 015), a volta para a cidade se fecha e os fogos surgem de forma aleatória. O jogador usa a magia de água, enfrenta alguns monstros de fogo e resgata o gatinho.
6. **Devolver o gatinho.** Cumprida a missão principal, a passagem para a cidade reabre.
7. **Depois da floresta.** As missões que sobraram continuam disponíveis. O jogador pode completá-las ou ir para casa dormir.

## 3. As três missões opcionais

Os exemplos do primeiro áudio dão um bom ponto de partida. A associação abaixo é uma **sugestão**, a confirmar por você.

| NPC | Ideia de missão (do áudio) | Complexidade |
| --- | --- | --- |
| chave1 | Ajudar alguém a pegar uma coisa (buscar um objeto e entregar) | Baixa: dois eventos e um item. |
| chave2 | Enviar uma mensagem para outra pessoa | Baixa: dois NPCs e diálogo curto. |
| chave3 | Mini game, ajudar na cozinha ou vender itens | Média: exige uma pequena mecânica. |

Como o foco agora é o jogo base, qualquer uma delas pode começar só com mensagens curtas, sem diálogo elaborado.

## 4. Switches revisados (007 a 015)

A coluna “Mudança” diz o que difere do documento original.

| Switch | Condição → efeito | Mudança |
| --- | --- | --- |
| 007 | Falar com o chefe pela primeira vez no Ato 2 → libera os três NPCs chave | **Acrescentar:** o chefe promete a recompensa nesse diálogo. |
| 008 | Falar com o chave1 pela primeira vez → desbloqueia a missão chave1 | Sem mudança. |
| 009 | Falar com o chave1 pela segunda vez → fecha a missão chave1 | **Muda:** não libera mais a missão principal sozinho; liga o switch auxiliar abaixo se for a primeira missão concluída. |
| 010 e 011 | Mesma lógica para o chave2 | Mesma mudança do 009. |
| 012 e 013 | Mesma lógica para o chave3 | Mesma mudança do 009. |
| 014 | Falar com a Velhinha depois de qualquer missão → libera a floresta e toca som de chamas | Sem mudança de regra: já era “qualquer” missão. Passa a depender do switch auxiliar. |
| 015 | Entrar no primeiro corredor da floresta → bloqueia a volta e sorteia fogos | Sem mudança. |

### Switches e variáveis novos

Sugestões, já que os switches 016–019 estavam em branco (o guia anterior reservou 016–019 para outras funções; por isso estes ficam acima).

| Item | Função |
| --- | --- |
| Switch 020 “Alguma\_missao\_completa” | Liga quando a primeira das três missões fecha. Resolve o fato de o MZ não aceitar “OU” nas condições de página: o chefe e a Velhinha olham só para este switch. |
| Switch 021 “Recompensa\_entregue” | Garante que o chefe entrega a recompensa uma única vez. |
| Variável “Missoes\_concluidas” (0 a 3) | Soma a cada missão fechada. Útil para o chefe reagir de formas diferentes e para eventuais finais. |

## 5. Como montar no editor

- **Fechar uma missão (009, 011, 013):** no evento do NPC, dentro da página de conclusão, execute: Control Switches (o switch da missão), Control Variables (Missoes\_concluidas + 1) e um **Conditional Branch** “Switch 020 está OFF”. Se estiver, liga o 020 e chama o Common Event de passar o tempo.
- **Passar o tempo:** reaproveite o Common Event “Virar\_Tarde” (Tint Screen alaranjado, NPCs normais trocam de página) já usado no Ato 1, para o jogador sentir que o dia avançou.
- **Chefe:** páginas, da mais à esquerda para a mais à direita:
  1. Ato 2 sem missão concluída (condição: Ato = 2).
  2. Switch 020 ON e 021 OFF: dá a recompensa (Change Items, Change Gold ou outro) e liga o 021.
  3. Switch 021 ON: diálogo curto de incentivo, sem repetir recompensa.
- **Velhinha:** página com condição Switch 020 ON; ao falar, liga o 014 e libera a floresta.
- **Missões que sobram:** os NPCs chave não devem sumir nem travar depois da floresta. Mantenha as páginas das missões independentes do 015.
- **Dormir (fim do Ato 2):** a porta da casa precisa funcionar a qualquer momento depois da floresta, mesmo que o jogador tenha deixado missões sem fazer.

## 6. Checklist de testes

1. Fechar **só uma** missão (cada uma das três, separadamente) libera o chefe, a Velhinha e a floresta.
2. Fechar **as três** antes de falar com o chefe não entrega a recompensa três vezes.
3. Falar com a Velhinha **antes** de qualquer missão não libera a floresta.
4. O tempo só passa na **primeira** missão concluída, não nas seguintes.
5. Depois da floresta, as missões que sobraram continuam disponíveis e fechando-as não repete a passagem de tempo nem a recompensa.
6. Entrar na floresta fecha a volta; terminar o resgate reabre.
7. Salvar e carregar no meio de uma missão mantém o estado.

## 7. Pontos em aberto

- **Qual é a recompensa?** O áudio só diz que o chefe promete uma. Pode ser dinheiro (no áudio 1 o jogador já tem um dinheiro definido), um item ou um equipamento. Ela vale por **uma** missão ou por cada uma? Se for por cada uma, o switch 021 vira uma recompensa por NPC.
- **Quem dispara a missão principal: o chefe ou a Velhinha?** No documento de switches é a Velhinha (014). No áudio, o jogador “volta para o corpo de bombeiros e ajuda a senhora”. Provavelmente, o chefe dá a recompensa e a Velhinha pede o resgate, mas vale confirmar a ordem.
- **O que passa o tempo.** O áudio diz que a primeira missão faz “o tempo passar”. Confirmar se é só visual (tint) ou se algo no mapa muda (NPCs somem, loja fecha).
- **Trecho duvidoso do áudio.** Em \[0:28\] a transcrição fica incompleta em “ir para o corpo dos bombeiros esperando um…”. Pode ser que haja uma regra sobre esperar algo no corpo de bombeiros. Vale confirmar.
- **Magia de água e boss do Ato 1** (pendente do guia anterior): se o jogador fugir do monstro no Ato 1, como consegue a magia de água para apagar o fogo no Ato 2?
