import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import {
  TotalUsers,
  TotalCinemas,
  TotalLabs,
  TotalReservations,
  BestLabs,
  UsersByDevice
} from './components';
import {
  getUsers,
  getCinemas,
  getLabs,
  getReservations
} from '../../../store/actions';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4)
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getCinemas();
    this.props.getLabs();
    this.props.getReservations();
  }

  getBestLabs = (reservations, labs, total = 5) => {
    const reservationCounter = reservations.map(reservation => ({
      labId: reservation.labId,
      count: reservations.filter(r => r.labId === reservation.labId).length
    }));

    const result = [];
    const map = new Map();
    for (const item of reservationCounter) {
      if (!map.has(item.labId)) {
        map.set(item.labId, true); // set any value to Map
        result.push({
          labId: item.labId,
          count: item.count
        });
      }
    }
    return result
      .sort((a, b) => b.count - a.count)
      .slice(0, total)
      .map(res => ({
        lab: labs.find(lab => lab._id === res.labId),
        count: res.count
      }));
  };

  render() {
    const { classes, users, cinemas, labs, reservations } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers users={users.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCinemas cinemas={cinemas.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalLabs labs={labs.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalReservations reservations={reservations.length} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BestLabs
              bestLabs={this.getBestLabs(reservations, labs, 5)}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <UsersByDevice />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({
  userState,
  cinemaState,
  movieState,
  reservationState
}) => ({
  users: userState.users,
  cinemas: cinemaState.cinemas,
  movies: movieState.movies,
  reservations: reservationState.reservations
});
const mapDispatchToProps = {
  getUsers,
  getCinemas,
  getLabs,
  getReservations
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
