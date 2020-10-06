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
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    margin: "auto"
  },
  inline: {
    display: 'inline',
  },
  listItemLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign:'middle'
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    verticalAlign: "middle"
  },
}));


function Homepage () {
  const _token = getTokenFromUrl();
  //console.log(_token);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  //console.log(userData);
  //console.log("token is " + token);
  const [artistData, setArtistData] = useState([]);
  let artists;
  const classes = useStyles();
  const userEndpointUrl = 'https://api.spotify.com/v1/me';
  const artistEndpointUrl = 'https://api.spotify.com/v1/me/following?type=artist';
  const fetchUserDataHandler = async () => {
        return axios(userEndpointUrl,{
          method:'GET',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`,
          }
        })
        .then((response)=>{
          //console.log(response)
          setUserData(response.data)
          //console.log(userData)
        })
        .catch(error=>
          console.log(error));
        
      };
      const fetchArtistDataHandler = async () => {
      /*if(_token){
        setToken(_token);
        //console.log(_token);
      }*/
    
      return axios(artistEndpointUrl,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + `${token}`,
        },
      })
      .then((response)=>{
        console.log(response.data.artists.items);
        setArtistData(response.data.artists.items);
        artists = response.data.artists.items;
        console.log(artistData);
      })
      .catch(error=>{
        console.log(error);
        console.log('this is the token1:'+ token);
      });
      
    };
    useEffect(() => {
      getTokenFromUrl();
  }, []);
  if(token){
    fetchUserDataHandler();
    fetchArtistDataHandler();
    console.log('this is the token2:'+ token);
  }
  return (<div>
    { userData? (<div className="home_content">
    <h1>Welcome back, {userData.display_name}!</h1>
    <br/>
    <Avatar alt={userData.display_name} src={userData.url} className={classes.large} style={{margin: "auto"}}/>
    <h2>Followers: {userData.total}</h2>
    <h2>Following:</h2>
    <div className={classes.root} style={{justifyContent:"space-between"}}>
    
    <div>
          
          {artistData.map( item=>{
          return(
            <ThemeProvider theme={darkTheme}>
            <Paper elevation={3}>
            <List className={classes.root} style={{textDecoration:"none", color:"white", backgroundColor: "#424242"}}>
            <a href={item.external_urls.spotify} target="_blank" style={{textDecoration:"none", color:"white"}}>
            <ListItem alignItems="center" justifyContent="space-between" className={classes.listItemLayout}>
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.images[1].url} className={classes.large}/>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      variant="h5"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.name}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.followers.total}
                    </Typography>
                    {" FOLLOWERS"}
                  </React.Fragment>
                }
              />
            </ListItem></a>
            <Divider variant="inset" component="li" />
          </List>
          </Paper>
          </ThemeProvider>
         )})}
    </div>
 
  </div>
  </div>):
  <CircularProgress color="secondary" />
}</div>
);
}

export default Homepage;
