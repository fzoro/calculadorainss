import { CalculadoraInss } from "../../CalculadoraInss";
import { Resultado } from "../../../model/Resultado";
import PorIdade from "../PorIdade";
import { HelperFunctions } from "../../../repository/HelperRepository";

export class PorIdadeAdapter {
    rule: CalculadoraInss;
    constructor() {
        this.rule = new PorIdade();
    }

    /**
     * 
     * @param genero M - Masculino ; F - Feminino
     * @param tipoPerfil NORMAL, PROFESSOR_ENSINO_MEDIO, RURAL
     * @param dataNascimento Date object
     * @param anosContribuicao 0 - 80
     * @param mesesContribuicao 0 - 12
     * @param mediaSalarioContribuicao ATE_1_SM - salario minimo; TETO - Teto do INSS; ATE_N_SM - Quantidade informada pelo usuario
     * @param quantidadeSalariosMinimos 
     */
    calcular(genero: string, tipoPerfil:string, dataNascimento: Date, anosContribuicao: number, mesesContribuicao: number,mediaSalarioContribuicao:string, quantidadeSalariosMinimos: number): Resultado {
        let salarioCalculado = HelperFunctions.calcularSalario(mediaSalarioContribuicao, quantidadeSalariosMinimos);
        return this.rule.calcular(genero, tipoPerfil, dataNascimento, salarioCalculado, anosContribuicao, mesesContribuicao);
    }
}