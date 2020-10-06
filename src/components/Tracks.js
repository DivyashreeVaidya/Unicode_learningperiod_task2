import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Tracks.css';
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

function Tracks() {
  const _token = getTokenFromUrl();
  //console.log(_token);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  //console.log("token is " + token);
  const [tracksData, setTracksData] = useState([]);
  let tracks;
  const classes = useStyles();
  const trackEndpointUrl = 'https://api.spotify.com/v1/me/tracks';
  const fetchTrackDataHandler = async () => {
    return axios(trackEndpointUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      //console.log(response)
      setTracksData(response)
      //console.log(userData)
    })
    .catch(error=>
      console.log(error));
  };

  useEffect(() => {
    fetchTrackDataHandler();
  }, []);

  return (
          <div className="tracks_content">
          <h1>Trackssssssss</h1>
          </div>
             );
}

export default Tracks;