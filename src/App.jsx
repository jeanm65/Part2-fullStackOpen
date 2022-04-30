import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      const data = response.data;
      setPersons(data)
    })
  }, [])
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const addName = (e) => {
    e.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return false;
    }
    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };
  const [foundPerson, setFoundPerson] = useState(persons);
  
  const filter = (e) => {
    if (e.target.value !== '') {
      const results = persons.filter((user) => {
        return user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundPerson(results);
    } else {
      setFoundPerson(persons);
      // If the text field is empty, show all users
    }
    setNewName(e.target.value);
  };
 
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} newName={newName} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {foundPerson && foundPerson.length > 0 ? (
        persons.map((person) => (
          <Persons key={person.name} persons={person} />
        ))
      ):(<h2>No results found!</h2>)}
    </div>
  );
};

export default App;
