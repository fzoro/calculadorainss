import EntryValidation from "../src/EntryValidation";

let validator = new EntryValidation();
describe('Validações entre data de nascimento e tempo de contribuição', () => {

    it('Idade mínima >= 1', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());

        let dataNascimento = new Date(2020, 1, 1);
        let anosContribuicao = 1;

        expect(() => {
            validator.checkInput('M', 'NORMAL', dataNascimento, anosContribuicao, 0, '', 1);
        }).toThrow('Idade permitida para cálculo: 1 a 80 anos de idade');

    });

    it('Idade mínima <= 80', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());
        let idade81 = 2020 - 81;
        let dataNascimento = new Date(idade81, 1, 1);
        let anosContribuicao = 1;

        expect(() => {
            validator.checkInput('M', 'NORMAL', dataNascimento, anosContribuicao, 0, '', 1);
        }).toThrow('Idade permitida para cálculo: 1 a 80 anos de idade');
    });

    it('Anos de contribuição > idade', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());
        let idade81 = 2020 - 20;
        let dataNascimento = new Date(idade81, 1, 1);
        let anosContribuicao = 21;

        expect(() => {
            validator.checkInput('M', 'NORMAL', dataNascimento, anosContribuicao, 0, '', 1);
        }).toThrow('Anos de contribuição deve ser menor que sua idade');
    });

    it('Idade mínima between 1 and 80', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());
        let idade81 = 2020 - 80;
        let dataNascimento = new Date(idade81, 1, 1);
        let anosContribuicao = 1;

        validator.checkInput('M', 'NORMAL', dataNascimento, anosContribuicao, 0, '', 1);
    });
});

describe('Validações de quantidade de salários informados', () => {

    it('Salário informado < 1', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());
        let idade81 = 2020 - 20;
        let dataNascimento = new Date(idade81, 1, 1);

        expect(() => {
            validator.checkInput('M', 'NORMAL', dataNascimento, 1, 0, 'ATE_N_SM', 0);
        }).toThrow('Quantidade de salários deve estar entre 1 e 9');

    });

    it('Salário informado > 9', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());
        let idade81 = 2020 - 20;
        let dataNascimento = new Date(idade81, 1, 1);

        expect(() => {
            validator.checkInput('M', 'NORMAL', dataNascimento, 1, 0, 'ATE_N_SM', 10);
        }).toThrow('Quantidade de salários deve estar entre 1 e 9');
    });

    it('Idade mínima between 1 and 9', () => {

        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(2020, 1, 2).valueOf());
        let idade81 = 2020 - 20;
        let dataNascimento = new Date(idade81, 1, 1);

        validator.checkInput('M', 'NORMAL', dataNascimento, 1, 0, 'ATE_N_SM', 5);
    });
});

/*

let genero = 'M';
        let tipoPerfil = 'NORMAL';
        let dataNascimento = new Date(2020, 1, 1);
        let anosContribuicao = 1;
        let mesesContribuicao = 1;
        let mediaSalarioContribuicao = '';
        let quantidadeSalariosMinimos = 1; 
*/