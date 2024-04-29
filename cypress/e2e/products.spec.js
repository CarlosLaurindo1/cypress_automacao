import { CommonPage } from '../support/pages';

context('Produtos', () => {
  beforeEach(() => {
    cy.LogIn('standard_user', 'secret_sauce')
    cy.AcessarPagina('/inventory.html')

  })

  describe('acessa página', () => {
    it('visualiza itens do inventário', () => {
        CommonPage.InventoryItems()
          .its('length')
          .should('be.gt', 1)

    })
    it('visualiza preço e descrição', () => {
      CommonPage.InventoryItems()
        .first().as('inventoryItem')

      cy.get('@inventoryItem')
        .find('.inventory_item_name')
        .invoke('text')
        .its('length')
        .should('be.gt', 1)

        cy.get('@inventoryItem')
        .find('.inventory_item_desc')
        .invoke('text')
        .its('length')
        .should('be.gt', 1)

      cy.get('@inventoryItem')
        .find('.inventory_item_price')
        .should('have.text', '$29.99')

    })
    it('visualiza cabeçalho', () => {
      cy.get('.title')
        .should('have.text', 'Products')

    })
    it('visualiza menu', () => {
      CommonPage.MainBurgerButton()
        .invoke('text')
        .should('match', /Menu/i)

    })
  })
  describe('Pedido', () => {
    it('ordena o pedido de acordo com o nome', () => {
      let productNames = [];
      CommonPage.InventoryItems()
        .find('.inventory_item_name')
        .each(($el, index, $list) => {
          cy.wrap($el).invoke('text').as('item')
          cy.get('@item')
            .then((item) => {
              productNames.push(item)
            })
        })

      cy.get('.product_sort_container')
          .select('Name (Z to A)')
          cy.contains('Name (Z to A)')

      CommonPage.InventoryItems()
        .find('.inventory_item_name')
        .each(($el, index, $list) => {
          cy.wrap($el).should('have.text', productNames[productNames.length - index - 1])
        })

    })
  })


  describe('Carrinho', () => {
    it('add/remove produto', () => {
      CommonPage.InventoryItems()
        .first()
        .find('.btn_primary')
        .click()

      cy.get('#remove-sauce-labs-backpack').first().should('exist')

      
      cy.getAllLocalStorage().should(() => { 
        expect(localStorage.getItem('cart-contents')).to.be.equal('[4]')
      })


      CommonPage.ShoppingCartBadge()
        .should('have.text', '1')

      CommonPage.InventoryItems()
        .first()
        .find('.btn_secondary')
        .click()

      cy.get('#add-to-cart-sauce-labs-backpack').first().should('exist')

      cy.getAllLocalStorage().should(() => { 
        expect(localStorage.getItem('cart-contents')).to.be.equal('[]')
      })


      CommonPage.ShoppingCartBadge()
        .should('not.exist')
    })


    it('adicionaProdutos', () => {
      let inCart = 0;
      CommonPage.InventoryItems()
        .each(($el, index, $list) => {
          if (index % 2 == 0) {
            cy.wrap($el).find('.btn_primary')
              .click()
            cy.get('#remove-sauce-labs-backpack').first().should('exist')

            inCart++;
          }
        })
        .then(() => {
          CommonPage.ShoppingCartBadge()
            .should('have.text', '' + inCart)
        })

      cy.getAllLocalStorage().should(() => { 
        expect(localStorage.getItem('cart-contents')).to.be.equal('[4,1,2]')
      })
    })
  })
})
