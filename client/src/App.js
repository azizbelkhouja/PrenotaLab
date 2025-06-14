// @ts-nocheck
import React, { Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
//Redux
import { Provider } from 'react-redux';
import theme from './theme';
import Routes from './Routes';
import './assets/scss/index.scss';
import 'typeface-montserrat';
import CssBaseline from '@mui/material/CssBaseline';

class App extends Component {
  
  render() {
    return (
      <Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
          <div className="cursor" id="cursor" />
          <div className="cursor2" id="cursor2" />
          <div className="cursor3" id="cursor3" />
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
