given('I am on the sign_in page', () => {
  cy.visit('http://localhost:8080');
})
and('I fill in username with {string}', (username) => {
  cy.get('#inputUsername').type(username);
})
and('I fill in password with {string}', (pass) => {
  cy.get('#inputPassword').type(pass);
})
when('I press Sign in', () => {
  cy.get('button[type="submit"]').click();
})
then('I should see {string} with {string} confirmation message', (tag, value) => {
  cy.contains(tag, value);
})