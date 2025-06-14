import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './styles';
import { seminarCategories, languageData } from '../../../../../data/LabDataService';
import {
  addSeminario,
  updateSeminario,
  removeSeminario
} from '../../../../../store/actions';
import FileUpload from '../../../../../components/FileUpload/FileUpload';
import { Select } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

class AddSeminario extends Component {
  state = {
    title: '',
    image: null,
    genre: [],
    language: '',
    duration: '',
    description: '',
    director: '',
    cast: '',
    releaseDate: new Date(),
    endDate: new Date()
  };

  componentDidMount() {
    if (this.props.edit) {
      const {
        title,
        language,
        genre,
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate
      } = this.props.edit;
      this.setState({
        title,
        language,
        genre: genre.split(','),
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seminario !== this.props.seminario) {
      const { title, genre, language } = this.props.seminario;
      this.setState({ title, genre, language });
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

  onAddSeminario = () => {
    const { image, genre, ...rest } = this.state;
    const seminario = { ...rest, genre: genre.join(',') };
    this.props.addSeminario(image, seminario);
  };

  onUpdateSeminario = () => {
    const { image, genre, ...rest } = this.state;
    const seminario = { ...rest, genre: genre.join(',') };
    this.props.updateSeminario(this.props.edit._id, seminario, image);
  };

  onRemoveSeminario = () => this.props.removeSeminario(this.props.edit._id);

  render() {
    const { classes, className } = this.props;
    const {
      title,
      image,
      genre,
      language,
      duration,
      description,
      director,
      cast,
      releaseDate,
      endDate
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = this.props.edit ? 'Modifica Seminario' : 'Aggiungi Seminario';
    const submitButton = this.props.edit ? 'Aggiorna Seminario' : 'Salva Dettagli';
    const submitAction = this.props.edit
      ? () => this.onUpdateSeminario()
      : () => this.onAddSeminario();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Si prega di specificare il titolo del seminario"
              label="Title"
              margin="dense"
              required
              value={title}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('title', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <Select
              multiple
              displayEmpty
              className={classes.textField}
              label="Genre"
              margin="dense"
              required
              value={genre}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('genre', event.target.value)
              }>
              {seminarCategories.map((genreItem, index) => (
                <MenuItem key={genreItem + '-' + index} value={genreItem}>
                  {genreItem}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              multiline
              className={classes.textField}
              label="Description"
              margin="dense"
              required
              variant="outlined"
              value={description}
              onChange={event =>
                this.handleFieldChange('description', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              select
              className={classes.textField}
              label="Language"
              margin="dense"
              required
              value={language}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('language', event.target.value)
              }>
              {languageData.map((langItem, index) => (
                <MenuItem key={langItem + '-' + index} value={langItem}>
                  {langItem}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.textField}
              label="Duration"
              margin="dense"
              type="number"
              value={duration}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('duration', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Director"
              margin="dense"
              required
              value={director}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('director', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="Cast"
              margin="dense"
              required
              value={cast}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('cast', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="release-date"
                label="Release Date"
                value={releaseDate}
                onChange={date =>
                  this.handleFieldChange('releaseDate', date._d)
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />

              <DatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.upload}
              file={image}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
        {this.props.edit && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={this.onRemoveSeminario}>
            Elimina Seminario
          </Button>
        )}
      </div>
    );
  }
}

AddSeminario.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  seminario: PropTypes.object
};

const mapStateToProps = ({ seminarioState }) => ({
  seminari: seminarioState.seminari
});

const mapDispatchToProps = { addSeminario, updateSeminario, removeSeminario };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddSeminario));
