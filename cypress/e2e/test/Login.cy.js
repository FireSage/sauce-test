import loginPage from "../page/login.page.js";
import users from "../data/users.data.js";
import routes from "../data/routes.data.js";

describe("User login ", ()=>{
	beforeEach(()=>{
		cy.visit("");
	});
	it("Should not Login with missing username", ()=>{
		cy.get(loginPage.txtPassword).type(users.valid.password)
        cy.get(loginPage.loginBtn).click()
		cy.url().should("eq", Cypress.config().baseUrl);
		cy.get(loginPage.userNameError).should('be.visible');
	});

	it("Should not Login with missing password", ()=>{
		cy.get(loginPage.txtPassword).type(users.valid.username)
        cy.get(loginPage.loginBtn).click()
		cy.url().should("eq", Cypress.config().baseUrl);
		cy.get(loginPage.userNameError).should('be.visible');
	});

	it("Should not Login with lockout user's credentials", ()=>{
		loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
		cy.url().should("eq", Cypress.config().baseUrl);
	});

	it("Should not login with invalid credentials", ()=>{
		loginPage.login("username", "password");
		cy.url().should("eq", Cypress.config().baseUrl);
	});

	it("Login with valid credentials", ()=>{
		loginPage.login(users.valid.username, users.valid.password);
		cy.url().should("include", routes.product);
	});
});