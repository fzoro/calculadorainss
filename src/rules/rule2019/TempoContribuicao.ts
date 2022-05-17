import { CalculadoraInss } from "../CalculadoraInss";
import { HelperFunctions } from "../../repository/HelperRepository";
import { Genero } from "../../model/Genero";
import BaseCalculadoraInss from "../BaseCalculadoraInss";
import { TipoPerfil } from "../../model/TipoPerfil";

export default class TempoContribuicao extends BaseCalculadoraInss implements CalculadoraInss {

  protected aplicarFatorPrevidenciario(fatorPrevidenciario: number, salario: number, idade: number, anosContribuicao: number, genero: Genero, anoFuturo: number): [number, number] {

    var salarioCalculado = salario;
    var fatorPrevidenciarioUtilizado = fatorPrevidenciario;
    let regraProgresssiva: boolean = HelperFunctions.isRegra8696(idade, anosContribuicao, genero, anoFuturo);

    if (regraProgresssiva) {
      if (fatorPrevidenciario > 1) {
        fatorPrevidenciarioUtilizado = fatorPrevidenciario;
        salarioCalculado = salarioCalculado * fatorPrevidenciarioUtilizado;
      } else {
        fatorPrevidenciarioUtilizado = 1;
      }
    } else if (fatorPrevidenciario > -1) {
      salarioCalculado = salarioCalculado * fatorPrevidenciario;
    } else {
      throw new Error('Fator previdenciário não encontrado. idade=' + idade + ', anos contribuídos=' + anosContribuicao);
    }
    return [salarioCalculado, fatorPrevidenciarioUtilizado];
  }

  protected calcularContribuicoesFaltantes(genero: Genero, idade: number, anos: number, meses: number, tipoPerfil: TipoPerfil): number {
    let minimoContribuicoes = HelperFunctions.getMinimoContribuicoes(genero);
    let contribuicoes = HelperFunctions.convertToNumeroContribuicoes(anos, meses);
    let contribuicoesFaltantes = minimoContribuicoes - contribuicoes;
    return contribuicoesFaltantes > 0 ? contribuicoesFaltantes : 0;
  }

}