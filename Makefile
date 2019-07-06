NPM ?= $(shell which npm)
YARN ?= $(shell which yarn)
PKG_MANAGER ?= $(if $(YARN),$(YARN),$(NPM))

.PHONY: setup
setup:
	@$(PKG_MANAGER) install

.PHONY: run
run:
	@$(PKG_MANAGER) start

.PHONY: watch
watch:
	@$(PKG_MANAGER) watch
