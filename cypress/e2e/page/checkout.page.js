import checkoutData from "../data/checkout.data";
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

    get finishBtn() {
        return ('#finish') 
    }

    get backToProductsBtn() {
        return ('#back-to-products') 
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

    /*---------------------------------------------------*/
	get itemName(){
		return (".inventory_item_name");
	}

	get itemPrice(){
		return (".inventory_item_price");
	}

	get txtTax(){
		return (".summary_tax_label");
	}

	get txtSubTotal(){
		return (".summary_subtotal_label");
	}

	get txtTotal(){
		return (".summary_total_label");
	}

	calculateTax(preTaxPrice){
		return (preTaxPrice * checkoutData.taxRate).toFixed(2);
	}

	calculateTotal(preTaxPrice){
		return (preTaxPrice * (1 + checkoutData.taxRate)).toFixed(2);
	}
}

module.exports = new Checkout();