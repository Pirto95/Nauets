import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OperatorFilter from './operatorFilter';
import Listactivity from './list-activity';
import NumberOfActivity from './number-activity';
import Pagination from './pagination';
import Form from './new-activity';

const TodoList = ({showDone}) => {
  const [activities, setActivities] = useState([]); //tutte le attività chiamate da backend
  const [filteredActivities, setFilteredActivities] = useState([]); //attività filtrate in base all'operatore
  const [operators, setOperators] = useState([]); //tutti gli operatori chiamati del backend
  const [currentPage, setCurrentPage] = useState(1); //pagina corrente, necessaria per il cambio delle pagine 
  const [activityPerPage, setActivityPerPage] = useState(8); //numero di righe presenti nella tabella Listactivity
  const [currentOperatorId, setCurrentOperatorId] = useState(''); //operatore selezionato dal filtro
  
  const urlTodos = 'https://aaac-284915-default-rtdb.europe-west1.firebasedatabase.app/todos';
  const urlUsers = 'https://aaac-284915-default-rtdb.europe-west1.firebasedatabase.app/users';

  useEffect(() => {
    const fetchData = async () => {
      const responseTodos = await axios.get(`${urlTodos}.json`);
      const responseUsers = await axios.get(`${urlUsers}.json`);
      const todos = responseTodos.data;
      const users = responseUsers.data;
      setOperators(users); // inserimento iniziale dei valori egli operatori
      setActivities(todos); // inserimento iniziale di tutte le ttività
      setFilteredActivities(todos);  //inserimento di tutte le attività ne filtro perchè non sono presenti ancora filtri
    };
    fetchData();
  }, []);
  

  //ricerca del nome operatore in base al user_id presene nei dati dell'attività ricevuti
  const getOperatorName = (operatorId) => {
    const operator = operators.find((el) => el.id === operatorId);
    return operator ? operator.firstname : '';
  };

  //funzione per il filtraggio delle attività in base all'operatore selezionato
  const filterChange = (operatorId) => {
    setCurrentOperatorId(operatorId); 
    if (operatorId === 'all') { //in caso siano selezionati "tutti" o nessuno
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((activity) => activity.user_id === +(operatorId));
      setFilteredActivities(filtered);
    }
  };
 
  //invio dati al backend per cambiare lo stato di un'attività da non essere svolta a svolta
  const varButtonClick = async (activity) => {
    try {
      await axios.patch(`${urlTodos}/${activity.id - 1}.json`, { done: !activity.done });
      const updatedActivities = activities.map((item) => {
        if (item.id === activity.id) {
          return { ...item, done: !item.done };
        }
        return item;
      }); 
      setActivities(updatedActivities);
      if (currentOperatorId === 'all') {
        setFilteredActivities(updatedActivities);
      } else {
        const filtered = updatedActivities.filter((activity) => activity.user_id === +(currentOperatorId));
        setFilteredActivities(filtered);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //filtro che definisce se la lista da invare al componente Listactivity è delle attività svolte o no
  const filteredAndDoneActivities = 
  showDone ? filteredActivities.filter((activity) => activity.done) : filteredActivities.filter((activity) => !activity.done);
  
  const totalPages = Math.ceil(filteredAndDoneActivities.length / activityPerPage);

  return (
    <div className='col-10 p-5'>
      <h4 className='text-start'>Attività da completare</h4>
       <OperatorFilter onFilterChange={filterChange} operators={operators} /> {/*filtro operatori */}
      <Listactivity                                                           
        operatorData={filteredAndDoneActivities.slice(   //lista attività
          (currentPage - 1) * activityPerPage,
          currentPage * activityPerPage 
        )}                                                                      
        getOperatorName={getOperatorName}
        activityPerPage={activityPerPage}
        onActivityToggle={varButtonClick}
        showButton={showDone}
      />
       {!showDone && <Form operators={operators} />} {/*form di inserimento di una nuova attività */}
      <div className='d-flex justify-content-between utility-section'>
         <NumberOfActivity onChange={(value) => setActivityPerPage(value)} /> {/*  numero di elementi per pagina */}
        <Pagination                                                             //paginazione
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </div>
  );
};

export default TodoList;