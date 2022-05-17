import PorIdade from '../../../src/rules/rule2019/PorIdade';
import { BeneficioSimulado } from '../../../src/model/Resultado';

describe('Calculo Aposentadoria Idade Urbana - cenários básicos', () => {

  it('60 anos de idade e com mais de 40 anos de contribuição. Salario deve ser calculado apenas à partir 1994.', () => {
    //Atualmente não suportado, pois a entrada de dados é unica: (SALARIO_MINIMO, TETO, MEDIA)
  });

  it('Homem, nascido 1987, salário de ~R$2.000,00, 20 anos de contribuição', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());

    let tcCalc = new PorIdade();
    let salario = 200000;
    let anosContribuicao = 20;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();

    simulacoesEsperadas.push(new BeneficioSimulado(2053, 65, 3222, 1.611));
    simulacoesEsperadas.push(new BeneficioSimulado(2054, 66, 3438, 1.719));
    simulacoesEsperadas.push(new BeneficioSimulado(2055, 67, 3670, 1.835));
    simulacoesEsperadas.push(new BeneficioSimulado(2056, 68, 2000, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2057, 69, 2000, 1));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1987, 12, 24), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2053);
    expect(resultado.anosFaltantes).toBe(33);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });


  it('Zoroa - Homem, nascida 1987, salário de ~R$2.000,00, 15 anos de contribuição', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new PorIdade();
    let salario = 200000;
    let anosContribuicao = 15;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();

    simulacoesEsperadas.push(new BeneficioSimulado(2053, 65, 2960, 1.48));
    simulacoesEsperadas.push(new BeneficioSimulado(2054, 66, 3160, 1.58));
    simulacoesEsperadas.push(new BeneficioSimulado(2055, 67, 3380, 1.69));
    simulacoesEsperadas.push(new BeneficioSimulado(2056, 68, 3620, 1.81));
    simulacoesEsperadas.push(new BeneficioSimulado(2057, 69, 3856, 1.928));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1987, 12, 24), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2053);
    expect(resultado.anosFaltantes).toBe(34);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Mulher, nascida 1985, salário de R$10.000,00, 12 anos de contribuição', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new PorIdade();
    let salario = 1000000; //R$10.000,00
    let anosContribuicao = 12;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    let salarioTeto = 6101;
    simulacoesEsperadas.push(new BeneficioSimulado(2045, 60, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2046, 61, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2047, 62, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2048, 63, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2049, 64, salarioTeto, 1));



    let resultado = tcCalc.calcular('F','NORMAL', new Date(1985, 1, 29), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2045);
    expect(resultado.anosFaltantes).toBe(26);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Requerimentos atingidos, mas com salário acima do teto. Benefício deve ser o teto', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new PorIdade();
    let salario = 1000000; //R$2.000,00
    let anosContribuicao = 30;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    let salarioTeto = 6101;
    simulacoesEsperadas.push(new BeneficioSimulado(2019, 60, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2020, 61, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2021, 62, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2022, 63, salarioTeto, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2023, 64, salarioTeto, 1));



    let resultado = tcCalc.calcular('F','NORMAL', new Date(1959, 1, 1), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });


  it('Trabalhador Rural ensino médio/fundamental com carência reduzida(55/60) - Mulher', () => {

    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());

    let tcCalc = new PorIdade();
    let salario = 200000; //R$2.000,00
    let anosContribuicao = 15;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();

    simulacoesEsperadas.push(new BeneficioSimulado(2020, 55, 1700, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2021, 56, 1720, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2022, 57, 1740, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2023, 58, 1760, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2024, 59, 1780, 1));

    let resultado = tcCalc.calcular('F', 'PROFESSOR_ENSINO_MEDIO', new Date(1965, 1, 1), salario, anosContribuicao, mesesContribuicao);

   expect(resultado.anoAposentadoria).toBe(2020);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

});

describe('Calculo Aposentadoria Idade Urbana - cenários extraídos de: https://www.inss.gov.br/beneficios/aposentadoria-por-tempo-de-contribuicao/valor-das-aposentadorias/', () => {

  it('Exemplo 1: o cidadão homem possui 30 anos de contribuição e 65 anos de idade ( em 2019 )', () => {

    // Salário de Benefício” = R$ 2.000,00
    // Fator previdenciário = 0,896 (não foi aplicado por não ser vantajoso)
    // Multiplicação pela alíquota de 0,70 + 0,30 (30 anos completos de trabalho) = R$ 2.000,00 x 1,00
    // Renda Mensal Inicial = R$ 2.000,00

    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new PorIdade();
    let salario = 200000; //R$2.000,00
    let anosContribuicao = 30;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();

    simulacoesEsperadas.push(new BeneficioSimulado(2019, 65, 2000, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2020, 66, 2000, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2021, 67, 2052, 1.026));
    simulacoesEsperadas.push(new BeneficioSimulado(2022, 68, 2224, 1.112));
    simulacoesEsperadas.push(new BeneficioSimulado(2023, 69, 2396, 1.198));



    let resultado = tcCalc.calcular('M','NORMAL', new Date(1954, 1, 1), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Exemplo 2: o cidadão homem possui 15 anos de contribuição e 65 anos de idade ( em 2019 )', () =>{
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new PorIdade();
    let salario = 200000; //R$2.000,00
    let anosContribuicao = 15;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();

    simulacoesEsperadas.push(new BeneficioSimulado(2019, 65, 1700, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2020, 66, 1720, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2021, 67, 1740, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2022, 68, 1760, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2023, 69, 1780, 1));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1954, 1, 1), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });


  it('Exemplo 3: o cidadão homem possui 20 anos de contribuição e 65 anos de idade ( em 2019 )', () =>{
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());

    let tcCalc = new PorIdade();
    let salario = 80000; //R$800,00
    let anosContribuicao = 20;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();
    let salarioMinimo = 1045;
    simulacoesEsperadas.push(new BeneficioSimulado(2019, 65, salarioMinimo, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2020, 66, salarioMinimo, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2021, 67, salarioMinimo, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2022, 68, salarioMinimo, 1));
    simulacoesEsperadas.push(new BeneficioSimulado(2023, 69, salarioMinimo, 1));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1954, 1, 1), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });

  it('Exemplo 4: o cidadão homem possui 33 anos de contribuição e 68 anos de idade ( em 2019 )', () =>{
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());
    let tcCalc = new PorIdade();
    let salario = 200000; //R$2.000,00
    let anosContribuicao = 33;
    let mesesContribuicao = 0;
    let simulacoesEsperadas = new Array<BeneficioSimulado>();

    simulacoesEsperadas.push(new BeneficioSimulado(2019, 68, 2224, 1.112));
    simulacoesEsperadas.push(new BeneficioSimulado(2020, 69, 2396, 1.198));
    simulacoesEsperadas.push(new BeneficioSimulado(2021, 70, 2598, 1.299));

    let resultado = tcCalc.calcular('M', 'NORMAL', new Date(1951, 1, 1), salario, anosContribuicao, mesesContribuicao);

    expect(resultado.anoAposentadoria).toBe(2019);
    expect(resultado.anosFaltantes).toBe(0);
    expect(resultado.mesAposentadoria).toBe(0);
    expect(resultado.mesesFaltantes).toBe(0);
    expect(resultado.simulacoes).toEqual(simulacoesEsperadas);

  });
});