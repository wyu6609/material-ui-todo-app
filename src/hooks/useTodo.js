import { useState, useEffect } from "react";

const useTodo = () => {
  // Load initial state from local storage or use defaults
  const loadState = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  // Save state to local storage
  const saveState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // State for todos
  const [todos, setTodos] = useState(() => loadState("todos", []));

  // State for input
  const [input, setInput] = useState(() => loadState("input", ""));

  // State for editing
  const [editingIndex, setEditingIndex] = useState(() =>
    loadState("editingIndex", null)
  );
  const [editText, setEditText] = useState(() => loadState("editText", ""));

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(() =>
    loadState("snackbarOpen", false)
  );
  const [snackbarMessage, setSnackbarMessage] = useState(() =>
    loadState("snackbarMessage", "")
  );
  const [snackbarSeverity, setSnackbarSeverity] = useState(() =>
    loadState("snackbarSeverity", "success")
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  // Save todos to local storage whenever they change
  useEffect(() => {
    saveState("todos", todos);
  }, [todos]);

  // Save input to local storage whenever it changes
  useEffect(() => {
    saveState("input", input);
  }, [input]);

  // Save editing state to local storage whenever it changes
  useEffect(() => {
    saveState("editingIndex", editingIndex);
    saveState("editText", editText);
  }, [editingIndex, editText]);

  // Save Snackbar state to local storage whenever it changes
  useEffect(() => {
    saveState("snackbarOpen", snackbarOpen);
    saveState("snackbarMessage", snackbarMessage);
    saveState("snackbarSeverity", snackbarSeverity);
  }, [snackbarOpen, snackbarMessage, snackbarSeverity]);

  // Show Snackbar notification
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Add a new todo with a timestamp
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        text: input,
        completed: false,
        createdAt: new Date().toLocaleString(), // Store creation timestamp
      };
      setTodos([...todos, newTodo]);
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

  // Filter todos based on search query
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    todos,
    input,
    editingIndex,
    editText,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    currentPage,
    itemsPerPage,
    currentTodos,
    searchQuery,
    setInput,
    setEditText,
    setSnackbarOpen,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    paginate,
    filteredTodos,
  };
};

export default useTodo;
