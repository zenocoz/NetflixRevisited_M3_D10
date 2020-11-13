# NetflixRevisited_M3_D10

A Netflix clone home page, made dynamic.

Module 3 - Assignment
Use ES6 to improve the Netflix previous example.

            FEATURES:
            / Create a backoffice page to insert, edit and remove movies
            / These movies will have a category
            / On the main page you should create, programmatically, a number of “lists” equal to the number of categories you are creating
            EXTRA FEATURES:
            / Create validators in the back office page
            / Put loaders on the main page while loading the info from the APIs
            API
             #---------------------------------------------------------------#
            EVERY REST API CALL SHOULD BE AUTHENTICATED.
            Every request to the API should use Token Based Authentication to secure access to the contents.
            You can get your token by registering on: strive.school/studentlogin
            Authorization: Bearer ###########
            Where ######### is the access_token returned by the endpoint.
            You can refresh the token (expires every 14 days) with
            POST https://striveschool-api.herokuapp.com/api/account/login
            {
                "username": "testusername",
                "password":"pass"
            }
            #---------------------------------------------------------------#
            API ENDPOINT:
            //------------------------------------------------------------------------------------
            GET https://striveschool-api.herokuapp.com/api/movies/
            return an array with the available categories
            [ "drama", "comedy" ... ] //N.B.: The category list is not fixed, is generate FROM your movies and therefore if you have an empty movie list, the list is []
            //------------------------------------------------------------------------------------
            GET https://striveschool-api.herokuapp.com/api/movies/{category}

            return an array of movies from the given {category}
            ES
            [
                {
                    "_id": "5d3598a3a38caa57a0272d33", //SERVER GENERATED
                    "name": "app test 1",
                    "description": "somthing longer",
                    "category": "drama",
                    "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
                    "userId": "admin",  //SERVER GENERATED
                    "createdAt": "2019-07-22T11:06:11.784Z",  //SERVER GENERATED
                    "updatedAt": "2019-07-22T11:06:11.784Z",  //SERVER GENERATED
                    "__v": 0  //SERVER GENERATED
                }
            ]
            //------------------------------------------------------------------------------------
            POST https://striveschool-api.herokuapp.com/api/movies/
            Creates a new movie.
             {
                "name": "Strive School",
                "description": "Horror movie about coding 10 hours per day",
                "category": "horror",
                "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
            }
            //------------------------------------------------------------------------------------
            PUT https://striveschool-api.herokuapp.com/api/movies/{id}
            EDIT the movie with id = {id}
            //------------------------------------------------------------------------------------
            DELETE https://striveschool-api.herokuapp.com/api/movies/{id}
            Delete the movie with id = {id}
            //------------------------------------------------------------------------------------
            HINTS:
            - Start from the back office page (POST method)
            - Then GET the categories from the "home page" and for each category, fetch and display the info
            - Add PUT and DELETE methods
            - Add loaders and validation
            - Starting from previous Netflix, use the very same code for template literals (cards, containers ecc.)
            In main page:
            1) Get all the categories ==> [ "drama", "fantasy", "comedy"]
            2) For each category, you are gonna FETCH the relative movie ==> iteration 0 : GET https://strive-school-testing-apis.herokuapp.com/api/movies/drama
                                                                             iteration 1 : GET https://strive-school-testing-apis.herokuapp.com/api/movies/fantasy
            3) Use some template literals to display them ==> for each one of them, create a container to wrap all the showsßß
