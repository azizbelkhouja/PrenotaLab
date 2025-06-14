import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Box,
  ButtonBase,
  Grid,
  Typography
} from '@mui/material';

// A style sheet
const useStyles = makeStyles({
  image: {
    height: 400,
    width: 400
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  label: { width: 120, height: 20, overflow: 'hidden' }
});

const Stats = ({ stats, classes }) =>
  stats.map((stat, index) => (
    <Box key={`${stat.label}-${index}`} display="flex" alignItems="center">
      <Typography
        className={classes.label}
        color="inherit"
        gutterBottom
        variant="subtitle1">
        {stat.label}
      </Typography>
      <Typography color="inherit" variant="body2" gutterBottom>
        {stat.value}
      </Typography>
    </Box>
  ));

const SeminarioOverview = ({ title, description, image }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={5}>
      <Grid item>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="seminario" src={image} />
        </ButtonBase>
      </Grid>
      <Grid item xs={8} container direction="column" spacing={2}>
        <Grid item>
          <Typography color="inherit" gutterBottom variant="h2">
            {title}
          </Typography>
          <Typography color="inherit" variant="body1" gutterBottom>
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ID: 1030114
          </Typography>
          <Box height={20} />
        </Grid>
        <Grid item xs>
          <Stats
            classes={classes}
            stats={[
              { label: 'Released', value: '19 September 2025' },
              { label: 'Runtime', value: '1h 20mins' },
              { label: 'Director', value: 'Aziz' },
              { label: 'Genre', value: 'Javascript' },
              { label: 'Status', value: 'Released' },
              { label: 'Language', value: 'English' }
            ]}
          />
        </Grid>
        {/* <Grid item>
          <Typography
            color="inherit"
            variant="body2"
            style={{ cursor: 'pointer' }}>
            Remove
          </Typography>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default SeminarioOverview;
