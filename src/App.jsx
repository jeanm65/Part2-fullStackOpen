import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const data = res.data;
      console.log(data);
      setCountries(data);
    });
  }, []);

  //Search and filter

  const handleNewSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredResult = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  const filtered = !search ? countries.length === 0 : filteredResult;
  return (
    <div>
      <h2>Countries API</h2>
      <div>
        <Filter onChange={handleNewSearch} value={search} />
      </div>
      {search &&
        filtered.length === 1 &&
        filtered.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <p>capital : {country.capital[0]}</p>
            <p>area : {country.area}</p>
            <h3> languages :  </h3>
             {Object.values(country.languages).map((value) => (
               <ul key={value}>
                 <li>{value}</li>
               </ul>
             ))}
            flag : <img src={country.flags.svg} alt="" />
          </div>
        ))}
      {search && filtered.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {search &&
        filtered.length < 10 &&
        filtered.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
    </div>
  );
};

export default App;
