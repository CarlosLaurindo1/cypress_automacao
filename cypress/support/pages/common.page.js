export let CommonPage = {
    MainBurgerButton: () => cy.get('.bm-burger-button button'),
    InventoryItems: () => cy.get('.inventory_item'),
    CartListItems: () => cy.get('.cart_item'),
    ShoppingCartBadge: () => cy.get('#shopping_cart_container .shopping_cart_badge'),
  };