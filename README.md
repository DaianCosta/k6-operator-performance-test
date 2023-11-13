# Performance Tests

Project containing scripts for example with <a href="https://k6.io"><b>k6</b></a> and <a href="https://github.com/grafana/k6-operator">K6 operator</a>

## How to install

### Clone repository:

```bash
git clone https://github.com/DaianCosta/k6-operator-performance-test
```

### Install k6:

```bash
Mac: brew install k6
Windows: choco install k6
```

For more installation options, visit <a href="https://k6.io/docs/get-started/installation">official documentation</a>.

## How to run

For predefined execution options, just run the test script. Example:

```bash
k6 run /src/scenarios/site/home.test.js
```

Execution options can be customized in command line. Example:

```bash
k6 run --vus 10 --duration 30s src/scenarios/site/home.test.js
```

### Using <a href="https://docs.docker.com/get-docker">Docker</a>

It's also possible to send k6 metrics to influxDB and visualize test results in Grafana. You can do it using Docker:

#### Preparing:

```bash
docker-compose -f ./docker-compose.yaml up -d
```

#### Running tests:

```bash
docker-compose -f ./docker-compose.yaml run k6 run /src/scenarios/site/home.test.js
```

#### Visualizing results:

```bash
http://localhost:3000/d/d2edbbbd-5313-451d-9904-c5e24c44dfd8/k6-tests-report?orgId=1&refresh=5s&from=now-15m&to=now
```
#### update with more scenarios
should updating you image with new scenarions
```bash
docker build -t desenvolvimentodaian/k6-operator -f Dockerfile-influx .
```

## K6 operator
Install Helm with 

```bash
choco install kubernetes-helm "Power Shell" as administrator
```

Install k6-operator
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install k6-operator grafana/k6-operator
```

## Grafana
Install Grafana

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install my-grafana grafana/grafana --version 7.0.3
```

Execute the command for access and get password of grafana inyour local machine
```bash
kubectl port-forward svc/my-grafana 8083:80

kubectl get secret --namespace default my-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

## InfluxDb
Install InfluxDb

```bash

helm repo add influxdata https://helm.influxdata.com/
helm install my-influxdb influxdata/influxdb --version 4.12.5

```

Execute the command for access the pod to creat the DataBase InfluxDB to collect datas
```bash
kubectl get pods

#returned example "my-influxdb-0" 
kubectl exec --stdin --tty my-influxdb-0 -- /bin/bash

influx;
CREATE DATABASE test;
show DATABASES; #must return the DATABASE test created
```

Create a dataSource at Grafana
host: http://my-influxdb.default:8086

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/1f456578-4746-4d0d-914a-8256c77ae736)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/c97a7132-0acd-4939-82cc-c478aa5fe047)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/c453614e-3081-4968-bb83-12e8acde7b00)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/cb607a5c-0418-4af7-880b-a73a84fd9781)

## Grafana - install dashboard
Get

Import dashboard with this "k6-load-testing-results-k8s.json"
https://github.com/DaianCosta/k6-operator-performance-test/blob/main/dashboards/k6-load-testing-results-k8s.json

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/482d2e7d-d494-4eaf-bcd3-2afb3f8538a1)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/0020dcdc-2068-4b71-8c0e-7585c6b0997c)

Selected a InfluxDB data source
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/46527fd0-3465-4593-b351-2a983ad7f187)

Results
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/c240836b-86a1-45e7-bfe8-2643b6c5d1a0)

Other options report
Replace data-source-id created on this "K6-Tests-Report-k8s.json"  dashboard 
Import dashboard with this "K6-Tests-Report-k8s.json"
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/6c1adfe1-348a-41eb-bb5c-65152a75d50e)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/d40d72e1-1430-47ed-a74c-4c2abf95e31a)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/8f516e2f-74cb-42c3-93dd-e669a28d6f69)

### Apply application for example:
```bash
#In past root
cd ./k8s/app-demo
kubectl apply -f ./

kubectl port-forward service/pizzafrontend 7080:8080 -n squad-test
```
Inter DNS: http://pizzafrontend.squad-test.svc.cluster.local:8080
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/23cc2a56-fd63-4bb3-8ef6-0145de418039)

### Apply test scenarios:
```bash
#In past root
cd ./k8s/scenarios/site

#if exists pod executed
kubectl delete -f ./

kubectl apply -f ./
```
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/30b79649-e6b3-46a1-9976-58764164e68f)
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/9ee6b916-e1ec-4e0e-af27-ba97808b4cf9)


## Links

- <a href="https://k6.io/docs">k6 docs</a>
- <a href="https://github.com/grafana/k6-operator">K6 operator</a>
- <a href="https://k6.io/docs/test-types/introduction">Test types</a>
- <a href="https://macoratti.net/22/05/kubern_aspndeplo1.htm">Application for example Macorrati.net</a>


