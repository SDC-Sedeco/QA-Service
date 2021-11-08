# Greenfield QA-Service

A service dedicated to serving the Questions & Answers widget.

## Setup

> Install dependencies
```
npm install
```

> Start the server in development
```
npm start
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
|REQUEST    |ENDPOINT                          |STATUS        |
|-----------|----------------------------------|--------------|
|    GET    |  /qa/:product_id                 |200 OK        |
|    GET    |  /qa/:question_id/answers        |200 OK        |
|    POST   |  /qa/:product_id                 |201 CREATED   |
|    POST   |  /qa/:question_id/answers        |201 CREATED   |
|    PUT    | /qa/question/:question_id/helpful|204 NO CONTENT|
|    PUT    | /qa/question/:question_id/report |204 NO CONTENT|
|    PUT    | /qa/answer/:answer_id/helpful    |204 NO CONTENT|
|    PUT    | /qa/answer/:answer_id/report     |204 NO CONTENT|
