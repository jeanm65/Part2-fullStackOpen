import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Notifications from "../../components/Notifications";
import { editPerson } from "../../services/Persons";

const PersonForm = ({ onSave, defaultValues, persons, person, setPersons }) => {
  const [values, setValues] = useState({
    name: 'myName',
    number: 0,
  });

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      [e.target.number]: e.target.value,
    }));
  };

  // update number
  const onUpdatePerson = async () => {
    const id = await persons.find((p) => p.name === values.name && p.id);

    const newValues = { name: values.name, id: id.id, number: values.number };

    const updatedPerson = await editPerson(id.id, newValues);

    setPersons(
      persons.map((person) =>
        person.id === id.id ? { ...updatedPerson } : person
      )
    );
  };

  const onSubmit = async () => {
    const notificationTimeOut = () => {
      setNotificationMessage(null);
    };
    const errorTImeOut = () => {
      setErrorMessage(null);
    };
    // if person exist
    const samePersonName = await persons.find(
      (person) => person.name === values.name
    );
    try {
      if (samePersonName) {
        // popup
        const isOk = window.confirm(
          `${values.name} is already added to phonebook, replace the old number with a new one?`
        );
        if (isOk) {
          // update that person with the new values
          onUpdatePerson(person.id);
          setNotificationMessage(`${values.name}'s number modified!`);
          setValues('');
          setTimeout(notificationTimeOut, 5000);
        }
        return;
      }
      onSave(values);
      setNotificationMessage(`added ${values.name} ! `);
      setValues('');
      setTimeout(notificationTimeOut, 5000);
    } catch (error) {
      setErrorMessage(error.message);
      setValues('');
      setTimeout(errorTImeOut, 5000);
    }
  };

  return (
    <div>
      {notificationMessage && <Notifications notificationMessage={notificationMessage} />}
      {errorMessage && <Error errorMessage={errorMessage} />}
      <form
        onSubmit={e => e.preventDefault()}
      >
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
          <button type="submit" onClick={() => {onSubmit();
          setValues('')}}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
