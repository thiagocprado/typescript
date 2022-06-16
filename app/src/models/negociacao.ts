import { Modelo } from "../interfaces/modelo.js";

// polimorfismo -  capacidade que um objeto tem de ser referenciado de múltiplas formas
export class Negociacao implements Modelo<Negociacao> {
  constructor(
    // variáveis privadas
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {}

  get volume(): number {
    return this.valor * this.quantidade;
  }

  get data(): Date {
    // programação defensiva
    const data = new Date(this._data.getTime());
    return data;

    // se fizermos uma alteração no date, ele não irá afetar nossa data, pois estamos criando uma nova referencia
  }

  // método static podemos chamar diretamente atravé da classe
  public static criaDe(
    dataString: string,
    quantidadeString: string,
    valorString: string
  ): Negociacao {
    const exp = /-/g;

    const date = new Date(dataString.replace(exp, ","));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);

    return new Negociacao(date, quantidade, valor);
  }

  public paraTexto(): string {
    return `
      Data: ${this.data},
      Quantidade: ${this.quantidade},
      Valor: ${this.valor}
    `;
  }

  public ehIgual(negociacao: Negociacao): boolean {
    return (
      this.data.getDate() === negociacao.data.getDate() &&
      this.data.getMonth() === negociacao.data.getMonth() &&
      this.data.getFullYear() === negociacao.data.getFullYear()
    );
  }
}
