import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from './styles';
import { Add } from '@material-ui/icons';
import {
  getLabs,
  createLabs,
  updateLabs,
  removeLabs
} from '../../../../../store/actions';
import { FileUpload } from '../../../../../components';

class AddLab extends Component {
  state = {
    _id: '',
    name: '',
    image: null,
    ticketPrice: '',
    city: '',
    seatsAvailable: '',
    seats: [],
    notification: {}
  };

  componentDidMount() {
    if (this.props.editLab) {
      const { image, ...rest } = this.props.editLab;
      this.setState({ ...rest });
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onSubmitAction = async type => {
    const {
      getLabs,
      createLabs,
      updateLabs,
      removeLabs
    } = this.props;
    const {
      _id,
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      seats
    } = this.state;
    const lab = { name, ticketPrice, city, seatsAvailable, seats };
    let notification = {};
    type === 'create'
      ? (notification = await createLabs(image, lab))
      : type === 'update'
      ? (notification = await updateLabs(image, lab, _id))
      : (notification = await removeLabs(_id));
    this.setState({ notification });
    if (notification && notification.status === 'success') getLabs();
  };

  handleSeatsChange = (index, value) => {
    if (value > 10) return;
    const { seats } = this.state;
    seats[index] = Array.from({ length: value }, () => 0);
    this.setState({
      seats
    });
  };

  onAddSeatRow = () => {
    this.setState(prevState => ({
      seats: [...prevState.seats, []]
    }));
  };

  renderSeatFields = () => {
    const { seats } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.field}>
          <Button onClick={() => this.onAddSeatRow()}>
            <Add /> Aggiungere posti
          </Button>
        </div>
        {seats.length > 0 &&
          seats.map((seat, index) => (
            <div key={`seat-${index}-${seat.length}`} className={classes.field}>
              <TextField
                key={`new-seat-${index}`}
                className={classes.textField}
                label={
                  'Aggiungere numero di posti per la fila : ' +
                  (index + 10).toString(36).toUpperCase()
                }
                margin="dense"
                required
                value={seat.length}
                variant="outlined"
                type="number"
                inputProps={{
                  min: 0,
                  max: 10
                }}
                onChange={event =>
                  this.handleSeatsChange(index, event.target.value)
                }
              />
            </div>
          ))}
      </>
    );
  };

  render() {
    const { classes, className } = this.props;
    const {
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editLab ? 'Modifica Laboratorio' : 'Aggiungi Laboratorio';
    const submitButton = this.props.editLab
      ? 'Aggiorna Laboratorio'
      : 'Salva Dettagli';
    const submitAction = this.props.editLab
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Specifica il nome del laboratorio"
              label="Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />

            <TextField
              fullWidth
              className={classes.textField}
              label="City"
              margin="dense"
              required
              variant="outlined"
              value={city}
              onChange={event =>
                this.handleFieldChange('city', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.textField}
              file={image}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
          </div>

          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Ticket Price TO DELETE"
              margin="dense"
              type="number"
              value={ticketPrice}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('ticketPrice', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="posto disponibile"
              margin="dense"
              required
              value={seatsAvailable}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('seatsAvailable', event.target.value)
              }
            />
          </div>
          {this.renderSeatFields()}
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
        {this.props.editLab && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={() => this.onSubmitAction('remove')}>
            Eliminare Laboratorio
          </Button>
        )}

        {notification && notification.status ? (
          notification.status === 'success' ? (
            <Typography
              className={classes.infoMessage}
              color="primary"
              variant="caption">
              {notification.message}
            </Typography>
          ) : (
            <Typography
              className={classes.infoMessage}
              color="error"
              variant="caption">
              {notification.message}
            </Typography>
          )
        ) : null}
      </div>
    );
  }
}

AddLab.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = null;
const mapDispatchToProps = {
  getLabs,
  createLabs,
  updateLabs,
  removeLabs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddLab));
