import { check } from "k6";
import http from 'k6/http';

export default function() {
  var url = "http://localhost:80/api/qa/questions/3518957/answers";
  let res = http.get(url);
  check(res, {
    "is status 200": (r) => r.status === 200
  },{ my_tag: res.body },);
}

// k6 run -u 200 -d 30s __tests__/k6scripts/nginx.js