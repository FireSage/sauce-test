import loginPage from "../page/login.page.js";
import cart from "../page/cart.page.js";
import routes from "../data/routes.data.js";
import users from "../data/users.data.js";
import { products } from "../data/products.data.js";

describe("Add to cart ", ()=>{
	beforeEach(()=>{
		cy.visit("");
		loginPage.login(users.valid.username, users.valid.password);
	});
	
	it("Should remove an item from the cart using product page link", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');

		cart.removeFromCart(product.name);
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('not.exist');
	});

	it("Should remove an item from the cart using cart link", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cart.navigateToCart();
		cart.removeFromCart(product.name);

	});

	it("Should Add an item to the cart", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		cart.navigateToCart();
		cy.url().should("include", routes.cart);

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

	});
});