import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { ReservationsToolbar, ReservationsTable } from './components';
import { getReservations, getSeminari, getLabs } from '../../../store/actions';
import ReservationsCalendar from './components/ReservationsCalendar/ReservationsCalendar';
import { match } from '../../../utils';

class ReservationList extends Component {
  state = { mode: 'list', search: '' };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      reservations,
      seminari,
      labs,
      getReservations,
      getSeminari,
      getLabs
    } = this.props;

    if (!reservations.length) getReservations();
    if (!seminari.length) getSeminari();
    if (!labs.length) getLabs();
  }

  onChangeMode = () =>
    this.setState(({ mode }) => ({ mode: mode === 'grid' ? 'list' : 'grid' }));

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { mode, search } = this.state;
    const { classes, reservations, seminari, labs } = this.props;

    const filteredReservations = match(search, reservations, 'phone');

    return (
      <div className={classes.root}>
        <ReservationsToolbar
          reservations={filteredReservations}
          search={search}
          onChangeSearch={this.onChangeSearch}
          mode={mode}
          onChangeMode={this.onChangeMode}
        />
        <div className={classes.content}>
          {!filteredReservations.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : mode === 'list' ? (
            <ReservationsTable
              reservations={filteredReservations}
              seminari={seminari}
              labs={labs}
            />
          ) : (
            <ReservationsCalendar
              reservations={filteredReservations}
              seminari={seminari}
              labs={labs}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reservationState, seminarioState, labState }) => ({
  reservations: reservationState.reservations,
  seminarios: seminarioState.seminari,
  labs: labState.labs
});

const mapDispatchToProps = {
  getReservations,
  getSeminari,
  getLabs
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReservationList));
