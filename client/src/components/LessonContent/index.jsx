import { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LessonContent = ({ videoUrl, questions }) => {
  const [selectedAlternatives, setSelectedAlternatives] = useState({});

  const handleSelect = (questionId, alternativeId) => {
    setSelectedAlternatives((prev) => ({
      ...prev,
      [questionId]: alternativeId,
    }));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Video Class</Typography>
      <Box
        component="iframe"
        src={videoUrl}
        title="Vídeo da aula"
        sx={{
          width: '100%',
          height: '600px',
          border: 0,
          borderRadius: 2,
          mb: 4
        }}
        style={{ height: '600px' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

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
                const isSelected = selectedAlternatives[q.id] === alt.id;
                return (
                  <Paper
                    key={alt.id}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#d1e7dd' : 'white', // Verde claro se selecionado
                      '&:hover': { backgroundColor: isSelected ? '#c7dfd4' : '#f5f5f5' },
                      border: isSelected ? '2px solid #388e3c' : '1px solid #ccc',
                      borderRadius: 1
                    }}
                    onClick={() => handleSelect(q.id, alt.id)}
                  >
                    {alt.text}
                  </Paper>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default LessonContent;
