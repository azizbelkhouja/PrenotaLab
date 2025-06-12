import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: 'transparent',
    borderRadius: 0,
    color: theme.palette.common.white,
    boxShadow: 'unset'
  },
  media: {
    height: 300
  },
  h5: {
    textTransform: 'capitalize'
  }
}));

const SeminarioCardSimple = props => {
  const classes = useStyles();
  const { seminario } = props;

  return (
    <Link to={`seminario/${seminario._id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={seminario.image}
            title={seminario.title}
          />
          <CardContent>
            <Typography
              className={classes.h5}
              gutterBottom
              variant="h5"
              component="h2"
              color="inherit">
              {seminario.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

SeminarioCardSimple.propTypes = {
  seminario: PropTypes.object.isRequired
};
export default SeminarioCardSimple;
