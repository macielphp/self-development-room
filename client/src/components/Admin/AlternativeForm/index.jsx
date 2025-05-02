import { useEffect, useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button, Box } from "@mui/material";
import { createAlternative } from "../../api/Admin/alternativesApi";

export default function AlternativeForm({ initialData = null, questionId, onSave, onCancel }) {
  const [alternative, setAlternative] = useState("");
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (initialData) {
      setAlternative(initialData.alternative);
      setCorrect(initialData.correct);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!alternative.trim()) return;

    if (!initialData) {
      await createAlternative(questionId, { alternative, correct });
    } else {
      onSave({ alternative, correct });
    }

    setAlternative("");
    setCorrect(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Alternative text"
        fullWidth
        value={alternative}
        onChange={(e) => setAlternative(e.target.value)}
        required
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox checked={correct} onChange={(e) => setCorrect(e.target.checked)} />}
        label="Rigth"
      />
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="contained">Salvar</Button>
      </Box>
    </form>
  );
}
