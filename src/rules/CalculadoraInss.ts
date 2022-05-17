import { Resultado } from "../model/Resultado";
import { TipoPerfil } from "../model/TipoPerfil";

export interface CalculadoraInss {
    
    calcular(
        genero: string,
        tipoPerfil: string,
        dataNascimento: Date,
        salarioMedio: number,
        anosContribuicao: number,
        mesesContribuicao: number,
    ): Resultado;
}