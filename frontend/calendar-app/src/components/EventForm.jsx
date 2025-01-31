// src/components/EventForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const EventForm = ({ open, handleClose, event, handleSave }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    if (event) {
      setEventData({
        title: event.title,
        description: event.description,
        start_time: event.start,
        end_time: event.end,
      });
    } else {
      setEventData({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    handleSave(eventData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <h2>{event ? 'Edit Event' : 'Create Event'}</h2>
        <TextField
          label="Title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Time"
          name="start_time"
          type="datetime-local"
          value={eventData.start_time}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Time"
          name="end_time"
          type="datetime-local"
          value={eventData.end_time}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button variant="contained" color="primary" onClick={onSave} sx={{ mt: 2 }}>
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </Box>
    </Modal>
  );
};

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default EventForm;
