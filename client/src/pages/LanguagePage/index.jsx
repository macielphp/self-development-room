import React, { useState, useEffect } from 'react';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import BlockIcon from '@mui/icons-material/Block';
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
  Typography,
  Card,
  CardContent
} from '@mui/material';
import PersistentDrawer from './../../components/PersistentDrawer';
import MediaCard from '../../components/MediaCard';
import defaultImage from './../../assets/statue-liberty-liberty-island-new-york.jpg';
import { getAllSeasons } from '../../api/seasonsApi';
import { getLessonsBySeason } from '../../api/lessonsApi.js';
import { Link } from 'react-router-dom';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Define the main functional component
const LanguagePage = () => {
  // State to track the current step in the form wizard (0 = first step)
  const [activeStep, setActiveStep] = useState(0);

  // State to store the user's input from the study plan form
  const [formData, setFormData] = useState({
    language: "English",   // Default selected language
    studyDays: [],         // Array to store selected study days (e.g., ['Monday', 'Wednesday'])
    dailyTime: "",         // Number of minutes user plans to study each day
    reward: "",            // Reward user will give themselves after completing the plan
    duration: ""           // Duration in months to achieve their language goal
  });

  // State to check if the user has already completed the study plan form.
  const [isFormCompleted, setIsFormCompleted] = useState(() => {
    return Boolean(localStorage.getItem("languageStudyPlan")); // It initializes by checking if there is a saved plan in localStorage.
  });
  
  // State to store the list of seasons fetched from the backend
  const [seasons, setSeasons] = useState([]);

  // State to track whether the seasons are still loading
  const [loadingSeasons, setLoadingSeasons] = useState(true);

  // State to store the lessons of a selected season
  const [lessons, setLessons] = useState([]);

  // State to store the IDs of the lessons the user has already completed
  const [completedLessons, setCompletedLessons] = useState([]);

  // State to control whether the seasons view should be shown or hidden
  const [showSeasons, setShowSeasons] = useState(true);

  // useEffect runs when the component mounts or when `isFormCompleted` changes
  useEffect(() => {
    // Function to fetch all available seasons from the API
    const fetchSeasons = async () => {
      const data = await getAllSeasons(); // Fetch the seasons
      setSeasons(data);  // Store the result in the `seasons` state
      setLoadingSeasons(false);   // Set loading flag to false
    };

    // If the form has already been completed, fetch the seasons
    if (isFormCompleted) {
      fetchSeasons();
    }
  }, [isFormCompleted]);  // Re-run this effect whenever `isFormCompleted` changes

  // Function that runs when the user starts a season
  const handleStartSeason = async (seasonId) => {
    try {
       // Fetch both lessons of the selected season and the user's progress in parallel
      const [lessonsData, progressRes] = await Promise.all([
        getLessonsBySeason(seasonId), // Fetch lessons for the selected season
        fetch(`http://localhost:3001/api/progress/1`) // Fetch the user's progress (user ID is hardcoded here as 1)
      ]);
  
       // Parse the progress response into JSON
      const progressData = await progressRes.json();

       // Extract only the IDs of the completed lesson
      const completedLessonIds = progressData.map((p) => p.lesson_id);
  
       // Update state with the lessons and completed lesson IDs
      setLessons(lessonsData);
      setCompletedLessons(completedLessonIds);
      setShowSeasons(false); // Hide the seasons view to show the lessons
    } catch (err) {
      console.error("Erro ao buscar lições e progresso:", err); // Log any errors to the console
    }
  };
  
  const handleNext = () => setActiveStep((prev) => prev + 1); // Advances to the next step in the form wizard
  const handleBack = () => setActiveStep((prev) => prev - 1); // Goes back to the previous step in the form wizard

  // Handles changes for input fields like Select or TextField
  const handleChange = (event) => {
     // Updates the formData state with the new value for the field that triggered the change
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handles checkbox selections for days of the week
  const handleCheckboxChange = (event) => {
    const value = event.target.name;

     // If the day is already selected, remove it; otherwise, add it to the array
    setFormData((prev) => ({
      ...prev,
      studyDays: prev.studyDays.includes(value)
        ? prev.studyDays.filter((day) => day !== value)
        : [...prev.studyDays, value],
    }));
  };
  // Saves the filled form data into localStorage and sets the form as completed
  const handleSubmit = () => {
     // Store the form data in the browser's local storage
    localStorage.setItem("languageStudyPlan", JSON.stringify(formData));
    // Notify the user
    alert("Study plan saved!");
    // Mark the form as completed so that the roadmap can be shown
    setIsFormCompleted(true);
  };
  
  return (
    <>
      <PersistentDrawer />

      {isFormCompleted ? (
        <Box p={4}>
          <Typography variant="h5">🎯 Your Language Roadmap</Typography>
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
            <Box display="flex" flexWrap="wrap" gap={2}>
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isFirst = index === 0;
                const previousLessonCompleted = index === 0 || completedLessons.includes(lessons[index - 1]?.id);
                const isUnlocked = isFirst || previousLessonCompleted;
          
                return (
                  <Card
                    key={lesson.id}
                    sx={{
                      width: 300,
                      opacity: isUnlocked ? 1 : 0.5,
                      border: isCompleted
                        ? '2px solid green'
                        : isUnlocked
                        ? '2px solid blue'
                        : '2px solid gray',
                    }}
                  >
                    <CardContent>
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
                      {isCompleted && <p>✅ Concluída</p>}
                      {!isCompleted && isUnlocked && (
                        <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <SportsScoreIcon />
                            <Typography>Start</Typography>
                          </Box>
                        </Link>
                      )}
                      {!isUnlocked && <p><BlockIcon /> Locked</p>}
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
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
