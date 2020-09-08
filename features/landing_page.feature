Feature: Landing Page

  The landing page is the first page every visitor sees when opening https://www.cronn.de

  Background:
    Given a browser is open
    And we navigate to the landing page

  Scenario: Page Title
    Then the page title is correct

  Scenario: Company slogan
    Then the company slogan can be seen

  Scenario: Accept Cookies
    Given the cookie warning can be seen
    When we accept cookies
    Then the cookie warning cannot be seen anymore
