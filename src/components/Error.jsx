import React from 'react';

const Error = ({errorMessage}) => {
  if (errorMessage === null) {
    return null;
  }
  return(
  <div>
    {errorMessage && <div className={`${errorMessage} ? error : '' `}>{errorMessage}</div>}
  </div> 
  )
};

export default Error;