Feature: User Story6: Upate User Account
As a customer
So that I can update my personal information
I want to navigate to my Account

    Scenario: Update User Account Successfully
        Given I am on the sign_in page
        And I fill in username with "ahmed"
        And I fill in password with "parool"
        When I press Sign in
        Then I should see "h5" with "Username: ahmed" confirmation message
        And I am in the Dashboard
        And I click on ahmed
        And I click on Profile
        And I should be on the Profile page
        And I edit the fullname with "Ahmed I S"
        #And I edit the email with "ahmedimamsamir@email.com"
        And I edit the age with 31
        And I edit the address with "Egypt, Cairo"
        When I press Save
        Then I should remain on the Profile page and see a success notification pop up
        #Then I should see "h4" with "Personal Information Updated Successfully" confirmation message 

    Scenario: Update User Age with String Input
        Given I am on the sign_in page
        And I fill in username with "ahmed"
        And I fill in password with "parool"
        When I press Sign in
        Then I should see "h5" with "Username: ahmed" confirmation message
        And I am in the Dashboard
        And I click on ahmed
        And I click on Profile
        And I should be on the Profile page
        And I edit the fullname with "Ahmed I S"
        #And I edit the email with "ahmedimamsamir@email.com"
        And I edit the age with "31"
        And I edit the address with "Egypt, Cairo"
        When I press Save
        Then I should remain on the Profile page and see a success notification pop up
        #Then I should see "h4" with "Personal Information Updated Successfully" confirmation message 