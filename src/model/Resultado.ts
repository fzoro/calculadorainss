export class Resultado {

    anosFaltantes: number;
    mesesFaltantes: number;
    primeiraIdade: number;
    anoAposentadoria: number;
    mesAposentadoria: number;
    simulacoes: Array<BeneficioSimulado>;

    constructor(
        anosFaltantes: number,
        mesesFaltantes: number,
        primeiraIdade: number,
        anoAposentadoria: number,
        mesAposentadoria: number,
        simulacoes: Array<BeneficioSimulado>
    ) {
        this.anosFaltantes = anosFaltantes;
        this.mesesFaltantes = mesesFaltantes;
        this.primeiraIdade = primeiraIdade;
        this.anoAposentadoria = anoAposentadoria;
        this.mesAposentadoria = mesAposentadoria;
        this.simulacoes = simulacoes;
    }

}

export class BeneficioSimulado {
    ano: number;
    idade: number;
    salario: number;
    fatorPrevidenciario: number; // -1: (nao encontrado) ; 1: significa que não foi utilizado( x * 1 = x)
    
    constructor(
        ano: number,
        idade: number,
        salario: number,
        fatorPrevidenciario: number) {
        this.ano = ano;
        this.idade = idade;
        this.salario = salario;
        this.fatorPrevidenciario = fatorPrevidenciario;
    }
}
