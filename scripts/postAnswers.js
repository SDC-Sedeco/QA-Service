import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contact_request_rate: {
      executor: 'constant-arrival-rate', //generates constant request rate with constant arrival
      rate: 100,
      timeUnit: '1s', //100 iterations per second (100 RPS)
      duration: '60s', //Max
      preAllocatedVUs: 100, // Initial pool of VUs
      maxVUs: 200, //Initialize more if preAllocated not enough
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};


export default function () {
  const BASE_URL = 'http://localhost:8083';
  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const questionId = randomInt(3167060, 3518957)

  const data = {
    body: 'Is this going to be worth buying?',
    name: 'CuriousTester',
    email: 'CuriousTest@gmail.com',
    photos: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80']
  }

  const res = http.post(`${BASE_URL}/api/qa/questions/${questionId}/answers`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}}
  );

  check(res, {
    success: (r) => r.status === 201,
  });
}

