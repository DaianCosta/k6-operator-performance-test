import http from 'k6/http';
import { check, fail } from 'k6';
import { Counter } from 'k6/metrics'

const iterationCountSuccess = new Counter('iteration_success')
const iterationCountError = new Counter('iteration_error')

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '30s', target: 10 },
        { duration: '60s', target: 100 },
        { duration: '30s', target: 5 },
        { duration: '10s', target: 0 },
    ]
};

export default function () {
    const BASE_URL = 'http://pizzafrontend.squad-test.svc.cluster.local:8080';

    const res = http.get(BASE_URL);

    if (!check(res, {
        'status code 200': (r) => r.status === 200
    })) {
        iterationCountError.add(1);
        fail(`Fail consume. Returned ${res.status} status.`)
    } else {
        iterationCountSuccess.add(1)
    }


}
