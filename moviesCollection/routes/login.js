const express = require('express')
const router = express.Router()
const {v4: uuidv4} =require('uuid')

router.get("/login", ( req, res) =>
      res.render("login")
)


router.post("/login", (req, res)=>{
      

            const email = req.body.email
            const password = req.body.password 
            
            const persistedUser = users.find((user) => {
                return user.email == email && user.password == password
            })
        
            if(persistedUser) {
                
               
                if(req.session) {
                    req.session.username = username 
                }
        
                 
                res.redirect('/')
        
            } else { 
                res.render("login", {message: "Username or password is incorrect"})
            }
})

router.get("/register", (req, res)=>{
    res.render("register")
})

router.post("/register", (req, res) =>{
   
    const email = req.body.email
    const password = req.body.password 
    let user ={email:email, password:password}
    users.push(user)

    res.render("login")

})


router.get('/add-newMovie', (req, res) => { 
    res.redirect("/add-newMovie")
})






router.post('/add-newMovie', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const genre = req.body.genre
    const posterURL = req.body.posterURL
    const movieId = uuidv4()

    let movie ={title: title, description: description, genre: genre, posterURL: posterURL, movieId: movieId}
    movies.push(movie)
    console.log(movies)

    res.render("add-newMovie",{allMovies:movies})
})

router.post('/deleteMovie', (req, res)=> {
    const movieId = req.body.movieId
    
    movies = movies.filter((movie) => {
        return movie.movieId != movieId 
    })

    res.render("add-newMovie")
})





module.exports = router