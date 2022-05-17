import FatorPrevidenciarioRepository from "../../src/repository/FatorPrevidenciarioRepository";


describe('Fator Previdenciário - Regras', () =>{
    it('Teste de amostragem', () =>{
        let fator0189 = FatorPrevidenciarioRepository.get( 43, 15);
        let fator1160 = FatorPrevidenciarioRepository.get( 69, 33);
        let fator0342 = FatorPrevidenciarioRepository.get( 52, 20);
        let fatorInexistente= FatorPrevidenciarioRepository.get(43, 36);

        expect(fator0189).toBe(0.189);
        expect(fator1160).toBe(1.160);
        expect(fator0342).toBe(0.342);
        expect(fatorInexistente).toBe(-1);
    });

    it('Retorno negativo para índices inválidos', () =>{
        let indiceInvalido1 = FatorPrevidenciarioRepository.get(0, 0);
        let indiceInvalido2 = FatorPrevidenciarioRepository.get(43, 14);
        let indiceInvalido3 = FatorPrevidenciarioRepository.get(42, 15);
        let indiceInvalido4 = FatorPrevidenciarioRepository.get(200, 200);
        let indiceSemFator = FatorPrevidenciarioRepository.get(43, 36); 

        expect(indiceInvalido1).toBe(-1);
        expect(indiceInvalido2).toBe(-1);
        expect(indiceInvalido3).toBe(-1);
        expect(indiceInvalido4).toBe(-1);
        expect(indiceSemFator).toBe(-1);

    });
});