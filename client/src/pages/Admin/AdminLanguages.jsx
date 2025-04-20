import React, { useEffect, useState } from 'react';
// MUI Components
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Button, IconButton, Snackbar, Alert
} from '@mui/material';
// MUI Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// API
import {
  getAllLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage
} from '../../api/Admin/languagesApi';

const AdminLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchLanguages = React.useCallback(async () => {
    try {
      const data = await getAllLanguages();
      setLanguages(data);
    } catch {
      showSnackbar('Erro ao carregar idiomas', 'error');
    }
  }, []);

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddLanguage = async () => {
    if (!newLanguage.trim()) return showSnackbar('No empty value allowed', 'warning');
    if (languages.some(lang => lang.name.toLowerCase() === newLanguage.toLowerCase())) {
      return showSnackbar('Language already exists', 'warning');
    }
    try {
      await createLanguage(newLanguage);
      fetchLanguages();
      setNewLanguage('');
      showSnackbar('Language added successfully', 'success');
    } catch {
      showSnackbar('Error adding language', 'error');
    }
  };

  const handleUpdateLanguage = async (originalName) => {
    if (!editedName.trim()) return showSnackbar('New name cannot be empty', 'warning');
    if (languages.some(lang => lang.name.toLowerCase() === editedName.toLowerCase())) {
      return showSnackbar('Language already exists', 'warning');
    }
    try {
      await updateLanguage(originalName, editedName);
      fetchLanguages();
      setEditMode(null);
      setEditedName('');
      showSnackbar('Language updated successfully', 'success');
    } catch {
      showSnackbar('Error updating language', 'error');
    }
  };

  const handleDeleteLanguage = async (name) => {
    try {
      await deleteLanguage(name);
      fetchLanguages();
      showSnackbar('Language deleted successfully', 'success');
    } catch {
      showSnackbar('Error deleting language', 'error');
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Manage Languages</Typography>

      {/* Add New Language */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="New Language"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddLanguage} startIcon={<AddIcon />}>
          Add
        </Button>
      </Box>

      {/* Languages Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Language</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {languages.map((lang, index) => (
              <TableRow key={lang.name}>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      size="small"
                    />
                  ) : (
                    lang.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editMode === index ? (
                    <>
                      <Button onClick={() => handleUpdateLanguage(lang.name)} color="primary">Save</Button>
                      <Button onClick={() => setEditMode(null)} color="secondary">Cancel</Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => {
                        setEditMode(index);
                        setEditedName(lang.name);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteLanguage(lang.name)}>
                        <DeleteIcon />
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
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminLanguages;
