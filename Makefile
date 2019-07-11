TAG := latest
CONTAINER := push-service-demo-app
IMAGE := rafaeleyng/$(CONTAINER)
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
	@cd client && yarn build

########################################
# docker
########################################

# prod
.PHONY: docker-clean-prod
docker-clean-prod:
	@-docker rm -f $(CONTAINER)

.PHONY: docker-build-prod
docker-build-prod:
	@docker build \
		-f Dockerfile-prod \
		-t $(IMAGE_TAGGED) \
		.

.PHONY: docker-run-prod
docker-run-prod: docker-clean-prod
	@docker run \
		-e PUSHAAS_ENDPOINT="http://push-api:8080" \
		-e PUSHAAS_USERNAME="app" \
		-e PUSHAAS_PASSWORD="abc123" \
		-it \
		--name=$(CONTAINER) \
    --network=$(NETWORK) \
		-p $(PORT_HOST):$(PORT_CONTAINER) \
		$(IMAGE_TAGGED)

.PHONY: docker-build-and-run-prod
docker-build-and-run-prod: docker-build-prod docker-run-prod

.PHONY: docker-push-prod
docker-push-prod: docker-build-prod
	@docker push \
		$(IMAGE_TAGGED)
