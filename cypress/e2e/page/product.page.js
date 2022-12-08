class Product{
	get itemsName() { 
		return ('.inventory_item_name') 
	}
    get itemsPrice() { 
    	return ('.inventory_item_price') 
    }

    get selectSortDropDown() { 
    	return ('.product_sort_container') 
    }

    selectSort(sort){
        cy.get(this.selectSortDropDown).select(sort)
    }

}
module.exports = new Product();