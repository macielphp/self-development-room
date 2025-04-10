import { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LessonContent = ({ videoUrl, questions, lessonId, AllLessons, setLessons, setCompletedLessons, setShowSeasons }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResultButtons, setShowResultButtons] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  const handleSelect = (questionId, alternativeId) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: alternativeId }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/alternatives/correct/${questions[0].lesson_id}`);
      const correctData = await res.json();

      const correctMap = {};
      correctData.forEach((alt) => {
        correctMap[alt.question_id] = alt.id;
      });

      setCorrectAnswers(correctMap);
      setSubmitted(true);

      // Lógica de contagem de acertos
      let totalCorrect = 0;
      correctData.forEach((correct) => {
        const selected = selectedAnswers[correct.question_id];
        if (selected && selected === correct.id) {
          totalCorrect += 1;
        }
      });

      setCorrectCount(totalCorrect);
      setShowResultButtons(true);

    } catch (err) {
      console.error('Erro ao buscar respostas corretas:', err);
    }
  };

  const allAnswered = questions.length > 0 && questions.every((q) => selectedAnswers[q.id]);

  const handleNextLesson = async () => {
    try {
      // Salva o progresso da lição atual
      await fetch('http://localhost:3001/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, lesson_id: lessonId }),
      });
  
      const currentIndex = AllLessons.findIndex(lesson => lesson.id === lessonId);
      const nextLesson = AllLessons[currentIndex + 1];
  
      if (nextLesson) {
        // Atualiza a lição atual na tela
        setLessons([nextLesson]);
        setCompletedLessons(prev => [...prev, lessonId]);
      } else {
        alert("🎉 Você concluiu todas as lições desta temporada!");
        setCompletedLessons(prev => [...prev, lessonId]);
        setShowSeasons(true); // Volta para a tela de temporadas
      }
    } catch (err) {
      console.error('Erro ao salvar progresso ou avançar para a próxima lição:', err);
    }
  };
  

  const handleRepeatLesson = () => {
    setSelectedAnswers({});
    setCorrectAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
    setShowResultButtons(false);
    setVideoWatched(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Video Class</Typography>
      <Box
        component="iframe"
        src={videoUrl}
        title="Vídeo da aula"
        sx={{ width: '100%', height: '600px', border: 0, borderRadius: 2, mb: 4 }}
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
          <Typography variant='body1' color='green'>Great! Now answer the questions below.</Typography>
        </Box>
      )}

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

      {showResultButtons && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" gutterBottom>
            ✅ You got {correctCount} out of {questions.length} correct!
          </Typography>
          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            {(() => {
              const percentage = (correctCount / questions.length) * 100;

              if (percentage === 100){
                return (
                  <Button>Next Lesson</Button>
                )
              } else if(percentage >=70){
                return(
                  <>
                    <Button variant='outlined' color='primary' onClick={handleRepeatLesson}>Repeat Lesson</Button>
                    <Button variant='contained' color='primary' onClick={handleNextLesson}>Next Lesson</Button>
                  </>
                )
              } else {
                return(
                  <Button variant='outlined' color='secondary' onClick={handleRepeatLesson}>Repeat Lesson</Button>
                )
              }
            })()}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LessonContent;
