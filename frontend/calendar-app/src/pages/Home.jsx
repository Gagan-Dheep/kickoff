// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import '@schedule-x/theme-default/dist/index.css';
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import axios from 'axios';
import '../css/homeStyle.css';
import EventForm from '../components/EventForm';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null); // Track event being edited
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "", 
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://127.0.0.1:8000/api/events/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://127.0.0.1:8000/api/events/", eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      setEvents([...events, response.data]);
      setIsFormOpen(false);
      setNewEvent({ title: "", description: "", start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdateEvent = async (eventId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/events/${eventId}/`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.map((event) => (event.id === eventId ? updatedData : event)));
      setIsFormOpen(false);
      setCurrentEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const openForm = (event = null) => {
    setCurrentEvent(event);
    setNewEvent(event || { title: "", description: "", start_time: "", end_time: "" });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentEvent(null);
    setNewEvent({ title: "", description: "", start_time: "", end_time: "" });
  };

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start_time,
      end: event.end_time,
      description: event.description,
    })),
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  return (
    <div>
      <h2>ScheduleX Calendar</h2>
      <ScheduleXCalendar
        calendarApp={calendar}
        onEventClick={(event) => openForm(event)}
        onEventCreate={handleCreateEvent}
        onEventUpdate={handleUpdateEvent}
        onEventDelete={handleDeleteEvent}
      />
      <button onClick={() => openForm()}>Add Event</button>
      <EventForm
        open={isFormOpen}
        handleClose={closeForm}
        event={currentEvent}
        handleSave={(data) => currentEvent ? handleUpdateEvent(currentEvent.id, data) : handleCreateEvent(data)}
      />
    </div>
  );
};

export default Home;
