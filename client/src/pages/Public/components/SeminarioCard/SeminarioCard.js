import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import styles from './styles';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';

const SeminarioCard = props => {
  const { classes, seminario } = props;

  return (
    <Link to={`seminario/${seminario._id}`} style={{ textDecoration: 'none' }}>
      <div className={classes.card}>
        <header
          className={classes.header}
          style={{
            backgroundImage: `url(${seminario.image})`
          }}>
          <Typography className={classes.h4} variant="h4" color="inherit">
            {seminario.genre}
          </Typography>
        </header>
        <div className={classes.body}>
          <p>{seminario.duration}</p>
          <h2>{seminario.title}</h2>
          <p>{seminario.language}</p>
          <p>{seminario.cast}</p>
          <p>{seminario.director}</p>
          <p>{textTruncate(seminario.description)}</p>
        </div>
      </div>
    </Link>
  );
};

SeminarioCard.propTypes = {
  seminario: PropTypes.object.isRequired
};
export default withStyles(styles)(SeminarioCard);
