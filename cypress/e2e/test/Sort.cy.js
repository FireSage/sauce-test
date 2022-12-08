import LoginPage from '../page/login.page'
import users from '../data/users.data'
import Product from '../page/product.page'
import ProductData from '../data/products.data'

describe('Sort', () => {
    beforeEach(() => {
        cy.visit('')
        LoginPage.login(users.valid.username,users.valid.password)
      })

    it('should sort product list from A-Z', () => {
        Product.selectSort(ProductData.sort['A to Z'])

        // Sort data list based on name, from A to Z
        ProductData.products.sort()

        cy.get(Product.itemsName).each(($elem, index) => {
            expect($elem.text()).equal(ProductData.products[index].name)
        })
    })

    it('should sort product list from Z-A', () => {
        Product.selectSort(ProductData.sort['Z to A'])

        // Sort data list based on name, from Z to A
        ProductData.products.sort().reverse()

        cy.get(Product.itemsName).each(($elem, index) => {
            expect($elem.text()).equal(ProductData.products[index].name)
        })
    })

    it('should sort product list from low to high', () => {
        Product.selectSort(ProductData.sort['Low to High'])

        // Sort data list based on price, from low to high
        ProductData.products.sort((a, b) => a.price - b.price)

        cy.get(Product.itemsPrice).each(($elem, index) => {
            expect($elem.text()).equal(`$${ProductData.products[index].price}`)
        })
    })

    it('should sort product list from high to low', () => {
        Product.selectSort(ProductData.sort['High to Low']);

        // Sort data list based on price, from high to low
        ProductData.products.sort((a, b) => b.price - a.price);

        cy.get(Product.itemsPrice).each(($elem, index) => {
            expect($elem.text()).equal(`$${ProductData.products[index].price}`);
        })
    })
});