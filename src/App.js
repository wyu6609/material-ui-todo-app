import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Pagination,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
  } = useTodo();

  // State to control search bar visibility
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Calculate total number of pages based on filtered todos
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  return (
    <Box
      display="flex"
      flexDirection="column"
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
        {/* Header and Search Icon */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" align="center" gutterBottom>
            To-Do App
          </Typography>
          <IconButton onClick={() => setIsSearchVisible(!isSearchVisible)}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Search Bar */}
        {isSearchVisible && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
        )}

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
      </Container>

      {/* Snackbar Component */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default App;
