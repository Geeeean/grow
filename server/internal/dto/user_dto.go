package dto

type UserSignup struct {
    Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (us *UserSignup) HashPassword() {

}

type UserSignin struct {
    Email string `json:"email"`
    Password string `json:"password"`
}

type UserResponse struct {
    Email string `json:"email"`
    Name  string `json:"name"`
}
