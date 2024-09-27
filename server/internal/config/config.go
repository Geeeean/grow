package config

import (
	"errors"
	"os"

	"github.com/joho/godotenv"
)

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func LoadDBConfig() (*DBConfig, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	dbConfig := &DBConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   os.Getenv("DB_NAME"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
	}

	if dbConfig.Host == "" || dbConfig.User == "" || dbConfig.DBName == "" {
		return nil, errors.New("incomplete environment parameters for db connection")
	}

	return dbConfig, nil
}
