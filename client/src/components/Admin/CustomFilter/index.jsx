  import React, { useState } from 'react';
  import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
  import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

  export default function CustomFilter({
    label = 'Select',
    options = [],
    selectedIndex: controlledIndex,
    onChange,
    disabledIndexes = [],
    sx = {},
  }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [uncontrolledIndex, setUncontrolledIndex] = useState(0);
    const open = Boolean(anchorEl);

    const selectedIndex = controlledIndex !== undefined ? controlledIndex : uncontrolledIndex;
    const selectedLabel = options[selectedIndex] || 'None';

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (index) => {
      if (onChange) {
        onChange(index);
      } else {
        setUncontrolledIndex(index);
      }
      setAnchorEl(null);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
          variant="outlined"
          sx={{
            textTransform: 'none',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '0px',
            padding: '6px 12px',
            minWidth: '160px',
            height: '50px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'column',
            ...sx,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1 }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.primary', fontWeight: 500 }}
          >
            {selectedLabel}
          </Typography>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          MenuListProps={{
            role: 'listbox',
            sx: {
              padding: 0,
              minWidth: '160px',
            },
          }}
          PaperProps={{
            sx: {
              borderRadius: 0,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            },
          }}>
          {options.map((option, index) => (
            <MenuItem
              key={`${option}-${index}`}
              disabled={disabledIndexes.includes(index)}
              selected={index === selectedIndex}
              onClick={() => handleMenuItemClick(index)}
              sx={{
                fontSize: '0.9rem',
                paddingY: '6px',
                paddingX: '16px',
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }
