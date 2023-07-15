import ProductPage from './pages/products';

const {
  minPrice,
  maxPrice,
  megaMenuButtonText,
  menuItemText,
  menuItemText2,
  prices,
  portalCategoryItemText,
  portalCategoryItemText2,
  city,
  searchTypeText,
  totalPrice
} = Cypress.env("data");


describe('functionality check', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('price filter', () => {    
    ProductPage.getProductsPage(megaMenuButtonText, menuItemText, portalCategoryItemText);

    ProductPage.changePriceRange(minPrice, maxPrice);

    cy.wait(10000);
    cy.get('.product-card > .product-card__content > .product-card__buy-box > .v-pb > .v-pb__cur > .sum')
      .each(($productPrice) => {
        const price = parseInt($productPrice.text().replace(' ', ''));
        expect(price).to.be.within(minPrice, maxPrice);
      })
      
  })

  it('add Items to Basket Test', () => {    
    ProductPage.getProductsPage(megaMenuButtonText, menuItemText, portalCategoryItemText);

    ProductPage.checkProductTitleInShopingCart(0);

    cy.get('.v-modal__close-btn').click()

    ProductPage.getProductsPage(megaMenuButtonText, menuItemText2, portalCategoryItemText2);

    ProductPage.checkProductTitleInShopingCart(0);

    cy.get('.product-item__wrap > :nth-child(1) > .content > .product_qty_price > .price-box > .price-box__cur')
      .each(($productPrice, index) => {
        const price = parseInt($productPrice.text().replaceAll(' ', ''));
        expect(price).to.equal(prices[index]);
      })

    cy.get('.total-box__price')
      .contains(`${totalPrice}`)
  })

  it('search the item', () => {
    cy.get('#search-form__input').type(searchTypeText).type('{enter}');

    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?q=${searchTypeText}`);
    })

    cy.get('.product-card__title')
      .should('contain', searchTypeText)
  })

  it('change geo label', () => {
    cy.get('.mh-loc > .mh-button').click()

    cy.get('.geo').contains(city).click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/ua/${city}/`);
    })
  })
})