import React, { useCallback, useEffect, useState } from "react";
import { createPerson} from "../../services/Persons";

const PersonForm = ({ defaultValues, persons, setPersons }) => {
  const [values, setValues] = useState({
    name: "",
    number: "",
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


  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      await _handleCreatePerson(values);
      setValues({
        name: "",
        number: "",
      });
    } catch (error) {
      console.log(error.message);
      
      setValues({
        name: "",
        number: "",
      });
    }
  };

  return (
    <div>
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