import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@mui/material';
import PersistentDrawer from './../../components/PersistentDrawer';
import MediaCard from '../../components/MediaCard';
import defaultImage from './../../assets/statue-liberty-liberty-island-new-york.jpg';
import { getAllSeasons } from '../../api/seasonsApi';
import { getLessonsBySeason } from '../../api/lessonsApi';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const LanguagePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    language: "English",
    studyDays: [],
    dailyTime: "",
    reward: "",
    duration: ""
  });

  const [isFormCompleted, setIsFormCompleted] = useState(() => {
    return Boolean(localStorage.getItem("languageStudyPlan"));
  });

  const [seasons, setSeasons] = useState([]);
  const [loadingSeasons, setLoadingSeasons] = useState(true);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      const data = await getAllSeasons();
      setSeasons(data);
      setLoadingSeasons(false);
    };

    if (isFormCompleted) {
      fetchSeasons();
    }
  }, [isFormCompleted]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    setFormData((prev) => ({
      ...prev,
      studyDays: prev.studyDays.includes(value)
        ? prev.studyDays.filter((day) => day !== value)
        : [...prev.studyDays, value],
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem("languageStudyPlan", JSON.stringify(formData));
    alert("Study plan saved!");
    setIsFormCompleted(true);
  };
  
  const [showSeasons, setShowSeasons] = useState(true);

  const handleStartSeason = async (seasonId) => {
    const data = await getLessonsBySeason(seasonId);
    setLessons(data);
    setShowSeasons(false); // Hide seasons after starting one
    console.log(`Lessons from season ${seasonId}:`, data);
  };

  return (
    <>
      <PersistentDrawer />

      {isFormCompleted ? (
        <Box p={4}>
          <Typography variant="h4" mb={2}>🎯 Your Language Roadmap</Typography>

          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {loadingSeasons ? (
              <Typography>Loading seasons...</Typography>
            ) : (
              showSeasons && (
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  {seasons.map((season) => (
                    <Box key={season.id} mx={2} mb={3}>
                      <MediaCard
                        title={season.title}
                        description={season.description}
                        image={defaultImage}
                        actionLabel={season.id === 1 ? 'Start' : 'Locked'}
                        onActionClick={() =>
                          season.id === 1
                            ? handleStartSeason(season.id)
                            : alert(`Finish Season ${season.id - 1} to unlock this one!`)
                        }
                      />
                    </Box>
                  ))}
                </Box>
              )
            )}
          </Box>

          {lessons.length > 0 && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>📚 Lessons</Typography>
              {lessons.map((lesson) => (
                <Box key={lesson.id} p={2} mb={2} border="1px solid #ccc" borderRadius={2}>
                  <Typography variant="h6">{lesson.title}</Typography>
                  <Typography variant="body2">
                    Video:{" "}
                    <a
                      href={lesson.lesson_content}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lesson.lesson_content}
                    </a>
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ width: '50%', margin: 'auto', padding: '2rem' }}>
          <Stepper activeStep={activeStep}>
            {["Choose Language", "Set Study Days", "Define Time", "Rewards", "Duration"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ marginTop: '2rem' }}>
            {activeStep === 0 && (
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select name="language" value={formData.language} onChange={handleChange}>
                  <MenuItem value="English">English</MenuItem>
                </Select>
              </FormControl>
            )}

            {activeStep === 1 && (
              <FormGroup>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={formData.studyDays.includes(day)}
                        onChange={handleCheckboxChange}
                        name={day}
                      />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
            )}

            {activeStep === 2 && (
              <TextField
                fullWidth
                type="number"
                name="dailyTime"
                label="How many minutes per day?"
                value={formData.dailyTime}
                onChange={handleChange}
              />
            )}

            {activeStep === 3 && (
              <TextField
                fullWidth
                name="reward"
                label="What will be the reward?"
                value={formData.reward}
                onChange={handleChange}
              />
            )}

            {activeStep === 4 && (
              <TextField
                fullWidth
                type="number"
                name="duration"
                label="How many months to achieve your goal?"
                value={formData.duration}
                onChange={handleChange}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            {activeStep === 4 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Finish
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>Next</Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default LanguagePage;
