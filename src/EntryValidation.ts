import { MediaSalarioContribuicao } from "./model/MediaSalarioContribuicao";

export default class EntryValidation {
 
    public checkInput(genero: string,
        tipoPerfil: string,
        dataNascimento: Date,
        anosContribuicao: number,
        mesesContribuicao: number,
        mediaSalarioContribuicao: String,
        quantidadeSalariosMinimos: number): void {

        //1. Check mandatory fields
        this.throwErrorIfNull(genero, 'Sexo(perante INSS)');
        this.throwErrorIfNull(tipoPerfil, 'Profissão');
        this.throwErrorIfNull(dataNascimento, 'Data de nascimento');
        this.throwErrorIfNull(anosContribuicao, 'Anos de contribuição');
        this.throwErrorIfNull(mediaSalarioContribuicao, 'Média de contribuição');
        if (MediaSalarioContribuicao.ATE_N_SM.toString() == mediaSalarioContribuicao) {
            this.throwErrorIfNull(quantidadeSalariosMinimos, 'Quantidade de salários');
            
            let minimo = 1;
            let maximo = 9;
            if (quantidadeSalariosMinimos < minimo || quantidadeSalariosMinimos > maximo) {
                throw new Error(`Quantidade de salários deve estar entre ${minimo} e ${maximo}`);
            }
        }

        //2. Check number fields
        this.checkDates(dataNascimento, anosContribuicao);


    }

    private throwErrorIfNull(field: any, fieldName: String): void {
        if (field == null) throw new Error(`${fieldName} não informado(a)`);
    }

    private checkDates(dataNascimento: Date, anosContribuicao: number): void {
        let currentYear = new Date(Date.now()).getFullYear();
        let anoNascimento = new Date(dataNascimento.getTime()).getFullYear();

        //1. do not allow future births neither age greater than 80.
        let maxAge = 80;
        if( anoNascimento >= currentYear || anoNascimento < (currentYear - maxAge)){
            throw new Error(`Idade permitida para cálculo: 1 a ${maxAge} anos de idade`);
        }

        //2. do not allow "years of contribution" grater than the year of birth
        if( anosContribuicao > (currentYear - anoNascimento)){
            throw new Error('Anos de contribuição deve ser menor que sua idade');
        }
    }

}