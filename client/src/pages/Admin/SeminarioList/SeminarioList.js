import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { SeminarioToolbar, SeminarioCard } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import AddSeminario from './components/AddSeminario/AddSeminario';
import { getSeminari, onSelectSeminario } from '../../../store/actions';
import { match } from '../../../utils';

class SeminarioList extends Component {
  state = { search: '' };
  componentDidMount() {
    const { seminari, getSeminari } = this.props;
    if (!seminari.length) getSeminari();
  }

  renderSeminari() {
    const { classes } = this.props;
    const seminari = match(this.state.search, this.props.seminari, 'title');

    if (!seminari.length) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Grid container spacing={3}>
        {seminari.map(seminario => (
          <Grid
            item
            key={seminario._id}
            lg={4}
            md={6}
            xs={12}
            onClick={() => this.props.onSelectSeminario(seminario)}>
            <SeminarioCard seminario={seminario} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes, selectedSeminario } = this.props;
    return (
      <div className={classes.root}>
        <SeminarioToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>{this.renderSeminari()}</div>
        <ResponsiveDialog
          id="Edit-seminario"
          open={Boolean(selectedSeminario)}
          handleClose={() => this.props.onSelectSeminario(null)}>
          <AddSeminario edit={selectedSeminario} />
        </ResponsiveDialog>
      </div>
    );
  }
}

SeminarioList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ seminarioState }) => ({
  seminari: seminarioState.seminari,
  latestSeminari: seminarioState.latestSeminari,
  comingSoon: seminarioState.comingSoon,
  nowShowing: seminarioState.nowShowing,
  selectedSeminario: seminarioState.selectedSeminario
});

const mapDispatchToProps = { getSeminari, onSelectSeminario };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SeminarioList));
