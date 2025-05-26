import React from 'react'
import { Box, Typography, IconButton, Button, TextField, Radio, RadioGroup, FormControlLabel
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

const QuestionCard = ({ 
  question, 
  editMode, 
  editedQuestion, 
  setEditedQuestion, 
  onEdit, 
  onDelete, 
  onSave, 
  onCancel 
}) => {

  const isEditing = editMode === question.id;

  const handleAlternativeChange = (index, value) => {
    const updated = [...editedQuestion.alternatives];
    updated[index].alternative = value;
    setEditedQuestion({ ...editedQuestion, alternatives: updated });
  };

  const handleCorrectChange = (e) => {
    const correctId = parseInt(e.target.value);

    const updatedAlternatives = editedQuestion.alternatives.map((a) => ({
      ...a,
      correct: a.id === correctId
    }));

    setEditedQuestion((prev) => ({
      ...prev,
      alternatives: updatedAlternatives
    }));
};

  return (
    <Box sx={{ width: "100%", padding: "1rem", border: '1px  solid #ccc', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: "space-between", marginBottom: "1rem" }}>
        {isEditing ? (
          <TextField 
            fullWidth
            label='Question'
            value={editedQuestion.question}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
          />
        ) : (
          <Typography component='p'>{question.question}</Typography>
        )}
        <Box sx={{ minWidth:"90px" }}>
          {isEditing ? (
            <>
              <Button onClick={() => onSave(question.id)}>Save</Button>
              <Button onClick={onCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <IconButton onClick={() => onEdit(question)}><Edit/></IconButton>
              <IconButton onClick={() => onDelete(question.id)}><Delete/></IconButton>
            </>
          )}
        </Box>
      </Box>        
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:"1rem" }}>
        {isEditing ? (
          <RadioGroup
            value={editedQuestion.correct}
            onChange={handleCorrectChange}
          >
            {editedQuestion.alternatives.map((alt, idx) => (
              <Box key={alt.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControlLabel
                  value={alt.id.toString()}
                  control={<Radio />}
                  label={
                    <TextField
                      fullWidth
                      value={alt.alternative}
                      onChange={(e) => handleAlternativeChange(idx, e.target.value)}
                    />
                  }
                />
              </Box>
            ))}
          </RadioGroup>
        ) : (
          <>
            {question.alternatives?.map((alt, idx) => ( 
              <Typography 
                key={alt.id}
                sx={{
                  color: alt.alternative === question.correct ? 'success.main' : 'text.primary',
                  fontWeight: alt.alternative === question.correct ? 'bold' : 'regular',
                }}
                >
                {String.fromCharCode(65 + idx)}. {alt.alternative}
              </Typography>
            ))}
            <Typography sx={{ fontWeight: 'bold' }}>Correct: {question.alternatives.find(alt => alt.correct)?.alternative}</Typography>
          </>
        )} 
      </Box>
    </Box>
  );
};

export default QuestionCard