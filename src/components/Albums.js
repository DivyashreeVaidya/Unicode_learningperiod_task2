import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Albums.css';
//import {getTokenFromUrl} from './Homepage'
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

function Albums() {
  //const _token = getTokenFromUrl();
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [albumData, setAlbumData] = useState();
  const classes = useStyles();
  const albumEndpointUrl = 'https://api.spotify.com/v1/me/albums';
  const matches = useMediaQuery('(max-width:600px)');

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
      console.log(response)
      setAlbumData(response)
      console.log(albumData)
    })
    .catch(error=> {
      console.log(error); 
      console.log(`token is :${token}`)});
  };

  useEffect(() => {
    fetchAlbumDataHandler();
  }, []);

  return (
    <div className="album_content">
      <h1>Albums</h1>
      <Grid container direction='row' justify='center' alignItems='center' spacing = {6}>
    {albumData? (
        <div>
        {albumData.data.items.map(item => {
          return (
            
              <div className="album_content--element">
            <Grid item sm={8}>
            <ThemeProvider theme={darkTheme}>
              <a href={item.album.external_urls.spotify} target="_blank" style={{textDecoration:'none', color:'white'}}>
              <Paper className= {classes.paper} elevation={15} style={{backgroundColor:'black', color:'white'}}>
              <Card  className={classes.root} style={{backgroundColor:'black', color:'white'}}>
               <CardActionArea>
               <img className="coverImage" src={item.album.images[1].url} style={{borderRadius:'5px', padding:'5px'}}/>
                <CardContent>
                <Typography variant="h6"  style={{ cursor: 'pointer' }}>
                 {item.album.name}
                </Typography>
                <Typography variant="subtitle2"  color='textSecondary'>
                 {item.album.label}
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
    ):<CircularProgress color="white"/>
    }
    </Grid>
    </div>
  );
}

export default Albums;