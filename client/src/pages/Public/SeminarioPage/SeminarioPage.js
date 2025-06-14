// @ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SeminarioBanner from '../components/SeminarioBanner/SeminarioBanner';
import { getSeminario, onSelectSeminario } from '../../../store/actions';

class SeminarioPage extends Component {
  componentDidMount() {
    this.props.getSeminario(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onSelectSeminario(null);
  }

  render() {
    const { seminario } = this.props;
    return <>{seminario && <SeminarioBanner seminario={seminario} fullDescription />}</>;
  }
}

SeminarioPage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ seminarioState }) => ({
  seminario: seminarioState.selectedSeminario
});

const mapDispatchToProps = { getSeminario, onSelectSeminario };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeminarioPage);
