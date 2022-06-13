import { logarTempoExecucao } from "../decorators/logar.tempo.execucao.js";
import { DiasSemana } from "../enums/dias.semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView", true);
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.inputData = <HTMLInputElement>document.querySelector("#data"); // casting explicito
    this.inputQuantidade = <HTMLInputElement>(
      document.querySelector("#quantidade")
    );
    this.inputValor = document.querySelector("#valor") as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

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
    this.limparFormulario();
    this.atualizaView();

    // this.negociacoes.lista();
    // precisamos ficar atento a métodos getters e objetos que podem ter propriedades acessadas
    // negociacao.data.setDate(12); // protegemos nosso getter por isso não irá funcionar
    //console.log(this.negociacoes.lista());
  }

  public limparFormulario(): void {
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
