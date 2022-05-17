import TempoContribuicao from '../../../src/rules/rule2019/TempoContribuicao';
import { BeneficioSimulado } from '../../../src/model/Resultado';


//TODO CRIAR TESTE PARA PROFESSOR
//https://www.inss.gov.br/beneficios/aposentadoria-por-tempo-de-contribuicao/ - PROFESSOR

describe('Calculo por Tempo de contribuição - Regras com pessoas', function () {
  it('Smith, julho de 77, 15 anos de contribuicao', function () {
    
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());


    let tcCalc = new TempoContribuicao();
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
    
    expect(resultado.anoAposentadoria).toBe(2039);
    expect(resultado.anosFaltantes).toBe(20);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Fabio, julho de 87, 10 anos de contribuicao', function () {
    
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());


    let tcCalc = new TempoContribuicao();
    let salario = 160000; //R$1.600,00 ( Rendas muito variadas. Média de pouco mais de dois salários mínimos)
    let anosContribuicao = 10;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2044,56, 1140, 0.713));
    simulacoesEsperadas.push(new BeneficioSimulado(2045,57, 1220, 0.763));
    simulacoesEsperadas.push(new BeneficioSimulado(2046,58, 1307, 0.817));
    simulacoesEsperadas.push(new BeneficioSimulado(2047,59, 1400, 0.875));
    simulacoesEsperadas.push(new BeneficioSimulado(2048,60, 1492, 0.933));
    

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1987, 12, 24), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2044);
    expect(resultado.anosFaltantes).toBe(25);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });
});

describe('Calculo por Tempo de contribuição - Regras', function () {
  it('Regra 86/96 Progressiva - SIM - com fator > 1', function () {
    
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());


    let tcCalc = new TempoContribuicao();
    let salario = 300000; //R$3.000,00
    let anosContribuicao = 35;
    let mesesContribuicao = 2;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2019,69, 3705, 1.235));
    simulacoesEsperadas.push(new BeneficioSimulado(2020,70, 4017, 1.339));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1950, 5, 1), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Regra 86/96 Progressiva - (abaixo) fator < 0', function () {

    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new TempoContribuicao();
    let salario = 160000; //R$1.600,00 ( Rendas muito variadas. Média de pouco mais de dois salários mínimos)
    let anosContribuicao = 10;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2044,56, 1140, 0.713));
    simulacoesEsperadas.push(new BeneficioSimulado(2045,57, 1220, 0.763));
    simulacoesEsperadas.push(new BeneficioSimulado(2046,58, 1307, 0.817));
    simulacoesEsperadas.push(new BeneficioSimulado(2047,59, 1400, 0.875));
    simulacoesEsperadas.push(new BeneficioSimulado(2048,60, 1492, 0.933));
    
    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1987, 12, 24), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2044);
    expect(resultado.anosFaltantes).toBe(25);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Regra 86/96 Progressiva - (acima) fator > 0', function () {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new TempoContribuicao();
    let salario = 160000; //R$1.600,00 ( Rendas muito variadas. Média de pouco mais de dois salários mínimos)
    let anosContribuicao = 35;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2019,68, 1892, 1.183));
    simulacoesEsperadas.push(new BeneficioSimulado(2020,69, 2036, 1.273));
    simulacoesEsperadas.push(new BeneficioSimulado(2021,70, 2204, 1.378));

    
    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1950, 12, 24), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);
  });
 
  it('Mínimo de contribuições atendido - Mais do que o TETO', function () {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new TempoContribuicao();
    let salario = 1000000; //R$10.000,00
    let anosContribuicao = 32;
    let mesesContribuicao = 0;

    let tetoSalario2019 = 6101;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2022,62, tetoSalario2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2023,63, tetoSalario2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2024,64, tetoSalario2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2025,65, tetoSalario2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2026,66, tetoSalario2019, 1));

    
    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1959, 12, 24), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2022);
    expect(resultado.anosFaltantes).toBe(3);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);
  });

  it('Mínimo de contribuições atendido - Menos que o mínimo', function () {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new TempoContribuicao();
    let salario = 70000; //R$700,00
    let anosContribuicao = 32;
    let mesesContribuicao = 0;

    let salarioMinimo2019 = 1045;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    simulacoesEsperadas.push(new BeneficioSimulado(2022,62, salarioMinimo2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2023,63, salarioMinimo2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2024,64, salarioMinimo2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2025,65, salarioMinimo2019, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2026,66, salarioMinimo2019, 1));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1959, 12, 24), salario, anosContribuicao, mesesContribuicao);
    
    expect(resultado.anoAposentadoria).toBe(2022);
    expect(resultado.anosFaltantes).toBe(3);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });
});

