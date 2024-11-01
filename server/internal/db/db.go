package db

import (
	"database/sql"
	"fmt"

	"github.com/Geeeean/grow/internal/config"
	"github.com/Geeeean/grow/internal/log"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

type DB struct {
	connection *sql.DB
}

func getDsn() (string, error) {
	dbConfig, err := config.LoadDBConfig()
	if err != nil {
		return "", err
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbConfig.Host, dbConfig.Port, dbConfig.User, dbConfig.Password, dbConfig.DBName, dbConfig.SSLMode,
	)

	return dsn, nil
}

func NewDB() (*DB, error) {
	dsn, err := getDsn()
	if err != nil {
		return nil, err
	}

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	//connection test
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	/*** LOGGING ***/
	log.GetLogger().Info("DB")
	log.GetLogger().Info("connected to db")

	return &DB{connection: db}, nil
}

func (db *DB) ApplyMigration() error {
	driver, err := postgres.WithInstance(db.connection, &postgres.Config{})
	if err != nil {
		return err
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://internal/db/migrations",
		"postgres", driver)
	if err != nil {
		return err
	}

	if err := m.Up(); err != nil {
		if err == migrate.ErrNoChange {

			/*** LOGGING ***/
			log.GetLogger().Info("no migrations to apply")
			log.GetLogger().NewLine()

			return nil
		}

		return err
	}

	/*** LOGGING ***/
	log.GetLogger().Info("applied migrations successfully")
	log.GetLogger().NewLine()

	return nil
}

func (db *DB) End() error {
	return db.connection.Close()
}

func (db *DB) GetDB() *sql.DB {
	return db.connection
}
