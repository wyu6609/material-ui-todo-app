import React from "react";
import { List, Card, CardContent } from "@mui/material";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editingIndex,
  editText,
  onToggleComplete,
  onDelete,
  onStartEditing,
  onSaveEdit,
  onEditTextChange,
}) => {
  return (
    <List>
      {todos.map((todo, index) => (
        <Card key={index} style={{ marginBottom: "0.5rem" }}>
          <CardContent>
            <TodoItem
              todo={todo}
              index={index}
              editingIndex={editingIndex}
              editText={editText}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onStartEditing={onStartEditing}
              onSaveEdit={onSaveEdit}
              onEditTextChange={onEditTextChange}
            />
          </CardContent>
        </Card>
      ))}
    </List>
  );
};

export default TodoList;
