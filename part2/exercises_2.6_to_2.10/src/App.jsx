import { useState } from 'react'
import ShortUniqueId from 'short-unique-id'
import Filter from './components/Filter'
import AddNewRecord from './components/AddNewRecord'
import FilteredDisplay from './components/FilteredDisplay'

const App = () => {
  const uid = new ShortUniqueId({ length: 3})
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123123123'
    }
  ]) 
  const [filteredPersons, setFilteredPersons] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPhoneNumber = (event) => {
    event.preventDefault()
    persons.findIndex(nameObj => nameObj.name === newName) < 0 ? 
    setPersons(
      persons.concat(
        {
          name: newName,
          number: newNumber
        }
      )
    ) : alert(`${newName} is already added to phonebook`)
    resetInputs()
  }

  const inputHandler = (inputStateSetter) => {
    return(
      (event) => inputStateSetter(event.target.value)
    )
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
      />
    </div>
  )
}

export default App