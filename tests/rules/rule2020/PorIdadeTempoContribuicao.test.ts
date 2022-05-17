import { BeneficioSimulado } from '../../../src/model/Resultado';
import PorIdadeTempoContribuicao from '../../../src/rules/rule2020/PorIdadeTempoContribuicao';


//TODO CRIAR TESTE PARA PROFESSOR
//https://www.inss.gov.br/beneficios/aposentadoria-por-tempo-de-contribuicao/ - PROFESSOR

describe('Calculo por Tempo de contribuição - Regras com pessoas', function () {
  it('Smith, julho de 77, 15 anos de contribuicao', function () {
    
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2017, 6, 1).valueOf());


    let tcCalc = new PorIdadeTempoContribuicao();
    let salario = 135000; //R$1350 ( 10 anos com 2 salarios minimos e 5 anos com 1 salario minimo)
    let anosContribuicao = 15;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2039,61, 1170, 0.867));
    simulacoesEsperadas.push(new BeneficioSimulado(2040,62, 1260, 0.934));
    simulacoesEsperadas.push(new BeneficioSimulado(2041,63, 1351, 1.001));
    simulacoesEsperadas.push(new BeneficioSimulado(2042,64, 1448, 1.073));
    simulacoesEsperadas.push(new BeneficioSimulado(2043,65, 1561, 1.157));
    

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1977, 7, 1), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2042);
    expect(resultado.anosFaltantes).toBe(22);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

});

