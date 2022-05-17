import { PorIdadeAdapter } from "../../../../src/rules/rule2019/adapter/PorIdadeAdapter";
import { MediaSalarioContribuicao } from "../../../../src/model/MediaSalarioContribuicao";
import { Genero } from "../../../../src/model/Genero";
import { ValoresConstantesRepository } from "../../../../src/repository/HelperRepository";

describe('Tempo de contribuição Adapter', function () {
  it('Utilizando número de salários mínimo', function () {
    let adapter = new PorIdadeAdapter();
    const fn = jest.fn();
    adapter.rule.calcular = fn;
    let tipoSalario = 1; //MINIMO
    let quantidadeSalario = 0;
    let anosContribuicao = 15;
    let mesesContribuicao = 0;
    adapter.calcular(Genero.MASCULINO, 'NORMAL', new Date(1977, 7, 1), anosContribuicao, mesesContribuicao, MediaSalarioContribuicao.ATE_1_SM, quantidadeSalario);
    expect(adapter.rule.calcular).toBeCalledWith('M', 'NORMAL', new Date(1977, 7, 1),ValoresConstantesRepository.SALARIO_MINIMO, anosContribuicao, mesesContribuicao);
  });

  it('Utilizando TETO', function () {
    let adapter = new PorIdadeAdapter();
    const fn = jest.fn();
    adapter.rule.calcular = fn;
    let anosContribuicao = 15;
    let mesesContribuicao = 0;
    let quantidadeSalario = 0;
    adapter.calcular(Genero.MASCULINO, 'NORMAL', new Date(1977, 7, 1), anosContribuicao, mesesContribuicao, MediaSalarioContribuicao.TETO, quantidadeSalario);
    expect(adapter.rule.calcular).toBeCalledWith('M', 'NORMAL', new Date(1977, 7, 1),ValoresConstantesRepository.SALARIO_TETO, anosContribuicao, mesesContribuicao);
  });

});

