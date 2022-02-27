import "./TodoItem.scss";
import { useState, useCallback } from "react";
import { cloneDeep, debounce } from "lodash";

function TodoItem({ item, listItems, updateStateAndStorage }) {
  const [isHover, setIsHover] = useState(false);
  const [itemValue, setItemValue] = useState(item.value);

  const handleDeleteItem = () => {
    const filteredItems = listItems.filter((newItem) => newItem.id !== item.id);
    updateStateAndStorage(filteredItems);
  };

  const handleCheckItem = (checked) => {
    const cloneList = cloneDeep(listItems);
    cloneList.find((newItem) => newItem.id === item.id).completed = checked;
    updateStateAndStorage(cloneList);
  };

  const handleEditItem = (newValue) => {
    setItemValue(newValue);
    debounceUpdateItemValue(newValue);
  };

  const debounceUpdateItemValue = useCallback(
    debounce((newValue) => {
      const cloneList = cloneDeep(listItems);
      cloneList.find((newItem) => newItem.id === item.id).value = newValue;
      updateStateAndStorage(cloneList);
    }, 400)
  );

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="todo-item d-flex align-items-center"
    >
      <input
        type="checkbox"
        className="todo-checkbox mt-1"
        onChange={(e) => handleCheckItem(e.target.checked)}
        checked={item.completed}
      />
      <input
        className={`todo-text ms-2 ${item.completed ? "completed-text" : ""}`}
        onInput={(e) => {
          handleEditItem(e.target.value);
        }}
        value={itemValue}
      />
      {isHover && (
        <div onClick={handleDeleteItem} className="delete-btn ms-auto">
          &#x2715;
        </div>
      )}
    </div>
  );
}

export default TodoItem;
