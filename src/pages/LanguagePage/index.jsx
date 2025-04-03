import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, TextField, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Stepper, Step, StepLabel } from '@mui/material';
import PersistentDrawer from './../../components/PersistentDrawer';

// Define an array of days of the week to be used in the form
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const LanguagePage = () => {
  // State to track the current step in the form
  const [activeStep, setActiveStep] = useState(0);
  
  // State to store form data, initializing with default values
  const [formData, setFormData] = useState({
    language: "English", // Default language
    studyDays: [], // Days selected by the user
    dailyTime: "", // Minutes dedicated per day
    reward: "", // User-defined reward
    duration: "" // Months to achieve the goal
  });

  // Function to move to the next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Function to go back to the previous step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handles changes in text fields and dropdowns
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handles changes in the checkbox selection (study days)
  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    setFormData((prevData) => ({
      ...prevData,
      studyDays: prevData.studyDays.includes(value)
        ? prevData.studyDays.filter((day) => day !== value) // Remove if already selected
        : [...prevData.studyDays, value], // Add if not selected
    }));
  };

  // Function to save form data to localStorage and notify the user
  const handleSubmit = () => {
    localStorage.setItem("languageStudyPlan", JSON.stringify(formData));
    alert("Study plan saved!");
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <PersistentDrawer />
      
      {/* Main content container */}
      <Box sx={{ width: '50%', margin: 'auto', padding: '2rem' }}>
        {/* Stepper component to show progress through form steps */}
        <Stepper activeStep={activeStep}>
          {["Choose Language", "Set Study Days", "Define Time", "Rewards", "Duration"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Form content changes based on activeStep */}
        <Box sx={{ marginTop: '2rem' }}>
          {/* Step 1: Select a Language */}
          {activeStep === 0 && (
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select name="language" value={formData.language} onChange={handleChange}>
                <MenuItem value="English">English</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Step 2: Select Study Days */}
          {activeStep === 1 && (
            <FormGroup>
              {daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox checked={formData.studyDays.includes(day)} onChange={handleCheckboxChange} name={day} />}
                  label={day}
                />
              ))}
            </FormGroup>
          )}

          {/* Step 3: Input Daily Study Time */}
          {activeStep === 2 && (
            <TextField fullWidth type="number" name="dailyTime" label="How many minutes per day?" value={formData.dailyTime} onChange={handleChange} />
          )}

          {/* Step 4: Define Rewards */}
          {activeStep === 3 && (
            <TextField fullWidth name="reward" label="What will be the reward?" value={formData.reward} onChange={handleChange} />
          )}

          {/* Step 5: Set Study Duration */}
          {activeStep === 4 && (
            <TextField fullWidth type="number" name="duration" label="How many months to achieve your goal?" value={formData.duration} onChange={handleChange} />
          )}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          {activeStep === 4 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>Finish</Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LanguagePage;
