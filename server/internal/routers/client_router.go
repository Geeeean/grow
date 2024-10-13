package routers

import (
	"net/http"
	"regexp"
)

type ClientRouter struct {
	mux *http.ServeMux
}

func NewClientRouter() *ClientRouter {
	router := &ClientRouter{
		mux: http.NewServeMux(),
	}

	fileServer := http.FileServer(http.Dir("client"))
	fileMatcher := regexp.MustCompile(`\.(css|js|png|jpg|jpeg|gif|ico|svg)$`)

	router.mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        //if the file is static serve id directly
		if fileMatcher.MatchString(r.URL.Path) {
			fileServer.ServeHTTP(w, r)
		} else {
			http.ServeFile(w, r, "client/index.html")
		}
	})

	return router
}

func (router *ClientRouter) Mux() *http.ServeMux {
	return router.mux
}
