import { CommonPage, LoginPage } from '../support/pages';

context('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Acesso à página', () => {
    it('Realiza o input do usuário', () => {
      LoginPage.UserName()
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Username')
        .and('be.visible')
        .and('have.css', 'font-size', '18px')
        
    })
    it('realiza o input da senha', () => {
      LoginPage.Password()
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Password')
        .and('be.visible')
        .and('have.css', 'font-size', '18px')

    })
    it('clica no botão de login', () => {
      LoginPage.LoginButton()
        .should('have.value', 'LOGIN')
        .and('be.visible')
        .and('have.css', 'background-color', 'rgb(226, 35, 26)')

    })
  })
  describe('usuário', () => {
    it('pode logar com o standart_user', () => {
      LoginPage.UserName()
        .type('standard_user')
        .should('have.value', 'standard_user')

      LoginPage.Password()
        .type('secret_sauce')
        .should('have.value', 'secret_sauce')

      LoginPage.LoginButton().click()

      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)
    })
    it('não loga com senha incorreta', () => {
      LoginPage.UserName()
        .type('standard_user')
        .should('have.value', 'standard_user')

      LoginPage.Password()
        .type('secret_sasas')
        .should('have.value', 'secret_sasas')

      LoginPage.LoginButton().click()

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Username and password do not match any user in this service')

    })
    it('não loga com usuário bloqueado', () => {
      LoginPage.UserName()
        .type('locked_out_user')
        .should('have.value', 'locked_out_user')

      LoginPage.Password()
        .type('secret_sauce')
        .should('have.value', 'secret_sauce')

      LoginPage.LoginButton().click()

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')

    })
  })
})
