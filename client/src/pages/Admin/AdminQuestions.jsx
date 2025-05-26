import React,{ useState, useEffect } from 'react'
import { Box, Typography, IconButton, Divider, Button, Snackbar, Menu, MenuItem } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import CustomFilter from '../../components/Admin/CustomFilter';
import { useQuestionsData } from '../../hooks/Admin/useQuestionsData'
import { updateQuestion, deleteQuestion, createQuestion } from '../../api/Admin/questionsApi';
import { createAlternatives } from '../../api/Admin/alternativesApi';
import QuestionCard from '../../components/Admin/QuestionCard';
import NewQuestionDialog from '../../components/Admin/NewQuestionDialog';

const AdminQuestions = () => {
  const { 
    languages, seasons, lessons, questions, fetchLanguages, fetchSeasons, fetchLessons, fetchQuestions, filters, setFilters, setQuestions
  } = useQuestionsData();

  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const [selectedSeasonId, setSelectedSeasonId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info'})
  const [editMode, setEditMode] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateQuestion = async (data) => {
    try {
      const questionResponse = await createQuestion(data.lessonId,{
        question: data.question
      });

      console.log('Question created:',questionResponse)

      if (!questionResponse || !questionResponse.id) {
        throw new Error('Question creation failed - no ID returned')
      }

      const alternativesData = {
        alternatives: data.alternatives.map((alt, index) => ({
          alternative: alt,
          correct: index === data.correctAlternativeIndex
        })),
      };

      await createAlternatives(questionResponse.id, alternativesData)
      await fetchQuestions(data.lessonId);
      showSnackbar('Question created successfully!', 'success');
    } catch (error) {
      console.error('Error creating question:', error);
      showSnackbar('Error creating question', 'error');
    }
  }
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    alternatives: [{
      alternative:'',
      correct: false
    }]
  })

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }
  
  useEffect(() => {
    fetchLanguages(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box> 
      <Typography variant="h4">Questions</Typography>
      
      <Box display= 'flex'>
        <CustomFilter 
          label="Language"
          options={['All', ...languages.map(l => l.name)]}
          selectedIndex={filters.language}
          onChange={(index) => {
            const selected = index === 0 ? null : languages[index - 1];
            const id = selected?.id || '';
            setSelectedLanguageId(id);
            setFilters(prev => ({ ...prev, language: index }));
            if (id) fetchSeasons(id);
          }}
        /> 
        <CustomFilter 
          label="Season"
          options={['All', ...seasons.map(s => s.title)]}
          selectedIndex={filters.season}
          onChange={(index) => {
            const selected = seasons[index - 1];
            const id = selected?.id || '';
            setSelectedSeasonId(id);
            setFilters(prev => ({ ...prev, season: index }))
            if (id) fetchLessons(id);

          }}
        />
        <CustomFilter 
          label="Lesson"
          options={['All', ...lessons.map(l => l.title)]}
          selectedIndex={filters.lesson}
          onChange={(index) => {
            const selected = lessons[index - 1];
            const id = selected?.id || '';
            setSelectedLessonId(id);
            setFilters(prev => ({ ...prev, lesson: index }))
            if (id) fetchQuestions(id);
          }}
        />
      </Box>
      <Box mt='10px'>
        <Button variant="text" color="primary" onClick={() => setDialogOpen(true)}>
          Add Question
        </Button>
      </Box>
      <NewQuestionDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateQuestion}
      />
      <Box>
      </Box>
      <Box display='flex' flexDirection='column'>
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              editMode={editMode}
              editedQuestion={editedQuestion}
              setEditedQuestion={setEditedQuestion} 
              onEdit={() => {
                setEditMode(q.id);
                setEditedQuestion({
                  question: q.question,
                  correct: q.correct,
                  alternatives: q.alternatives.map(a => ({
                    id: a.id,
                    alternative: a.alternative,
                    correct: a.correct
                  }))
                })
                console.log('Dados iniciais da questão:', {
                  id: q.id,
                  question: q.question,
                  alternatives: q.alternatives
                });
                setEditedQuestion({
                  question: q.question,
                  alternatives: q.alternatives.map(a => ({
                    id: a.id,
                    alternative: a.alternative,
                    correct: a.correct
                  }))
                });
              }}
              onSave={async (id) => {
                try {
                  const correctAlternative = editedQuestion.alternatives.find(a => a.correct);
                  console.log('Dados antes de salvar:', {
                    id,
                    editedQuestion,
                    correctAlternative
                  });
                  await updateQuestion(id, {
                    question: editedQuestion.question,
                    alternatives: editedQuestion.alternatives
                  });

                  console.log('Dados após atualização:', {
                    updatedQuestion: {
                      ...editedQuestion,
                      id
                    }
                  });

                  setQuestions(questions.map(q => {
                    if (q.id === id) {
                      return {
                        ...q,
                        question: editedQuestion.question,
                        alternatives: editedQuestion.alternatives
                      };
                    }
                    return q;
                  }));
                  setEditMode(null);
                  await fetchQuestions(selectedLessonId);
                  showSnackbar('Updated', 'success');
                  console.log(correctAlternative)
                } catch (error) {
                  console.error('Error updating question:',
                    error);
                  showSnackbar('Error updating questions', 'error')
                  
                }
              }}
              onCancel={() => setEditMode(null)}
              onDelete={async (id) => {
                await deleteQuestion(id)
                fetchQuestions(selectedLessonId);
                showSnackbar('Deleted', 'success');
              }}
            />
          ))}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default AdminQuestions