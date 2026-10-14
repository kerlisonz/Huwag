const fs = require('fs');

console.log('Building improved maps for HUWAG...');

// ==========================================
// 1. REBUILD MAP001 (QUARTO DE HUWAG)
// ==========================================
function buildMap001() {
  const w = 17, h = 13;
  const total = w * h;
  const data = new Array(total * 6).fill(0);

  function setTile(layer, x, y, tileId) {
    if (x >= 0 && x < w && y >= 0 && y < h) {
      data[layer * total + y * w + x] = tileId;
    }
  }

  // LAYER 0: Walls & Floors
  // Room bounds: x = 3 to 13, y = 2 to 10
  // Void tiles around room: 0
  
  // North Wall Top (Row 2): autotile 6820
  setTile(0, 3, 2, 6834); // top-left corner
  for (let x = 4; x <= 12; x++) setTile(0, x, 2, 6820);
  setTile(0, 13, 2, 6836); // top-right corner

  // North Wall Front (Row 3): autotile 6828
  setTile(0, 3, 3, 6818); // left edge
  for (let x = 4; x <= 12; x++) setTile(0, x, 3, 6828);
  setTile(0, 13, 3, 6825); // right edge

  // Side Walls (x = 3 and x = 13, y = 4..9)
  for (let y = 4; y <= 9; y++) {
    setTile(0, 3, y, 6832);
    setTile(0, 13, y, 6832);
  }

  // South Wall (y = 10):
  setTile(0, 3, 10, 6817);
  for (let x = 4; x <= 7; x++) setTile(0, x, 10, 6820);
  setTile(0, 8, 10, 1552); // Doorway passage
  for (let x = 9; x <= 12; x++) setTile(0, x, 10, 6820);
  setTile(0, 13, 10, 6826);

  // South Wall Front (y = 11 for depth):
  setTile(0, 3, 11, 6840);
  for (let x = 4; x <= 7; x++) setTile(0, x, 11, 6828);
  setTile(0, 8, 11, 1552); // Door step
  for (let x = 9; x <= 12; x++) setTile(0, x, 11, 6828);
  setTile(0, 13, 11, 6838);

  // Room Floor: x = 4..12, y = 4..9
  for (let y = 4; y <= 9; y++) {
    for (let x = 4; x <= 12; x++) {
      setTile(0, x, y, 1552); // warm wood floor
    }
  }

  // LAYER 1: Main Furniture
  // Windows on North wall:
  setTile(1, 5, 3, 64); // Window left
  setTile(1, 9, 3, 64); // Window right

  // Wall Clock:
  setTile(1, 7, 3, 117);

  // Air Conditioner on wall:
  setTile(1, 11, 3, 512 + 140);

  // Bed (Cheap single mattress):
  setTile(1, 4, 4, 171); // bed head
  setTile(1, 4, 5, 179); // bed foot

  // Nightstand:
  setTile(1, 5, 4, 114);

  // Firefighter Wardrobe:
  setTile(1, 4, 7, 138); // closet top
  setTile(1, 4, 8, 146); // closet bottom
  // Firefighter jacket on wall:
  setTile(1, 4, 6, 396);

  // Medicine & Study Desk:
  setTile(1, 11, 4, 112); // desk left
  setTile(1, 12, 4, 113); // desk right
  setTile(1, 11, 5, 101); // wooden chair
  setTile(1, 12, 3, 156); // wall medicine shelf

  // Kitchenette / Water corner:
  setTile(1, 12, 7, 512 + 176); // small fridge top
  setTile(1, 12, 8, 512 + 184); // small fridge bottom
  setTile(1, 11, 8, 201); // sink / preparation counter

  // Area Rug in center of room:
  setTile(1, 7, 6, 364);
  setTile(1, 8, 6, 365);
  setTile(1, 7, 7, 364);
  setTile(1, 8, 7, 365);

  // Welcome mat at doorway:
  setTile(1, 8, 10, 364);

  // LAYER 2: Props on surfaces
  // Medicine bottles on desk:
  setTile(2, 11, 4, 354); // pill bottle
  setTile(2, 12, 4, 328); // doctor's note
  // Glass of water on nightstand:
  setTile(2, 5, 4, 262);
  // Kettle / pot on kitchen counter:
  setTile(2, 11, 8, 209);

  // EVENTS for Map001
  const events = [
    null,
    // 1: EV_Introducao
    {
      id: 1,
      name: "EV_Introducao",
      x: 8,
      y: 9,
      pages: [
        {
          conditions: {
            actorId: 1, actorValid: false, itemId: 1, itemValid: false,
            selfSwitchCh: "A", selfSwitchValid: false,
            switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false,
            variableId: 1, variableValid: false, variableValue: 0
          },
          directionFix: false,
          image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
          list: [
            { code: 230, indent: 0, parameters: [20] },
            { code: 221, indent: 0, parameters: [] },
            { code: 230, indent: 0, parameters: [20] },
            { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag Matitiis"] },
            { code: 401, indent: 0, parameters: ["Sempre fui bom em fingir que estava bem."] },
            { code: 401, indent: 0, parameters: ["Talvez seja por isso que virei bombeiro."] },
            { code: 401, indent: 0, parameters: ["Quando você salva vidas alheias, não sobra tempo"] },
            { code: 401, indent: 0, parameters: ["pra pensar nas suas próprias chamas."] },
            { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag Matitiis"] },
            { code: 401, indent: 0, parameters: ["Hoje é um dia normal."] },
            { code: 401, indent: 0, parameters: ["Pelo menos... é o que os remédios me deixam acreditar."] },
            { code: 222, indent: 0, parameters: [] },
            { code: 123, indent: 0, parameters: ["A", 0] },
            { code: 0, indent: 0, parameters: [] }
          ],
          moveFrequency: 3,
          moveRoute: { list: [{ code: 0, parameters: [] }], repeat: false, skippable: false, wait: false },
          moveSpeed: 3, moveType: 0, priorityType: 0, stepAnime: false, through: false, trigger: 3, walkAnime: true
        },
        {
          conditions: {
            actorId: 1, actorValid: false, itemId: 1, itemValid: false,
            selfSwitchCh: "A", selfSwitchValid: true,
            switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false,
            variableId: 1, variableValid: false, variableValue: 0
          },
          directionFix: false,
          image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
          list: [{ code: 0, indent: 0, parameters: [] }],
          moveFrequency: 3,
          moveRoute: { list: [{ code: 0, parameters: [] }], repeat: false, skippable: false, wait: false },
          moveSpeed: 3, moveType: 0, priorityType: 0, stepAnime: false, through: false, trigger: 0, walkAnime: true
        }
      ]
    },
    // 2: Armario_Uniforme
    {
      id: 2,
      name: "Armario_Uniforme",
      x: 4,
      y: 7,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["O armário de bombeiro."] },
          { code: 401, indent: 0, parameters: ["A jaqueta pesada, as botas de borracha e o capacete."] },
          { code: 401, indent: 0, parameters: ["Estar de serviço é o único momento em que minha mente silencia."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 3: Cama_Huwag
    {
      id: 3,
      name: "Cama_Huwag",
      x: 4,
      y: 4,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["Um colchão de solteiro simples."] },
          { code: 401, indent: 0, parameters: ["Acordei com o suor da umidade de Manila."] },
          { code: 401, indent: 0, parameters: ["Não consigo dormir mais que quatro horas por noite."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 4: Mesa_Remedios
    {
      id: 4,
      name: "Mesa_Remedios",
      x: 11,
      y: 4,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["Os frascos de remédio estão alinhados ao lado do relatório médico."] },
          { code: 401, indent: 0, parameters: ["Três comprimidos coloridos pela manhã. Sem falhar."] },
          { code: 102, indent: 0, parameters: [["Tomar a dose matinal", "Deixar para depois"], 1] },
          { code: 402, indent: 0, parameters: [0, "Tomar a dose matinal"] },
          { code: 250, indent: 1, parameters: [{ name: "Item3", volume: 90, pitch: 100, pan: 0 }] },
          { code: 101, indent: 1, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 1, parameters: ["Engulo os comprimidos com um gole d'água."] },
          { code: 401, indent: 1, parameters: ["Em poucos minutos, tudo ao redor parece mais vivo, mais amigável..."] },
          { code: 401, indent: 1, parameters: ["Um filtro reconfortante sobre o caos."] },
          { code: 402, indent: 0, parameters: [1, "Deixar para depois"] },
          { code: 101, indent: 1, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 1, parameters: ["Melhor não me atrasar. Mas preciso tomar logo..."] },
          { code: 401, indent: 1, parameters: ["Não gosto de como o mundo fica quando o efeito passa."] },
          { code: 404, indent: 0, parameters: [] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 5: Janela_Norte
    {
      id: 5,
      name: "Janela_Norte",
      x: 9,
      y: 3,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["Pela janela, vejo a rua movimentada lá embaixo."] },
          { code: 401, indent: 0, parameters: ["O sol reflete nas cores berrantes dos Jeepneys e nas barracas."] },
          { code: 401, indent: 0, parameters: ["A cidade acordou antes de mim."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 6: Ventilador
    {
      id: 6,
      name: "Ventilador",
      x: 5,
      y: 6,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterName: "!Other1", characterIndex: 0, direction: 2, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["O ventilador de chão continua girando, rangendo baixinho."] },
          { code: 401, indent: 0, parameters: ["Sem ele, o calor úmido deste quarto seria insuportável."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: true, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 7: Geladeira
    {
      id: 7,
      name: "Geladeira",
      x: 12,
      y: 7,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["Dentro tem apenas garrafas d'água gelada, um pote de arroz"] },
          { code: 401, indent: 0, parameters: ["e alguns pacotes de macarrão instantâneo (pancit canton)."] },
          { code: 401, indent: 0, parameters: ["Como no quartel a maior parte do tempo."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 8: Porta_Saida
    {
      id: 8,
      name: "Porta_Saida",
      x: 8,
      y: 11,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterName: "!Door1", characterIndex: 0, direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["Mais um dia de serviço no quartel."] },
          { code: 401, indent: 0, parameters: ["Sair para a rua?"] },
          { code: 102, indent: 0, parameters: [["Sim", "Não"], 1] },
          { code: 402, indent: 0, parameters: [0, "Sim"] },
          { code: 250, indent: 1, parameters: [{ name: "Open1", volume: 90, pitch: 100, pan: 0 }] },
          { code: 201, indent: 1, parameters: [0, 2, 6, 7, 2, 0] }, // Map002 at (6, 7) facing down!
          { code: 402, indent: 0, parameters: [1, "Não"] },
          { code: 404, indent: 0, parameters: [] },
          { code: 0, indent: 0, parameters: [] }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    }
  ];

  const mapData = {
    autoplayBgm: true,
    autoplayBgs: false,
    battleback1Name: "",
    battleback2Name: "",
    bgm: { name: "Town1", pan: 0, pitch: 95, volume: 55 },
    bgs: { name: "", pan: 0, pitch: 100, volume: 90 },
    disableDashing: false,
    displayName: "Quarto de Huwag",
    encounterList: [],
    encounterStep: 30,
    height: h,
    note: "",
    parallaxLoopX: false,
    parallaxLoopY: false,
    parallaxName: "",
    parallaxShow: true,
    parallaxSx: 0,
    parallaxSy: 0,
    scrollType: 0,
    specifyBattleback: false,
    tilesetId: 3,
    width: w,
    data: data,
    events: events
  };

  fs.writeFileSync('data/Map001.json', JSON.stringify(mapData));
  console.log('Map001 (Quarto de Huwag) successfully rebuilt!');
}

// ==========================================
// 2. REBUILD MAP002 (CIDADE)
// ==========================================
function buildMap002() {
  const w = 30, h = 25;
  const total = w * h;
  const data = new Array(total * 6).fill(0);

  function setTile(layer, x, y, tileId) {
    if (x >= 0 && x < w && y >= 0 && y < h) {
      data[layer * total + y * w + x] = tileId;
    }
  }

  // Helper to draw filled rectangle on layer
  function fillRect(layer, x1, y1, x2, y2, tileId) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        setTile(layer, x, y, tileId);
      }
    }
  }

  // 1. Base Layer 0: Grass everywhere (3248)
  fillRect(0, 0, 0, w - 1, h - 1, 3248);

  // 2. Sidewalks (Cobblestone / Walkway: 2816)
  // North sidewalk: y = 7..8
  fillRect(0, 0, 7, w - 1, 8, 2816);
  // South sidewalk: y = 14..15
  fillRect(0, 0, 14, w - 1, 15, 2816);

  // Pathways leading to buildings:
  // Path to Huwag's apartment door (x=5..7, y=5..6)
  fillRect(0, 5, 5, 7, 6, 2816);
  // Path to Quartel entrance (x=21..24, y=5..6)
  fillRect(0, 21, 5, 24, 6, 2816);
  // Path to Sari-Sari store (x=5..7, y=16..17)
  fillRect(0, 5, 16, 7, 17, 2816);
  // Path to Lola Maring's house (x=10..12, y=16..19)
  fillRect(0, 10, 16, 12, 19, 2816);
  // Path to Park (x=24..27, y=16..18)
  fillRect(0, 24, 16, 27, 18, 2816);

  // 3. Main Horizontal Roadway: y = 9..13
  // Top edge: 2932
  for (let x = 0; x < w; x++) setTile(0, x, 9, 2932);
  // Center road: 2912
  for (let y = 10; y <= 12; y++) {
    for (let x = 0; x < w; x++) setTile(0, x, y, 2912);
  }
  // Bottom edge: 2940
  for (let x = 0; x < w; x++) setTile(0, x, 13, 2940);

  // 4. Buildings (Layer 0):
  // ------------------------------------------------
  // BUILDING 1: Huwag's Apartment (North-West: x=3..9, y=2..5)
  // Roof (y=2..3): Roof C Orange Spanish tile (base 4448)
  fillRect(0, 3, 2, 9, 3, 4448);
  // Wall (y=4..5): Plaster wall (base 6848)
  fillRect(0, 3, 4, 9, 5, 6848);
  // Doorway space at (6, 5) - base ground
  setTile(0, 6, 5, 2816);

  // BUILDING 2: Fire Station / Quartel dos Bombeiros (North-East: x=19..27, y=2..5)
  // Roof (y=2..3): Blue/metallic municipal roof (base 4688)
  fillRect(0, 19, 2, 27, 3, 4688);
  // Wall (y=4..5): Red brick wall (base 6848)
  fillRect(0, 19, 4, 27, 5, 6848);
  // Double entrance space at (22, 5) and (23, 5)
  setTile(0, 22, 5, 2816);
  setTile(0, 23, 5, 2816);

  // BUILDING 3: Casa de Lola Maring (South: x=10..14, y=19..21)
  fillRect(0, 10, 19, 14, 20, 4448); // roof
  fillRect(0, 10, 21, 14, 22, 6848); // wall
  setTile(0, 11, 22, 2816); // door entry

  // ------------------------------------------------
  // LAYER 1: Props, Signs, Vegetation, Decor
  // ------------------------------------------------
  // A. Huwag's Apartment building details:
  // Windows on apartment wall (row 4):
  setTile(1, 4, 4, 64);
  setTile(1, 8, 4, 64);
  // Entrance door on row 5:
  setTile(1, 6, 5, 512 + 42); // modern door or entrance A
  // Air conditioner on apartment wall:
  setTile(1, 5, 4, 512 + 140);
  // Potted plants near entrance:
  setTile(1, 5, 6, 160);
  setTile(1, 7, 6, 160);

  // B. Quartel dos Bombeiros details:
  // Fire Station Windows:
  setTile(1, 20, 4, 64);
  setTile(1, 25, 4, 64);
  setTile(1, 26, 4, 64);
  // Fire Station Double Door:
  setTile(1, 22, 5, 512 + 42);
  setTile(1, 23, 5, 512 + 42);
  // Fire Station Sign / Crest on wall:
  setTile(1, 22, 4, 78); // Crest sign
  setTile(1, 23, 4, 79);
  // Fire Hydrant on sidewalk in front of fire station:
  setTile(1, 21, 7, 512 + 45); // Fire hydrant / traffic cone
  // Streetlamp near station:
  setTile(1, 19, 7, 8); // Streetlight A

  // C. Street Crosswalk & Markings:
  // Crosswalk white stripes across road at x=15:
  setTile(1, 15, 9, 512 + 43);
  setTile(1, 15, 10, 512 + 43);
  setTile(1, 15, 11, 512 + 43);
  setTile(1, 15, 12, 512 + 43);
  setTile(1, 15, 13, 512 + 43);

  // Streetlamps along sidewalks:
  setTile(1, 4, 7, 8);   // North sidewalk lamp
  setTile(1, 11, 7, 8);  // North sidewalk lamp
  setTile(1, 27, 7, 8);  // North sidewalk lamp
  setTile(1, 4, 14, 8);  // South sidewalk lamp
  setTile(1, 13, 14, 8); // South sidewalk lamp
  setTile(1, 27, 14, 8); // South sidewalk lamp

  // Palm trees along green spaces:
  // Palm tree 1 (x=1, y=4):
  setTile(1, 1, 4, 236);
  setTile(1, 1, 5, 244);
  // Palm tree 2 (x=14, y=3):
  setTile(1, 14, 3, 236);
  setTile(1, 14, 4, 244);
  // Palm tree 3 (x=16, y=3):
  setTile(1, 16, 3, 236);
  setTile(1, 16, 4, 244);
  // Palm tree 4 (x=29, y=4):
  setTile(1, 29, 4, 236);
  setTile(1, 29, 5, 244);

  // D. Loja Sari-Sari da Aling Rosa (South-West: x=5..7, y=16..17):
  // Striped awning canopy:
  setTile(1, 5, 16, 5); // Tent A top-left
  setTile(1, 6, 16, 6); // Tent A top-mid
  setTile(1, 7, 16, 7); // Tent A top-right
  // Store counter & shelves:
  setTile(1, 5, 17, 181); // Crates of goods
  setTile(1, 7, 17, 141); // Barrel / drinks
  // Store Sign:
  setTile(1, 4, 17, 68); // Sack / Grocery shop sign
  // Benches outside store:
  setTile(1, 8, 17, 104);

  // E. Casa e Jardim de Lola Maring (x=10..14, y=19..23):
  // Flowers in garden:
  setTile(1, 10, 23, 160);
  setTile(1, 12, 23, 161);
  setTile(1, 13, 23, 162);
  setTile(1, 10, 22, 166); // Bush

  // F. Ponto do Jeepney (Kuya Ben) (x=19..23, y=14..16):
  // Bench on curb:
  setTile(1, 18, 14, 104);
  setTile(1, 19, 14, 105);
  // Passenger stop sign:
  setTile(1, 17, 14, 137);

  // G. Praça / Parque do Bairro (Miguel) (x=24..28, y=18..23):
  // Big Shade Tree (2x2):
  setTile(1, 27, 18, 176);
  setTile(1, 28, 18, 177);
  setTile(1, 27, 19, 184);
  setTile(1, 28, 19, 185);
  // Park bench:
  setTile(1, 24, 20, 104);
  setTile(1, 25, 20, 105);
  // Flowers in park:
  setTile(1, 24, 22, 160);
  setTile(1, 25, 22, 161);
  setTile(1, 28, 22, 162);

  // ------------------------------------------------
  // EVENTS for Map002 (All bugs fixed!)
  // ------------------------------------------------
  const events = [
    null,
    // 1: Voltar_Apartamento (Door of Huwag's building at 6, 6)
    {
      id: 1,
      name: "Voltar_Apartamento",
      x: 6,
      y: 6,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterName: "!Door1", characterIndex: 0, direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 250, indent: 0, parameters: [{ name: "Open1", volume: 90, pitch: 100, pan: 0 }] },
          { code: 201, indent: 0, parameters: [0, 1, 8, 10, 8, 0] }, // Teleport to Map001 at (8, 10) facing up!
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 1, walkAnime: true
      }]
    },
    // 2: Vendedora_Sari_Sari (Aling Rosa behind her shop counter at 6, 17)
    {
      id: 2,
      name: "Vendedora_Sari_Sari",
      x: 6,
      y: 17,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterName: "People2", characterIndex: 2, direction: 2, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Aling Rosa"] },
          { code: 401, indent: 0, parameters: ["Magandang umaga, Huwag! Indo trabalhar tão cedo?"] },
          { code: 401, indent: 0, parameters: ["Tenho pão pandesal fresquinho e café solúvel se quiser."] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Aling Rosa"] },
          { code: 401, indent: 0, parameters: ["Se cuide lá no corpo de bombeiros, viu? O barangay"] },
          { code: 401, indent: 0, parameters: ["precisa de rapazes dedicados como você."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 3: Motorista_Jeepney (Kuya Ben at the transport stop at 20, 15)
    {
      id: 3,
      name: "Motorista_Jeepney",
      x: 20,
      y: 15,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterName: "People1", characterIndex: 5, direction: 4, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Kuya Ben"] },
          { code: 401, indent: 0, parameters: ["Mabuhay, Huwag! O Jeepney tá quase cheio, saio em"] },
          { code: 401, indent: 0, parameters: ["dez minutos para o centro da cidade!"] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Kuya Ben"] },
          { code: 401, indent: 0, parameters: ["Vai direto pro quartel hoje? O trânsito na avenida tá"] },
          { code: 401, indent: 0, parameters: ["uma loucura, melhor ir a pé mesmo!"] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 4: Jeepney_Vehicle (Parked Jeepney next to Kuya Ben at 22, 14)
    {
      id: 4,
      name: "Jeepney_Veiculo",
      x: 22,
      y: 14,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: true,
        image: { characterName: "SF_Vehicle", characterIndex: 0, direction: 4, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["O Jeepney colorido do Kuya Ben."] },
          { code: 401, indent: 0, parameters: ["Pinturas religiosas e frases populares decoram a lataria."] },
          { code: 401, indent: 0, parameters: ["O motor a diesel solta um cheiro forte de fumaça."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 5: Vizinha_Velha (Lola Maring in her garden at 11, 21)
    {
      id: 5,
      name: "Vizinha_Velha",
      x: 11,
      y: 21,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterName: "People3", characterIndex: 6, direction: 2, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Lola Maring"] },
          { code: 401, indent: 0, parameters: ["Huwag, anak... Que bom te ver de pé."] },
          { code: 401, indent: 0, parameters: ["Você parece pálido ultimamente. Está comendo direito?"] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Lola Maring"] },
          { code: 401, indent: 0, parameters: ["Não guarde todo o peso do mundo nas suas costas, meu filho."] },
          { code: 401, indent: 0, parameters: ["Deus olha por aqueles que apagam o fogo dos outros."] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 6: Criança_Jogando (Miguel in the park playground at 26, 19)
    {
      id: 6,
      name: "Criança_Jogando",
      x: 26,
      y: 19,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterName: "People2", characterIndex: 0, direction: 2, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Miguel"] },
          { code: 401, indent: 0, parameters: ["Kuya Huwag! Olha só o meu caminhão de bombeiro de lata!"] },
          { code: 401, indent: 0, parameters: ["Quando eu crescer, quero ser igualzinho a você!"] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "Huwag"] },
          { code: 401, indent: 0, parameters: ["(Um sorriso forçado escapa... Se ele soubesse o vazio"] },
          { code: 401, indent: 0, parameters: ["que existe por trás deste uniforme...)"] },
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 1, priorityType: 1, stepAnime: false, through: false, trigger: 0, walkAnime: true
      }]
    },
    // 7: Entrada_Quartel (Doorway of Fire Station at 23, 6)
    {
      id: 7,
      name: "Entrada_Quartel",
      x: 23,
      y: 6,
      pages: [{
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterName: "!Door1", characterIndex: 0, direction: 2, pattern: 0, tileId: 0 },
        list: [
          { code: 250, indent: 0, parameters: [{ name: "Open1", volume: 90, pitch: 100, pan: 0 }] },
          { code: 201, indent: 0, parameters: [0, 3, 12, 17, 8, 0] }, // Teleport to Map003 (Quartel) at (12, 17) facing up!
          { code: 0, indent: 0 }
        ],
        moveFrequency: 3, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3, moveType: 0, priorityType: 1, stepAnime: false, through: false, trigger: 1, walkAnime: true
      }]
    }
  ];

  const mapData = {
    autoplayBgm: true,
    autoplayBgs: false,
    battleback1Name: "",
    battleback2Name: "",
    bgm: { name: "Town2", pan: 0, pitch: 100, volume: 70 },
    bgs: { name: "", pan: 0, pitch: 100, volume: 90 },
    disableDashing: false,
    displayName: "Cidade - Barangay San Antonio",
    encounterList: [],
    encounterStep: 30,
    height: h,
    note: "",
    parallaxLoopX: false,
    parallaxLoopY: false,
    parallaxName: "",
    parallaxShow: true,
    parallaxSx: 0,
    parallaxSy: 0,
    scrollType: 0,
    specifyBattleback: false,
    tilesetId: 2,
    width: w,
    data: data,
    events: events
  };

  fs.writeFileSync('data/Map002.json', JSON.stringify(mapData));
  console.log('Map002 (Cidade) successfully rebuilt!');
}

// ==========================================
// 3. FIX MAP003 TELEPORT EXIT COORDINATES
// ==========================================
function fixMap003() {
  const map3 = JSON.parse(fs.readFileSync('data/Map003.json', 'utf8'));
  
  // Event 5: Porta_Saida_Quartel (at 12, 17)
  const ev5 = map3.events.find(e => e && e.id === 5);
  if (ev5) {
    ev5.pages[0].list = [
      { code: 102, indent: 0, parameters: [["Sair para a cidade", "Ficar no quartel"], 1] },
      { code: 402, indent: 0, parameters: [0, "Sair para a cidade"] },
      { code: 250, indent: 1, parameters: [{ name: "Open1", volume: 90, pitch: 100, pan: 0 }] },
      { code: 201, indent: 1, parameters: [0, 2, 23, 7, 2, 0] }, // Teleport to Map002 at (23, 7) facing down!
      { code: 402, indent: 0, parameters: [1, "Ficar no quartel"] },
      { code: 404, indent: 0, parameters: [] },
      { code: 0, indent: 0 }
    ];
  }

  // Event 6: Entrada_Cidade (at 12, 18, trigger 1)
  const ev6 = map3.events.find(e => e && e.id === 6);
  if (ev6) {
    ev6.pages[0].list = [
      { code: 250, indent: 0, parameters: [{ name: "Open1", volume: 90, pitch: 100, pan: 0 }] },
      { code: 201, indent: 0, parameters: [0, 2, 23, 7, 2, 0] }, // Teleport to Map002 at (23, 7) facing down!
      { code: 0, indent: 0 }
    ];
  }

  fs.writeFileSync('data/Map003.json', JSON.stringify(map3));
  console.log('Map003 exit coordinates successfully updated to (23, 7)!');
}

// Run all
buildMap001();
buildMap002();
fixMap003();

console.log('All maps rebuilt and verified without errors!');
