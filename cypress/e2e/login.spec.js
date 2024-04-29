import { CommonPage, LoginPage } from '../support/pages';

context('Login', () => {
  beforeEach(() =>{
    cy.AcessarPagina('/')
  })

  describe('Acesso à página', () => {
    it('Realiza o input do usuário', () => {
      LoginPage.UserName()
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Username')
        .and('be.visible')
        .and('have.css', 'font-size', '14px')
        
    })
    it('realiza o input da senha', () => {
      LoginPage.Password()
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Password')
        .and('be.visible')
        .and('have.css', 'font-size', '14px')

    })
    it('clica no botão de login', () => {
      LoginPage.LoginButton()
        .should('have.value', 'Login')
        .and('be.visible')
        .and('have.css', 'background-color', 'rgb(61, 220, 145)')

    })
  })
  describe('usuário', () => {
    it('pode logar com o standart_user', () => {
      cy.LogIn('standard_user', 'secret_sauce')
      

      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)
    })
    it('não loga com senha incorreta', () => {
      cy.LogIn('standard_user', 'secret_sasas')
      
      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Username and password do not match any user in this service')

    })
    it('não loga com usuário bloqueado', () => {
      cy.LogIn('locked_out_user', 'secret_sauce')
      

      LoginPage.ErrorMessage()
        .should('have.text', 'Epic sadface: Sorry, this user has been locked out.')

    })
  })
})
