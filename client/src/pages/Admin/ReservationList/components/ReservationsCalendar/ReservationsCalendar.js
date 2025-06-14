import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

class ReservationsCalendar extends Component {
  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { reservations, cinemas, seminari } = this.props;

    const events = reservations.map(reservation => ({
      title: `Seminario: ${this.onFindAttr(
        reservation.seminarioId,
        seminari,
        'title'
      )}-Cinema: ${this.onFindAttr(reservation.cinemaId, cinemas, 'name')}`,
      start: reservation.date,
      // startTime: reservation.startAt,
      // end: reservation.date,
      url: `/seminario/${reservation.seminarioId}`
    }));

    return (
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
      />
    );
  }
}

export default ReservationsCalendar;
