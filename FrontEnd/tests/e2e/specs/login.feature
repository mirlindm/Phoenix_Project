Feature:User Story2: User Login
As a customer So that I go to login I want to sign in as a user

    Scenario: Login with valid credentials
        Given I am on the sign_in page
        And I fill in username with "ahmed"
        And I fill in password with "parool"
        When I press Sign in
        Then I should see "h5" with "Username: ahmed" confirmation message 

    Scenario: Login with invalid credentials
        Given I am on the sign_in page
        And I fill in username with "ahmed"
        And I fill in password with "parool1"
        When I press Sign in
        Then I should see "h4" with "Invalid Username or Password" confirmation message  