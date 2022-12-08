import loginPage from "../page/login.page.js";
import users from "../data/users.data.js";

describe("Add to cart ", ()=>{
	beforeEach(()=>{
		cy.visit("");
		loginPage.login(users.valid.username, users.valid.password);
	});
	it("Add an item to the cart", ()=>{
		
	});
});