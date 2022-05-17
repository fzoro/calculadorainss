import { TempoContribuicaoAdapter } from "./rules/rule2019/adapter/TempoContribuicaoAdapter";
import { PorIdadeAdapter } from "./rules/rule2019/adapter/PorIdadeAdapter";
import EntryValidation from "./EntryValidation";
import { PorIdadeTempoContribuicaoAdapter } from "./rules/rule2020/adapter/PorIdadeTempoContribuicaoAdapter";
import { Indicadores } from "./model/Indicadores";

export const calcularPorTempoContribuicao = (genero: string,
    tipoPerfil: string,
    dataNascimento: Date,
    anosContribuicao: number,
    mesesContribuicao: number,
    mediaSalarioContribuicao: string,
    quantidadeSalariosMinimos: number) => {
    new EntryValidation().checkInput(genero, tipoPerfil, dataNascimento, anosContribuicao, mesesContribuicao, mediaSalarioContribuicao, quantidadeSalariosMinimos);
    return new TempoContribuicaoAdapter().calcular(genero, tipoPerfil, dataNascimento, anosContribuicao, mesesContribuicao, mediaSalarioContribuicao, quantidadeSalariosMinimos);
}

export const calcularPorIdade = (genero: string,
    tipoPerfil: string,
    dataNascimento: Date,
    anosContribuicao: number,
    mesesContribuicao: number,
    mediaSalarioContribuicao: string,
    quantidadeSalariosMinimos: number) => {
    new EntryValidation().checkInput(genero, tipoPerfil, dataNascimento, anosContribuicao, mesesContribuicao, mediaSalarioContribuicao, quantidadeSalariosMinimos);
    return new PorIdadeAdapter().calcular(genero, tipoPerfil, dataNascimento, anosContribuicao, mesesContribuicao, mediaSalarioContribuicao, quantidadeSalariosMinimos);
}

export const calcularPorIdadeTempoContribuicao2020 = (genero: string,
    tipoPerfil: string,
    dataNascimento: Date,
    anosContribuicao: number,
    mesesContribuicao: number,
    mediaSalarioContribuicao: string,
    quantidadeSalariosMinimos: number) => {
    new EntryValidation().checkInput(genero, tipoPerfil, dataNascimento, anosContribuicao, mesesContribuicao, mediaSalarioContribuicao, quantidadeSalariosMinimos);
    return new PorIdadeTempoContribuicaoAdapter().calcular(genero, tipoPerfil, dataNascimento, anosContribuicao, mesesContribuicao, mediaSalarioContribuicao, quantidadeSalariosMinimos);
}

export const getIndicadores = () => new Indicadores();