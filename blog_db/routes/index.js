const express = require('express')

const router = express.Router()
const pgp = require('pg-promise')() 

 
const connectionString = 'postgres://localhost:5432/booksdb'
const db = pgp(connectionString)


router.get('/', (req, res) => {
     db.any('SELECT title, body, date_created, date_updated, is_published FROM blogs')
     .then(blogs => {
         res.render('index',{blogs: blogs})
     })
 })
 
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/delete-blog', (req, res) =>{
    res.redirect('/')
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

router.post('/delete-blog',(req,res) => {

    const post_id = req.body.post_id 

    db.none('DELETE FROM books WHERE post_id = $1;',[post_id])
        .then(() => {
            res.redirect('/')
        })
})


 module.exports = router