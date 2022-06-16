// generics | classe abstrata não podemos instância-la diretamente
export abstract class View<T> {
  protected elemento: HTMLElement; // apenas a classe view pode alterar, entretanto as classes filhas podem acessar

  // ? permite que o parâmetro seja opcional
  // o parâmetro opcional deve ser o último a ser colocado
  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);

    if (elemento) {
      this.elemento = elemento as HTMLElement;
    } else {
      throw Error(`Seletor ${seletor} não existe no DOM! Verifique!`);
    }
  }

  protected abstract template(model: T): string; // o método será implementado pela classe filha
  // sendo assim, não precisamos nem definir o bloco de retorno

  public update(model: T): void {
    let template = this.template(model);

    this.elemento.innerHTML = template;
  }
}
