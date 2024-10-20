package config

import (
	"errors"
	"os"
    "strconv"

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

type ServerConfig struct {
    Port string
}

type LoggerConfig struct {
    Debug bool
}

func LoadENV() error {
    return godotenv.Load()
}

func LoadDBConfig() (*DBConfig, error) {
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

func LoadServerConfig() (*ServerConfig, error) {
    serverConfig := &ServerConfig{
        Port: os.Getenv("PORT"),
    }

    if x, err := strconv.Atoi(serverConfig.Port); serverConfig.Port == "" || err != nil || x < 0 {
        return nil, errors.New("error on server port environment parameter")
    }

    return serverConfig, nil
}

func LoadLoggerConfig() (*LoggerConfig, error) {
    ServerConfig := &LoggerConfig{
        Debug: os.Getenv("MODE") == "DEBUG",
    }

    return ServerConfig, nil
}
