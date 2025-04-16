import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Paper
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const localizer = momentLocalizer(moment);

const MealScheduler = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    mealType: ''
  });

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      start: start,
      end: end,
      description: '',
      mealType: ''
    });
    setOpenDialog(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      mealType: event.mealType
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      start: '',
      end: '',
      description: '',
      mealType: ''
    });
  };

  const handleSaveEvent = () => {
    const newEvent = {
      title: formData.title,
      start: formData.start,
      end: formData.end,
      description: formData.description,
      mealType: formData.mealType
    };

    if (selectedEvent) {
      setEvents(events.map(event => 
        event === selectedEvent ? newEvent : event
      ));
    } else {
      setEvents([...events, newEvent]);
    }

    handleCloseDialog();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event !== selectedEvent));
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Meal Schedule
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '600px' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              style={{ height: '100%' }}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Meals
              </Typography>
              {events
                .filter(event => moment(event.start).isAfter(moment()))
                .sort((a, b) => moment(a.start) - moment(b.start))
                .slice(0, 5)
                .map((event, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">{event.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {moment(event.start).format('MMM D, YYYY h:mm A')}
                    </Typography>
                    <Typography variant="body2">{event.mealType}</Typography>
                  </Paper>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedEvent ? 'Edit Meal Plan' : 'Add New Meal Plan'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Meal Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={moment(formData.start).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setFormData({ ...formData, start: new Date(e.target.value) })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="End Time"
            type="datetime-local"
            fullWidth
            value={moment(formData.end).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setFormData({ ...formData, end: new Date(e.target.value) })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Meal Type"
            fullWidth
            value={formData.mealType}
            onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button onClick={handleDeleteEvent} color="error">
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MealScheduler; 