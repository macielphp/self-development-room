  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { Box, Button, Select, MenuItem, TextField, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Stepper, Step, StepLabel, Typography }from '@mui/material';
  import PersistentDrawer from './../../components/PersistentDrawer';
  import { Link } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleCheckBoxChange = (event) => {
      const value = event.target.name;
      setFormData((prev) => ({
        ...prev,
        studyDays: prev.studyDays.includes(value)
        ? prev.studyDays.filter((day) => day !== value)
        : [...prev.studyDays, value],
      }));
    }

    const handleSubmit = () => {
      localStorage.setItem("languageStudyPlan", JSON.stringify(formData));
      alert("Study plan saved!");
      navigate("/seasons");
    };
    
    return (
      <>
        <PersistentDrawer />
        <Box sx={{ width: '50%', margin: 'auto', padding: '2rem' }}>
          <Typography variant="h5" mb={3}>🎯 Create Your Study Plan</Typography>
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
                        onChange={handleCheckBoxChange}
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
      </>
    );
  };

  export default LanguagePage;
