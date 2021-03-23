const express = require('express')
const app = express()
const cors = require('cors')

let todos = []


app.use(cors()) // CORS enabled on the server 
// Tell express how to parse JSON body 
app.use(express.json()) // MIDDLEWARE 


app.get("/todos", (req, res) => {
     res.json(todos)
})


app.post("/todos", (req, res) => {
     const title = req.body.titleName
     const priority = req.body.taskPriority
     const date = req.body.taskDate

     let todo = {titleName: title, taskPriority: priority, taskDate: date}
     todos.push(todo)

     res.json({message: "Tasks Have Been Added"})
     console.log(todos)
})

app.listen(3000, () =>  {
     console.log("Server is running...")
}) 

