package log

import (
	"fmt"
	"os"
	"time"

	"github.com/Geeeean/grow/internal/config"
)

var (
	Reset     = "\033[0m"
	Red       = "\033[31m"
	Yellow    = "\033[33m"
	LightCyan = "\033[36m"
	Green     = "\033[32m"
)

var (
	loggerInstance *Logger
)

type Logger struct {
	file         *os.File
	loggerConfig *config.LoggerConfig
}

func Init(filename string) error {
	var err error

	loggerInstance, err = NewLogger(filename)

	return err
}

func NewLogger(filename string) (*Logger, error) {
	file, err := os.OpenFile(filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		return nil, err
	}

	loggerConfig, err := config.LoadLoggerConfig()
	if err != nil {
		return nil, err
	}

	return &Logger{
		file:         file,
		loggerConfig: loggerConfig,
	}, nil
}

func GetLogger() *Logger {
	return loggerInstance
}

func (logger *Logger) Error(msg string) {
	fmt.Fprintln(logger.file, "ERROR [", getTimeString(), "]", msg)
	fmt.Fprintln(os.Stderr, Red+"ERROR"+Reset, "[", getTimeString(), "]", msg)
}

func (logger *Logger) Info(msg string) {
	fmt.Fprintln(logger.file, "INFO [", getTimeString(), "]", msg)
	fmt.Fprintln(os.Stdout, Green+"INFO"+Reset, "[", getTimeString(), "]", msg)
}

func (logger *Logger) Debug(msg string) {
	//fmt.Fprintln(logger.file, "DEBUG [", getTimeString(), "]", msg)
	if logger.loggerConfig.Debug {
		fmt.Fprintln(os.Stdout, LightCyan+"DEBUG"+Reset, "[", getTimeString(), "]", msg)
	}
}

func (logger *Logger) Warning(msg string) {
	fmt.Fprintln(logger.file, "WARNING [", getTimeString(), "]", msg)
	fmt.Fprintln(os.Stdout, Yellow+"WARNING"+Reset, "[", getTimeString(), "]", msg)
}

func (logger *Logger) Close() {
	fmt.Fprintln(logger.file, "")
	logger.file.Close()
}

func getTimeString() string {
	return time.Now().Format("2006/01/02 15:04:05")
}
