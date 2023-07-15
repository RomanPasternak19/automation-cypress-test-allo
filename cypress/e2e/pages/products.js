class ProductPage {  
    getProductsPage(button, menuItem, categotyItem) { 
        cy.contains(button).click()
        cy.contains(menuItem).click()
        cy.get('.portal-category__item').contains(categotyItem).click()
    }
    
    changePriceRange(minPrice, maxPrice) {
        cy.get('.f-range__form-input').eq(0).clear().type(minPrice)
        cy.get('.f-range__form-input').eq(1).clear().type(maxPrice)
        cy.get('.f-popup__btn').click()
    }

    checkProductTitleInShopingCart(index) {
        cy.get('.product-card__title').eq(index).then(($title) => {
            const textTitle = $title.text()
      
            cy.get('.product-card > .product-card__content > .product-card__buy-box > .v-btn--cart').eq(index).click()
      
            cy.get('.products_list_item')
              .contains(textTitle)
        })
    }
  } 
   
export default new ProductPage();
  