import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../images/logo.png"

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#D3D3D3',
    borderRadius: theme.shape.borderRadius,
    height: 60,
    boxShadow: 'none', 
  },
  brandLogo: {
    height: 40,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    boxShadow: 'none',
  },
  button: {
    marginLeft: 'auto',
  },
}));

function Navbar() {
  const classes = useStyles();
  
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <img src={logo} alt="Brand Logo" className={classes.brandLogo} />
        <Button 
          variant="contained" 
          style={{
            backgroundColor:"#1B97F5",
            color:"white"
          }}
          className={classes.button} 
          href="http://localhost:3001/"
        >
          Go to billing form
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
