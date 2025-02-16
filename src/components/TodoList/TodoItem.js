import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Chip,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

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
              <Collapse in={showDetails}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ fontSize: "0.75rem" }} // Smaller font size
                >
                  Added: {todo.createdAt}
                </Typography>
                {todo.completed && (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ fontSize: "0.75rem" }} // Smaller font size
                  >
                    <br />
                    Completed: {todo.completedAt}
                  </Typography>
                )}
              </Collapse>
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
          <Button
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            Details
          </Button>
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
