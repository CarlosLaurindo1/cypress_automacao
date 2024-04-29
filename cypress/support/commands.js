import { CommonPage, LoginPage } from '../support/pages';
Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value)
  })
})

Cypress.Commands.add('LogIn', (user, pass) => {
  cy.AcessarPagina('/')
  LoginPage.UserName()
    .type(user)
    

  LoginPage.Password()
    .type(pass)
    

  LoginPage.LoginButton().click()
})

Cypress.Commands.add('AcessarPagina', (rota) =>{
  cy.visit(rota, {failOnStatusCode: false})
})
