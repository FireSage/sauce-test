
class LoginPage{

    get txtUserName() { 
    	return ('#user-name') 
    }
    get userNameError() { 
    	return ('#user-name + svg.error_icon') 
    }

    get txtPassword() { 
    	return ('#password') 
    }
    get passwordError() { 
    	return ('#password + svg.error_icon') 
    }
    get loginBtn() { 
    	return ('#login-button') 
	}

    get itemNames() { return ('.inventory_item_name') }

    get mainMenuBtn() { return ('#react-burger-menu-btn') }
    get logOutBtn() { return ('#logout_sidebar_link') }

    login(username, password){
        cy.get(this.txtUserName).type(username)
        cy.get(this.txtPassword).type(password)
        cy.get(this.loginBtn).click()
    }

    logout(){
        cy.get(this.mainMenuBtn).click()
        cy.get(this.logOutBtn).click()
    }
}

module.exports = new LoginPage();