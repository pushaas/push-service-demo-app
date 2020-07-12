TAG := latest
CONTAINER := push-service-demo-app
IMAGE := pushaas/$(CONTAINER)
IMAGE_TAGGED := $(IMAGE):$(TAG)
NETWORK := push-service-network
PORT_CONTAINER := 8888
PORT_HOST := 8888

NPM ?= $(shell which npm)
YARN ?= $(shell which yarn)
PKG_MANAGER ?= $(if $(YARN),$(YARN),$(NPM))

########################################
# app
########################################
.PHONY: setup
setup:
	@$(PKG_MANAGER) install

.PHONY: run
run:
	@$(PKG_MANAGER) start

.PHONY: watch
watch:
	@$(PKG_MANAGER) watch

.PHONY: build-client
build-client:
	cd client && $(PKG_MANAGER) install && $(PKG_MANAGER) run build

########################################
# docker
########################################

# prod
.PHONY: docker-clean
docker-clean:
	@-docker rm -f $(CONTAINER)

.PHONY: docker-build
docker-build:
	@docker build \
		-f Dockerfile \
		-t $(IMAGE_TAGGED) \
		.

.PHONY: docker-run
docker-run: docker-clean
	@docker run \
		-e PUSHAAS_ENDPOINT="http://push-api:8080" \
		-e PUSHAAS_USERNAME="app" \
		-e PUSHAAS_PASSWORD="abc123" \
		-it \
		--name=$(CONTAINER) \
    --network=$(NETWORK) \
		-p $(PORT_HOST):$(PORT_CONTAINER) \
		$(IMAGE_TAGGED)

.PHONY: docker-build-and-run
docker-build-and-run: docker-build docker-run

.PHONY: docker-push
docker-push: docker-build
	@docker push \
		$(IMAGE_TAGGED)
