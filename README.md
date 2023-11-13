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

Import dashboard
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/482d2e7d-d494-4eaf-bcd3-2afb3f8538a1)

![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/0020dcdc-2068-4b71-8c0e-7585c6b0997c)

Selected a InfluxDB data source
![image](https://github.com/DaianCosta/k6-operator-performance-test/assets/1796109/46527fd0-3465-4593-b351-2a983ad7f187)



## Links

- <a href="https://k6.io/docs">k6 docs</a>
- <a href="https://github.com/grafana/k6-operator">K6 operator</a>
- <a href="https://k6.io/docs/test-types/introduction">Test types</a>


