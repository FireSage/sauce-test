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

		confirmItemInCart(product);		

	});
	it.only("Should Add multiple items to the cart", ()=>{
		const product_starting_index = Math.floor(Math.random()*(products.length/2));
		let selected_products = [
			products[product_starting_index],
			products[product_starting_index+1],
			products[product_starting_index+2]
		];
		selected_products.forEach((product, index)=> {
			cart.addToCart(product.name)
			cy.get(cart.cartBadge).should("have.text", (index+1));
			cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
			cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');
		});


		cart.navigateToCart();
		cy.url().should("include", routes.cart);

		selected_products.forEach((product, index)=>{
			confirmItemInCart(product);
		});

	});
});

function confirmItemInCart(product){
	cart.navigateToCart();
	cy.url().should("include", routes.cart);

	const remove_id = `[id='remove-${cart.applySelectorFormat(product.name)}']`;
	cy.get(remove_id).parents(".cart_item_label")
		.find('.inventory_item_name').should('exist');
	cy.get(remove_id).parents(".cart_item_label")
		.find('.inventory_item_name').should('have.text', product.name);
	cy.get(remove_id).parents(".cart_item_label")
		.find('.inventory_item_price').should('exist');
	cy.get(remove_id).parents(".cart_item_label")
		.find('.inventory_item_price').should('have.text', `$${product.price}`);
	cy.get(remove_id).should('exist');
	cy.get(remove_id).should('be.visible');
	cy.get(remove_id).should('exist');

}