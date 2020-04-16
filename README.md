# Om Zone API

# Demo
### [Live](https://omzone.snazzyj.now.sh/)
### [Om Zone Repo](https://github.com/snazzyj/OmZone)
### Demo Account:
### Email: test@gmail.com
### Password: Password123

# Summary
This API is very basic to the point. It allows user to sign up and login. When the user is done meditating for that session, it will get posted and saved.

# Routes

## Users

  POST Req for Login
  
  URL: `https://pure-anchorage-91926.herokuapp.com/api/auth/login`
  
  Input: {email: "test@gmail.com", password: "Password123"}
  
  Response: `{ 
        "user": {
          "id": 1,
          "medData": [
            {
                "id": 1,
                "date_published": "Apr 13th 2020",
                "minutes": 2
            },
            {
                "id": 1,
                "date_published": "Apr 13th 2020",
                "minutes": 2
            },
            {
                "id": 1,
                "date_published": "Apr 13th 2020",
                "minutes": 15
            },
            {
                "id": 1,
                "date_published": "Apr 13th 2020",
                "minutes": 10
            },
            {
                "id": 1,
                "date_published": "Apr 11th 2020",
                "minutes": 1
            },
            {
                "id": 1,
                "date_published": "Apr 11th 2020",
                "minutes": 1
            },
            {
                "id": 1,
                "date_published": "Apr 10th 2020",
                "minutes": 1
            }
        ],
        "totalTime": 105
    }
   }`
  
  POST Req for Signing Up
  
  URL: `https://pure-anchorage-91926.herokuapp.com/api/auth/register`
  
  Input: {name: "Foo Bar", email: "foobar@foo.com", password: "BarBar"}
  
  Response: `{
    "name": "Foo Bar",
    "email": "foobar@foo.com",
    "password": "$2a$12$DpAxwPy5YVJWugcn9J9bfOuXJDzmEFzQlv92u3PllQWDZ3t9nuZF6"
}`

##  Med Tracker 
  
  POST Req will post new meditation log
  
  URL: `https://pure-anchorage-91926.herokuapp.com/api/medtracker`
  
  Input: `{id: 1, minutes: 15}`
  
  Response: `{
    "id": 1,
    "date_published": "Apr 14th 2020",
    "minutes": 15
}`


# Tech
1. Postgres
2. Express
3. NodeJs

  
