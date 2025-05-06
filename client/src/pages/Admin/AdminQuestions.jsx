import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  Drawer,
  CircularProgress
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import QuestionForm from "../../components/Admin/QuestionForm";
import AlternativeList from "../../components/Admin/AlternativeList";
import {
  getAllSeasons,
} from "../../api/Admin/seasonsApi";
import { getLessonsBySeason } from "../../api/Admin/lessonsApi";
import {
  getQuestionsByLesson,
  createQuestion,
  updateQuestion,
  deleteQuestion
} from "../../api/Admin/questionsApi";

export default function AdminQuestions() {
  const [seasons, setSeasons] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllSeasons().then(data => {
      setSeasons(data);
    });
 }, []);

  useEffect(() => {
    if (selectedSeason) {
      console.log("Selected season:", selectedSeason);
      getLessonsBySeason(selectedSeason).then(data => setLessons(data));
    } else {
      setLessons([]);
      setSelectedLesson("");
    }
  }, [selectedSeason]);
    useEffect(() => {
    if (selectedLesson) {
      fetchQuestions();
    } else {
      setQuestions([]);
    }
  }, [selectedLesson]);

  const fetchQuestions = () => {
    setLoading(true);
    getQuestionsByLesson(selectedLesson)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    setSnackbar({ open: true, message: "Pergunta deletada", severity: "success" });
    fetchQuestions();
  };

  const handleSave = async (data) => {
    if (editingQuestion) {
      await updateQuestion(editingQuestion.id, data);
      setSnackbar({ open: true, message: "Pergunta atualizada", severity: "success" });
    } else {
      console.log("Creating question with data:", data);
      console.log("Selected lesson:", selectedLesson);
      await createQuestion(selectedLesson, data);
      setSnackbar({ open: true, message: "Pergunta criada", severity: "success" });
    }
    setOpenForm(false);
    setEditingQuestion(null);
    fetchQuestions();
  };

  const handleOpenAlternatives = (questionId) => {
    setSelectedQuestionId(questionId);
    setOpenDrawer(true);
  };
  
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Gerenciar Perguntas</Typography>

      <Box display="flex" gap={2} mb={3}>
        <FormControl fullWidth>
          <InputLabel>Season</InputLabel>
          <Select value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)}>
            {Array.isArray(seasons) && seasons.map(s => 
              <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
            )}
          </Select>
        </FormControl> 

        <FormControl fullWidth disabled={!selectedSeason}>
          <InputLabel>Lesson</InputLabel>
          <Select value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)}>
            {Array.isArray(lessons) && lessons.map(l => <MenuItem key={l.id} value={l.id}>{l.title}</MenuItem>)}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={() => setOpenForm(true)} disabled={!selectedLesson}>
          New question
        </Button>
      </Box>

      {loading ? <CircularProgress /> : (
        Array.isArray(questions) && questions.length > 0 ? questions.map(q => (
          <Box key={q.id} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #ccc" py={1}>
            <Typography>{q.question}</Typography>
            <Box display="flex" gap={1}>
              <Button size="small" onClick={() => handleEdit(q)}>Editar</Button>
              <Button size="small" onClick={() => handleDelete(q.id)} color="error">Excluir</Button>
              <Button size="small" onClick={() => handleOpenAlternatives(q.id)} color="secondary">Alternativas</Button>
            </Box>
          </Box>
        ))
       : (
          <Typography>No question was found.</Typography>
        )
      )}

      {/* Formulário de Pergunta */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingQuestion ? "Edit question" : "New question"}</DialogTitle>
        
        <DialogContent>
          <QuestionForm
            initialData={editingQuestion}
            onCancel={() => {
              setOpenForm(false);
              setEditingQuestion(null);
            }}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>

      {/* Drawer de Alternativas */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box width={400} p={2}>
          <Typography variant="h6" gutterBottom>Alternativas</Typography>
          <AlternativeList questionId={selectedQuestionId} />
        </Box>
      </Drawer>

        <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert severity={snackbar.severity} elevation={6} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
