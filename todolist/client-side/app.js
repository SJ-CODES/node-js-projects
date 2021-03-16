

let title = document.getElementById('titleInput')
let priority = document.getElementById('priorityInput')
let date = document.getElementById('dateInput')
let addTaskBtn = document.getElementById('addTaskBtn')


addTaskBtn.addEventListener('click', () => {
    let titleName = title.value
    let taskPriority = priority.value
    let taskDate = date.value

    fetch("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titleName: titleName,
            taskPriority: taskPriority,
            taskDate: taskDate
        })
    }).then(response =>
        response.json()
    ).then(result => {
        if (result.success) {
            poptasks()
        }
    })
})

let taskUL = document.getElementById('taskUL')

function poptasks() {
    taskUL.innerHTML = ""
    fetch("http://localhost:3000/todos")
        .then(response => response.json())
        // console.log('response' , response.json)
        .then(result => {
            let tasksItems = result.map((tasks) => {
                return `
            <li>
           
               <b>Task:</b> ${tasks.titleName}<br>
               <b>Priority:</b> ${tasks.taskPriority}<br>
               <b>Date:</b> ${tasks.taskDate}<br>
               <br>
            </li>`
            })


            taskUL.insertAdjacentHTML("beforeend", tasksItems.join(""))
            // taskUL.innerHTML = tasksItems
        })
}

poptasks()
