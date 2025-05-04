import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Checkbox, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { getAlternativesByQuestion, updateAlternative, deleteAlternative } from "./../../../api/Admin/alternativesApi";
import AlternativeForm from "../../Admin/AlternativeForm";
import { createAlternative } from "../../../api/Admin/alternativesApi";


export default function AlternativeList({ questionId }) {
  const [alternatives, setAlternatives] = useState([]);
  const [editingAlt, setEditingAlt] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (questionId) fetchAlternatives();
  }, [questionId]);

  const fetchAlternatives = () => {
    getAlternativesByQuestion(questionId).then(res => setAlternatives(res.data));
  };

  const handleEdit = (alt) => {
    setEditingAlt(alt);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteAlternative(id);
    fetchAlternatives();
  };

  const handleSave = async (data) => {
    if (editingAlt) {
      await updateAlternative(editingAlt.id, data);
    } else {
      await createAlternative(questionId, data)
    }
    setOpenForm(false);
    setEditingAlt(null);
    fetchAlternatives();
  };

  const handleMarkAsCorrect = async (id) => {
    // (1) Atualize a alternativa como correta
    await updateAlternative(id, { correct: true });
  
    // (2) Atualize as demais como incorretas
    const others = alternatives.filter(alt => alt.id !== id && alt.correct);
    await Promise.all(others.map(alt => updateAlternative(alt.id, { correct: false })));
  
    fetchAlternatives();
  };
  

  return (
    <Box>
      {alternatives.map((alt) => (
        <Box key={alt.id} display="flex" alignItems="center" justifyContent="space-between" borderBottom="1px solid #ccc" py={1}>
          <Typography>{alt.alternative}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox checked={alt.correct} onChange={() => handleMarkAsCorrect(alt.id)} />
            <Button size="small" onClick={() => handleEdit(alt)}>Editar</Button>
            <Button size="small" color="error" onClick={() => handleDelete(alt.id)}>Excluir</Button>
          </Box>
        </Box>
      ))}

      <Button onClick={() => setOpenForm(true)} variant="contained" fullWidth sx={{ mt: 2 }}>
        Nova Alternativa
      </Button>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editingAlt ? "Editar Alternativa" : "Nova Alternativa"}</DialogTitle>
        <DialogContent>
          <AlternativeForm
            initialData={editingAlt}
            questionId={questionId}
            onCancel={() => {
              setOpenForm(false);
              setEditingAlt(null);
            }}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
