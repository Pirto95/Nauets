import React from 'react'

const numberOfActivity = ({ onChange }) => {

    //funzione per cambiare il numero delle righe visibili
    const activityPerPageChange = (event) => {
      onChange(parseInt(event.target.value, 10));
    };
  
    return (
    <article className='d-flex'>
        <p className='me-3'>Visualizza elementi</p>
        <div className="input-group number-item mb-3">
          <select className="custom-select " onChange={activityPerPageChange}>
            <option value="8">8 </option>
            <option value="10">10 </option>
            <option value="12">12 </option>
          </select>
        </div>
      </article>
    );
  };

export default numberOfActivity
