# Feature: Search a course
    # Scenario: Should search by text
    #     Given user is on "/navigation" page
    #     When user search by "тестировщик"
    #     Then user sees the course suggested "Тестировщик ПО"
    # Scenario: Successful booking one standard place
    #     Given user is located on "Сеансы" page
    #     When user chooses the movie and the time of the session
    #     Then user sees the "Схема зала" page
 Feature: Booking tickets   
    Scenario: Successful booking one standard place
        Given user is located on "Сеансы" page
        When user chooses the movie and the time of the session
        And user chooses standart place
        And user click on acceptin-button
        Then user sees "Вы выбрали билеты:" page
        
    Scenario: Successful booking more then one standard place
        Given user is located on "Сеансы" page
        When user chooses the movie and the time of the session
        And user chooses standart place
        And user chooses second standart place
        And user click on acceptin-button
        Then user sees "Вы выбрали билеты:" page
    
    Scenario: Unsuccessful booking busy standard place
        Given user is located on "Сеансы" page
        When user chooses the session with busy place  
        And user chooses busy standart place
        Then user sees that the acceptin-button to be disabled

       