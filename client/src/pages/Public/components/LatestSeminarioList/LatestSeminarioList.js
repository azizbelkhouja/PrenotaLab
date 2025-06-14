import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import SeminarioCard from '../../pages/Public/SeminarioPage/components/SeminarioCard/SeminarioCard';
import { withStyles } from '@mui/styles';
import { Container, Grid, Typography, GridList } from '@mui/material';

const LatestSeminarioList = props => {
  const { classes, seminari } = props;

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid
        className={classes.fullHeight}
        container
        alignItems="center"
        spacing={1}>
        <Grid item md={3} xs={12}>
          <div className={classes.title}>
            <Typography className={classes.h2} variant="h2" color="inherit">
              Latest seminari
            </Typography>
            <Typography className={classes.h4} variant="h4" color="inherit">
              GIugno 2025
            </Typography>
          </div>
        </Grid>
        <Grid item md={9} xs={12}>
          <GridList className={classes.gridList} cols={2.5}>
            {seminari.map(seminario => (
              <SeminarioCard key={seminario._id} movie={seminario} />
            ))}
          </GridList>
        </Grid>
      </Grid>
    </Container>
  );
};

LatestSeminarioList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  seminari: PropTypes.array.isRequired
};

export default withStyles(styles)(LatestSeminarioList);
