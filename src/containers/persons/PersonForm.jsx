import React, { useCallback, useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { createPerson, editPerson } from "../../services/Persons";

const PersonForm = ({ defaultValues, persons, person, setPersons }) => {
  const [values, setValues] = useState({
    name: "",
    number: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    message: "",
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

  const _handleCreatePerson = useCallback(
    async (values) => {
      try {
        const person = await createPerson(values);
        setPersons((prev) => {
          return [
            ...prev,
            {
              name: values.name,
              number: values.number,
              id: persons[persons.length - 1].id++,
              ...person,
            },
          ];
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    [persons, setPersons]
  );

  // update number
  const _onUpdatePerson = useCallback(async () => {
    try {
      const currentPerson = await persons.find(
        (p) => p.name === values.name && p.id
      );
      // console.log("currentPerson:", currentPerson);

      const newValues = {
        ...currentPerson,
        number: values.number,
      };
      // console.log("newValues:", newValues);

      const updatedPerson = await editPerson(currentPerson.id, newValues);
      // console.log("updatedPerson:", updatedPerson);

      const newPersons = await persons.map((person) => {
        if (person.id === currentPerson.id) {
          return updatedPerson;
        }
        return person;
      });
      // const newPersons = persons.filter(p => p.name === values.name );

      setPersons(newPersons);
    } catch (error) {
      setPersons(persons.filter((p) => p.name !== values.name));
      // console.log('error:', error.message);
      setAlert({
        type: "error",
        message: `information of ${values.name} has been already removed from server`,
      });
      setValues({
        name: "",
        number: "",
      });
      setTimeout(() => {
        setAlert({ type: "" });
      }, 5000);
    }
  }, [persons, setPersons, values]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // if person exist
    try {
      const samePersonName = persons.find(
        (person) => person.name === values.name
      );
      if (samePersonName) {
        // popup
        const isOk = window.confirm(
          `${values.name} is already added to phonebook, replace the old number with a new one?`
        );
        if (isOk) {
          // update that person with the new values
          await _onUpdatePerson(person.id);

          setAlert({
            type: "success",
            message: `${values.name}'s number modified!`,
          });
          setValues({
            name: "",
            number: "",
          });
          setTimeout(() => {
            setAlert({ type: "" });
          }, 5000);
        }
        return;
      }
      await _handleCreatePerson(values);
      setAlert({
        type: "success",
        message: `${values.name} added! `,
      });
      setValues({
        name: "",
        number: "",
      });
      setTimeout(() => setAlert({ type: "" }), 5000);
    } catch (error) {
      setAlert({
        type: "error",
        message: `information of ${values.name} has been already removed from server`,
      });
      setValues({
        name: "",
        number: "",
      });
      setTimeout(() => {
        setAlert({ type: "" });
      }, 5000);
    }
  };

  return (
    <div>
      <Alert message={alert.message} type={alert.type} />
      <form onSubmit={onSubmit}>
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
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
