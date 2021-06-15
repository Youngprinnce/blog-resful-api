## About

SIMPLE BLOG API WITH CRUD FUNCTIONALITIES

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## MVC

No view needed, just Postman it

## Prerequisites

What things you need to install the software and how to install them

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

## Installing

To test on your own computer

* `git clone https://github.com/Youngprinnce/blog-resful-api.git`

* `cd blog-resful-api`

* `npm install`

* Rename .env.example to .env

## Running the project

Run `npm start`

Server runs on <http://localhost:5000>

## Routes API

### BASE ROUTE <https://necessary-luxurious-cymbal.glitch.me/>

Routes | HTTP | Description
--- | --- | ---
**api/v1/blog/create** | `POST` | Create a blog post
**api/v1/blog/get-all** | `GET` | Get all blog post
**api/v1/blog/:blogId** | `GET` | Get a single blog post
**api/v1/blog/update/:blogId** | `UPDATE` | Update a single blog post
**api/v1/blog/delete/:blogId** | `DELETE` | Delete a single blog post
**api/v1/comment/create** | `POST` | Create a blog post
**api/v1/comment/blog-comments/:blogId** | `GET` | Get all comments in a blog post
**api/v1/comment/get-comment/:blogId/:commentId** | `GET` | Get a single comment in a blog post
**api/v1/comment/update/:blogId/:commentId** | `UPDATE` | Update a blog post comment
**api/v1/comment/delete/:blogId/:commentId** | `DELETE` | Delete a blog post comment

## Tests

To run unit test, run the following codes in the root directory

* `npm run test`

## Special attention

* Code structure, arrangment and naming of files
* Data query from mongodb
* linting on all files
* Code readability
* error handling
* API response

## Notes

* CommentID in this API is the _id in each object in the array comments, this id can be used to get and update comment.
* When using the delete endpoint for blog, if any comments are related to the blog been deleted, the comment get deleted too.
* If you are using the hoosted api to test the route, at the initial request it may take time to load up, that because it is hosted on glitch

## License

This project is licensed under the MIT License.
