import loginPage from "../page/login.page.js";
import cart from "../page/cart.page.js";
import routes from "../data/routes.data.js";
import users from "../data/users.data.js";
import checkoutData from "../data/checkout.data.js";
import { products } from "../data/products.data.js";
import CheckoutPage from '../page/checkout.page'


describe("Checkout Products", ()=>{
		beforeEach(()=>{
		cy.visit("");
		loginPage.login(users.valid.username, users.valid.password);
	});

	it("Should NOT allow invalid first name", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		cart.navigateToCart();
		cy.get(cart.checkOutBtn).click();

		cy.url().should('include', `${routes.checkout}-step-one`);

		cy.get(CheckoutPage.txtLastname).type(checkoutData.lastname);
		cy.get(CheckoutPage.txtPostalCode).type(checkoutData.postalCode);
		cy.get(CheckoutPage.continueBtn).click();

		cy.get(CheckoutPage.errorFirstname).should('exist');
		cy.get(CheckoutPage.errorFirstname).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('exist');
		cy.get(CheckoutPage.errorMessageContainer).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('contain', CheckoutPage.firstNameErrorMessage);

	});

	it("Should NOT allow invalid last name", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		cart.navigateToCart();
		cy.get(cart.checkOutBtn).click();


		cy.get(CheckoutPage.continueBtn).click();

		cy.url().should('include', `${routes.checkout}-step-one`);

		cy.get(CheckoutPage.txtFirstname).type(checkoutData.firstname);
		cy.get(CheckoutPage.txtPostalCode).type(checkoutData.postalCode);
		cy.get(CheckoutPage.continueBtn).click();

		cy.get(CheckoutPage.errorLastname).should('exist');
		cy.get(CheckoutPage.errorLastname).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('exist');
		cy.get(CheckoutPage.errorMessageContainer).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('contain', CheckoutPage.lastNameErrorMessage);

	});

	it("Should NOT allow invalid postal code", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		cart.navigateToCart();

		cy.get(cart.checkOutBtn).click();

		cy.url().should('include', `${routes.checkout}-step-one`);

		cy.get(CheckoutPage.txtFirstname).type(checkoutData.firstname);
		cy.get(CheckoutPage.txtLastname).type(checkoutData.lastname);
		cy.get(CheckoutPage.continueBtn).click();

		cy.get(CheckoutPage.errorPostalCode).should('exist');
		cy.get(CheckoutPage.errorPostalCode).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('exist');
		cy.get(CheckoutPage.errorMessageContainer).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('contain', CheckoutPage.postalCodeErrorMessage);

	});

	it.only("Should allow checkout with valid data", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		cart.navigateToCart();

		cy.get(cart.checkOutBtn).click();

		cy.url().should('include', `${routes.checkout}-step-one`);

		fillCheckOutinfo(checkoutData.firstname, checkoutData.lastname, checkoutData.postalCode);
		// check url 
		cy.url().should('include', `${routes.checkout}-step-two`);


	});
	it.only("Should allow checkout with valid data", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		
		fillCheckOutinfo(checkoutData.firstname, checkoutData.lastname, checkoutData.postalCode);

		// check url 
		cy.url().should('include', `${routes.checkout}-step-two`);
		
		// check for products added
		

		// check for valid cart totals 


	});

})

function fillCheckOutinfo(firstname, lastname, postalCode){
	cart.navigateToCart();

	cy.get(cart.checkOutBtn).click();

	cy.url().should('include', `${routes.checkout}-step-one`);

	cy.get(CheckoutPage.txtFirstname).type(firstname);
	cy.get(CheckoutPage.txtLastname).type(lastname);
	cy.get(CheckoutPage.txtPostalCode).type(postalCode);
	cy.get(CheckoutPage.continueBtn).click();
}