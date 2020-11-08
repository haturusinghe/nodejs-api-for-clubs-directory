# Clubs Directory REST API for IS Portal Project

_a RESTful API with CRUD Functionalities_

# ENDPOINT 1:

**https://rest-clubs.herokuapp.com/list**

PARAMETERS:

## - name

The API sends you all club entries with a club name matching with the requested parameter.\
Example: https://rest-clubs.herokuapp.com/list?name="colombo"

## - limit

Limits the number of entries per page.
Default: 10\
Example: https://rest-clubs.herokuapp.com/list?limit=20

## - page

The API sends you 10 entries per page by default. Use page=0 for the first 10 club entries, page=1 for the next 10 club entries, and so on...
Default: 0\
Example: https://rest-clubs.herokuapp.com/list?page=2

# ENDPOINT 2:

**https://rest-clubs.herokuapp.com/list/:id**

API sends the data for a single club with **clubId = id**.

# ENDPOINTS 3 & 4:

https://rest-clubs.herokuapp.com/login
When the users sends a POST request with valid credentials , returns the user a reponse containing a JWT which expires within 2 hours.\
\
https://rest-clubs.herokuapp.com/signup
Allows user to signup by sending a POST request with user details.

## Once a user has succesfully logged in , the following endpoints will be accessible

# ENDPOINTS 5:

https://rest-clubs.herokuapp.com/clubs/new
By sending a POST request to this endpoint with valid data , user can create a new club entry.

# ENDPOINTS 6:

https://rest-clubs.herokuapp.com/clubs/:id
By sending a UPDATE request to this endpoint with valid data , user can update an existing club entry with clubId = id.

By sending a DELETE request to this endpoint user can delete an existing club entry with clubId = id.
