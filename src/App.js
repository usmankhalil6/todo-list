import React, { useState, useEffect } from "react";

const App = () => {
  const [newList, setNewList] = useState("");
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("lists");
    return savedLists ? JSON.parse(savedLists) : [];
  });

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addList = () => {
    if (newList.trim()) {
      const newItem = {
        id: Date.now(),
        text: newList,
        completed: false,
      };
      setLists([...lists, newItem]);
      setNewList("");
    }
  };

  const toggleCompletion = (id) => {
    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, completed: !list.completed } : list
      )
    );
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>To Do List</h1>
      <div>
        <input
          type="text"
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          placeholder="Add a new task..."
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button
          onClick={addList}
          style={{
            padding: "0.5rem 1rem",
            marginLeft: "1rem",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ marginTop: "2rem", todoStyleType: "none", padding: "0" }}>
        {lists.map((list) => (
          <li
            key={list.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              backgroundColor: list.completed ? "#d4edda" : "#f8d7da",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                textDecoration: list.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {list.text}
            </span>
            <button
              onClick={() => toggleCompletion(list.id)}
              style={{
                marginLeft: "1rem",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "0.3rem 0.5rem",
              }}
            >
              Done
            </button>
            <button
              onClick={() => deleteList(list.id)}
              style={{
                marginLeft: "1rem",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "0.3rem 0.5rem",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Tasks: </strong>
        {lists.filter((list) => !list.completed).length}
      </div>
    </div>
  );
};

export default App;
