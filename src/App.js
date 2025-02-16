import React from "react";
import { Container, Typography } from "@mui/material";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import CustomSnackbar from "./components/Snackbar/Snackbar";
import useTodo from "./hooks/useTodo";

const App = () => {
  const {
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
  } = useTodo();

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do App
      </Typography>

      {/* Add Todo Component */}
      <AddTodo input={input} onInputChange={setInput} onAddTodo={addTodo} />

      {/* Todo List Component */}
      <TodoList
        todos={todos}
        editingIndex={editingIndex}
        editText={editText}
        onToggleComplete={toggleTodo}
        onDelete={deleteTodo}
        onStartEditing={startEditing}
        onSaveEdit={saveEdit}
        onEditTextChange={setEditText}
      />

      {/* Snackbar Component */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  );
};

export default App;
