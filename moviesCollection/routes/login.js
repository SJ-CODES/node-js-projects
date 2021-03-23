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
        
                 
                res.redirect(movies)
        
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




module.exports = router