import React from 'react';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

function SeminarioBanner(props) {
  const { seminario, fullDescription } = props;
  const classes = useStyles(props);
  if (!seminario) return null;

  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          {fullDescription && (
            <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
              {seminario.genre.split(',').map((genre, index) => (
                <Typography
                  key={`${genre}-${index}`}
                  className={classes.tag}
                  variant="body1"
                  color="inherit">
                  {genre}
                </Typography>
              ))}

              <StyledRating
                value={4}
                readOnly
                size="small"
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          )}
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit">
            {seminario.title}
          </Typography>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit">
            {textTruncate(seminario.description, 450)}
          </Typography>
          <Typography className={classes.director} variant="h4" color="inherit">
            By: {seminario.director}
          </Typography>
          <Typography
            className={classes.duration}
            variant="body1"
            color="inherit">
            {seminario.duration} minuti
          </Typography>
          <Typography className={classes.genre} variant="body1" color="inherit">
            {seminario.genre}
          </Typography>
        </header>
      </div>
      <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(${seminario.image})`
        }}
      />
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link to={`booking/${seminario._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.button}>
              Buy Tickets
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link to={`seminario/${seminario._id}`} style={{ textDecoration: 'none' }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Learn More
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default SeminarioBanner;
