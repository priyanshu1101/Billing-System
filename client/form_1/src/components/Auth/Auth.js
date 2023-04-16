import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '../Table/Table';
import bcrypt from 'bcryptjs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f1f1f1',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%',
    },
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const withAuthentication = (WrappedComponent) => {
  const defaultPassword = '$2a$12$ZXxirl4a2c6c4jUVoT0MDeDdLXLy1OL3LzNM9frIebe0pUKjdzMjG';
  const WithAuthentication = (props) => {
    const classes = useStyles();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleAuthentication = async (e) => {
      e.preventDefault();
      const isPasswordCorrect = await bcrypt.compare(password, defaultPassword);
      if (isPasswordCorrect) {
        setIsAuthenticated(true);
      } else {
        setPassword('');
        alert('Incorrect password. Please try again.');
      }
    };

    if (!isAuthenticated) {
      return (
        <div className={classes.root}>
          <h2>Table Authentication</h2>
          <p>Password hint: admin123</p>
          <form className={classes.form} onSubmit={handleAuthentication}>
            <TextField
              className={classes.input}
              type="password"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Authenticate
            </Button>
          </form>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default withAuthentication(Table);
