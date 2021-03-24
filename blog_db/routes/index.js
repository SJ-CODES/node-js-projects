const express = require('express')

const router = express.Router()
const pgp = require('pg-promise')() 

var bcrypt = require('bcryptjs');


const connectionString = 'postgres://localhost:5432/booksdb'
const db = pgp(connectionString)




router.get('/', (req, res) => {
     db.any('SELECT title, body, date_created, date_updated, is_published FROM blogs')
     .then(blogs => {
         res.render('index',{blogs: blogs})
     })
 })
 
router.get('/register',  (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) =>{
    res.render('login')
})

router.post('/login', (req, res) => {


    const username = req.body.username;
    const password = req.body.password;

    db.one('SELECT user_id, username, password FROM users WHERE username = $1', [username])
        .then((user) => {
            bcrypt.compare(password, user.password, function (error, result) {
                if (result) {
                    
                    if(req.session) {
                        req.session.userId = user.user_id 
                        req.session.username = user.username 
                        
                      

                        res.redirect('/')
                    }
                    
                } else {
                    res.send('Invalid password')
                }
            })

        }).catch((error) => {
            console.log(error)
            res.send('User not found!')
        })
   
})



router.post('/', (req, res) => {

    console.log(req.body)

    const title = req.body.title 
    const body = req.body.body 
    const is_published = req.body.is_published == "on" ? true : false 
    

    db.none('INSERT INTO blogs(title, body, is_published) VALUES($1, $2, $3)',[title, body, is_published])
    .then(() => {
        res.redirect('/')
    }) 
})

router.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(password, salt, function (error, hash) { 
            if (!error) {
                db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hash])
                    .then(() => {
                        res.send('User Registered')
                    })
            }
        })
    })
})

// router.post('/delete-blog',(req,res) => {

//     const post_id = req.body.post_id 

//     db.none('DELETE FROM books WHERE post_id = $1;',[post_id])
//         .then(() => {
//             res.redirect('/')
//         })
// })


 module.exports = router