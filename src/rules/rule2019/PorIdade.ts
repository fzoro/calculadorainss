import { CalculadoraInss } from "../CalculadoraInss";
import BaseCalculadoraInss from "../BaseCalculadoraInss";
import { ValoresConstantesRepository, HelperFunctions } from "../../repository/HelperRepository";
import { Genero } from "../../model/Genero";
import { TipoPerfil } from "../../model/TipoPerfil";



export default class PorIdade extends BaseCalculadoraInss implements CalculadoraInss {

  // versao inicial: apenas com um valor de salario de entrada.(Não estamos fazendo o calculo dos 80% maiores(desde 7/1994)).
  // Caso façamos os 80%, o usuário terá que informar todos os salários (Não acredito que devamos preocupar em fazer isso.)
  /** 
   *  contribuicoes realizadas será maior/igual que 180 no dia que a idade minima for atendidda -> idade_minima - idadeAtual
   *  contribuicoes realizadas nao serah maior que 180 no dia: idade_minima - (anosContribuidoes+AnosAContribuir)
   * @param genero 
   * @param idadeAtual 
   * @param anos 
   * @param meses 
   * @param tipoPerfil 
   */
  protected calcularContribuicoesFaltantes(genero: Genero, idadeAtual: number, anosContribuidos: number, meses: number, tipoPerfil: TipoPerfil): number {
    var idadeMinima: number = HelperFunctions.getIdadeMinima(genero);
    if (TipoPerfil.NORMAL != tipoPerfil) {
      idadeMinima -= ValoresConstantesRepository.RURAL_ANOS_A_MENOS;
    } 
    
    var anosContribuidosNoMomentoDeAposentar = anosContribuidos;
    if (idadeAtual < idadeMinima) { // NAO atingiu a idade de aposentadoria
      anosContribuidosNoMomentoDeAposentar += idadeMinima - idadeAtual; //os anos em que a pessoa continuará trabalhando devem ser contados. :)  
    }

    let contribuicoesRealizadasNoMomentoDeSeAposentar = HelperFunctions.convertToNumeroContribuicoes(anosContribuidosNoMomentoDeAposentar, meses);
    var anosFaltantes = 0;
    if (contribuicoesRealizadasNoMomentoDeSeAposentar >= ValoresConstantesRepository.MINIMO_CONTRIBUICOES) {
      anosFaltantes = idadeMinima - idadeAtual;
      if(anosFaltantes < 0){
        anosFaltantes = 0; // para casos onde a pessoa jah deveria estar aposentada.
      }
    }else{
      anosFaltantes = anosContribuidosNoMomentoDeAposentar;
    }
    
    return HelperFunctions.convertToNumeroContribuicoes(anosFaltantes,0);
  }

  // protected calcularPrimeiraIdadeAposentadoria(genero: Genero, idade: number, contribuicoesFaltantesCount: number, anosMesesFaltantes: [number, number]): number {
  //   var idadeMinima: number = idade;

  //   if (TipoPerfil.RURAL == tipoPerfil) {
  //     idadeMinima -= ValoresConstantesRepository.RURAL_ANOS_A_MENOS;
  //   }
  //   let idadeUtilizada = idade > idadeMinima ? idade : idadeMinima;
  //   let n = super.calcularPrimeiraIdadeAposentadoria(genero, idadeUtilizada, contribuicoesFaltantesCount, anosMesesFaltantes, tipoPerfil);
  //   return n;
  // }

  protected aplicarFatorPrevidenciario(fatorPrevidenciario: number, salario: number, idade: number, anosContribuicao: number, genero: Genero, anoFuturo: number): [number, number] {
    var salarioCalculado = salario;
    var fatorPrevidenciarioUtilizado = fatorPrevidenciario;

    if (fatorPrevidenciario > 1) {
      fatorPrevidenciarioUtilizado = fatorPrevidenciario;
      salarioCalculado = salarioCalculado * fatorPrevidenciarioUtilizado;
    } else {
      fatorPrevidenciarioUtilizado = 1;
    }
    return [salarioCalculado, fatorPrevidenciarioUtilizado];
  }

  protected aplicarRegraEspecifica(salario: number, anosContribuicao: number) {
    return this.aplicarRegra70PorCento(salario, anosContribuicao);
  };

  // regra 70% + 1% pra cada 12 contribuicoes
  protected aplicarRegra70PorCento(salario: number, anosContribuicao: number): number {
    const percentualDesconto = 70;
    let descontoCalculadoMaisAcrescimoPorAno = (percentualDesconto + anosContribuicao);
    let descontoCalculadoPercentual = descontoCalculadoMaisAcrescimoPorAno < 100 ? descontoCalculadoMaisAcrescimoPorAno / 100 : 1;
    return salario * descontoCalculadoPercentual
  }

}