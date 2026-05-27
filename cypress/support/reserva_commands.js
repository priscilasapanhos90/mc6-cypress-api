// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('cadastrarReserva', (payload) => {
  return cy.request({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    body: payload,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('alterarReserva', (id_resreva, dados_update, token) => {
  return cy.request({
        method: "PUT",
        url: `https://restful-booker.herokuapp.com/booking/${id_resreva}`,
        body: dados_update,
        headers: {
         cookie: `token=${token}`
        },
    
      });
    });

    Cypress.Commands.add('deletarReserva', (id_resreva, token) => {
  return cy.request({
     method: "Delete",
     url: `https://restful-booker.herokuapp.com/booking/${id_resreva}`,
     headers: {
       cookie: `token=${token}`
       }
    });
  });