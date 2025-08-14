## Docker commands

- `docker compose up -d`: Launch development databases
- `docker compose down -v`: Destroy development databases

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

- `kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.31/deploy/local-path-storage.yaml`: Allow persistent volumes
