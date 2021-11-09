import http from 'k6/http';
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contact_request_rate: {
      executor: 'constant-arrival-rate', //generates constant request rate with constant arrival
      rate: 1000,
      timeUnit: '1s', //100 iterations per second (100 RPS)
      duration: '60s', //Max
      preAllocatedVUs: 1000, // Initial pool of VUs
      maxVUs: 2000, //Initialize more if preAllocated not enough
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

// const testImg = open('/Users/louisa/diamond.png', 'b')


export default function () {

  // const fd = new FormData();
  // fd.append('body', 'this is a body')
  // fd.append('name', 'name test')
  // fd.append('email', 'test@gmail.com')
  // fd.append('photos', http.file(testImg, 'diamond.png', 'image/png'))
  // fd.append('urls', JSON.stringify(["https://sdc-qa-atelier-bucket.s3.us-west-1.amazonaws.com/diamond.png"]))

  const BASE_URL = 'http://localhost:8083';

  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const questionId = randomInt(3167060, 3518957)

  const data = {
    body: 'Test body',
    name: 'name test',
    email:'test@gmail.com',
    urls: ["https://sdc-qa-atelier-bucket.s3.us-west-1.amazonaws.com/diamond.png"]
  }

  const res = http.post(`${BASE_URL}/api/qa/questions/${questionId}/answers`, JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})

  // const res = http.post(`${BASE_URL}/api/qa/questions/${questionId}/answers`,
  // fd.body(),
  //  {headers: {'Content-Type': 'multipart/form-data; boundary=' + fd.boundary},
  // });

  check(res, {
    success: (r) => r.status === 201,
  });
}

