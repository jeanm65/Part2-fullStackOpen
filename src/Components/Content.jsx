import React from 'react';

const Content = ({parts}) => {
  const displayParts  = parts.map((part) => <p>{part.name} {part.exercises}</p>);
  return (
    <div>
      {displayParts} 
    </div>
  );
};

export default Content;