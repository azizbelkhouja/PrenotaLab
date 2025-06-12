import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function Checkin(props) {
  const reservationId = props.match.params.reservationId;
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    checkinReservations(reservationId);
  }, [reservationId]);

  const checkinReservations = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reservations/checkin/' + id;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const reservation = await response.json();
      if (response.ok) {
        setReservation(reservation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles(props);
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" color="inherit">
          Benvenuto al Check-in
        </Typography>
        {reservation && reservation.checkin ? (
          <Typography variant="h5" color="primary" align="center" style={{ marginTop: 24 }}>
            Check-in effettuato con successo per <strong>{reservation.username}</strong>.<br />
            Grazie per aver utilizzato il nostro servizio!
          </Typography>
        ) : (
          <Typography variant="h6" color="error" align="center" style={{ marginTop: 24 }}>
            Si è verificato un errore durante il check-in.<br />
            Per favore riprova o contatta l'assistenza.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Checkin;
