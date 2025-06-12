import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SearchInput, ResponsiveDialog } from '../../../../../components';
import styles from './styles';
import AddLab from '../AddLab/AddLab';

class LabToolbar extends Component {
  state = {
    openAddDialog: false
  };

  OpenAddDialog() {
    this.setState({ openAddDialog: true });
  }

  CloseAddDialog() {
    this.setState({ openAddDialog: false });
  }

  render() {
    const { openAddDialog } = this.state;
    const { classes, className, search, onChangeSearch } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Cerca un laboratorio"
              value={search}
              onChange={onChangeSearch}
            />
            <Button
              onClick={() => this.OpenAddDialog()}
              color="primary"
              size="small"
              variant="outlined">
              Aggiungi
            </Button>
          </div>
        </div>
        <ResponsiveDialog
          id="Add-Lab"
          open={openAddDialog}
          handleClose={() => this.CloseAddDialog()}>
          <AddLab />
        </ResponsiveDialog>
      </Fragment>
    );
  }
}

LabToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabToolbar);
