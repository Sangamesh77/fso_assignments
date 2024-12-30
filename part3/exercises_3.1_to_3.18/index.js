require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const mongodb = require('mongodb')
const app = express()
morgan.token("payload", (request) => JSON.stringify(request.body))
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))
const Person = require("./models/phoneBook")

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {    
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

app.get("/api/persons", (request, response, next) => {
    Person.find({}).then(result => {
        response.json(result)
    }).catch(error => next(error))
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
    }).catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
    const reqId = new mongodb.ObjectId(request.params.id)
    Person.findById(reqId).then(person => {
        person ? response.send(person) : response.status(404).send(`Person ${reqId} does not exist!`)
    }).catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const reqId = new mongodb.ObjectId(request.params.id)
    Person.findById(reqId).then(person => {
        Person.findByIdAndDelete(reqId)
        .then(result => {
            console.log("Person", person)
            response.status(200).json(person)
          })
    }).catch(error => next(error))
})


app.post("/api/persons", (request, response, next) => {
    const body = request.body
    if(!body.name || !body.number){
        response.status(400).send("Name or number is missing")
    }
    Person.find({"name": body.name}).then(result => {
        if(result.length > 0){
            response.status(400).send("Name or number already exists!")
        } else {
            const person = new Person({
            name: body.name,
            number: body.number
            })
            person.save().then(result => {
                response.status(202).json(result)
            }).catch(error => next(error))
        }
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: "query"})
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)