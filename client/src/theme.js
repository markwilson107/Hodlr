import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { 500: '#ffce49' , dark: '#ffd769' },
  },
})
theme.shadows = [];
export default theme