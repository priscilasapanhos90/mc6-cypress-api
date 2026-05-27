/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

const gerador = require('../fixtures/reserva_utils')
const dados_cadastro = require('../fixtures/cadastro_reserva.json')
const dados_update = require('../fixtures/update_reserva.json')

describe('Cadastrar reserva', () => {

    let token

    // hooks
    // antes de todos os cenarios 
    before(() => {
        console.log('Chamado antes de tudo!')

        cy.request({
            method: "POST",
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username": "admin",
                "password": "password123"
            },
        }).then((resposta) => {
            token = resposta.body.token
            console.log('Meu token:', token)
        })
    })

    // antes de cada cenario
    beforeEach(() => {
        console.log('Chamado antes de cada cenario!')
    })

    // depois de cada cenario 
    after(() => {
        console.log('Chamado depois de cada cenario!')
    })
    // depois de todos os cenarios
    afterEach(() => {
        console.log('Chamado depois de tudo!')
    })


    it('Cadastrar reserva com sucesso - Dados aleatórios', () => {

        // const payload_aleatorio = {
        // "firstname" : faker.person.firstName(),
        // "lastname" : faker.person.lastName(), 
        // "totalprice" : faker.finance.amount({dec: 0 }),
        // "depositpaid" : true,
        // "bookingdates" : {
        //     "checkin" : "2024-08-15",
        //     "checkout" : "2024-08-20"
        // },
        // "additionalneeds" : "Breakfast"
        // }

        const payload_aleatorio = gerador.gerarReserva()

        cy.cadastrarReserva(payload_aleatorio).then((resposta) => {
            expect(resposta.status).to.equal(200);
            expect(resposta.body.bookingid).not.be.NaN;
            expect(resposta.body.booking.firstname).to.equal(payload_aleatorio.firstname);
            expect(resposta.body.booking.lastname).to.equal(payload_aleatorio.lastname);
            expect(resposta.body.booking.totalprice.toString()).to.equal(payload_aleatorio.totalprice);
        });
    });

     it('Cadastrar reserva sem enviar dados', () => {
        cy.cadastrarReserva({}).then((resposta) => {
            expect(resposta.status).to.equal(500);
        });
    });


    it('Cadastrar reserva com sucesso', () => {
       cy.cadastrarReserva(dados_cadastro).then((resposta) => {
            expect(resposta.status).to.equal(200);
            expect(resposta.body.bookingid).not.be.NaN;
            expect(resposta.body.booking.firstname).to.equal(dados_cadastro.firstname);
            expect(resposta.body.booking.lastname).to.equal(dados_cadastro.lastname);
        });
    });

    it('Alterar reserva', () => {

      cy.cadastrarReserva(dados_cadastro).then((resposta) => {
      expect(resposta.status).to.equal(200);

    const id_resreva = resposta.body.bookingid;

    cy.alterarReserva(id_resreva, dados_update, token).then((resposta) => {
        expect(resposta.status).to.equal(200);
        expect(resposta.body.firstname).to.equal(dados_update.firstname);

      });
  });
});

    it('Deletar reserva', () => {
      cy.cadastrarReserva(dados_cadastro).then((resposta) => {
     expect(resposta.status).to.equal(200);

     const id_resreva = resposta.body.bookingid;

     cy.deletarReserva(id_resreva, token).then((resposta) => {
       expect(resposta.status).to.equal(201);
      });
     });
   });
 });
