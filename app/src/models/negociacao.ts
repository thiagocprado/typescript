export class Negociacao {
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
}
