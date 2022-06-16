import { domInject } from "../decorators/domInject.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoExecucao } from "../decorators/logar.tempo.execucao.js";
import { DiasSemana } from "../enums/dias.semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
  @domInject("#data")
  private inputData: HTMLInputElement;
  @domInject("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInject("#valor")
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");

  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempoExecucao()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );

    if (!this.verificaDiaUtil(negociacao.data)) {
      this.mensagemView.update("Negociações apenas em dias úteis!");
      return;
    }

    this.negociacoes.adiciona(negociacao);
    imprimir(negociacao, this.negociacoes);
    this.limparFormulario();
    this.atualizaView();

    // this.negociacoes.lista();
    // precisamos ficar atento a métodos getters e objetos que podem ter propriedades acessadas
    // negociacao.data.setDate(12); // protegemos nosso getter por isso não irá funcionar
    //console.log(this.negociacoes.lista());
  }

  public importaDados(): void {
    this.negociacoesService
      .obterNegociacoesDoDia()
      .then((negociacoesDeHoje) => {
        return negociacoesDeHoje.filter((negociacaoDeHoje) => {
          return !this.negociacoes
            .lista()
            .some((negociacao) => negociacao.ehIgual(negociacaoDeHoje));
        });
      })
      .then((negociacoesDeHoje) => {
        for (let negociacao of negociacoesDeHoje) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";

    this.inputData.focus();
  }

  private verificaDiaUtil(date: Date): boolean {
    return (
      date.getDay() > DiasSemana.DOMINGO && date.getDay() < DiasSemana.SABADO
    );
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
