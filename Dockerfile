FROM grafana/k6:latest

WORKDIR /home/k6

COPY ./src ./src

ENTRYPOINT ["k6"]
