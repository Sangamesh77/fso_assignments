import { useState, useEffect } from 'react'
import ShortUniqueId from 'short-unique-id'
import axios from 'axios'

import Filter from './components/Filter'
import AddNewRecord from './components/AddNewRecord'
import FilteredDisplay from './components/FilteredDisplay'
import phoneBookService from "./services/phoneBook"

const App = () => {
  const uid = new ShortUniqueId({ length: 3})
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phoneBookService
    .getAll()
    .then((persons) => {
      console.log("Data received")
      setPersons(persons)
    })
  }, [])

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPhoneNumber = (event) => {
    event.preventDefault()
    const indexOfNewName = persons.findIndex(nameObj => nameObj.name === newName)
    indexOfNewName < 0 ? 
      phoneBookService
      .create({name: newName, number: newNumber})
      .then(response => setPersons(persons.concat(response))) 
      : (() => {
        const newPerson = {
          ...persons[indexOfNewName],
          number: newNumber
        }
        console.log("New person", newPerson)
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
          phoneBookService.update(newPerson).then(
            response => setPersons(persons.map(person => person.id === persons[indexOfNewName].id ? response : person))
          )
        }
      })()
    resetInputs()
  }

  const inputHandler = (inputStateSetter) => {
    return(
      (event) => inputStateSetter(event.target.value)
    )
  }

  const deleteHandler = personItem => {
    if(window.confirm(`Delete ${personItem.name} ?`)){
    phoneBookService.deletePerson(personItem.id).then(
      response => {
        setPersons(persons.filter(
          person => person.id != response.id
        ))
      }
    )}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filteredPersons} filterEventHandler={inputHandler(setFilteredPersons)}/>
      <h2>add a new</h2>
      <AddNewRecord 
        nameValue={newName}
        nameInputHandler={inputHandler(setNewName)}
        numberValue={newNumber}
        numberInputHandler={inputHandler(setNewNumber)}
        onSubmitHandler={addPhoneNumber}
      />
      <h2>Numbers</h2>
      <FilteredDisplay 
        phonebookList={persons}
        filterString={filteredPersons}
        deleteHandler={deleteHandler}
      />
    </div>
  )
}

export default App