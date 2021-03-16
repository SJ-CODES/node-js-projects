const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())


let trips = []

app.post('/add-newTrip', (req, res)=> {
    const title = req.body.title
    const leave = req.body.leave
    const returnDate = req.body.returnDate
    const image = req.body.image

    let trip ={title: title, leave: leave, returnDate: returnDate, image: image}
     trips.push(trip)
    console.log(trips)

    res.redirect('add-newTrip')
})



app.get('/add-newTrip', (req, res)=>{
    res.render('add-newTrip', {allTrips: trips})
})

app.listen(3000, ()=>{
     console.log('server is running.....')
} )

