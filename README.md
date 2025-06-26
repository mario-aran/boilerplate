## Kubernetes commands

Management

- `kubectl apply -f ./kubernetes -R`
- `kubectl delete -f ./kubernetes -R`

Check

- `kubectl get pods --all-namespaces`
- `kubectl get pvc --all-namespaces`
- `kubectl get pv`
- `kubectl get storageclass`

Installers

- `kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.31/deploy/local-path-storage.yaml`

## Docker images

- nginx:1.28.0-alpine3.21 # "https://hub.docker.com/_/nginx"
- php:8.4.8-fpm-alpine3.22 # "https://hub.docker.com/_/php"
- node:22.17.0-alpine3.22 # "https://hub.docker.com/_/node"
- mongo:8.0.10-noble # "https://hub.docker.com/_/mongo"
- postgres:17.5-alpine3.22 # "https://hub.docker.com/_/postgres"
- mysql:8.4.5-oraclelinux9 # "https://hub.docker.com/_/mysql"
