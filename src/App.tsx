import React, { useState } from 'react';
import Customerlist from './Customerlist';
import customerdict from './list';
import Detailcard from './Detailcard';
import './App.css'; // Import the CSS file

interface Customer {
  name: string;
  title: string;
  address: string;
}

const App = () => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleCustomerClick = (customer: Customer) => {
    setSelectedName(customer.name);
    setTitle(customer.title);
    setDesc(customer.address);
  };

  return (
    <div className="container">
      <div className="list-container">
        {
          customerdict.map((currelem: Customer) => (
            <div
              className={`list-item ${selectedName === currelem.name ? 'selected' : ''}`}
              key={currelem.name}
              onClick={() => handleCustomerClick(currelem)}
            >
              <Customerlist name={currelem.name} title={currelem.title} />
            </div>
          ))
        }
      </div>
      <div className="detail-container">
        {
          selectedName ? <Detailcard name={selectedName} title={title} desc={desc} /> : <h2>Click on a customer to see details</h2>
        }
      </div>
    </div>
  );
};

export default App;
