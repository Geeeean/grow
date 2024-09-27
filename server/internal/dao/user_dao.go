package dao

import (
	"database/sql"

	"github.com/Geeeean/grow/internal/dto"
	"github.com/Geeeean/grow/internal/models"
)

type UserDAO struct {
	db *sql.DB
}

func NewUserDAO(db *sql.DB) *UserDAO {
	return &UserDAO{db: db}
}

func (uDAO *UserDAO) CreateUser(userDTO *dto.UserSignup) (*models.User, error) {
	statement := `INSERT INTO users
	(name, email, password)
	VALUES ($1, $2, $3)
	RETURNING id, name, email`

	user := &models.User{}

	err := uDAO.db.QueryRow(statement, userDTO.Name, userDTO.Email, userDTO.Password).Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (uDAO *UserDAO) GetUser(userDTO *dto.UserSignin) (*models.User, error) {
    statement := `SELECT id, name, email, password FROM users WHERE email = $1`

    user := &models.User{}

    err := uDAO.db.QueryRow(statement, userDTO.Email).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
    if err != nil {
        return nil, err
    }

    return user, nil
}
