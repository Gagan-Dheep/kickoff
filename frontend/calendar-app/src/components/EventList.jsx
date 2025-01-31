import { useState, useEffect } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Card, CardContent } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import EventForm from "./EventForm";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);
 
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const res = await axios.get("http://127.0.0.1:8000/api/events/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events", error);
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized. Please check your token.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/events/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Events</Typography>
      <Button variant="contained" color="primary" onClick={() => { setOpen(true); setSelectedEvent(null); }}>Add Event</Button>
      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{new Date(event.date_time).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => { setOpen(true); setSelectedEvent(event); }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(event.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EventForm open={open} handleClose={() => setOpen(false)} event={selectedEvent} refreshEvents={fetchEvents} />
    </Container>
  );
}
