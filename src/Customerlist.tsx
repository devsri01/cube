import React from 'react';

interface CustomerlistProps {
  name: string;
  title: string;
}

const Customerlist = ({ name, title }: CustomerlistProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>{title}</div>
    </div>
  );
};

export default Customerlist;
