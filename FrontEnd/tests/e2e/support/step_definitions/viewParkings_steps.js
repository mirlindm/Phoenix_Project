and('I am in the Dashboard', () => {
    cy.url().should('eq', 'http://localhost:8080/Home');
})
and('I click on Parkings', () => {
  //cy.url().should('eq', 'http://localhost:8080/Home');
  cy.contains('Parkings').click()
})
and('I click on Search', () => {
  //cy.url().should('eq', 'http://localhost:8080/Home');
  cy.contains('Search').click()
})
and('I open the Search Page', () => {
  cy.url().should('eq', 'http://localhost:8080/ParkingSearch');  
  //cy.visit('http://localhost:8080/ParkingSearch');
    //cy.get('ul').children('.active')
})
and('I enter the destination_address with {string}', (destination_address) => {
    cy.get('#inputLocation').type(destination_address);
  })
// and('I fill in start_time with {string}', (start_time) => {
//   cy.get('#st').type(start_time);
    
//   })
//   and('I fill in end_time with {string}', (end_time) => {
//     cy.get('#et').type(end_time);
      
//     })
// and('I enter the end_time with {string}', (end_time) => {
//     cy.get('input[name="end_time"]').invoke('val').then((end_time) => {
//         expect("12/12/2019 5:12 PM").to.equal(end_time);
//     });
//  })
  when('I press Search', () => {
    cy.get('#searchButton').click();
  })
  then('I should be on the same page SearchParking Page and can see the parking spaces in the map', () => {
    cy.url().should('eq', 'http://localhost:8080/ParkingSearch');
  })
  // then('I should see {string} with id {string} showing all the parking spaces in that area in a map', (tag, value) => {
  //   cy.contains(tag, value);
  // })
  then('I should be on the same page SearchParking Page and no parking spaces appear on the map', () => {
    cy.url().should('eq', 'http://localhost:8080/ParkingSearch');
  })