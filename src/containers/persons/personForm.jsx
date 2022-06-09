import React, { useEffect, useState } from "react";

const PersonForm = ({ onSave, defaultValues }) => {
  const [values, setValues] = useState({
    name: "",
    number: 0
  });

  useEffect(() => {
    if (defaultValues) {
      setValues((prev) => ({
        ...prev,
        ...defaultValues
      }));
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = () => {
    onSave(values);
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
