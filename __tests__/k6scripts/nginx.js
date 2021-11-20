import { check } from "k6";
import http from 'k6/http';

export default function() {
  var url = "http://ec2-52-53-170-171.us-west-1.compute.amazonaws.com/api/qa/questions?product_id=1";
  let res = http.get(url);
  check(res, {
    "is status 200": (r) => r.status === 200
  },{ my_tag: res.body },);
}

// k6 run -u 200 -d 30s __tests__/k6scripts/nginx.js