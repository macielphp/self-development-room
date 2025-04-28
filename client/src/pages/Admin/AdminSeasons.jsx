import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button, MenuItem,
  Snackbar, IconButton, Menu
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Edit, Delete } from '@mui/icons-material';
import {
  getAllSeasons, createSeason, updateSeason, deleteSeason
} from '../../api/Admin/seasonsApi';
import { getAllLanguages } from '../../api/Admin/languagesApi';

const AdminSeasons = () => {
  const [seasons, setSeasons] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newLanguageId, setNewLanguageId] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('All');

  const fetchSeasons = async () => {
    const data = await getAllSeasons();
    setSeasons(data);
  };

  const fetchLanguages = async () => {
    const data = await getAllLanguages();
    setLanguages(data);
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddSeason = async () => {
    if (!newTitle.trim() || !newLanguageId) {
      return showSnackbar('Fill all fields', 'warning');
    }
    try {
      await createSeason(newTitle, newLanguageId);
      setNewTitle('');
      setNewLanguageId('');
      fetchSeasons();
      showSnackbar('Season added successfully', 'success');
    } catch {
      showSnackbar('Error adding season', 'error');
    }
  };

  const handleUpdateSeason = async (id) => {
    try {
      await updateSeason(id, editedTitle);
      setEditMode(null);
      fetchSeasons();
      showSnackbar('Season updated successfully', 'success');
    } catch {
      showSnackbar('Error updating season', 'error');
    }
  };

  const handleDeleteSeason = async (id) => {
    try {
      await deleteSeason(id);
      fetchSeasons();
      showSnackbar('Season deleted successfully', 'success');
    } catch {
      showSnackbar('Error deleting season', 'error');
    }
  };

  useEffect(() => {
    fetchSeasons();
    fetchLanguages();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Manage Seasons</Typography>

      {/* Add New Season */}
      <Box display="flex" gap={2} mb={3} width='100%'>
        <TextField
          label="Season Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          select
          label="Language"
          value={newLanguageId}
          onChange={(e) => setNewLanguageId(e.target.value)}
          sx={{ width:'30%' }}
        >
          {languages.map(lang => (
            <MenuItem key={lang.id} value={lang.id}>{lang.name}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAddSeason}>Add</Button>
      </Box>

      {/* Seasons Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ cursor: 'pointer', fontWeight: 'bold'}}
              >Language ▼</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seasons
            .filter((season) => 
              selectedLanguageFilter === 'All' || 
              season.language_name === selectedLanguageFilter
            )
            .map((season) => (
              <TableRow key={season.id}>
                <TableCell>
                  {editMode === season.id ? (
                    <TextField
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    season.title
                  )}
                </TableCell>
                <TableCell>{season.language_name}</TableCell>
                <TableCell align="right">
                  {editMode === season.id ? (
                    <>
                      <Button onClick={() => handleUpdateSeason(season.id)}>Save</Button>
                      <Button onClick={() => setEditMode(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => {
                        setEditMode(season.id);
                        setEditedTitle(season.title);
                      }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSeason(season.id)}>
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setSelectedLanguageFilter('All');
            setAnchorEl(null);
          }}
        >
            All
        </MenuItem>
        {languages.map((lang) => (
          <MenuItem 
            key = {lang.id}
            onClick={() => {
              setSelectedLanguageFilter(lang.name);
              setAnchorEl(null);
            }}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>

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

export default AdminSeasons;
