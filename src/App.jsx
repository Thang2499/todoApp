import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodo] = useState("");
  const [listTodo, setListTodo] = useState([]);
  const [filter, setFilter] = useState("All");
  const handleAdd = () => {
    setListTodo([...listTodo, { text: todos, completed: false }]);
    setTodo("");
  };

  const handleToggle = (index) => {
    const updatedTodos = listTodo.map((item, index1) =>
      index1 === index ? { ...item, completed: !item.completed } : item
    );
    setListTodo(updatedTodos);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const filteredTodos = listTodo.filter(item => {
    if (filter === "Active") {
     return !item.completed
    } else if (filter === "Completed") {
      return item.completed
    }
    return true;
  })
  const handleDel = (itemText) => {
    const updatedTodos = listTodo.filter((item) => item.text !== itemText);
    setListTodo(updatedTodos);
  };
  const handleDeleteAllCompleted = () => {
    const updatedTodos = listTodo.filter((item) => !item.completed);
    setListTodo(updatedTodos);
  };
  return (
    <>
      <div className='todo'>
        <h1>#todo</h1>
        <div className='header-container'>
          <button className='btn-header' onClick={() => handleFilterChange("All")}>All</button>
          <button className='btn-header' onClick={() => handleFilterChange("Active")}>Active</button>
          <button className='btn-header' onClick={() => handleFilterChange("Completed")}>Completed</button>
        </div>
        {filter !== "Completed" ? (
          <div className='input-add'>
            <input
              value={todos}
              onChange={(e) => setTodo(e.target.value)}
              className='input'
              type='text'
              placeholder='Add details'
            />
            <button onClick={handleAdd} className='btn-add'>Add</button>
          </div>
        ) : <button onClick={handleDeleteAllCompleted} className='btn-delAll'>
          Delete All
        </button>}
        <div>
          {filteredTodos.map((item, index) => (
            <div className='heigh-text' key={index}>
              <input
                type='checkbox'
                checked={item.completed}
                onChange={() => handleToggle(index)}
              />
              <span className={item.completed ? 'line-though text' : 'text'}>{item.text}</span>
              {item.completed ? <button onClick={() => handleDel(item.text)} className='btn-del'>Del</button> : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
