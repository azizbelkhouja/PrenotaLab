import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles';

const UsersToolbar = props => {
  const { classes, className, toggleDialog, selectedUsers, deleteUser } = props;
  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
        <div>
          {selectedUsers.length > 0 && (
            <IconButton className={classes.deleteButton} onClick={deleteUser}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            onClick={toggleDialog}
            color="primary"
            size="small"
            variant="outlined">
            {selectedUsers.length === 1 ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};
export default withStyles(styles)(UsersToolbar);
