import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const TodoItem = ({
  todo,
  index,
  editingIndex,
  editText,
  onToggleComplete,
  onDelete,
  onStartEditing,
  onSaveEdit,
  onEditTextChange,
}) => {
  return (
    <ListItem dense>
      {/* Checkbox to toggle completion */}
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleComplete(index)}
      />

      {/* Edit mode: Show input field and save button */}
      {editingIndex === index ? (
        <>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSaveEdit(index)}
          />
          <IconButton edge="end" onClick={() => onSaveEdit(index)}>
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        // View mode: Show todo text and edit/delete buttons
        <>
          <ListItemText
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "inherit",
            }}
          >
            {todo.text}
          </ListItemText>
          <IconButton
            edge="end"
            onClick={() => onStartEditing(index, todo.text)}
          >
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => onDelete(index)}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;
