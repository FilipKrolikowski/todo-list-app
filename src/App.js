import "./App.scss";
import TodoList from "./TodoList";
import { useState } from "react";

const getListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("TodoListItems")) || [];
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState(getListFromLocalStorage());

  const handleAddListItem = () => {
    const newItem = { value: inputValue, completed: false, id: `${inputValue}-${listItems.length}` };
    updateStateAndStorage([...listItems, newItem]);
    setInputValue("");
  };

  const updateStateAndStorage = (newList) => {
    setListItems(newList);
    localStorage.setItem("TodoListItems", JSON.stringify(newList));
  };

  return (
    <div className="app-container">
      <div className="background-container"></div>
      <div className="list-container">
        <div className="header-text mt-5">TODO</div>
        <div className="todo-input-container mt-4 mb-3">
          <form>
            <input
              type="text"
              className="todo-input ps-3"
              onInput={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
              placeholder="Add items here!"
            />
            {inputValue.length > 0 && (
              <button onClick={handleAddListItem} className="me-2" type="button">
                Add
              </button>
            )}
          </form>
        </div>
        <TodoList listItems={listItems} updateStateAndStorage={updateStateAndStorage} />
      </div>
    </div>
  );
}

export default App;
