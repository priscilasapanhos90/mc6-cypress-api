/// <reference types="cypress"/>

describe('Buscar dispositivos', () => {

    it('Buscar dispositivos existente', () => {
    cy.request({
        method: "GET",
        url: 'https://api.restful-api.dev/objects/3',
    })
        .then((resposta) => {
            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.equal('3');
            expect(resposta.body.name).to.equal('Apple iPhone 12 Pro Max')
        });
    });

    it('Buscar dispositivos inexistente', () => {
    cy.request({
        method: "GET",
        url: 'https://api.restful-api.dev/objects/xpto',
        failOnStatusCode: false
    })
        .then((resposta) => {
            expect(resposta.status).to.equal(404);
            expect(resposta.body.error).to.equal("Object with id=xpto was not found.");
    
        });
    });
});

