# tools/ — scripts de apoio

Scripts em Node.js puro, **sem dependências externas**. Requer Node 18 ou superior.
Todos resolvem os caminhos a partir de `__dirname`, então podem ser executados de qualquer
diretório.

| Script | O que faz | Como rodar |
|---|---|---|
| `validate.js` | confere JSONs, switches, mapas, plugins, links e resíduos | `node tools/validate.js` |
| `serve.js` | serve `game/` em HTTP para testar no navegador | `node tools/serve.js [porta]` |
| `verify-jabs.js` | valida a ordem/dependências dos plugins J-ABS | `node tools/verify-jabs.js` |
| `verify-demo.js` | confere os dados da demo de combate (skill 235, arma, mapas 002/004) | `node tools/verify-demo.js` |

## Quando usar

- **Antes de commitar:** `node tools/validate.js`.
- **Ao mexer em plugins:** `node tools/verify-jabs.js`.
- **Ao mexer nos dados da demo:** `node tools/verify-demo.js`.
- **Para testar no navegador:** `node tools/serve.js` e abrir <http://localhost:8080>.

## O que não fica aqui

Os scripts de autoria de dados (`author-demo.js`, `author-player-attack.js`) e os experimentos
pontuais continuam em `.tmp/`, que é local e não versionado. Se algum deles virar rotina, mova
para cá e ajuste os caminhos como nos scripts acima.
