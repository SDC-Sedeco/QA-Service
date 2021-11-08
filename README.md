# QA-Service

A service dedicated to serving the Questions & Answers widget.

# Setup

Install dependencies: -npm install

Start the server:
-npm start (development)

Run tests: -npm test

Open http://localhost:8083

# Tech-Stack
 Node.js
 Express
 Postgres
 Docker

 # Routes
 QUESTIONS
 * GET /qa/questions
 * POST /qa/questions
 * PUT /qa/questions/:question_id/helpful
 * PUT /qa/questions/:question_id/report

 ANSWERS

 * GET /qa/questions/:question_id/answers
 * POST /qa/questions/:question_id/answers
 * PUT /qa/answers/:answer_id/helpful
 * PUT /qa/answers/:answer_id/report