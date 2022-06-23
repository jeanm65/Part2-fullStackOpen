import React, { useEffect, useState } from "react";
import { editPerson } from "../../services/Persons";

const PersonForm = ({
  onSave,
  defaultValues,
  persons,
  person,
  setPersons,
}) => {
  const [values, setValues] = useState({
    name: "",
    number: 0,
  });

  useEffect(() => {
    if (defaultValues) {
      setValues((prev) => ({
        ...prev,
        ...defaultValues,
      }));
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // update number
  const onUpdatePerson = async () => {
    const id = await persons.find(p => p.name === values.name && p.id);
    
    const newValues = {name: values.name, id: id.id, number: values.number };

    const updatedPerson = await editPerson(id.id, newValues);
    
    setPersons(
      persons.map((person) =>
        person.id === id.id ? { ...updatedPerson } : person
      )
    );
  };

  const onSubmit = async () => {
    // if person exist
    const samePersonName = persons.find((person) => person.name === values.name);
    if (samePersonName) {
      // popup
      const isOk = window.confirm(
        `${values.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (isOk) {
        // update that person with the new values
        onUpdatePerson(person.id);
      }
      return;
    }
    onSave(values);
    setValues('')
  };

  return (
    <div>
      <form>
        <div>
          name:
          <input name="name" value={values.name} onChange={handleChange} />{" "}
          <br />
        </div>
        <div>
          number:
          <input name="number" value={values.number} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={() => onSubmit()}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
