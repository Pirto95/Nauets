import { useState } from 'react';
import axios from 'axios';

const Form = ({ operators, onAddActivity }) => {
  const [task, setTask] = useState('');
  const [operator, setOperator] = useState('');


  //funzione per l'invio del form
  const submit = async (event) => {
    event.preventDefault();
    if (!task || !operator) {
      return;
    }
    console.log('task : '+ task, 'user_id : ' + operator)

    //per problemi con il server Firebase che crea id casuali, non sono riuscito a sistemare il problema in tempo, 
    // in ogni caso ho voluto lasciare il codice per delle verifiche 

    //try {
    //    
    //   const response = await axios.post('https://aaac-284915-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
    //     task: task,
    //     user_id: operator,
    //     done: false,
    //   });
    //   const newActivity = {
    //     id: response.data.name,
    //     task: task,
    //     user_id: operator,
    //     done: false,
    //   };
    //   onAddActivity(newActivity);
    //   setTask('');
    //   setOperator('');
    // } catch (error) {
    //   console.error(error);
    //}
  };

  return (
    <>
        {/* titolo sezione */}
        <h4 className='text-start'>Attività da completare</h4>
        <form onSubmit={submit} className="form-new-activity p-4">
            <div className="d-flex">
                {/* inserimento task */}
                <div className="mb-3 col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="task"
                    value={task}
                    placeholder="Inserisci un nuovo task"
                    onChange={(event) => setTask(event.target.value)}
                    />
                </div>
                {/* selezione operatore */}
                <div className="mb-3 col-6">
                  <select
                    className="form-control"
                    id="operator"
                    value={operator}
                    onChange={(event) => setOperator(event.target.value)}
                    >
                    <option value="">seleziona operatore</option>
                    {operators.map((operator) => (
                        <option key={operator.id} value={operator.id}>
                        {operator.firstname}
                      </option>
                    ))}
                  </select>
                </div>
            </div>
            {/* bottoni per resettare il form e per inviare i dati al backend */}
            <div className='col-4 offset-8 d-flex'>
                <button type="submit" className="btn btn-primary col-6">
                  Salva
                </button>
                <button type="button" className="btn btn-secondary ms-3 col-6" onClick={() => {setTask(''); setOperator('');}}>
                  Annulla
                </button>
            </div>
        </form>
    </>
  );
};

export default Form;