and('I am in the Dashboard', () => {
    cy.url().should('eq', 'http://localhost:8080/Home');
})
and('I click on ahmed', () => {
  //cy.url().should('eq', 'http://localhost:8080/Home');
  cy.contains('ahmed').click()
})
and('I click on Profile', () => {
  //cy.url().should('eq', 'http://localhost:8080/Home');
  cy.contains('Profile').click()
})
and('I should be on the Profile page', () => {
  cy.url().should('eq', 'http://localhost:8080/Profile');  
  //cy.visit('http://localhost:8080/ParkingSearch');
    //cy.get('ul').children('.active')
})
and('I edit the fullname with {string}', (fullname) => {
    cy.get('#inputFullname').clear()
    cy.get('#inputFullname').type(fullname);
  })
// and('I edit the email with {string}', (email) => {
//     cy.get('#inputEmail').clear()
//     cy.get('#inputEmail').type(email);
//   })
and('I edit the age with {int}', (age) => {
    cy.get('#inputAge').clear()
    cy.get('#inputAge').type(age);
  })
  and('I edit the age with {string}', (age) => {
    cy.get('#inputAge').clear()
    cy.get('#inputAge').type(age);
  })
and('I edit the address with {string}', (address) => {
    cy.get('#inputAddress').clear()
    cy.get('#inputAddress').type(address);
  })
// when('I press Save', () => {
//     //cy.get('#saveButton').click();
//     cy.get('#saveButton').click();
//   })
  when('I press Save', () => {
    cy.get('#saveButton').click();
  })
  then('I should remain on the Profile page and see a success notification pop up', () => {
    cy.url().should('eq', 'http://localhost:8080/Profile'); 
 })

//   then('I should see {string} with {string} confirmation message', (tag, value) => {
//     cy.contains(tag, value);
//   })