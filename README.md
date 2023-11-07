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

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install k6-operator grafana/k6-operator

helm repo add influxdata https://helm.influxdata.com/
helm install my-influxdb influxdata/influxdb --version 4.12.5

helm repo add grafana https://grafana.github.io/helm-charts
helm install my-grafana grafana/grafana --version 7.0.3
```

## InfluxDb
CREATE DATABASE test;


## Links

- <a href="https://k6.io/docs">k6 docs</a>
- <a href="https://github.com/grafana/k6-operator">K6 operator</a>
- <a href="https://k6.io/docs/test-types/introduction">Test types</a>


