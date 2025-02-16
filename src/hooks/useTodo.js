import { useState, useEffect } from "react";

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Show Snackbar notification
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Add a new todo
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
      showSnackbar("Task added successfully!", "success");
    } else {
      showSnackbar("Task cannot be empty!", "error");
    }
  };

  // Toggle todo completion status
  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    showSnackbar("Task status updated!", "info");
  };

  // Delete a todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    showSnackbar("Task deleted successfully!", "warning");
  };

  // Start editing a todo
  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  // Save the edited todo
  const saveEdit = (index) => {
    if (editText.trim()) {
      const newTodos = [...todos];
      newTodos[index].text = editText;
      setTodos(newTodos);
      setEditingIndex(null);
      setEditText("");
      showSnackbar("Task updated successfully!", "success");
    } else {
      showSnackbar("Task cannot be empty!", "error");
    }
  };

  return {
    todos,
    input,
    editingIndex,
    editText,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    setInput,
    setEditText,
    setSnackbarOpen,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveEdit,
  };
};

export default useTodo;
