import './LinkShortener.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import isURL from 'validator/lib/isURL';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShortLink } from '../asyncActions/shortLink';

function LinkShortener() {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const links = useSelector((state) => state.shortLinks.links);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitAsync = () => {
    setShowError(false);
    if (isURL(name)) {
      dispatch(fetchShortLink(name));
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    let timeout;
    if (showError === true) {
      timeout = setTimeout(() => setShowError(false), 3500);
    }

    return () => clearTimeout(timeout);
  }, [showError]);

  useEffect(() => {
    setName('');
  }, [links]);

  return (
    <div className='container'>
      <h1>URL Shortener</h1>
      <TextField
        id='standard-basic'
        label='Shorten your link'
        variant='standard'
        value={name}
        sx={{ display: 'block', margin: '2rem 0 1rem 0' }}
        error={showError}
        helperText={showError ? 'Incorrect URL.' : ''}
        fullWidth={true}
        onChange={handleChange}
      />

      <Button
        variant='contained'
        sx={{ marginBottom: '3rem' }}
        onClick={handleSubmitAsync}
      >
        Shorten
      </Button>

      {links.length > 0 && (
        <>
          <h3 className='subtitle'>Your links: </h3>
          <List sx={{ color: 'black' }}>
            {links.map((url, key) => (
              <ListItem key={`${url}-${key}`}>
                <ListItemText primary={url} sx={{ color: 'blue' }} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
}

export default LinkShortener;
