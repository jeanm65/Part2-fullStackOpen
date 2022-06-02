import { useEffect, useState } from "react";
import Weather from "./Weather";

const LessResult = ({ country, showDetailByDefault = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetailByDefault) {
      setShowDetails(true);
    }
  }, [showDetailByDefault]);

  const toggleShowDetails = () => setShowDetails(!showDetails);

  return (
    <div>
      {/* --------- button  --------- */}
      <div className="flexRow">
        <p>{country.name.common}</p>
        <button type="button" onClick={toggleShowDetails}>
          {showDetails ? "Hide" : "Show"} Details
        </button>
      </div>
      {/* --------- details  --------- */}
      {showDetails && (
        <div>
          <p>capital : {country.capital}</p>
          <p>area : {country.area}</p>
          <h3> languages : </h3>
          {country.languages &&
            Object.values(country.languages).map((value) => (
              <ul key={value}>
                <li>{value}</li>
              </ul>
            ))}
          flag : <img src={country.flags.svg} alt="" className="flag" />
          <Weather country={country} />
        </div>
      )}
    </div>
  );
};

export default LessResult;
