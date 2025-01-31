// src/components/Calendar.jsx
import React from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

const Calendar = ({ events, onDateChange, onEventSelect }) => {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start_time,
      end: event.end_time,
      description: event.description,
    })),
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
    onEventClick: (event) => onEventSelect(event),
  });

  return <ScheduleXCalendar calendarApp={calendar} />;
};

export default Calendar;
