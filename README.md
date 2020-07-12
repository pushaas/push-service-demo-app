# push-service-demo-app

This is documented [here](https://github.com/pushaas/pushaas-docs#component-push-service-demo-app).

`push-service-demo-app` exposes an API and a web client

## running locally

Requires the full [push-service](https://github.com/pushaas/push-service) to be running.

Create a `.env` file defining the variables to access the [push-api](https://github.com/pushaas/push-api):
```
PUSHAAS_ENDPOINT=http://localhost:8080
PUSHAAS_USERNAME=app
PUSHAAS_PASSWORD=abc123
```

Then run the API:
```shell
make run
```

On other shell, run the client:
```shell
cd client
yarn
yarn start
```

## publishing images

```shell
make docker-push TAG=<tag>
```

---
