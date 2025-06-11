import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        Copyright @ 2025, Università di Ferrara
      </Typography>
      <Typography variant="caption">
       Università degli studi di Ferrara |{' '}
        <Link href="https://www.unife.it/it" target="_blank" rel="noopener">
          Unife
        </Link>
      </Typography>
    </div>
  );
}
