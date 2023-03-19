import React, {useState} from 'react';
import './App.css';
import Sidebar from './components/sibebar'
import Navbar from './components/navbar'
import TodoList from './components/todoList'


function App() {

  const [showDone, setShowDone] = useState(false); 

  return (
    <div className="App" id="main">
      <Navbar />
      <section className="d-flex">
        <Sidebar onShowDoneChange={setShowDone} />
        <TodoList showDone={showDone} />
      </section>
    </div>
  );
}

export default App;
