import React from 'react';

const Content = ({parts, exercises}) => {
  const displayParts  = parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>);
  const partsExercises = parts.map((part)=>part.exercises);
  let sum = 0;
  for(let exercise of partsExercises){
    sum += exercise;
  }
  const totalExercises = sum;

  return (
    <div>
      {displayParts}
      All of the exercises {totalExercises}
    </div>
  );
};

export default Content;