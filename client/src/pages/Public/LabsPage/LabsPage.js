import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getLabs } from '../../../store/actions';
import CinemaCard from '../components/CinemaCard/CinemaCard';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function LabsPage(props) {
  const classes = useStyles(props);
  const { labs, getLabs } = props;
  useEffect(() => {
    if (!labs.length) getLabs();
  }, [labs, getLabs]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            I nostri Labs
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="flex-start"
          spacing={2}>
          {labs.map(lab => (
            <Grid key={lab._id} item xs={12} md={4} lg={3}>
              <LabCard lab={lab} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ labState }) => ({
  labs: labState.labs
});

const mapDispatchToProps = { getLabs };

export default connect(mapStateToProps, mapDispatchToProps)(LabsPage);
