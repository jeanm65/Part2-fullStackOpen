import React from 'react';

const Content = ({parts}) => {
  const displayParts  = parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>);
  const partsExercises = parts.map((part)=>part.exercises);
  const totalExercises = partsExercises.reduce((acc, val)=>acc+val);
  
  return (
    <div>
      {displayParts}
      total of {totalExercises}
    </div>
  );
};

export default Content;