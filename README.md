# QA-Service

A service dedicated to serving the Questions & Answers widget.

# Setup

Install dependencies: -npm install

Start the server: -npm start

Run tests: -npm test

# Dependencies
 * express ^4.17.1
 * nodemon ^2.0.13
 * cors ^2.8.5
 * morgan ^1.10.0
 * pg ^8.7.1
 * aws-sdk ^2.1018.0
 * multer ^1.4.3

 # devDependencies
 * dotenv ^10.0.0
 * eslint ^8.0.0
 * jest ^27.2.5
 * supertest ^6.1.6

 # Database
  Postgres (psql 14.0)

 # APIs

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