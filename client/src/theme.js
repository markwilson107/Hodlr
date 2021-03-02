import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  
  palette: {
    primary: { 500: '#ffce49', yellow: '#ffce49', dark: '#ffd769' }
  },
  background: {
    main: '#f9f9f9',
    dark: '#efefef'
  },
  text: {
    primary: { 500: '00000' }
  }
});
theme.shadows = [];
export default theme;