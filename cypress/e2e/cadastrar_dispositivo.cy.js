/// <reference types="cypress"/>

describe('Cadastrar dispositivos', () => {

    it('Cadastrar dispositivos com sucesso', () => {
        
        const payload =  {
                "name": "Celular Priscila",
                "data": {
                    "year": 2019,
                    "price": 1849.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB"
                },
            }

        cy.request ({
            method: "POST",
            url: '/objects',
            body: payload
        })
            .then((resposta) => { 
                expect(resposta.status).to.equal(200);
                expect(resposta.body.id).not.to.empty
                expect(resposta.body.createAt).not.to.empty
                expect(resposta.body.name).not.equal(dado.name)
        
        });
    });
});
