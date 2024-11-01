run: build
	@../dist/server

build:
	@go build -o ../dist/server ./cmd/grow/
	@cp -r ./internal/db/migrations ../dist/migrations
