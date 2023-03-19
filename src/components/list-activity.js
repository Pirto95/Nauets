import React, {useState, useEffect} from 'react'

const Listactivity = ({ operatorData, getOperatorName, activityPerPage, onActivityToggle, showButton }) => {
    const [listData, setListData] = useState([]);
  
    //inserimento dei valori da inserire all'interno della lista
    useEffect(() => {
      setListData(operatorData);
    }, [operatorData]);


  return (
    //tabella valida sia per la lista delle attività da svolgere che per quelle già svolte 
    <table className="table table-striped table-list-operator">
        <thead className='head-table'>
          <tr>
            <th>Attività</th>
            <th>Operatore</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {listData?.length > 0 ? (
          <>
            {//inserimento dei dati all'interno della tabella
            listData.map((data) => (
                <tr key={data.id} className="row-table">
                    <td>{data.task}</td>
                    <td>{getOperatorName(data.user_id)}</td>
                    <td>
                        {!showButton && (
                            <button type="button" className="btn btn-primary" onClick={() => onActivityToggle(data)}>svolgi</button>
                        )}
                    </td>
                </tr>
            ))} 
            {/* ho voluto inserire una funzione che in caso i risultati siano meno del numero scelto di righe massime */}
            {listData.length < activityPerPage && (
                <>
                  {[...Array(activityPerPage - listData.length)].map((_, index) => (
                    <tr key={index} className="row-table">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </>
            )}
        </>
        ) : (
            //in caso non ci sia nessun risultato 
        <tr className="row-table">
            <td colSpan="3">Nessuna attività trovata.</td>
        </tr>
        )}
    </tbody>
</table>
  )
}

export default Listactivity
