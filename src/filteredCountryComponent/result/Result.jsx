import LessResult from "./LessResult";

const Result = ({ countries }) => {
  const renderResult = (country) => {
    if (countries.length === 1) {
      return <LessResult showDetailByDefault country={country} />;
    }

    return <LessResult country={country} />;
  };

  return countries.map((country) => (
    <div key={country.name.common}>{renderResult(country)}</div>
  ));
};

export default Result;
