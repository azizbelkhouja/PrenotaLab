import React from 'react';
import classNames from 'classnames';
import { Paper } from '../../../../components';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import AttachMoney from '@mui/icons-material/AttachMoney';
import EventSeat from '@mui/icons-material/EventSeat';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  city: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function LabCard(props) {
  const classes = useStyles(props);
  const { className, lab } = props;
  const labImage =
    lab && lab.image
      ? lab.image
      : 'https://source.unsplash.com/featured/?lab';

  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img alt="lab" className={classes.image} src={labImage} />
      </div>
      <div className={classes.details}>
        <Typography className={classes.name} variant="h4">
          {lab.name}
        </Typography>
        <Typography className={classes.city} variant="body1">
          {lab.city}
        </Typography>
      </div>
      <div className={classes.stats}>
        <AttachMoney className={classes.eventIcon} />
        <Typography className={classes.eventText} variant="body2">
          {lab.ticketPrice} <span>&euro;</span> €
        </Typography>
      </div>
      <div className={classes.stats}>
        <EventSeat className={classes.eventIcon} />
        <Typography className={classes.eventText} variant="body2">
          {lab.seatsAvailable} posti disponibili
        </Typography>
      </div>
    </Paper>
  );
}

export default LabCard;
