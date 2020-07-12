# push-service-demo-app

This is documented [here](https://github.com/pushaas/pushaas-docs#component-push-service-demo-app).

`push-service-demo-app` exposes an API and a web client

## running locally

Requires the full `push-service` to be running. You can run it in 2 ways:
  - run it with `docker-compose` via the [push-service](https://github.com/pushaas/push-service) setup. **Note**: this is simpler, but you need to add `127.0.0.1 push-stream` to your `/etc/hosts` so the demo app can find your `push-stream` instance.
  - run each of the 4 components individually:
    - [`push-redis`](https://github.com/pushaas/push-redis)
    - [`push-stream`](https://github.com/pushaas/push-stream)
    - [`push-agent`](https://github.com/pushaas/push-agent)
    - [`push-api`](https://github.com/pushaas/push-api)

To run the demo app:
- create an `.env` file defining the variables to access the [push-api](https://github.com/pushaas/push-api):
  ```
  PUSHAAS_ENDPOINT=http://localhost:8080
  PUSHAAS_USERNAME=app
  PUSHAAS_PASSWORD=abc123
  ```
- then run the API (**pay attention to the logs**, if there is any variable missing or if the `push-service` can't be reached, there will be errors logged):
  ```shell
  make run
  ```
- on other shell, run the client:
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
