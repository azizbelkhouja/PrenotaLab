// @ts-nocheck
import { createTheme } from '@mui/material/styles';
// import palette from './palette';
import paletteDark from './paletteDark';
import typography from './typography';

// read more at https://material-ui.com/customization/themes
const theme = createTheme({
  palette: paletteDark,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  topBar: {
    height: '56px'
  }
});

export default theme;
