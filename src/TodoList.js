import "./TodoList.scss";
import TodoItem from "./TodoItem";
import { useState } from "react";

const settingsOptions = ["all", "active", "completed"];

function TodoList({ listItems, updateStateAndStorage }) {
  const [visibleItems, setVisibleItems] = useState("all");

  const itemsToShow = () => {
    if (visibleItems === "all") {
      return listItems;
    } else {
      return listItems.filter((item) => (visibleItems === "active" ? !item.completed : item.completed));
    }
  };

  const handleClearList = () => {
    const filteredList = listItems.filter((item) => !item.completed);
    updateStateAndStorage(filteredList);
  };

  return (
    <div>
      <div className="todo-list">
        {itemsToShow()?.map((item, index) => (
          <div key={`${item.value}-${index}`}>
            <TodoItem item={item} listItems={listItems} updateStateAndStorage={updateStateAndStorage} />
          </div>
        ))}
        <div className="todo-settings d-sm-flex justify-content-between text-center">
          <div className="todo-counter">{`${itemsToShow().length} items left`}</div>
          <div className="d-flex justify-content-center my-2 my-sm-0">
            {settingsOptions.map((option) => (
              <div
                key={option}
                className={`setting-option text-capitalize mx-2 ${option === visibleItems ? "active-option" : ""}`}
                onClick={() => {
                  setVisibleItems(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="setting-option" onClick={handleClearList}>
            Clear Completed
          </div>
        </div>
      </div>
      <div className="todo-instruction">Click to edit todo</div>
    </div>
  );
}

export default TodoList;
