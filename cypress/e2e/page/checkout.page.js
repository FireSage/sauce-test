class Checkout{

    get txtFirstname() {
        return ('#first-name') 
    }

    get errorFirstname() {
        return ('#first-name + svg.error_icon') 
    }

    get txtLastname() {
        return ('#last-name') 
    }

    get errorLastname() {
        return ('#last-name + svg.error_icon') 
    }


    get txtPostalCode() {
        return ('#postal-code') 
    }

    get errorPostalCode() {
        return ('#postal-code + svg.error_icon') 
    }

    get errorMessageContainer() {
        return ('.error-message-container') 
    }

    get continueBtn() {
        return ('#continue') 
    }

    get firstNameErrorMessage() {
        return 'Error: First Name is required' 
    }
    get lastNameErrorMessage() {
        return 'Error: Last Name is required' 
    }
    get postalCodeErrorMessage() {
        return 'Error: Postal Code is required' 
    }

}

module.exports = new Checkout();