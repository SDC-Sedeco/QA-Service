import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contact_request_rate: {
      executor: 'constant-arrival-rate', //generates constant request rate with constant arrival
      rate: 1000,
      timeUnit: '1s', //100 iterations per second (100 RPS)
      duration: '60s', //Max
      preAllocatedVUs: 1000, // Initial pool of VUs
      maxVUs: 1000, //Initialize more if preAllocated not enough
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};


export default function () {
  // const BASE_URL =  'http://ec2-54-193-102-122.us-west-1.compute.amazonaws.com'
  const BASE_URL = 'http://ec2-54-176-211-223.us-west-1.compute.amazonaws.com'
  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const range = randomInt(900010, 1000011)

  const res = http.get(`${BASE_URL}/api/qa/questions/?product_id=${range}`
  );

  check(res, {
    success: (r) => r.status === 200,
  });
}