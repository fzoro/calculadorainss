import { ValoresConstantesRepository } from "../repository/HelperRepository";

export class Indicadores {
    geral: Geral;
    porIdade2019: PorIdade2019;
    porTempoContribuicao2019: PorTempoContribuicao2019;
    porTempoIdade2020: PorTempoIdade2020;
    aliquota2019: Array<[String,String]>;
    aliquota2020: Array<[String,String]>;

    constructor() {
        this.geral = new Geral();
        this.porIdade2019 = new PorIdade2019();
        this.porTempoContribuicao2019 = new PorTempoContribuicao2019();
        this.porTempoIdade2020 = new PorTempoIdade2020();
        this.aliquota2019 = this.buildAliquota2019()
        this.aliquota2020 = this.buildAliquota2020();
    }

    private buildAliquota2019(): Array<[String,String]> {
        let data = new Array();
        data.push(["Até R$ 1.751,81", "8%"])
        data.push(["De R$ 1.751,82 até R$ 2.919,72", "9%"])
        data.push(["De R$ 2.919,73 até R$ 5.839,45", "11%"])
        return data;
    }

    private buildAliquota2020(): Array<[String,String]> {
        let data = new Array();
        data.push(["Até R$ 1.045,00", "7.5%"])
        data.push(["De R$ 1.045,01 até R$ 2.089,60	", "9%"])
        data.push(["De R$ 2.089,61 até R$ 3.134,40", "11%"])
        data.push(["De R$ 3.134,41 até R$ 6.101,06", "14%"])
        return data;
    }
}


export class Geral {

    anoAtual: number;
    salarioMinimo: String;
    salarioTeto: String;

    constructor() {
        this.anoAtual = ValoresConstantesRepository.ANO_ATUAL;
        this.salarioMinimo = 'R$ 1.045,00';
        this.salarioTeto = 'R$ 6.101,06';
    }
}

export class PorIdade2019 {
    minContribuicoes: number;
    descontoRuralRegra2019: number;
    constructor() {
        this.minContribuicoes = ValoresConstantesRepository.MINIMO_CONTRIBUICOES / 12;
        this.descontoRuralRegra2019 = ValoresConstantesRepository.RURAL_ANOS_A_MENOS;

    }
}

export class PorTempoContribuicao2019 {
    minContribuicoesMulher: number;
    minContribuicoesHomem: number;

    constructor() {
        this.minContribuicoesMulher = ValoresConstantesRepository.MINIMO_CONTRIBUICOES_TEMPO_APOSENTADORIA_MULHER / 12;
        this.minContribuicoesHomem = ValoresConstantesRepository.MINIMO_CONTRIBUICOES_TEMPO_APOSENTADORIA_HOMEM / 12;
    }
}

export class PorTempoIdade2020 {
    constructor() {


    }
}
