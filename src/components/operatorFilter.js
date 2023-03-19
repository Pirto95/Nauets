import React, { useState } from 'react';

const OperatorFilter = ({ onFilterChange, operators }) => {
  const [selectedOperator, setSelectedOperator] = useState('all');

  //funzione di selezione dell'operatore che l'utente ha selezionato e invio nel componente todolist 
  const operatorChange = (event) => {
    const operator = operators.find((el) => el.id === event.target.value);
    setSelectedOperator(event.target.value);
    onFilterChange(event.target.value, operator?.firstname);
  };

  return (
    <div className="input-group mb-3">
      <select className="custom-select" value={selectedOperator} onChange={operatorChange}>
        <option value="all" disabled>Filtra per operatore</option>
        <option value="all">Tutti</option>
        {operators.map((data) => (
          <option key={data.id} value={data.id}>{data.firstname}</option>
        ))}
      </select>
    </div>
  );
};

export default OperatorFilter;