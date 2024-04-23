import { CommonPage } from '../support/pages';

context('Carrinho', () => {
  beforeEach(() => {
    cy.setSessionStorage('cart-contents', '[4,1,2]')
    cy.visit('/cart.html')
  })

  describe('Página', () => {
    it('Visualiza itens do inventário', () => {
      CommonPage.CartListItems()
        .should('have.length', 3)

    })
    it('visualiza preço e descrição', () => {
      CommonPage.CartListItems()
        .first().as('inventoryItem')

      cy.get('@inventoryItem')
        .find('.inventory_item_name')
        .should('contain', 'Sauce')

      cy.get('@inventoryItem')
        .find('.inventory_item_desc')
        .invoke('text')
        .its('length')
        .should('be.gt', 1)

      cy.get('@inventoryItem')
        .find('.inventory_item_price')
        .should('have.text', '29.99')
       
    })
    it('visualiza cabeçalho', () => {
      cy.get('.subheader')
        .should('have.text', 'Your Cart')

    })
    it('visualiza menu', () => {
      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)

    })
  })
  describe('Carrinho', () => {
    it('remove o produto', () => {
      let RemoveFirstItem = ($cart, $count) => { 
        CommonPage.CartListItems()
        .first()
        .find('.btn_secondary')
        .click()

        cy.getSessionStorage('cart-contents').should('eq', $cart)

        if ($count) {
          CommonPage.ShoppingCartBadge()
            .should('have.text',  $count)
        } else {
          CommonPage.ShoppingCartBadge()
            .should('not.exist')
        }
      }
      
      RemoveFirstItem('[1,2]', '2');

      RemoveFirstItem('[2]', '1');

      RemoveFirstItem('[]', null);

    })
    it('compra o produto', () => {
      let firstName = 'Petr'
      let lastname = 'Skala'
      let psc = '68201'
      let CartButton = () => {
        cy.get('.cart_button')
        .click();
      }

      cy.get('.checkout_button')
        .click();

      cy.get('#first-name')
        .type(firstName)
        .should('have.value', firstName)

      cy.get('#last-name')
        .type(lastname)
        .should('have.value', lastname)

      cy.get('#postal-code')
        .type(psc)
        .should('have.value', psc)

      CartButton()

      cy.get('.summary_subtotal_label')
        .should('have.text', 'Item total: $53.97')

      cy.get('.summary_tax_label')
        .should('have.text', 'Tax: $4.32')

      cy.get('.summary_total_label')
        .should('have.text', 'Total: $58.29')

      CartButton()

      cy.get('.subheader')
        .should('have.text', 'Finish')

      cy.get('.complete-header')
        .should('have.text', 'THANK YOU FOR YOUR ORDER')
      
    })
  })
})
