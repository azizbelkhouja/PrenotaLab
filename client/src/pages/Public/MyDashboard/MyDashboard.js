import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getSeminari, getReservations, getLabs } from '../../../store/actions';
import { MyReservationTable } from './components';
import Account from '../../Admin/Account';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
}));

function MyDashboard(props) {
  const {
    user,
    reservations,
    seminari,
    labs,
    getSeminari,
    getReservations,
    getLabs
  } = props;

  useEffect(() => {
    getSeminari();
    getReservations();
    getLabs();
  }, [getSeminari, getReservations, getLabs]);

  const classes = useStyles(props);

  const myReservations = reservations.filter(
    reservation => reservation.username === user.username
  );

  console.log(myReservations);

  return (
    <Container>
      <Grid container spacing={2}>
        {!!myReservations.length && (
          <>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit">
                My Reservations
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MyReservationTable
                reservations={myReservations}
                seminari={seminari}
                labs={labs}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Mio conto
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({
  authState,
  seminarioState,
  reservationState,
  labState
}) => ({
  user: authState.user,
  seminari: seminarioState.seminari,
  reservations: reservationState.reservations,
  labs: labState.labs
});

const mapDispatchToProps = { getSeminari, getReservations, getLabs };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDashboard);
