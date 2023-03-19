import React, { useState} from 'react';
import { Nav, Image } from 'react-bootstrap';

const Slidebar = ({ onShowDoneChange }) => {
  const [active, setActive] = useState(1); //necessario per capire quale pagina è selezionata

  //gesione degli eventi che cambiano pagina di riferimento e anche l'aspetto della lista
  const selectClick = (index) => {
    setActive(index);
    if (index === 1) { //attività da completare
      if (onShowDoneChange) {
        onShowDoneChange(false);
      }
    } else if (index === 2) {  //attività completare
      if (onShowDoneChange) {
        onShowDoneChange(true);
      }
    }
  };

  return (
    <Nav className="flex-column align-content-start col-2 slidebar pt-5">
          <Nav.Item
            key={1}
            onClick={() => selectClick(1)}
            className={`d-flex align-self-center slidebar-list ${active === 1 ? 'active-item' : 'inactive-item'}`}
            >
                <Image src="/img/toolbox.svg" alt="Attività da completare" width={20} height={20} />
                <p className="slidebar-list-p text-white my-auto ms-3"> Attività da completare </p>
          </Nav.Item>
          <Nav.Item
            key={2}
            onClick={() => selectClick(2)}
            className={`d-flex align-self-center slidebar-list ${active === 2 ? 'active-item' : 'inactive-item'}`}
            >
                <Image src="/img/clipboard.svg" alt="Attività completate" width={20} height={20} />
                <p className="slidebar-list-p text-white my-auto ms-3"> Attività completate </p>
          </Nav.Item>
       
    </Nav>
  );
};

export default Slidebar;