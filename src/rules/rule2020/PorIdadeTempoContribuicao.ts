import { CalculadoraInss } from "../CalculadoraInss";
import { HelperFunctions } from "../../repository/HelperRepository";
import { Genero } from "../../model/Genero";
import BaseCalculadoraInss from "../BaseCalculadoraInss";
import { TipoPerfil } from "../../model/TipoPerfil";
import { Resultado } from "../../model/Resultado";

export default class PorIdadeTempoContribuicao extends BaseCalculadoraInss implements CalculadoraInss {


    calcular(generoString: string, tipoPerfilString: string, dataNascimento: Date, salario: number, anosContribuicao: number, mesesContribuicao: number): Resultado {
        return new Resultado(
            0, // anos faltantes
            0, // meses faltantes
            0,
            0,
            0,
            []
        );
    }

    protected aplicarFatorPrevidenciario(fatorPrevidenciario: number, salario: number, idade: number, anosContribuicao: number, genero: Genero, anoFuturo: number): [number, number] {
        return [0, 0];
    }

    protected calcularContribuicoesFaltantes(genero: Genero, idade: number, anos: number, meses: number, tipoPerfil: TipoPerfil): number {
        return 0;
    }

}