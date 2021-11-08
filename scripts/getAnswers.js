import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contact_request_rate: {
      executor: 'constant-arrival-rate', //generates constant request rate with constant arrival
      rate: 1000, //1000 RPS
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1000, // Initial pool of VUs
      maxVUs: 3000, //Initialize more if preAllocated not enough
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
  const question_id = randomInt(3167060, 3518957)

  const res = http.get(`${BASE_URL}/api/qa/questions/${question_id}/answers`
  );

  check(res, {
    success: (r) => r.status === 200,
  });
}

