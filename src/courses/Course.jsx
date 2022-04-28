import React from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({courses}) => {
  return (
    <div>
      <Header name={courses.name} />
      <Content parts={courses.parts} />
    </div>
  );
};

export default Course;