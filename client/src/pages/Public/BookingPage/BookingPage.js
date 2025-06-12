import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Grid, Container } from '@material-ui/core';
import {
  getSeminario,
  getLabsUserModeling,
  getLab,
  getLabs,
  getShowtimes,
  getReservations,
  getSuggestedReservationSeats,
  setSelectedSeats,
  setSelectedLab,
  setSelectedDate,
  setSelectedTime,
  setInvitation,
  toggleLoginPopup,
  showInvitationForm,
  resetCheckout,
  setAlert,
  addReservation,
  setSuggestedSeats,
  setQRCode
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import LoginForm from '../Login/components/LoginForm';
import styles from './styles';
import SeminarioInfo from './components/SeminarioInfo/SeminarioInfo';
import BookingForm from './components/BookingForm/BookingForm';
import BookingSeats from './components/BookingSeats/BookingSeats';
import BookingCheckout from './components/BookingCheckout/BookingCheckout';
import BookingInvitation from './components/BookingInvitation/BookingInvitation';

import jsPDF from 'jspdf';

class BookingPage extends Component {
  didSetSuggestion = false;

  componentDidMount() {
    const {
      user,
      match,
      getSeminario,
      getLabs,
      getLabsUserModeling,
      getShowtimes,
      getReservations,
      getSuggestedReservationSeats
    } = this.props;
    getSeminario(match.params.id);
    user ? getLabsUserModeling(user.username) : getLabs();
    getShowtimes();
    getReservations();
    if (user) getSuggestedReservationSeats(user.username);
  }

  componentDidUpdate(prevProps) {
    const { selectedLab, selectedDate, getLab } = this.props;
    if (
      (selectedLab && prevProps.selectedLab !== selectedLab) ||
      (selectedLab && prevProps.selectedDate !== selectedDate)
    ) {
      getLab(selectedLab);
    }
  }

  // JSpdf Generator For generating the PDF
  jsPdfGenerator = () => {
    const { seminario, lab, selectedDate, selectedTime, QRCode } = this.props;
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.setFontSize(22);
    doc.text(seminario.title, 20, 20);
    doc.setFontSize(16);
    doc.text(lab.name, 20, 30);
    doc.text(
      `Date: ${new Date(
        selectedDate
      ).toLocaleDateString()} - Time: ${selectedTime}`,
      20,
      40
    );
    doc.addImage(QRCode, 'JPEG', 15, 40, 160, 160);
    doc.save(`${seminario.title}-${lab.name}.pdf`);
  };

  onSelectSeat = (row, seat) => {
    const { lab, setSelectedSeats } = this.props;
    const seats = [...lab.seats];
    const newSeats = [...seats];
    if (seats[row][seat] === 1) {
      newSeats[row][seat] = 1;
    } else if (seats[row][seat] === 2) {
      newSeats[row][seat] = 0;
    } else if (seats[row][seat] === 3) {
      newSeats[row][seat] = 2;
    } else {
      newSeats[row][seat] = 2;
    }
    setSelectedSeats([row, seat]);
  };

  async checkout() {
    const {
      seminario,
      lab,
      selectedSeats,
      selectedDate,
      selectedTime,
      getReservations,
      isAuth,
      user,
      addReservation,
      toggleLoginPopup,
      showInvitationForm,
      setQRCode
    } = this.props;

    if (selectedSeats.length === 0) return;
    if (!isAuth) return toggleLoginPopup();

    const response = await addReservation({
      date: selectedDate,
      startAt: selectedTime,
      seats: this.bookSeats(),
      ticketPrice: lab.ticketPrice,
      total: selectedSeats.length * lab.ticketPrice,
      seminarioId: seminario._id,
      labId: lab._id,
      username: user.username,
      phone: user.phone
    });
    if (response.status === 'success') {
      const { data } = response;
      setQRCode(data.QRCode);
      getReservations();
      showInvitationForm();
    }
  }

  bookSeats() {
    const { lab, selectedSeats } = this.props;
    const seats = [...lab.seats];

    if (selectedSeats.length === 0) return;

    const bookedSeats = seats
      .map(row =>
        row.map((seat, i) => (seat === 2 ? i : -1)).filter(seat => seat !== -1)
      )
      .map((seats, i) => (seats.length ? seats.map(seat => [i, seat]) : -1))
      .filter(seat => seat !== -1)
      .reduce((a, b) => a.concat(b));

    return bookedSeats;
  }

  onFilterLab() {
    const { labs, showtimes, selectedLab, selectedTime } = this.props;
    const initialReturn = { uniqueLabs: [], uniqueTimes: [] };
    if (!showtimes || !labs) return initialReturn;

    const uniqueLabsId = showtimes
      .filter(showtime =>
        selectedTime ? showtime.startAt === selectedTime : true
      )
      .map(showtime => showtime.labId)
      .filter((value, index, self) => self.indexOf(value) === index);

    const uniqueLabs = labs.filter(lab =>
      uniqueLabsId.includes(lab._id)
    );

    const uniqueTimes = showtimes
      .filter(showtime =>
        selectedLab ? selectedLab === showtime.labId : true
      )
      .map(showtime => showtime.startAt)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(
        (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
      );

    return { ...initialReturn, uniqueLabs, uniqueTimes };
  }

  onGetReservedSeats = () => {
    const { reservations, lab, selectedDate, selectedTime } = this.props;

    if (!lab) return [];
    const newSeats = [...lab.seats];

    const filteredReservations = reservations.filter(
      reservation =>
        new Date(reservation.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString() &&
        reservation.startAt === selectedTime
    );
    if (filteredReservations.length && selectedDate && selectedTime) {
      const reservedSeats = filteredReservations
        .map(reservation => reservation.seats)
        .reduce((a, b) => a.concat(b));
      reservedSeats.forEach(([row, seat]) => (newSeats[row][seat] = 1));
      return newSeats;
    }
    return newSeats;
  };

  onGetSuggestedSeats = (seats, suggestedSeats) => {
    const { numberOfTickets, positions } = suggestedSeats;

    const positionsArray = Object.keys(positions).map(key => {
      return [String(key), positions[key]];
    });

    positionsArray.sort((a, b) => {
      return b[1] - a[1];
    });

    if (positionsArray.every(position => position[1] === 0)) return;

    const step = Math.round(seats.length / 3);
    let indexArr = [];
    let suggested;
    for (let position of positionsArray) {
      switch (position[0]) {
        case 'front':
          indexArr = [0, step];
          suggested = this.checkSeats(indexArr, seats, numberOfTickets);
          break;
        case 'center':
          indexArr = [step, step * 2];
          suggested = this.checkSeats(indexArr, seats, numberOfTickets);
          break;
        case 'back':
          indexArr = [step * 2, step * 3];
          suggested = this.checkSeats(indexArr, seats, numberOfTickets);
          break;
        default:
          break;
      }
      if (suggested) this.getSeat(suggested, seats, numberOfTickets);
      break;
    }
  };

  checkSeats = (indexArr, seats, numberOfTickets) => {
    for (let i = indexArr[0]; i < indexArr[1]; i++) {
      for (let seat in seats[i]) {
        let seatNum = Number(seat);

        if (
          !seats[i][seatNum] &&
          seatNum + (numberOfTickets - 1) <= seats[i].length
        ) {
          let statusAvailability = [];
          for (let y = 1; y < numberOfTickets; y++) {
            //check the next seat if available
            if (!seats[i][seatNum + y]) {
              statusAvailability.push(true);
            } else {
              statusAvailability.push(false);
            }
          }
          if (statusAvailability.every(Boolean)) return [i, seatNum];
        }
      }
    }
    return null;
  };

  getSeat = (suggested, seats, numberOfTickets) => {
    const { setSuggestedSeats } = this.props;
    for (let i = suggested[1]; i < suggested[1] + numberOfTickets; i++) {
      const seat = [suggested[0], i];
      setSuggestedSeats(seat);
    }
  };

  onChangeLab = event => this.props.setSelectedLab(event.target.value);
  onChangeDate = date => this.props.setSelectedDate(date);
  onChangeTime = event => this.props.setSelectedTime(event.target.value);

  sendInvitations = async () => {
    const invitations = this.createInvitations();
    if (!invitations) return;
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/invitations';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invitations)
      });
      if (response.ok) {
        this.props.resetCheckout();
        this.props.setAlert('Inviti inviati', 'success', 5000);
        return { status: 'success', message: 'Inviti inviati' };
      }
    } catch (error) {
      this.props.setAlert(error.message, 'error', 5000);
      return {
        status: 'error',
        message: 'Inviti non inviati. Si è verificato un errore, riprova più tardi.'
      };
    }
  };

  createInvitations = () => {
    const {
      user,
      seminario,
      lab,
      selectedDate,
      selectedTime,
      invitations
    } = this.props;

    const invArray = Object.keys(invitations)
      .map(key => ({
        to: invitations[key],
        host: user.name,
        seminario: seminario.title,
        time: selectedTime,
        date: new Date(selectedDate).toDateString(),
        lab: lab.name,
        image: lab.image,
        seat: key
      }))
      .filter(inv => inv.to !== '');
    return invArray;
  };

  setSuggestionSeats = (seats, suggestedSeats) => {
    suggestedSeats.forEach(suggestedSeat => {
      seats[suggestedSeat[0]][suggestedSeat[1]] = 3;
    });
    return seats;
  };

  render() {
    const {
      classes,
      user,
      seminario,
      lab,
      showtimes,
      selectedSeats,
      selectedLab,
      selectedDate,
      selectedTime,
      showLoginPopup,
      toggleLoginPopup,
      showInvitation,
      invitations,
      setInvitation,
      resetCheckout,
      suggestedSeats,
      suggestedSeat
    } = this.props;
    const { uniqueLabs, uniqueTimes } = this.onFilterLab();
    let seats = this.onGetReservedSeats();
    if (suggestedSeats && selectedTime && !suggestedSeat.length) {
      this.onGetSuggestedSeats(seats, suggestedSeats);
    }
    if (suggestedSeat.length && !this.didSetSuggestion) {
      seats = this.setSuggestionSeats(seats, suggestedSeat);
      this.didSetSuggestion = true;
    }

    return (
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={2} style={{ height: '100%' }}>
          <SeminarioInfo seminario={seminario} />
          <Grid item lg={9} xs={12} md={12}>
            <BookingForm
              labs={uniqueLabs}
              times={uniqueTimes}
              showtimes={showtimes}
              selectedLab={selectedLab}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onChangeLab={this.onChangeLab}
              onChangeDate={this.onChangeDate}
              onChangeTime={this.onChangeTime}
            />
            {showInvitation && !!selectedSeats.length && (
              <BookingInvitation
                selectedSeats={selectedSeats}
                sendInvitations={this.sendInvitations}
                ignore={resetCheckout}
                invitations={invitations}
                onSetInvitation={setInvitation}
                onDownloadPDF={this.jsPdfGenerator}
              />
            )}

            {lab && selectedLab && selectedTime && !showInvitation && (
              <>
                <BookingSeats
                  seats={seats}
                  onSelectSeat={(indexRow, index) =>
                    this.onSelectSeat(indexRow, index)
                  }
                />
                <BookingCheckout
                  user={user}
                  ticketPrice={lab.ticketPrice}
                  seatsAvailable={lab.seatsAvailable}
                  selectedSeats={selectedSeats.length}
                  onBookSeats={() => this.checkout()}
                />
              </>
            )}
          </Grid>
        </Grid>
        <ResponsiveDialog
          id="Edit-lab"
          open={showLoginPopup}
          handleClose={() => toggleLoginPopup()}
          maxWidth="sm">
          <LoginForm />
        </ResponsiveDialog>
      </Container>
    );
  }
}

BookingPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (
  {
    authState,
    seminarioState,
    labState,
    showtimeState,
    reservationState,
    checkoutState
  },
  ownProps
) => ({
  isAuth: authState.isAuthenticated,
  user: authState.user,
  seminario: seminarioState.selectedSeminario,
  lab: labState.selectedLab,
  labs: labState.labs,
  showtimes: showtimeState.showtimes.filter(
    showtime => showtime.seminarioId === ownProps.match.params.id
  ),
  reservations: reservationState.reservations,
  selectedSeats: checkoutState.selectedSeats,
  suggestedSeat: checkoutState.suggestedSeat,
  selectedLab: checkoutState.selectedLab,
  selectedDate: checkoutState.selectedDate,
  selectedTime: checkoutState.selectedTime,
  showLoginPopup: checkoutState.showLoginPopup,
  showInvitation: checkoutState.showInvitation,
  invitations: checkoutState.invitations,
  QRCode: checkoutState.QRCode,
  suggestedSeats: reservationState.suggestedSeats
});

const mapDispatchToProps = {
  getSeminario,
  getLab,
  getLabsUserModeling,
  getLabs,
  getShowtimes,
  getReservations,
  getSuggestedReservationSeats,
  addReservation,
  setSelectedSeats,
  setSuggestedSeats,
  setSelectedLab,
  setSelectedDate,
  setSelectedTime,
  setInvitation,
  toggleLoginPopup,
  showInvitationForm,
  resetCheckout,
  setAlert,
  setQRCode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BookingPage));
