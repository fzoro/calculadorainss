import { CalculadoraInss } from "./CalculadoraInss";
import { Resultado, BeneficioSimulado } from "../model/Resultado";
import { Genero } from "../model/Genero";
import { HelperFunctions, ValoresConstantesRepository } from "../repository/HelperRepository";
import FatorPrevidenciarioRepository from "../repository/FatorPrevidenciarioRepository";
import { TipoPerfil } from "../model/TipoPerfil";


export default abstract class BaseCalculadoraInss implements CalculadoraInss {


    calcular(generoString: string, tipoPerfilString: string, dataNascimento: Date, salario: number, anosContribuicao: number, mesesContribuicao: number): Resultado {
        let genero = generoString as Genero;
        let tipoPerfil = tipoPerfilString as TipoPerfil;
        let idade: number = HelperFunctions.getIdade(dataNascimento);
        let quantidadeContribuicoesFaltantes: number = this.calcularContribuicoesFaltantes(genero, idade, anosContribuicao, mesesContribuicao, tipoPerfil);
        let quantidadeAnosMesesFaltantes: [number, number] = HelperFunctions.getAnosMesesContribuicao(quantidadeContribuicoesFaltantes);
        let primeiraIdade: number = this.calcularPrimeiraIdadeAposentadoria(genero, idade, quantidadeContribuicoesFaltantes, quantidadeAnosMesesFaltantes);
        let quantidadeAnosContribuicoesTotal: number = this.calcularAnosTotaisDeContribuicao(anosContribuicao, quantidadeAnosMesesFaltantes);
        let primeiroAnoAposentadoria: number = this.calcularAnoFuturo(quantidadeAnosMesesFaltantes[0]);
        let idadesParaSimulacao: Array<[number, number]> = HelperFunctions.getIdadesParaSimulacao(primeiraIdade, quantidadeAnosContribuicoesTotal);
        let simulacoes = this.realizarSimulacoes(genero, salario, quantidadeAnosMesesFaltantes[0], idadesParaSimulacao);
        let mesAposentadoria = 0;// TODO - considerar o mes nos calculos.(melhor é calcular tudo e apenas subtrair um ano dos anos faltantes e depois somar com os meses faltantes);

        return new Resultado(
            quantidadeAnosMesesFaltantes[0], // anos faltantes
            quantidadeAnosMesesFaltantes[1], // meses faltantes
            primeiraIdade,
            primeiroAnoAposentadoria,
            mesAposentadoria,
            simulacoes
        );
    }

    protected realizarSimulacoes(genero: Genero, salario: number, anosFaltantes: number, idadesMaisAnos: Array<[number, number]>): Array<BeneficioSimulado> {
        var resultado = new Array<BeneficioSimulado>();
        var anosFaltantesCalculado: number = anosFaltantes;
        for (let item of idadesMaisAnos) {

            let idade = item[0];
            let anosContribuicao = item[1];
            let anoFuturo = this.calcularAnoFuturo(anosFaltantesCalculado++);
            let fatorPrevidenciario: number = FatorPrevidenciarioRepository.get(idade, anosContribuicao);
            let salarioMaisFatorPrevidenciarioAplicado = this.aplicarFatorPrevidenciario(fatorPrevidenciario, salario, idade, anosContribuicao, genero, anoFuturo);

            let salarioCalculado = salarioMaisFatorPrevidenciarioAplicado[0];
            let fatorPrevidenciarioUtilizado = salarioMaisFatorPrevidenciarioAplicado[1];

            salarioCalculado = this.aplicarRegraEspecifica(salarioCalculado, anosContribuicao);//template method
            let salarioMaisFatorPrevidenciarioCorrigidos = this.corrigirMinimoOuTeto(salarioCalculado,fatorPrevidenciarioUtilizado);
            let salarioCorrigido = salarioMaisFatorPrevidenciarioCorrigidos[0];
            let fatorPrevidenciarioCorrigido = salarioMaisFatorPrevidenciarioCorrigidos[1];
            let salarioConvertidoParaReal = this.converterParaValorReal(salarioCorrigido);
            
            resultado.push(new BeneficioSimulado(
                anoFuturo,
                idade,
                salarioConvertidoParaReal,
                fatorPrevidenciarioCorrigido
            ));
        }
        return resultado;
    }

    protected aplicarRegraEspecifica(salario: number, anosContribuicao: number) {
        return salario;
    };

    protected abstract aplicarFatorPrevidenciario(fatorPrevidenciario: number, salario: number, idade: number, anosContribuicao: number, genero: Genero, anoFuturo: number): [number, number];

    // versao inicial: apenas com um valor de salario de entrada.(Ainda nao estamos fazendo o calculo dos 80% maiores(desde 7/1994))
    protected abstract calcularContribuicoesFaltantes(genero: Genero, idade: number, anos: number, meses: number, tipoPerfil: TipoPerfil): number;

    protected calcularPrimeiraIdadeAposentadoria(genero: Genero, idade: number, contribuicoesFaltantesCount: number, anosMesesFaltantes: [number, number]): number {
        var idadeCalculada: number = idade;
        if (contribuicoesFaltantesCount > 0) {
            idadeCalculada += anosMesesFaltantes[0];
        }
        return idadeCalculada;
    }

    //return - total de anos contribuidos tornando(a) pronta para aposentar
    protected calcularAnosTotaisDeContribuicao(anosContribuidos: number, anosMesesFaltantes: [number, number]): number {
        return anosContribuidos + anosMesesFaltantes[0];
    }
    //return data_atual+anos
    protected calcularAnoFuturo(anos: number): number {
        return new Date(Date.now()).getFullYear() + anos;
    }

    //arredonda o salario
    // Durante todo o calculo, o salario é tratado como inteiro(os dois ultimos numeros considerados casas decimais. Portanto, o retorno eh o valor REAL, ignorando os centavos)
    protected converterParaValorReal(salario: number) {
        let salarioCalculado = Math.floor(salario);
        return Math.floor(salarioCalculado / 100);
    }

    protected corrigirMinimoOuTeto(salario: number, fatorPrevidenciario: number): [number, number] {
        var salarioCorrigido = salario;
        var fatorPrevidenciarioCorrigido = fatorPrevidenciario;
        
        if (salario <= ValoresConstantesRepository.SALARIO_MINIMO) {
            salarioCorrigido = ValoresConstantesRepository.SALARIO_MINIMO;
            fatorPrevidenciarioCorrigido = 1;
        } else if (salario >= ValoresConstantesRepository.SALARIO_TETO) {
            salarioCorrigido = ValoresConstantesRepository.SALARIO_TETO;
            fatorPrevidenciarioCorrigido = 1;
        }
        return [salarioCorrigido, fatorPrevidenciarioCorrigido];
    }

}