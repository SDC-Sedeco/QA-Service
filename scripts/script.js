import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
  },
};

export default function () {
    const resp = http.batch([
      ['GET', `http://localhost:8083/api/qa/questions/?product_id=1`]
    ]);
    check(resp[0], {
      'main page status was 200': (res) => res.status === 200,
    });
  sleep(1)
}
