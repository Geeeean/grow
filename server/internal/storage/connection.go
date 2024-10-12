package storage

import (
	"database/sql"
	"fmt"

	"github.com/Geeeean/grow/internal/config"

	_ "github.com/lib/pq"
)

type Connection struct {
	db *sql.DB
}

func NewConnection() (*Connection, error) {
	dbConfig, err := config.LoadDBConfig()
	if err != nil {
		return nil, err
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbConfig.Host, dbConfig.Port, dbConfig.User, dbConfig.Password, dbConfig.DBName, dbConfig.SSLMode,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	//connection test
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return &Connection{db: db}, nil
}

func (c *Connection) End() error {
	return c.db.Close()
}

func (c *Connection) GetDB() *sql.DB {
	return c.db
}
