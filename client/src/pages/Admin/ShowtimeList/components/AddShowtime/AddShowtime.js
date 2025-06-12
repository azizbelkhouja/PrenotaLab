import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import styles from './styles';
import { addShowtime, updateShowtime } from '../../../../../store/actions';

class AddShowtime extends Component {
  state = {
    startAt: '',
    startDate: null,
    endDate: null,
    seminarioId: '',
    labId: ''
  };

  componentDidMount() {
    if (this.props.selectedShowtime) {
      const {
        startAt,
        startDate,
        endDate,
        seminarioId,
        labId
      } = this.props.selectedShowtime;
      this.setState({
        startAt,
        startDate,
        endDate,
        seminarioId,
        labId
      });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddShowtime = () => {
    const { startAt, startDate, endDate, seminarioId, labId } = this.state;
    const showtime = {
      startAt,
      startDate,
      endDate,
      seminarioId,
      labId
    };
    this.props.addShowtime(showtime);
  };

  onUpdateShowtime = () => {
    const { startAt, startDate, endDate, seminarioId, labId } = this.state;
    const showtime = {
      startAt,
      startDate,
      endDate,
      seminarioId,
      labId
    };
    this.props.updateShowtime(showtime, this.props.selectedShowtime._id);
  };

  onFilterMinDate = () => {
    const { nowShowing } = this.props;
    const { seminarioId } = this.state;
    const selectedSeminario = nowShowing.find(seminario => seminario._id === seminarioId);
    if (selectedSeminario) return selectedSeminario.startDate;
    return new Date();
  };

  onFilterMaxDate = () => {
    const { nowShowing } = this.props;
    const { seminarioId } = this.state;
    const selectedSeminario = nowShowing.find(seminario => seminario._id === seminarioId);
    if (selectedSeminario) return new Date(selectedSeminario.endDate);
    return false;
  };

  render() {
    const { nowShowing, labs, classes, className } = this.props;
    const { startAt, startDate, endDate, seminarioId, labId } = this.state;

    const rootClassName = classNames(classes.root, className);
    const title = this.props.selectedShowtime
      ? 'Modifica Orario'
      : 'Aggiungi Orario';
    const submitButton = this.props.selectedShowtime
      ? 'Aggiorna Orario'
      : 'Salva Dettagli';
    const submitAction = this.props.selectedShowtime
      ? () => this.onUpdateShowtime()
      : () => this.onAddShowtime();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              fullWidth
              select
              className={classes.textField}
              helperText="Si prega di specificare l'orario"
              label="Time"
              margin="dense"
              required
              value={startAt}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('startAt', event.target.value)
              }>
              {['18:00', '19:00', '20:00', '21:00', ' 22:00', '23:00'].map(
                time => (
                  <MenuItem key={`time-${time}`} value={time}>
                    {time}
                  </MenuItem>
                )
              )}
            </TextField>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              select
              className={classes.textField}
              label="Seminario"
              margin="dense"
              required
              value={seminarioId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('seminarioId', event.target.value)
              }>
              {nowShowing.map(seminario => (
                <MenuItem key={seminario._id} value={seminario._id}>
                  {seminario.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              className={classes.textField}
              label="Laboratorio"
              margin="dense"
              required
              value={labId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('labId', event.target.value)
              }>
              {labs.map(lab => (
                <MenuItem key={lab._id} value={lab._id}>
                  {lab.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="start-date"
                label="Start Date"
                minDate={new Date()}
                maxDate={this.onFilterMaxDate()}
                value={startDate}
                onChange={date => this.handleFieldChange('startDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />

              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                minDate={new Date(startDate)}
                maxDate={this.onFilterMaxDate()}
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddShowtime.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ seminarioState, labState }) => ({
  seminario: seminarioState.seminario,
  nowShowing: seminarioState.nowShowing,
  labs: labState.labs
});

const mapDispatchToProps = { addShowtime, updateShowtime };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddShowtime));
