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

func (c *Connection) Init() error {
	dbConfig, err := config.LoadDBConfig()
	if err != nil {
		return nil
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbConfig.Host, dbConfig.Port, dbConfig.User, dbConfig.Password, dbConfig.DBName, dbConfig.SSLMode,
	)

	c.db, err = sql.Open("postgres", dsn)
	if err != nil {
		return err
	}

	//connection test
	err = c.db.Ping()
	if err != nil {
		return err
	}

	return nil
}

func (c *Connection) End() error {
	return c.db.Close()
}

func (c *Connection) GetDB() *sql.DB {
	return c.db
}
