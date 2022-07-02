// import React, { useEffect, useState } from "react";
// import { editPerson } from "../../services/Persons";

// const PersonForm = ({
//   onSave,
//   defaultValues,
//   persons,
//   person,
//   setPersons,
// }) => {
//   const [values, setValues] = useState({
//     name: "",
//     number: 0,
//   });

//   useEffect(() => {
//     if (defaultValues) {
//       setValues((prev) => ({
//         ...prev,
//         ...defaultValues,
//       }));
//     }
//   }, [defaultValues]);

//   const handleChange = (e) => {
//     setValues((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // update number
//   const onUpdatePerson = async () => {
//     const id = await persons.find(p => p.name === values.name && p.id);
    
//     const newValues = {name: values.name, id: id.id, number: values.number };

//     const updatedPerson = await editPerson(id.id, newValues);
    
//     setPersons(
//       persons.map((person) =>
//         person.id === id.id ? { ...updatedPerson } : person
//       )
//     );
//   };

//   const onSubmit = async () => {
//     // if person exist
//     const samePersonName = persons.find((person) => person.name === values.name);
//     if (samePersonName) {
//       // popup
//       const isOk = window.confirm(
//         `${values.name} is already added to phonebook, replace the old number with a new one?`
//       );
//       if (isOk) {
//         // update that person with the new values
//         onUpdatePerson(person.id);
//       }
//       return;
//     }
//     onSave(values);
//     setValues('')
//   };

//   return (
//     <div>
//       <form>
//         <div>
//           name:
//           <input name="name" value={values.name} onChange={handleChange} />{" "}
//           <br />
//         </div>
//         <div>
//           number:
//           <input name="number" value={values.number} onChange={handleChange} />
//         </div>
//         <div>
//           <button type="submit" onClick={() => onSubmit()}>Add</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PersonForm;
import React, { useCallback, useEffect, useState } from "react";
// import Error from "../../components/Error";
import { createPerson, editPerson } from "../../services/Persons";

const PersonForm = ({ defaultValues, persons, person, setPersons }) => {
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

  // update number
  const _onUpdatePerson = useCallback(async () => {
    try {
      const currentPerson = await persons.find(
        (p) => p.name === values.name && p.id
      );
      console.log("currentPerson:", currentPerson);

      const newValues = {
        ...currentPerson,
        number: values.number,
      };
      console.log("newValues:", newValues);

      const updatedPerson = await editPerson(currentPerson.id, newValues);
      console.log("updatedPerson:", updatedPerson);

      const newPersons = await persons.map((person) => {
        if (person.id === currentPerson.id) {
          return updatedPerson;
        }
        return person;
      });

      setPersons(newPersons);
    } catch (error) {
      setPersons(persons.filter((p) => p.name !== values.name));
      // console.log('error:', error.message);
      setValues({
        name: "",
        number: "",
      });
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
          setValues({
            name: "",
            number: "",
          });
        }
        return;
      }
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

