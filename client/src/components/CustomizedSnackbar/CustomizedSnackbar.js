import React from 'react';
import PropTypes from 'prop-types';
import SnackbarContentWrapper from '../SnackbarContentWrapper';
import Snackbar from '@mui/material/Snackbar';

const CustomizedSnackbar = props => {
  // const [open, setOpen] = React.useState(false);
  const { isOpen, vertical, horizontal, variant, message } = props;

  // function handleClose(event) {
  //   setOpen(false);
  // }

  return (
    <Snackbar
      anchorOrigin={{
        vertical,
        horizontal
      }}
      open={isOpen}>
      <SnackbarContentWrapper
        style={{ color: '#fff' }}
        // onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

CustomizedSnackbar.propTypes = {
  isOpen: PropTypes.bool,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.string
};
export default CustomizedSnackbar;
