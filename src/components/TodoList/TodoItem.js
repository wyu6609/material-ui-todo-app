import React from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Chip,
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
        // View mode: Show todo text, status indicator, and edit/delete buttons
        <>
          <ListItemText
            primary={todo.text}
            secondary={
              <Typography variant="caption" color="textSecondary">
                Added: {todo.createdAt}
              </Typography>
            }
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "inherit",
            }}
          />
          <Chip
            label={todo.completed ? "Completed" : "In Progress"}
            color={todo.completed ? "success" : "primary"}
            size="small"
            style={{ marginRight: "0.5rem" }}
          />
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
