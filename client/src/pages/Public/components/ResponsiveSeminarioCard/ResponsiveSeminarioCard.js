import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import styles from './styles';
// import ShareIcon from '@material-ui/icons/Share';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CaledarIcon from '@material-ui/icons/CalendarToday';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';

const SeminarioCard = props => {
  const { classes, seminario } = props;

  return (
    <Link to={`/seminario/${seminario._id}`} style={{ textDecoration: 'none' }}>
      <Paper className={classes.seminarioCard} elevation={20}>
        <div className={classes.infoSection}>
          <header className={classes.seminarioHeader}>
            <Typography
              className={classes.seminarioTitle}
              variant="h1"
              color="inherit">
              {seminario.title}
            </Typography>
            <Typography
              className={classes.director}
              variant="h4"
              color="inherit">
              By: {seminario.director}
            </Typography>
            <Typography
              className={classes.duration}
              variant="body1"
              color="inherit">
              {seminario.duration} min
            </Typography>
            <Typography
              className={classes.genre}
              variant="body1"
              color="inherit">
              {seminario.genre}
            </Typography>
          </header>

          <div className={classes.description}>
            <Typography
              className={classes.descriptionText}
              variant="body1"
              color="inherit">
              {textTruncate(seminario.description, 250)}
            </Typography>
          </div>
          {/* <div className={classes.footer}>
            <div className={classes.icons}>
              <ShareIcon fontSize="small" />
            </div>
            <div className={classes.icons}>
              <FavoriteIcon fontSize="small" />
            </div>
            <div className={classes.icons}>
              <CaledarIcon fontSize="small" />
            </div>
          </div> */}
        </div>
        <div
          className={classes.blurBackground}
          style={{
            backgroundImage: `url(${seminario.image})`
          }}
        />
      </Paper>
    </Link>
  );
};

SeminarioCard.propTypes = {
  seminario: PropTypes.object.isRequired
};
export default withStyles(styles)(SeminarioCard);
