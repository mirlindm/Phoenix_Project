given('I am on the sign_in page', () => {
    cy.visit('http://localhost:8080');
  })
  when('I press signup ?', () => {
    cy.get('#button1').click();
  })
  then('I should be on the sign_up page', () => {
    cy.url().should('eq', 'http://localhost:8080/signup');
  })
  and('I fill in fullname with {string}', (fname) => {
    cy.get('#inputFullname').type(fname);
  })
  and('I fill in email with {string}', (email) => {
    cy.get('#inputEmail').type(email);
  })
  and('I fill in age with {string}', (age) => {
    cy.get('#inputAge').type(age);
  })
  and('I fill in address with {string}', (address) => {
    cy.get('#inputAddress').type(address);
  })
  when('I press Register', () => {
    cy.get('#registerButton').click();
  })
// then('I should see {string} with {string} error message', (tag, value) => {
//     cy.contains(tag, value);
//   })
then('I cannot redirect to any other page as Dashboard', () => {
    cy.url().should('eq', 'http://localhost:8080/signup');
})