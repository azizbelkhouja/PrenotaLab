import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import palette from '../../../../../theme/palette';
import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const BestSeminari = props => {
  const { className, bestSeminari } = props;
  const classes = useStyles();

  const data = {
    labels: bestSeminari.map(movie => movie.movie.title.toUpperCase()),
    datasets: [
      {
        label: 'This year',
        backgroundColor: palette.primary.main,
        data: bestSeminari.map(movie => movie.count)
      },
      {
        label: 'Last year',
        backgroundColor: palette.neutral,
        data: [11, 20, 12, 29, 30]
      }
    ]
  };

  return (
    <Card className={classnames(classes.root, className)}>
      <CardHeader
        action={
          <Button size="small" variant="text">
            Top 5 <ArrowDropDownIcon />
          </Button>
        }
        title="Best Seminari"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Panoramica <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

BestSeminari.propTypes = {
  className: PropTypes.string
};

export default BestSeminari;
