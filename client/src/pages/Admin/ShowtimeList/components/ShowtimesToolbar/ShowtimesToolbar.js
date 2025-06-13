import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './styles';

class ShowtimesToolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    selectedShowtimes: PropTypes.array
  };

  static defaultProps = {
    selectedShowtimes: []
  };

  render() {
    const {
      classes,
      className,
      selectedShowtimes,
      toggleDialog,
      deleteShowtime
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <div>
            {selectedShowtimes.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                onClick={deleteShowtime}>
                <DeleteIcon />
              </IconButton>
            )}

            <Button
              onClick={() => toggleDialog()}
              color="primary"
              size="small"
              variant="outlined">
              {selectedShowtimes.length === 1 ? 'Modifica' : 'Aggiungi'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShowtimesToolbar);
