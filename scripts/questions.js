import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {

    const resp = http.batch([
      ['GET', `http://localhost:8083/api/qa/questions/?product_id=${id}`]
    ]);
    check(resp[0], {
      'main page status was 200': (res) => res.status === 200,
    });
  // }
  sleep(1)
}
