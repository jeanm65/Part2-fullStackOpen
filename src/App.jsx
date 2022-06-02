import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  useEffect(() => {
    personServices.getAll().then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);
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
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
    personServices.create.then((res) => {
      console.log(res);
    });
  };

  //Search and filter

  const handleNewSearch = (e) => {
    setSearch(e.target.value);
  };
  const filtered = !search ? (
    persons
  ) : search ? (
    persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
  ) : (
    <h2>No results found!</h2>
  );

  const removeUser = (id) => {
    axios.delete(`http://localhost:3001/persons/${id}`);
    console.log('delete this person?');
    setPersons(persons.filter((person) => person.id !== id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter onChange={handleNewSearch} value={search} />
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
      {filtered.map((person) => {
        return (
          <p key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => removeUser(person.id)}>delete</button>
          </p>
        );
      })}
    </div>
  );
};

export default App;
