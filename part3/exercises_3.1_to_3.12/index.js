require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const app = express()
morgan.token("payload", (request) => JSON.stringify(request.body))
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))
const Person = require("./models/phoneBook")

let phoneBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get("/info", (request, response) => {
    Person.find({}).then(result => {
        response.send(
            `<div>\
                <p>Phonebook has info for ${result.length} people</p>\
                <br/>\
                <p>${Date()}</p>\
            </div>`
        )
    })
})

app.get("/api/persons/:id", (request, response) => {
    const reqId = request.params.id
    Person.find({"id": reqId}).then(person => {
        person ? response.send(person) : response.status(404).send(`Person ${reqId} does not exist!`)
    })
})

app.delete("/api/persons/:id", (request, response) => {
    const reqId = request.params.id
    Person.deleteOne({"id": reqId}).then(result => {
        if(result.deletedCount === 1){
            response.status(204).end()
        } else {
            response.status(404).send(`Person ${reqId} does not exist!`)
        }
    })
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        response.status(400).send("Name or number is missing")
    }
    Person.find({"name": body.name}).then(response => {
        if(response){
            response.status(400).send("Name or number already exists!")
        } else {
            Person.insertOne(body).then(result => {
                response.status(200)
                response.json(result)
            })
        }
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)