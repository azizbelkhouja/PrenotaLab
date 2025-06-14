import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BookingForm(props) {
  const {
    labs,
    showtimes,
    selectedLab,
    onChangeLab,
    selectedDate,
    onChangeDate,
    times,
    selectedTime,
    onChangeTime
  } = props;

  const showtime = showtimes.find(
    showtime => showtime.labId === selectedLab
  );

  if (!labs.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No Labs Available.
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedLab}
          label="Select Lab"
          variant="outlined"
          onChange={onChangeLab}>
          {labs.map(lab => (
            <MenuItem key={lab._id} value={lab._id}>
              {lab.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {showtime && (
        <Grid item xs>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputVariant="outlined"
              margin="none"
              fullWidth
              id="start-date"
              label="Start Date"
              minDate={new Date(showtime.startDate)}
              maxDate={new Date(showtime.endDate)}
              value={selectedDate}
              onChange={date => onChangeDate(date._d)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </LocalizationProvider>
        </Grid>
      )}
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label="Select Time"
            variant="outlined"
            onChange={onChangeTime}>
            {times.map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
}
