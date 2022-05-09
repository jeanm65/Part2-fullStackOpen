import { useEffect, useState } from "react";

import axios from "axios";

import FilterInput from "./filteredCountryComponent/FilterInput";
import Result from "./filteredCountryComponent/result/Result";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);

        // load all countries
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const data = res.data;

        setCountries(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };
    fn();
  }, []);

  // Search and filter
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (!value) {
      setFilteredCountries([]);
      return;
    }

    const filteredResult = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredCountries(filteredResult);
  };

  if (loading) {
    return <div>...Loading</div>;
  }

  const renderResult = (filteredCountries) => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches result. Specify another filter</p>;
    }

    return <Result countries={filteredCountries} />;
  };

  return (
    <div>
      <h2>Countries API</h2>
      <div>
        <FilterInput onChange={handleSearch} value={search} />
      </div>
      {!error && filteredCountries.length > 0 ? (
        renderResult(filteredCountries)
      ) : (
        <div>No result</div>
      )}
      {error && <span>{error}</span>}
    </div>
  );
};

export default App;
