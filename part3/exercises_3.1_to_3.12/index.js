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
        response.json(result)
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
    const person = phoneBook.find(person => person.id === reqId)
    person ? response.send(person) : response.status(404).send(`Person ${reqId} does not exist!`)
})

app.delete("/api/persons/:id", (request, response) => {
    const reqId = request.params.id
    phoneBook = phoneBook.filter(person => person.id != reqId)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const existingIds = phoneBook.map(person => person.id)
    const body = request.body
    if(existingIds.length >= 10000){
        response.status(400).send("Too many entries in phonebook!")
    }
    else if(!body.name || !body.number){
        response.status(400).send("Name or number is missing")
    }
    else if(phoneBook.find(person => person.name === body.name || person.number === body.number)){
        response.status(400).send("Name or number already exists!")
    }
    else{
        let newId = 0
        console.log("new id:", newId)
        while(newId >= 0 && existingIds.includes(newId))
            newId = Math.floor(Math.random() * 10000)
        const newPerson = {
            id: newId,
            name: body.name,
            number: body.number
        }
        phoneBook = phoneBook.concat(newPerson)
        response.json(newPerson)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)