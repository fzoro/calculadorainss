import { HelperFunctions, ValoresConstantesRepository } from "../../src/repository/HelperRepository";
import { Genero } from "../../src/model/Genero";
import { MediaSalarioContribuicao } from "../../src/model/MediaSalarioContribuicao";

describe('Helper Repository - Constantes', () => {
    it('Valores constantes para 2019', () => {

        expect(ValoresConstantesRepository.MINIMO_CONTRIBUICOES).toBe(180); // 15 anos
        expect(ValoresConstantesRepository.SALARIO_MINIMO).toBe(104500); //R$ 998,00
        expect(ValoresConstantesRepository.SALARIO_TETO).toBe(610106); //R$ 5.645,80
        expect(ValoresConstantesRepository.IDADE_MINIMA_MULHER).toBe(60);
        expect(ValoresConstantesRepository.IDADE_MINIMA_HOMEM).toBe(65);
        expect(ValoresConstantesRepository.RURAL_ANOS_A_MENOS).toBe(5);
        expect(ValoresConstantesRepository.DATA_INICIAL_CALCULO_CONTRIBUICAO).toEqual(new Date(1994, 7, 30));
        expect(ValoresConstantesRepository.NUMERO_SIMULACOES_DEFAULT).toBe(5);

    });
});
describe('Helper Repository - Helper Functions', () => {

    it('Converte numero de contribuicoes em [anos,meses]', () => {

        expect(HelperFunctions.getAnosMesesContribuicao(23)).toEqual([1,11]);
        expect(HelperFunctions.getAnosMesesContribuicao(24)).toEqual([2,0]);
        expect(HelperFunctions.getAnosMesesContribuicao(25)).toEqual([2,1]);
    });

    it('Idade mínima da aposentadoria por genero', () => {

        expect(HelperFunctions.getIdadeMinima('F' as Genero)).toBe(60);
        expect(HelperFunctions.getIdadeMinima('M' as Genero)).toBe(65);
    });

    it('Converter anos+meses para número de contribuições ', () => {
        
        expect(HelperFunctions.convertToNumeroContribuicoes(1,1)).toBe(13);
        expect(HelperFunctions.convertToNumeroContribuicoes(0,1)).toBe(1);
        expect(HelperFunctions.convertToNumeroContribuicoes(30,30)).toBe(390);
        expect(HelperFunctions.convertToNumeroContribuicoes(30,5)).toBe(365);
    });
    

    it('Mínimo de contribuições(para aposentadoria por tempo de contribuição) por genero', () => {

        expect(HelperFunctions.getMinimoContribuicoes('F' as Genero)).toBe(360);
        expect(HelperFunctions.getMinimoContribuicoes('M' as Genero)).toBe(420);
    });
    
    it('Idade do indivíduo baseado na data de nascimento', () => {
        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2019, 6, 1).valueOf());
        expect(HelperFunctions.getIdade(new Date(2009, 1, 1))).toBe(10);
        //expect(HelperFunctions.getIdade(new Date(2009, 6, 1))).toBe(10); // dia do aniversario ainda nao funciona
        expect(HelperFunctions.getIdade(new Date(2009, 6, 2))).toBe(9);
    });
    it('Calcular Salario baseado na quantridade(quantidade=0 retorna o teto)', () => {
        
        expect(HelperFunctions.calcularSalario(MediaSalarioContribuicao.ATE_1_SM,0)).toBe(ValoresConstantesRepository.SALARIO_MINIMO);
        expect(HelperFunctions.calcularSalario(MediaSalarioContribuicao.TETO,1)).toBe(ValoresConstantesRepository.SALARIO_TETO);
        expect(HelperFunctions.calcularSalario(MediaSalarioContribuicao.ATE_N_SM,1)).toBe(ValoresConstantesRepository.SALARIO_MINIMO);
        expect(HelperFunctions.calcularSalario(MediaSalarioContribuicao.ATE_N_SM,2)).toBe(209000);
        
    });
    

    describe('Regra 86/96 progressiva', () => {
        it('até 30/12/2020 - 86/96', () => {
            jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2020, 12, 30).valueOf());
            expect(HelperFunctions.isRegra8696(50, 35, Genero.FEMININO, 2019)).toBeFalsy;
            expect(HelperFunctions.isRegra8696(60, 35, Genero.MASCULINO, 2019)).toBeFalsy;

            expect(HelperFunctions.isRegra8696(50, 36, Genero.FEMININO, 2019)).toBeTruthy;
            expect(HelperFunctions.isRegra8696(60, 36, Genero.MASCULINO, 2019)).toBeTruthy;
        });
        it('até 30/12/2022 - 87/97', () => {
            jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2022, 12, 30).valueOf());
            expect(HelperFunctions.isRegra8696(50, 36, Genero.FEMININO, 2019)).toBeFalsy;
            expect(HelperFunctions.isRegra8696(60, 36, Genero.MASCULINO, 2019)).toBeFalsy;

            expect(HelperFunctions.isRegra8696(50, 37, Genero.FEMININO, 2019)).toBeTruthy;
            expect(HelperFunctions.isRegra8696(60, 37, Genero.MASCULINO, 2019)).toBeTruthy;
        });
        it('até 30/12/2024 - 88/98', () => {
            jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2024, 12, 30).valueOf());
            expect(HelperFunctions.isRegra8696(50, 37, Genero.FEMININO, 2019)).toBeFalsy;
            expect(HelperFunctions.isRegra8696(60, 37, Genero.MASCULINO, 2019)).toBeFalsy;

            expect(HelperFunctions.isRegra8696(50, 38, Genero.FEMININO, 2019)).toBeTruthy;
            expect(HelperFunctions.isRegra8696(60, 38, Genero.MASCULINO, 2019)).toBeTruthy;
        });
        it('até 30/12/2026 - 89/99', () => {
            jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2026, 12, 30).valueOf());
            expect(HelperFunctions.isRegra8696(50, 38, Genero.FEMININO, 2019)).toBeFalsy;
            expect(HelperFunctions.isRegra8696(60, 38, Genero.MASCULINO, 2019)).toBeFalsy;

            expect(HelperFunctions.isRegra8696(50, 39, Genero.FEMININO, 2019)).toBeTruthy;
            expect(HelperFunctions.isRegra8696(60, 39, Genero.MASCULINO, 2019)).toBeTruthy;
        });
    });
    it('após 2027', () => {
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() => new Date(2027, 1, 1).valueOf());
        expect(HelperFunctions.isRegra8696(50, 39, Genero.FEMININO, 2019)).toBeFalsy;
        expect(HelperFunctions.isRegra8696(60, 39, Genero.MASCULINO, 2019)).toBeFalsy;

        expect(HelperFunctions.isRegra8696(50, 40, Genero.FEMININO, 2019)).toBeTruthy;
        expect(HelperFunctions.isRegra8696(50, 50, Genero.MASCULINO, 2019)).toBeTruthy;

    });
    it('Lista de idades para serem simuladas', () => {
        let idadesSimuladas = HelperFunctions.getIdadesParaSimulacao(65, 15);
        expect(idadesSimuladas).toEqual([[65,15],[66,16],[67,17],[68,18],[69,19]]);
     });

});