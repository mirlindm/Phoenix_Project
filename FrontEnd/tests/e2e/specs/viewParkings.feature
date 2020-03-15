Feature:User Story3: View Parking Spaces
As a customer So that I can view parking spaces for a specific area I want to type the destination address, start time & end time

    Scenario: Enter valid destionation address, start time and end time of parking
        Given I am on the sign_in page
        And I fill in username with "ahmed"
        And I fill in password with "parool"
        When I press Sign in
        Then I should see "h5" with "Username: ahmed" confirmation message
        And I am in the Dashboard
        And I click on Parkings
        And I click on Search
        And I open the Search Page
        And I enter the destination_address with "Raatuse 22, Tartu"
        When I press Search
        Then I should be on the same page SearchParking Page and can see the parking spaces in the map

        Scenario: View parking spaces in an incorrect destination address
        Given I am on the sign_in page
        And I fill in username with "ahmed"
        And I fill in password with "parool"
        When I press Sign in
        Then I should see "h5" with "Username: ahmed" confirmation message
        And I am in the Dashboard
        And I click on Parkings
        And I click on Search
        And I open the Search Page
        And I enter the destination_address with "Annelinn, Tartu"
        When I press Search
        Then I should be on the same page SearchParking Page and no parking spaces appear on the map
    
    
