import { NegociacaoController } from "./controllers/negociacao.controller.js";

const controller = new NegociacaoController();
const form = document.querySelector(".form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    controller.adiciona();
  });
} else {
  throw Error(
    "Não foi possível inicializar a aplicação. Verifique se o form existe!"
  );
}

// import { Negociacao } from "./models/negociacao.js";

// const negociacao = new Negociacao(new Date(), 10, 100);
// console.log(negociacao);

// console.log(negociacao.data);
// console.log(negociacao.volume);

// vai atribuir dinamicamente esse valor, o que não pode acontecer
// negociacao.quantidade = 10000

// não funciona
// console.log(negociacao.#data)
