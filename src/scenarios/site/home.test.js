import http from 'k6/http';
import { check, fail } from 'k6';
import { Counter } from 'k6/metrics'

const iterationCountSuccess = new Counter('iteration_success')
const iterationCountError = new Counter('iteration_error')

export const options = {
    vus: 1,
    duration: '10s'
}

export default function(){
    const BASE_URL = 'http://pizzafrontend.squad-test.svc.cluster.local:8080';

    const res = http.get(BASE_URL);

    if (!check(res, {
        'status code 200': (r) => r.status === 200
    })){
        iterationCountError.add(1);
        fail( `Fail consume. Returned ${res.status} status.`) 
    }else{
        iterationCountSuccess.add(1)
    }

    
}
