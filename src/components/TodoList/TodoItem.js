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
  Box,
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
    <ListItem
      dense
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0.5rem",
        borderBottom: "1px solid #e0e0e0", // Add a border between items
      }}
    >
      {/* Top Row: Checkbox, Task Text, and Icons */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Checkbox and Task Text */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggleComplete(index)}
            sx={{ marginRight: "0.5rem" }}
          />
          <ListItemText
            primary={todo.text}
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "inherit",
            }}
          />
        </Box>

        {/* Edit and Delete Icons */}
        <Box>
          <IconButton
            edge="end"
            onClick={() => onStartEditing(index, todo.text)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => onDelete(index)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Bottom Row: Details Button and Collapsible Dates */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "0.5rem",
        }}
      >
        {/* Details Button */}
        <Button
          size="small"
          onClick={() => setShowDetails(!showDetails)}
          endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ fontSize: "0.75rem", padding: "0.25rem" }}
        >
          Details
        </Button>

        {/* Status Chip */}
        <Chip
          label={todo.completed ? "Completed" : "In Progress"}
          color={todo.completed ? "success" : "primary"}
          size="small"
        />
      </Box>

      {/* Collapsible Section for Dates */}
      <Collapse in={showDetails} sx={{ width: "100%", marginTop: "0.5rem" }}>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: "0.75rem" }}
        >
          Added: {todo.createdAt}
        </Typography>
        {todo.completed && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: "0.75rem" }}
          >
            <br />
            Completed: {todo.completedAt}
          </Typography>
        )}
      </Collapse>
    </ListItem>
  );
};

export default TodoItem;
