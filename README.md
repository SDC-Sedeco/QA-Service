# Project Greenfield QA-Service

A service dedicated to serving the Questions & Answers widget.

## Setup

> Install dependencies
```
npm install
```

> Start the server in development
```
start-dev
```

> Start the server in production
```
start
```

> Run tests
```
npm test
```

Open ```http://localhost:8083```

## Tech-Stack

* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Postgres](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)


 ## Routes
[Project Greenfield API](https://gist.github.com/trentgoing/409c2d76ce8e187e2132e45d9bed4605#file-questions_api-md)


|Request Type|Endpoint                          |Status |
|:----------:|----------------------------------|:-----:|
|    GET     | /qa/:product_id                  |200    |
|    GET     | /qa/:question_id/answers         |200    |
|    POST    | /qa/:product_id                  |201    |
|    POST    | /qa/:question_id/answers         |201    |
|    PUT     | /qa/question/:question_id/helpful|204    |
|    PUT     | /qa/question/:question_id/report |204    |
|    PUT     | /qa/answer/:answer_id/helpful    |204    |
|    PUT     | /qa/answer/:answer_id/report     |204    |
 
