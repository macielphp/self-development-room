import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button, MenuItem,
  Snackbar, IconButton
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Edit, Delete } from '@mui/icons-material';
import { getAllLessons, createLesson, updateLesson, deleteLesson } from '../../api/Admin/lessonsApi';
import { getAllSeasons } from '../../api/Admin/seasonsApi';
import { getAllLanguages } from '../../api/Admin/languagesApi';

const AdminLessons = () => {
  const [languages, setLanguages] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const [selectedSeasonId, setSelectedSeasonId] = useState('');
  const [editedLesson, setEditedLesson] = useState({ title: '', lesson_content: '', lesson_order: 1 });
  const [editMode, setEditMode] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchLanguages = async () => {
    const data = await getAllLanguages();
    setLanguages(data);
  };
  
  const fetchSeasons = async (languageId) => {
    const data = await getAllSeasons();
    const filteredSeasons = data.filter(season => season.language_id === parseInt(languageId));
    setSeasons(filteredSeasons);
    setSelectedSeasonId(filteredSeasons.length > 0 ? filteredSeasons[0].id : '');
  };
  

  const fetchLessons = async () => {
    const data = await getAllLessons();
    setLessons(data);
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddLesson = async () => {
    if (!newTitle.trim() || !newContent.trim() || !selectedSeasonId) {
      return showSnackbar('Fill all fields', 'warning');
    }
    try {
      await createLesson(selectedSeasonId, newTitle, newContent);
      setNewTitle('');
      setNewContent('');
      fetchLessons();
      showSnackbar('Lesson added successfully', 'success');
    } catch {
      showSnackbar('Error adding lesson', 'error');
    }
  };

  const handleUpdateLesson = async (lessonId) => {
    try {
      const lessonToUpdate = lessons.find(lesson => lesson.id === lessonId);
      if (!lessonToUpdate) return showSnackbar('Lesson not found', 'error');

      await updateLesson(
        lessonId,
        selectedLanguageId,
        editedLesson.title,
        editedLesson.lesson_content,
        editedLesson.lesson_order
      );
      setEditMode(null);
      fetchLessons();
      showSnackbar('Lesson updated successfully', 'success');
    } catch {
      showSnackbar('Error updating lesson', 'error');
    }
  };

  const handleDeleteLesson = async (id) => {
    try {
      await deleteLesson(id);
      fetchLessons();
      showSnackbar('Lesson deleted successfully', 'success');
    } catch {
      showSnackbar('Error deleting lesson', 'error');
    }
  };
  useEffect(() => {
    fetchLanguages();
    fetchLessons();
  }, [])

  useEffect(() => {
    if (selectedLanguageId) {
      fetchSeasons(selectedLanguageId);
    }
  }, [selectedLanguageId]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Manage Lessons</Typography>

      {/* Add New Lesson */}
      <Box display="flex" flexDirection="column" gap={2} mb={3} width='100%'>
        <TextField
          select
          label="Select Language"
          value={selectedLanguageId}
          onChange={(e) => {
            setSelectedLanguageId(e.target.value);
            setSeasons([]);
            setSelectedSeasonId('');
          }}
          sx={{ width: '300px', mb: 2 }}
        >
          {languages.map(language => (
            <MenuItem key={language.id} value={language.id}>{language.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Season"
          value={selectedSeasonId}
          onChange={(e) => setSelectedSeasonId(e.target.value)}
          sx={{ width: '300px' }}
          disabled={!selectedLanguageId}
        >
          {seasons.map(season => (
            <MenuItem key={season.id} value={season.id}>{season.title}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Lesson Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          label="Lesson Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleAddLesson}>Add Lesson</Button>
      </Box>

      {/* Lessons Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Season</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Content</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>
                  {editMode === lesson.id ? (
                    <TextField
                      value={editedLesson.title}
                      onChange={(e) => setEditedLesson({ ...editedLesson, title: e.target.value })}
                    />
                  ) : (
                    lesson.title
                  )}
                </TableCell>
                <TableCell>{lesson.season_title}</TableCell>
                <TableCell>
                  {editMode === lesson.id ? (
                    <TextField
                      type="number"
                      value={editedLesson.lesson_order}
                      onChange={(e) => setEditedLesson({ ...editedLesson, lesson_order: parseInt(e.target.value) })}
                      sx={{ width: 60 }}
                    />
                  ) : (
                    lesson.lesson_order
                  )}
                </TableCell>
                <TableCell>
                  {editMode === lesson.id ? (
                    <TextField
                      value={editedLesson.lesson_content}
                      onChange={(e) => setEditedLesson({ ...editedLesson, lesson_content: e.target.value })}
                      multiline
                      rows={2}
                    />
                  ) : (
                    lesson.lesson_content.slice(0, 60) + (lesson.lesson_content.length > 60 ? '...' : '')
                  )}
                </TableCell>
                <TableCell align="right">
                  {editMode === lesson.id ? (
                    <>
                      <Button onClick={() => handleUpdateLesson(lesson.id)}>Save</Button>
                      <Button onClick={() => setEditMode(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => {
                        setEditMode(lesson.id);
                        setEditedLesson({
                          title: lesson.title,
                          lesson_content: lesson.lesson_content,
                          lesson_order: lesson.lesson_order
                        });
                      }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteLesson(lesson.id)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AdminLessons;
