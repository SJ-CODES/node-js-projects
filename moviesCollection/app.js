const express = require('express')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)
const mustacheExpress = require('mustache-express')




app.use('/js', express.static('js'))
app.use("/css",express.static("css"))

app.get('/chat', (req, res) => {
    
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {
    console.log('User connected!')

    socket.on('disconnect', () => {
        console.log('User disconnected!')
    })

    socket.on('Curious', (chat) => {
        io.emit('Curious', chat)
    })

})



app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())

const port = 3000

global.users = []

global.movies = []


const rootLogin = require("./routes/login")
const moviesController = require("./routes/movies");


app.use("/", rootLogin)
app.use("/movies", moviesController)



http.listen(port, ()=>{
    console.log('server is running.....')
} )


