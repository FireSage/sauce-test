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

		fillCheckOutinfo(null, checkoutData.lastname, checkoutData.postalCode);

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

		fillCheckOutinfo(checkoutData.firstname, null, checkoutData.postalCode);

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

		fillCheckOutinfo(checkoutData.firstname, checkoutData.lastname, null);

		cy.get(CheckoutPage.errorPostalCode).should('exist');
		cy.get(CheckoutPage.errorPostalCode).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('exist');
		cy.get(CheckoutPage.errorMessageContainer).should('be.visible');
		cy.get(CheckoutPage.errorMessageContainer).should('contain', CheckoutPage.postalCodeErrorMessage);

	});

	it("Should allow checkout with valid data", ()=>{
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

	it("Should allow checkout with correct tax and totals for single item", ()=>{
		const product = products[Math.floor(Math.random()*products.length)];
		cart.addToCart(product.name);
		cy.get(cart.cartBadge).should("have.text", "1");

		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
		cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');

		
		fillCheckOutinfo(checkoutData.firstname, checkoutData.lastname, checkoutData.postalCode);

		// check url 
		cy.url().should('include', `${routes.checkout}-step-two`);
		
		//check page title

		// check for products added
		cy.get(CheckoutPage.itemName).should('contain', product.name);
		cy.get(CheckoutPage.itemPrice).should('contain', `$${product.price}`);

		// check for valid cart totals 
		cy.get(CheckoutPage.txtTax).should('contain', `$${CheckoutPage.calculateTax(product.price)}`);

		cy.get(CheckoutPage.txtTotal).should('contain', `$${CheckoutPage.calculateTotal(product.price)}`);

		// check card information


		// check shipping information

		cy.get(CheckoutPage.finishBtn).click();
		cy.url().should('contain', routes.checkoutComplete);

		cy.get(CheckoutPage.backToProductsBtn).click();
	});

	it("Should allow checkout with correct tax and totals for multiple item", ()=>{
		const product_starting_index = Math.floor(Math.random()*(products.length/2));
		let selected_products = [
			products[product_starting_index],
			products[product_starting_index+1],
			products[product_starting_index+2]
		];
		let items_sub_total = 0;
		selected_products.forEach((product, index)=> {
			items_sub_total += Number(product.price);
			cart.addToCart(product.name);
			cy.get(cart.cartBadge).should("have.text", (index + 1));

			cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('exist');
			cy.get(`[id='remove-${cart.applySelectorFormat(product.name)}']`).should('be.visible');
		});
		
		fillCheckOutinfo(checkoutData.firstname, checkoutData.lastname, checkoutData.postalCode);

		// check url 
		cy.url().should('include', `${routes.checkout}-step-two`);
		
		// check for products added
		cy.get(".cart_list > .cart_item").each((element, index, list)=>{
			cy.wrap(element).find(CheckoutPage.itemName).should('contain', selected_products[index].name);
			cy.wrap(element).find(CheckoutPage.itemPrice).should('contain', `$${selected_products[index].price}`);
		});

		// check for valid cart totals 
		cy.get(CheckoutPage.txtSubTotal).should('contain', `$${items_sub_total}`);
		cy.get(CheckoutPage.txtTax).should('contain', `$${CheckoutPage.calculateTax(items_sub_total)}`);

		cy.get(CheckoutPage.txtTotal).should('contain', `$${CheckoutPage.calculateTotal(items_sub_total)}`);

		cy.get(CheckoutPage.finishBtn).click();
		cy.url().should('contain', routes.checkoutComplete);
		
		cy.get(CheckoutPage.backToProductsBtn).click();
	});

})

function fillCheckOutinfo(firstname, lastname, postalCode){
	cart.navigateToCart();

	cy.get(cart.checkOutBtn).click();

	cy.url().should('include', `${routes.checkout}-step-one`);
	if(firstname){
		cy.get(CheckoutPage.txtFirstname).type(firstname);
	}
	if(lastname){
		cy.get(CheckoutPage.txtLastname).type(lastname);
	}
	if(postalCode || postalCode == 0){
		cy.get(CheckoutPage.txtPostalCode).type(postalCode);
	}
	cy.get(CheckoutPage.continueBtn).click();
}