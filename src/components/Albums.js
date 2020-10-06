import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Homepage.css';
import {getTokenFromUrl} from './spotify'
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Albums() {
  const _token = getTokenFromUrl();
  //console.log(_token);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  //console.log("token is " + token);
  const [albumData, setAlbumData] = useState([]);
  let albums;
  const classes = useStyles();
  const albumEndpointUrl = 'https://api.spotify.com/v1/me/albums';
  
  const fetchAlbumDataHandler = async () => {
    return axios(albumEndpointUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      //console.log(response)
      setAlbumData(response)
      //console.log(userData)
    })
    .catch(error=>
      console.log(error)); 
  };

  useEffect(() => {
    fetchAlbumDataHandler();
  }, []);





























  return (
    <div className="album_content">
      <h1>Albumssss</h1>
    </div>
  );
}

export default Albums;