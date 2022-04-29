import { useState } from 'react'
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('');
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const addName = (e) => {
      e.preventDefault();
      const nameObject = {
        name: newName,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject));
      setNewName('');
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map((person)=><Persons key={person.name} persons={person} />)}
    </div>
  )
}

export default App