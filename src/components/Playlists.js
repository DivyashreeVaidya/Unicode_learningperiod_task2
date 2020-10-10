import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Playlists.css';
//import {getTokenFromUrl} from './Homepage'
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const useStyles = makeStyles((darkTheme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: darkTheme.palette.background.paper,
    margin: "auto"
  },
  paper: {
    padding: darkTheme.spacing(3),
    textAlign: 'center',
    color: darkTheme.palette.text.paper,
  },
}));

function Playlists() {
   //const _token = getTokenFromUrl();
  //console.log(_token);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  //console.log("token is " + token);
  const [playlistsData, setPlayListsData] = useState();
  const classes = useStyles();
  const playlistEndpointUrl = 'https://api.spotify.com/v1/me/playlists';
  const fetchplaylistDataHandler = async () => {
    return axios(playlistEndpointUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`,
      }
    })
    .then((response)=>{
      console.log(response)
      setPlayListsData(response)
    })
    .catch(error=>
      console.log(error));
  };

  useEffect(() => {
    fetchplaylistDataHandler();
  }, []);
  return (
    <div className="playlists_content">
      <h1>Playlists</h1>
      <Grid container direction='row' justify='center' alignItems='center' spacing = {6}>
    {playlistsData? (
        <div>
        {playlistsData.data.items.map(item => {
          return (
            <div className="playlists_content--element">
            <Grid item sm = {8}>
              <ThemeProvider theme={darkTheme}>
              <a href={item.external_urls.spotify} target="_blank" style={{textDecoration:'none', color:'white'}}>
              <Paper className= {classes.paper} elevation={15} style={{backgroundColor:'black', color:'white'}}>
              <Card  className={classes.root} style={{backgroundColor:'black', color:'white'}}>
               <CardActionArea>
               <img className="coverImage" src={item.images[0].url} style={{borderRadius:'5px', padding:'5px', height:300, width:300}}/>
                <CardContent>
                <Typography variant="h6"  style={{ cursor: 'pointer' }}>
                 {item.name}
                </Typography>
                <Typography variant="subtitle2"  color='textSecondary'>
                 {`${item.tracks.total} Tracks`}
                </Typography>
              </CardContent>
               </CardActionArea>
              </Card>
              </Paper>
              </a>
              </ThemeProvider>
            </Grid>
            <Grid container direction='row' justify='center' alignItems='center' spacing={6}>
            <Grid item xs='auto' sm = {8}/>
            <Grid item xs='auto' sm = {8}/>
            </Grid>
            </div>
           
          )
          })}
      </div>
    ):<CircularProgress color="white"/>}
    </Grid>
    </div>
  );
}

export default Playlists;