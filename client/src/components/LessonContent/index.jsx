import { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LessonContent = ({ videoUrl, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Controla a seleção
  const handleSelect = (questionId, alternativeId) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
    }
  };

  // Envio e correção
  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/alternatives/correct/${questions[0].lesson_id}`);

      const correctData = await res.json();

      // Cria um objeto com a resposta correta por pergunta
      const correctMap = {};
      correctData.forEach((alt) => {
        correctMap[alt.question_id] = alt.id;
      });

      setCorrectAnswers(correctMap);
      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao buscar respostas corretas:', err);
    }
  };

  const allAnswered = questions.length > 0 && questions.every((q) => selectedAnswers[q.id]);

  const [videoWatched, setVideoWatched] = useState(false);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Video Class</Typography>
      <Box
        component="iframe"
        src={videoUrl}
        title="Vídeo da aula"
        sx={{ width: '100%', height: '600px', border: 0, borderRadius: 2, mb: 4 }}
        style={{ height: '600px' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {!videoWatched ? (
        <Box textAlign="center" mb={4}>
          <Button variant='outlined' color='success' onClick={() => setVideoWatched(true)}>
            I watched it!
          </Button>
        </Box>
      ) : (
          <Box textAlign='center' mb={4}>
            <Typography variant='body1' color='green'>Great! Now awnser the questions below.</Typography>
          </Box>
      )

      }
      {videoWatched && (
        <>
          <Typography variant="h6" gutterBottom>Questions</Typography>
          {questions.map((q, i) => (
            <Accordion key={q.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{`Question ${i + 1}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography mb={2}>{q.text}</Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  {q.alternatives.map((alt) => {
                    const isSelected = selectedAnswers[q.id] === alt.id;
                    const isCorrect = correctAnswers[q.id] === alt.id;

                    const bgColor = submitted
                      ? isCorrect
                        ? 'lightgreen'
                        : isSelected
                          ? 'salmon'
                          : '#fff'
                      : isSelected
                        ? '#d3e3fc'
                        : '#fff';

                    return (
                      <Paper
                        key={alt.id}
                        onClick={() => handleSelect(q.id, alt.id)}
                        sx={{
                          p: 2,
                          cursor: submitted ? 'default' : 'pointer',
                          backgroundColor: bgColor,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: submitted ? bgColor : '#f5f5f5'
                          }
                        }}
                      >
                        {alt.text}
                      </Paper>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
      ))}
        </>
      )}

      {allAnswered && !submitted && (
        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LessonContent;
