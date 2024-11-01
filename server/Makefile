BINARY_NAME=server
OUTPUT_DIR=../dist
MAIN_SOURCE=./cmd/grow
MIGRATION_SOURCE=./internal/db/migrations
MIGRATION_TARGET=$(OUTPUT_DIR)/

run: build
	@$(OUTPUT_DIR)/$(BINARY_NAME)

build:
	@go build -o $(OUTPUT_DIR)/$(BINARY_NAME) $(MAIN_SOURCE)
	@cp -r $(MIGRATION_SOURCE) $(MIGRATION_TARGET)
