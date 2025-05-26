import React, { useState, useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DoneIcon from '@mui/icons-material/Done';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Box,
  Stepper,
  Step,
  StepLabel,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Radio,
  IconButton
} from '@mui/material';
import { useQuestionsData } from '../../../hooks/Admin/useQuestionsData';

const NewQuestionDialog = ({ open, onClose, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const [selectedSeasonId, setSelectedSeasonId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [alternatives, setAlternatives] = useState([''])
  const [correctAlternative, setCorrectAlternative] = useState(null);

  const { 
    languages, seasons, lessons, fetchLanguages, fetchSeasons, fetchLessons
  } = useQuestionsData();

  const areParamsDefined = selectedLanguageId && selectedSeasonId && selectedLessonId;

  const handleSubmit = () => {
    onSubmit({ 
      question,
      alternatives,
      correctAlternative,
      languageId: selectedLanguageId,
      seasonId: selectedSeasonId,
      lessonId: selectedLessonId,
    });
    console.log(selectedLessonId)
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setSelectedLanguageId('');
    setSelectedSeasonId('');
    setSelectedLessonId('');
    setAlternatives(['']);
    setActiveStep(0);
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  }

  const handleAddAlternative = () => {
    setAlternatives([...alternatives, ''])
  }

  const handleRemoveAlternative = (index) => {
    const newAlternatives = [...alternatives];
    newAlternatives.splice(index, 1);
    setAlternatives(newAlternatives);
    if (correctAlternative === index) {
      setCorrectAlternative(null);
    } else if (correctAlternative > index) {
      setCorrectAlternative(correctAlternative - 1);
    }
  };

  const handleAlternativeChange = (index, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = value;
    setAlternatives(newAlternatives);
  }

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedLanguageId) {
      fetchSeasons(selectedLanguageId);
      setSelectedSeasonId('');
    }
  }, [selectedLanguageId]);

  useEffect(() => {
    if (selectedSeasonId) {
      fetchLessons(selectedSeasonId);
      setSelectedLessonId('');
    }
  }, [selectedSeasonId]);

  const steps = [
    {
      label: 'Language',
      icon: LanguageIcon,
      content: (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={selectedLanguageId}
            onChange={(e) => setSelectedLanguageId(e.target.value)}
          >
            {languages.map((language) => (
              <MenuItem key={language.id} value={language.id}>
                {language.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      isComplete: !!selectedLanguageId
    },
    {
      label: 'Season',
      icon: CalendarMonthIcon,
      content: (
        <FormControl fullWidth sx={{ mt: 2}}>
          <InputLabel>Season</InputLabel>
          <Select 
            value={selectedSeasonId}
            onChange={(e) => setSelectedSeasonId(e.target.value)}
            disabled={!selectedLanguageId}
          >
            {seasons.map((season) => (
              <MenuItem key={season.id} value={season.id}>
                {season.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      isComplete: !!selectedSeasonId
    },
    {
      label: 'Lesson',
      icon: MenuBookIcon,
      content: (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Lesson</InputLabel>
          <Select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            disabled={!selectedSeasonId}
          >
            {lessons.map((lesson) => (
              <MenuItem key={lesson.id} value={lesson.id}>
                {lesson.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      isComplete: !!selectedLessonId
    },
    {
      label: 'Question',
      icon: PsychologyAltIcon,
      content: (
        <FormControl fullWidth sx={{ gap: 2, mt: 2 }}>
          <TextField
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            multiline
            rows={4}
          />

          <Typography variant='subtitle1'>Alternatives:</Typography>

          {alternatives.map((alt, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Radio
                checked={correctAlternative === index}
                onChange={() => setCorrectAlternative(index)}
              />
              <TextField
                fullWidth
                label={`Alternative ${index + 1}`}
                value={alt}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
              />
              <IconButton 
                onClick={() => handleRemoveAlternative(index)}
                disabled={alternatives.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button 
            startIcon={<AddIcon />}
            onClick={handleAddAlternative}
            variant='outlined'
          >
            Add Alternative
          </Button>
        </FormControl>
      ),
      isComplete: !!question && !!alternatives.every(alt => alt.trim()) && correctAlternative !== null
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Question</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label} completed={step.isComplete}>
                <StepLabel StepIconComponent={step.icon}>
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 3, mb: 2 }}>
            {steps[activeStep].content}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!steps[activeStep].isComplete}>
              Add Question
          </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              disabled={!steps[activeStep].isComplete}>
                Next
            </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewQuestionDialog;
