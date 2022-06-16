export function logarTempoExecucao(emSegundos: boolean = false) {
  return function (
    // se o decorator for adicionado a um método estático = função construtora
    // se o decorator for adicionado a um método não estático ele retorna o prototype da classe
    target: any,
    propertyKey: string, // nome do método que foi decorado
    // sabe as informações sobre o método - tem uma referencia ao método original
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      let divisor = 1;
      let unidade = "milisegundos";

      if (emSegundos) {
        divisor = 1000;
        unidade = "segundos";
      }

      const t1 = performance.now();
      const retorno = metodoOriginal.apply(this, args); // chamamos a execução do método na classe e passamos o contexto mais os argumentos
      const t2 = performance.now();
      console.log(
        `${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}`
      );
      return retorno;
    };

    return descriptor;
  };
}
