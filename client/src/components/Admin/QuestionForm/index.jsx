import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function QuestionForm({ initialData = null, onSave, onCancel }) {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSave({ question });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Question"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        margin="normal"
      />
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">Save</Button>
      </Box>
    </form>
  );
}
