// TodoList.js

import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch all todos when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/todos");
      setTodos(response); // Response data is already processed by the response interceptor
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // ... Rest of the component code ...
};

export default TodoList;
