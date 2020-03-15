Feature:User Story1: User Registration
As a customer Such that I go to register I want to register a user

  Scenario: Register a user with success
        Given I am on the sign_in page
        When I press signup ?
        Then I should be on the sign_up page
        And I fill in fullname with "Hasan"
        And I fill in username with "hasan2"
        And I fill in password with "parool"
        And I fill in email with "hasan2@gmail.com"
        And I fill in age with "27"
        And I fill in address with "Tartu"
        When I press Register
        Then I should see "h5" with "Username: hasan2" confirmation message

    Scenario: Register a user without success
        Given I am on the sign_in page
        When I press signup ?
        Then I should be on the sign_up page
        And I fill in fullname with "Hasan"
        And I fill in username with "hasan2"
        And I fill in password with "parool"
        And I fill in email with "hasan2@gmail.com"
        And I fill in age with "27"
        And I fill in address with "Tartu"
        When I press Register
        #And I fill in password with "parool34"
        #And I fill in fullname with "yyy"
        Then I cannot redirect to any other page as Dashboard
        #Then I should see "h4" with "Username and Email Must be Unique" error message