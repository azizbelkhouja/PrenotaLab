import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLabs } from '../../../store/actions';
import { withStyles } from '@mui/styles';
import { CircularProgress, Grid } from '@mui/material';
import { AddLab, LabToolbar } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import LabCard from '../../Public/components/LabCard/LabCard';
import { match } from '../../../utils';

class LabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editLab: null,
      openEditDialog: false,
      search: ''
    };
  }

  componentDidMount() {
    const { labs, getLabs } = this.props;
    if (!labs.length) getLabs();
  }

  openEditDialog = lab => {
    this.setState({ openEditDialog: true, editLab: lab });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editLab: null });
  };

  editLab(lab) {
    this.openEditDialog(lab);
  }

  render() {
    const { classes, labs } = this.props;
    const { editLab, search } = this.state;
    const filteredLabs = match(search, labs, 'name');
    return (
      <div className={classes.root}>
        <LabToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>
          {filteredLabs.length === 0 ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {filteredLabs.map(lab => (
                <Grid
                  item
                  key={lab._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => this.openEditDialog(lab)}>
                  <LabCard lab={lab} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <ResponsiveDialog
          id="Edit-lab"
          open={this.state.openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          <AddLab
            editLab={editLab}
            handleClose={() => this.CloseEditDialog()}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

LabList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ labState }) => ({
  labs: labState.labs
});

const mapDispatchToProps = { getLabs };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LabList));
