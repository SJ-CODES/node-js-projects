const express = require('express')
const app = express()


const mustacheExpress = require('mustache-express')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())

app.use("/css",express.static("css"))

var session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))



const rootIndex = require("./routes/index")
app.use("/", rootIndex)

app.listen(3000, ()=>{
    console.log('server is running.....')
} )
