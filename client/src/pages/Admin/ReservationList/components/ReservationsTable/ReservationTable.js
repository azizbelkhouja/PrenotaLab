import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class ReservationsTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    reservations: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    cinemas: PropTypes.array.isRequired
  };

  static defaultProps = {
    reservations: [],
    movies: [],
    cinemas: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Non ${attr} Trovato`;
  };

  render() {
    const { classes, className, reservations, seminari, labs } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Studente</TableCell>
                <TableCell align="left">Telefono</TableCell>
                <TableCell align="left">Comincia a</TableCell>
                <TableCell align="left">Seminario</TableCell>
                <TableCell align="left">Laboratorio</TableCell>
                <TableCell align="left">Ticket Price TO DELETE</TableCell>
                <TableCell align="left">Totale</TableCell>
                <TableCell align="left">Finisce</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(reservation => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={reservation._id}>
                    <TableCell className={classes.tableCell}>
                      {reservation.username}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.startAt}
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(reservation.seminarioId, seminari, 'title')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {this.onFindAttr(reservation.labId, labs, 'name')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.ticketPrice}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.total}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {reservation.checkin ? 'si' : 'no'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Pagina Precedente'
            }}
            component="div"
            count={reservations.length}
            nextIconButtonProps={{
              'aria-label': 'Pagina Successiva'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(ReservationsTable);
