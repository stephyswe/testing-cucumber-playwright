Feature: As a user I can intercept a REST api and mock the response

  @smoke
  Scenario: As a user I expect to see the REST users
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "1st" "full name" should contain the text "Leanne Graham"

  @smoke
  Scenario: As a user I can mock no users existing
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "no users"
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "full name" should not be displayed

  @smoke
  Scenario: As a user I can mock a single user
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "single user"
    When I click the "playground" button
    And I am directed to the "playground" page
    Then the "1st" "full name" should not contain the text "Leanne Graham"
    And the "1st" "full name" should contain the text "Todd Smith"

  @smoke
  Scenario: As a user I can mock multiple users
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "multiple users"
    When I click the "playground" button
    And I am directed to the "playground" page
    And the "1st" "full name" should contain the text "Todd Smith"
    And the "2nd" "full name" should contain the text "Natalie Ford"
    And the "3rd" "full name" should contain the text "River Wild"
    And I wait "20" seconds

  @smoke
  Scenario: As a user I can validate only 5 users will display as expected
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "six users"
    When I click the "playground" button
    And I am directed to the "playground" page
    And the "1st" "full name" should contain the text "Todd Smith"
    And the "2nd" "full name" should contain the text "Natalie Ford"
    And the "3rd" "full name" should contain the text "River Wild"
    And the "4th" "full name" should contain the text "Monica Louise"
    And the "5th" "full name" should contain the text "Ted Nugget"
    And the "6th" "full name" should not be displayed

