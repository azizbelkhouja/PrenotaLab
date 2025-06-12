import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Box, Grid } from '@material-ui/core';
import {
  getSeminari,
  getShowtimes,
  getSeminarioSuggestion
} from '../../../store/actions';
import SeminarioCarousel from '../components/SeminarioCarousel/SeminarioCarousel';
import SeminarioBanner from '../components/SeminarioBanner/SeminarioBanner';
import styles from './styles';

class HomePage extends Component {
  componentDidMount() {
    const {
      seminari,
      showtimes,
      suggested,
      getSeminari,
      getShowtimes,
      getSeminarioSuggestion,
      user
    } = this.props;
    if (!seminari.length) getSeminari();
    if (!showtimes.length) getShowtimes();
    if (user) {
      if (!suggested.length) getSeminarioSuggestion(user.username);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.user &&
        this.props.getSeminarioSuggestion(this.props.user.username);
    }
  }

  render() {
    const {
      classes,
      randomSeminario,
      comingSoon,
      nowShowing,
      suggested
    } = this.props;
    return (
      <Fragment>
      <SeminarioBanner seminario={randomSeminario} height="85vh" />
      <Box height={60} />
      <SeminarioCarousel
        carouselClass={classes.carousel}
        title="Suggeriti per te"
        seminari={suggested}
      />
      <SeminarioCarousel
        carouselClass={classes.carousel}
        title="In programmazione"
        to="/seminario/category/nowShowing"
        seminari={nowShowing}
      />
      <SeminarioCarousel
        carouselClass={classes.carousel}
        title="Prossimamente"
        to="/seminario/category/comingSoon"
        seminari={comingSoon}
      />
      {false && (
        <Grid container style={{ height: 500 }}>
        <Grid item xs={7} style={{ background: '#131334' }}></Grid>
        <Grid item xs={5} style={{ background: '#010025' }}></Grid>
        </Grid>
      )}
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  seminari: PropTypes.array.isRequired,
  latestSeminari: PropTypes.array.isRequired
};

const mapStateToProps = ({ seminarioState, showtimeState, authState }) => ({
  seminari: seminarioState.seminari,
  randomSeminario: seminarioState.randomSeminario,
  latestSeminari: seminarioState.latestSeminari,
  comingSoon: seminarioState.comingSoon,
  nowShowing: seminarioState.nowShowing,
  showtimes: showtimeState.showtimes,
  suggested: seminarioState.suggested,
  user: authState.user
});

const mapDispatchToProps = { getSeminari, getShowtimes, getSeminarioSuggestion };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
