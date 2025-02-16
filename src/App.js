import React from "react";
import { Container, Typography, Box, Pagination } from "@mui/material";
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
    currentPage,
    itemsPerPage,
    currentTodos,
    setInput,
    setEditText,
    setSnackbarOpen,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    paginate,
  } = useTodo();

  // Calculate total number of pages
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      padding="1rem"
    >
      <Container
        maxWidth="sm"
        style={{
          margin: "auto",
          padding: "2rem",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          To-Do App
        </Typography>

        {/* Add Todo Component */}
        <AddTodo input={input} onInputChange={setInput} onAddTodo={addTodo} />

        {/* Todo List Component */}
        <TodoList
          todos={currentTodos}
          editingIndex={editingIndex}
          editText={editText}
          onToggleComplete={toggleTodo}
          onDelete={deleteTodo}
          onStartEditing={startEditing}
          onSaveEdit={saveEdit}
          onEditTextChange={setEditText}
        />

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="center" marginTop="1rem">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => paginate(page)}
            color="primary"
          />
        </Box>

        {/* Snackbar Component */}
        <CustomSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default App;
