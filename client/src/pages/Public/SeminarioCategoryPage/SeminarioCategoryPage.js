import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ResponsiveMovieCard from '../components/ResponsiveMovieCard/ResponsiveMovieCard';
import { getSeminari } from '../../../store/actions';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
}));

function SeminarioCategoryPage(props) {
  const { seminari, getSeminari } = props;
  const category = props.match.params.category;
  useEffect(() => {
    if (!seminari.length) {
      getSeminari();
    }
  }, [seminari, getSeminari]);

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      {!['nowShowing', 'comingSoon'].includes(category) ? (
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Categoria non esistente.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              {category}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="column"
            alignItems="center"
            justify="center"
            spacing={2}>
            {seminari.map(seminario => (
              <Grid key={seminario._id} item className={classes.fullWidth}>
                <ResponsiveMovieCard seminario={seminario} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = ({ seminarioState }, ownProps) => ({
  seminari: seminarioState[ownProps.match.params.category] || []
});

const mapDispatchToProps = { getSeminari };

export default connect(mapStateToProps, mapDispatchToProps)(SeminarioCategoryPage);
