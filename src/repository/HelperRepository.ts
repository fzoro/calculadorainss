import { Genero } from "../model/Genero";
import { MediaSalarioContribuicao } from "../model/MediaSalarioContribuicao";

export module ValoresConstantesRepository {
    export const ANO_ATUAL: number = 2020;
    export const MINIMO_CONTRIBUICOES: number = 180; // 15 anos
    export const SALARIO_MINIMO: number = 104500; //R$ 1.045,00
    export const SALARIO_TETO: number = 610106; //R$ 6.101,06

    export const IDADE_MINIMA_MULHER: number = 60;
    export const IDADE_MINIMA_HOMEM: number = 65;
    export const RURAL_ANOS_A_MENOS: number = 5;
    export const DATA_INICIAL_CALCULO_CONTRIBUICAO: Date = new Date(1994, 7, 30);

    export const MINIMO_CONTRIBUICOES_TEMPO_APOSENTADORIA_MULHER: number = 360; // 30 anos
    export const MINIMO_CONTRIBUICOES_TEMPO_APOSENTADORIA_HOMEM: number = 420; //35 anos

    export const MESES_EM_UM_ANO: number = 12;

    //numero de simulacoes a serem retornadas/exibidas para o usuario.
    export const NUMERO_SIMULACOES_DEFAULT: number = 5;
    export const IDADE_LIMITE_CALCULO: number = 70;

}

export module HelperFunctions {

    export function getIdadeMinima(genero: Genero) {
        return Genero.FEMININO === genero
            ? ValoresConstantesRepository.IDADE_MINIMA_MULHER
            : ValoresConstantesRepository.IDADE_MINIMA_HOMEM;
    }

    export function getMinimoContribuicoes(genero: Genero) {
        return Genero.FEMININO === genero
            ? ValoresConstantesRepository.MINIMO_CONTRIBUICOES_TEMPO_APOSENTADORIA_MULHER
            : ValoresConstantesRepository.MINIMO_CONTRIBUICOES_TEMPO_APOSENTADORIA_HOMEM;
    }

    export function getIdade(dataNascimento: Date): number {
        let now = Date.now();
        let timeDiff = Math.abs(now - dataNascimento.getTime());
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    }

    //return - TRUE|FALSE caso atenda(ou nao) a regra progressiva
    export function isRegra8696(idade: number, anosContribuicao: number, genero: Genero, anoAposentadoria: number): boolean {
        let indice = Genero.FEMININO === genero ? 0 : 1;

        let dataCalculada = new Date(new Date(Date.now()).setFullYear(anoAposentadoria));
        let anoParaCalculo = dataCalculada.getTime();
        let regraAte2020: Date = new Date(2020, 12, 30);
        let regraAte2022: Date = new Date(2022, 12, 30);
        let regraAte2024: Date = new Date(2024, 12, 30);
        let regraAte2026: Date = new Date(2026, 12, 30);

        var valores: [number, number];

        if (anoParaCalculo <= regraAte2020.getTime()) valores = [86, 96];
        else if (anoParaCalculo <= regraAte2022.getTime()) valores = [87, 97];
        else if (anoParaCalculo <= regraAte2024.getTime()) valores = [88, 98];
        else if (anoParaCalculo <= regraAte2026.getTime()) valores = [89, 99];
        else valores = [90, 100];

        return idade + anosContribuicao >= valores[indice];
    }

    //return: [idade, ano] de aposentadoria
    export function getIdadesParaSimulacao(primeiraIdade: number, primeiroAno: number): Array<[number, number]> {
        let idadesSimuladas = new Array();
        idadesSimuladas.push([primeiraIdade, primeiroAno]);
        for (let i = 1; i < ValoresConstantesRepository.NUMERO_SIMULACOES_DEFAULT; i++) {
            idadesSimuladas.push([++primeiraIdade, ++primeiroAno]);
            if (primeiraIdade == ValoresConstantesRepository.IDADE_LIMITE_CALCULO) {
                break;
            }
        }
        return idadesSimuladas;
    }

    export function getAnosMesesContribuicao(totalContribuicoes: number): [number, number] {
        let anos: number = Math.floor(totalContribuicoes / ValoresConstantesRepository.MESES_EM_UM_ANO);
        let meses: number = totalContribuicoes % ValoresConstantesRepository.MESES_EM_UM_ANO;
        return [anos, meses];
    }

    export function convertToNumeroContribuicoes(anos: number, meses: number): number {
        return (anos * ValoresConstantesRepository.MESES_EM_UM_ANO) + meses;
    }

    export function aplicarDescontoAtividadeRural(valor: number, isRural: boolean): number {
        let semDesconto = 0;
        let desconto = isRural ? ValoresConstantesRepository.RURAL_ANOS_A_MENOS : semDesconto;
        return valor - desconto;
    }


    export function calcularSalario(mediaSalarioContribuicao: string, quantidade: number) {

        let salario;

        if (MediaSalarioContribuicao.TETO == mediaSalarioContribuicao) {

            salario = ValoresConstantesRepository.SALARIO_TETO;

        } else if (MediaSalarioContribuicao.ATE_1_SM == mediaSalarioContribuicao) {

            salario = ValoresConstantesRepository.SALARIO_MINIMO;

        } else if (MediaSalarioContribuicao.ATE_N_SM == mediaSalarioContribuicao) {

            salario = ValoresConstantesRepository.SALARIO_MINIMO * quantidade;

            if (salario > ValoresConstantesRepository.SALARIO_TETO) {
                salario = ValoresConstantesRepository.SALARIO_TETO;
            }

        } else {
            throw new Error(`Erro ao calcular o salário. Média de contribuição=${mediaSalarioContribuicao}, quantidade=${quantidade}`);
        }

        return salario;
    }
}