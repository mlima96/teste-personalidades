/* =========================
   UTILIDADES
========================= */
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/* =========================
   ESTADO
========================= */
let stage = "intro"; // intro | quiz | result
let current = 0;
let selected = null;

let scores = { I:0, C:0, A:0, O:0 };

const app = document.getElementById("app");
document.getElementById("resetBtn").onclick = reset;

/* =========================
   QUESTÕES (ORIGINAIS)
========================= */
const questions = [
  ["Eu sou...", ["I Idealista, criativo e visionário", "C Divertido, espiritual e benéfico", "O Confiável, meticuloso e previsível", "A Focado, determinado e persistente"]],
  ["Eu gosto de...", ["A Ser piloto", "C Conversar com os passageiros", "O Planejar a viagem", "I Explorar novas rotas"]],
  ["Se você quiser se dar bem comigo...", ["I Me dê liberdade", "O Me deixe saber sua expectativa", "A Lidere, siga ou saia do caminho", "C Seja amigável e compreensivo"]],
  ["Para conseguir bons resultados é preciso...", ["I Ter incertezas", "O Controlar o essencial", "C Diversão e celebração", "A Planejar e obter recursos"]],
  ["Eu me divirto quando...", ["A Estou me exercitando", "I Tenho novidades", "C Estou com os outros", "O Determino as regras"]],
  ["Eu penso que...", ["C Unidos venceremos", "A O ataque é melhor que a defesa", "I É bom ser manso, mas andar com um porrete", "O Um homem prevenido vale por dois"]],
  ["Minha preocupação é...", ["I Gerar a ideia global", "C Fazer com que as pessoas gostem", "O Fazer com que funcione", "A Fazer com que aconteça"]],
  ["Eu prefiro...", ["I Perguntas a respostas", "O Ter todos os detalhes", "A Vantagens a meu favor", "C Que todos tenham a chance de ser ouvidos"]],
  ["Eu gosto de...", ["A Fazer progresso", "C Construir memórias", "O Fazer sentido", "I Tornar as pessoas confortáveis"]],
  ["Eu gosto de chegar...", ["A Na frente", "C Junto", "O Na hora", "I Em outro lugar"]],
  ["Um ótimo dia para mim é quando...", ["A Consigo fazer muitas coisas", "C Me divirto com meus amigos", "O Tudo segue conforme planejado", "I Desfruto de coisas novas"]],
  ["Eu vejo a morte como...", ["I Uma grande aventura misteriosa", "C Oportunidade de rever os falecidos", "O Um modo de receber recompensas", "A Algo que sempre chega cedo"]],
  ["Minha filosofia de vida é...", ["A Sou um ganhador", "C Para eu ganhar ninguém precisa perder", "O Seguir regras", "I Inventar novas regras"]],
  ["Eu sempre gostei de...", ["I Explorar", "O Evitar surpresas", "A Focar na meta", "C Abordagem natural"]],
  ["Eu gosto de mudanças se...", ["A Me der vantagem", "C For divertido", "I Me der liberdade", "O Me der controle"]],
  ["Não existe nada de errado em...", ["A Me colocar na frente", "C Colocar outros na frente", "I Mudar de ideia", "O Ser consistente"]],
  ["Busco conselhos de...", ["A Pessoas bem-sucedidas", "C Anciãos", "O Autoridades", "I Lugares estranhos"]],
  ["Meu lema é...", ["I Fazer o que precisa ser feito", "O Fazer bem feito", "C Fazer junto", "A Simplesmente fazer"]],
  ["Eu gosto de...", ["I Complexidade", "O Ordem", "C Calor humano", "A Simplicidade"]],
  ["Tempo para mim é...", ["A Não desperdiçar", "C Um grande ciclo", "O Uma flecha", "I Irrelevante"]],
  ["Se eu fosse bilionário...", ["C Faria doações", "O Criaria reservas", "I Faria o que desse vontade", "A Exibiria"]],
  ["Eu acredito que...", ["A Destino é mais importante", "C Jornada é mais importante", "O Economizar é ganhar", "I Um navio e uma estrela"]],
  ["Eu acredito também que...", ["A Quem hesita perde", "O De grão em grão", "C O que vai volta", "I Um sorriso é relativo"]],
  ["Eu acredito ainda que...", ["O Prudência é melhor", "I Autoridade deve ser desafiada", "A Ganhar é fundamental", "C Coletivo é mais importante"]],
  ["Eu penso que...", ["I Não é fácil ficar encurralado", "O Olhar antes de pular", "C Duas cabeças são melhores", "A Se não pode competir, não compita"]]
];

/* =========================
   QUESTÕES EMBARALHADAS
========================= */
const shuffledQuestions = shuffle(
  questions.map(q => [q[0], shuffle([...q[1]])])
);

/* =========================
   PERFIS
========================= */
const profiles = {
  I: {
    name: "Águia",
    img: "assets/aguia.svg",
    comportamentos: ["Criativo", "Intuitivo", "Visionário", "Flexível"],
    fortes: ["Criatividade", "Antecipar o futuro", "Provocar mudanças"],
    melhorias: ["Impaciência", "Pouco foco no presente"],
    motivacoes: ["Liberdade", "Expressão", "Ambiente flexível"],
    valores: "Criatividade e liberdade"
  },
  C: {
    name: "Gato",
    img: "assets/gato.svg",
    comportamentos: ["Sensível", "Relacional", "Busca harmonia"],
    fortes: ["Comunicação", "Trabalho em equipe"],
    melhorias: ["Evitar conflitos", "Resultados em segundo plano"],
    motivacoes: ["Aceitação", "Trabalho em grupo"],
    valores: "Felicidade e igualdade"
  },
  A: {
    name: "Tubarão",
    img: "assets/tubarao.svg",
    comportamentos: ["Prático", "Objetivo", "Competitivo"],
    fortes: ["Ação", "Resultados", "Iniciativa"],
    melhorias: ["Relacionamentos difíceis"],
    motivacoes: ["Autonomia", "Competição"],
    valores: "Resultados"
  },
  O: {
    name: "Lobo",
    img: "assets/lobo.svg",
    comportamentos: ["Organizado", "Detalhista", "Estrategista"],
    fortes: ["Planejamento", "Consistência"],
    melhorias: ["Resistência à mudança"],
    motivacoes: ["Segurança", "Regras claras"],
    valores: "Ordem e controle"
  }
};

/* =========================
   CONTROLE
========================= */
function reset() {
  current = 0;
  selected = null;
  stage = "intro";
  scores = { I:0, C:0, A:0, O:0 };
  render();
}

function render() {
  if (stage === "intro") renderIntro();
  else if (stage === "quiz") {
    if (current < shuffledQuestions.length) renderQuestion();
    else {
      stage = "result";
      render();
    }
  } else renderResult();
}

/* =========================
   QUESTÃO
========================= */
function renderQuestion() {
  selected = null;
  const q = shuffledQuestions[current];
  const progress = Math.round(((current + 1) / shuffledQuestions.length) * 100);

  app.innerHTML = `
    <div class="container">
      <div class="card">
        <div class="progress">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>

        <h2>${q[0]}</h2>

        ${q[1].map(o => `
          <div class="option" onclick="selectOption(this,'${o[0]}')">
            ${o.slice(2)}
          </div>
        `).join("")}

        <button class="primary" disabled onclick="next()">
        Próxima
        </button>
        
        <div class="required">
          * Selecione uma opção para continuar
        </div>
      </div>
    </div>
  `;
}

function selectOption(el, val) {
  selected = val;

  document.querySelectorAll(".option")
    .forEach(o => o.classList.remove("selected"));

  el.classList.add("selected");

  document.querySelector(".required")?.classList.add("hidden");
  document.querySelector("button.primary")?.removeAttribute("disabled");
}

function next() {
  scores[selected]++;
  current++;
  render();
}

/* =========================
   RESULTADO + DONUT
========================= */
function renderResult() {
  const total = shuffledQuestions.length;

  const sorted = Object.entries(scores)
    .map(([k,v]) => ({ k, v, p: Math.round(v / total * 100) }))
    .sort((a,b) => b.v - a.v);

  let offset = 0;

  app.innerHTML = `
    <div class="container">
      <div class="card">
        <h2>Resultado Final</h2>

        ${sorted.map((r,i)=>`
          <div class="result-card ${i<2?"highlight":""}">
            <img src="${profiles[r.k].img}" width="100"/>
            <h3>${profiles[r.k].name} – ${r.p}%</h3>
            <p><strong>Comportamentos:</strong> ${profiles[r.k].comportamentos.join(", ")}</p>
            <p><strong>Pontos fortes:</strong> ${profiles[r.k].fortes.join(", ")}</p>
            <p><strong>Pontos de melhoria:</strong> ${profiles[r.k].melhorias.join(", ")}</p>
            <p><strong>Motivações:</strong> ${profiles[r.k].motivacoes.join(", ")}</p>
            <p><strong>Valores:</strong> ${profiles[r.k].valores}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* =========================
   INTRO
========================= */
function renderIntro() {
  app.innerHTML = `
    <div class="container">
      <div class="card">
        <h2>Bem-vindo(a)</h2>
        <p>
          Este teste ajuda você a identificar seus estilos predominantes de
          personalidade, representados por quatro perfis simbólicos.
        </p>
        <p>
          ⏱️ Tempo estimado: <strong>5 minutos</strong><br>
          🔒 Nenhuma informação é salva<br>
          🎯 Não existem respostas certas ou erradas
        </p>
        <p>
          O objetivo é promover <strong>autoconhecimento</strong> e melhorar
          o convívio, o trabalho em equipe e o serviço cristão.
        </p>
        <button class="primary" onclick="startTest()">Iniciar teste</button>
      </div>
    </div>
  `;
}

function startTest() {
  stage = "quiz";
  render();
}

render();