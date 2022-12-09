# Saucedemo.com test automation

This project contains automated tests for the [Swag Labs]https://saucedemo.com website.
Test coverage includes the login, shopping cart and checkout flows. 

## Setup
Clone the repository
Open the folder in your shell (such as bash or power shell)
Run 
```bash
npm install 
``` 
to install dependencies

## Testing
Run 
```bash
npx cypress run
```
to run all tests


To run individual test suites
```bash
npx cypress run test --spec ".\cypress\e2e\test\[filename]"
```
e.g.

for login
```bash
    npx cypress run --spec .\cypress\e2e\test\login.cy.js
```

for sorting
```bash
    npx cypress run --spec .\cypress\e2e\test\sort.cy.js
````

for Add to cart
```bash
    npx cypress run --spec .\cypress\e2e\test\addToCart.cy.js
```

for checkout
```bash
    npx cypress run --spec .\cypress\e2e\test\checkout.cy.js
```

## Cross-browser testing
The project is configured for cross browser testing. Tests run in Google Chrome by default but changing this to run in other browsers or multiple browsers is simple. User the '--browser' argument when running the test:
```bash
npx cypress run --browser [browser name]
``` 
e.g. 
```bash
npx cypress run --browser firefox
```

## Testing with Random Products
Shopping cart checkout is tested with ramdom products. A randdom index is generated and used to select a product/(s) from the products list for each test.