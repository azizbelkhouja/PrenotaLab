import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class ShowtimesTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    showtimes: PropTypes.array.isRequired
  };

  static defaultProps = {
    showtimes: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      classes,
      className,
      showtimes,
      onSelectShowtime,
      selectedShowtimes,
      selectAllShowtimes
    } = this.props;
    const { rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedShowtimes.length === showtimes.length}
                    color="primary"
                    indeterminate={
                      selectedShowtimes.length > 0 &&
                      selectedShowtimes.length < showtimes.length
                    }
                    onChange={selectAllShowtimes}
                  />
                  ID
                </TableCell>
                <TableCell align="left">Seminario</TableCell>
                <TableCell align="left">Laboratorio</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showtimes
                .filter(showtime => {
                  return showtime;
                })
                .slice(0, rowsPerPage)
                .map(showtime => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={showtime._id}
                    selected={selectedShowtimes.indexOf(showtime._id) !== -1}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={
                            selectedShowtimes.indexOf(showtime._id) !== -1
                          }
                          color="primary"
                          onChange={() => onSelectShowtime(showtime._id)}
                          value="true"
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1">
                          {showtime._id}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.seminarioId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.labId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(showtime.startDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(showtime.endDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {showtime.startAt}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={showtimes.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
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

export default withStyles(styles)(ShowtimesTable);
