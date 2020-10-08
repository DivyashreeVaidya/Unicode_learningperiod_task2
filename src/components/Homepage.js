import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Homepage.css';
import { CircularProgress, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar} from '@material-ui/core';
import { fade, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
    justify: 'space-between',
    alignItems: 'center',
    verticalAlign:'middle',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    verticalAlign: "middle"
  },
}));
/*export const getTokenFromUrl = ()=> {
  let string = window.location.hash;
  let _and = string.indexOf('&');
  let access_token=string.substring(14,_and);
  sessionStorage.setItem('token', access_token);
  return access_token;
}*/

function Homepage () {
  const _token = window.location.hash;
  //console.log(_token);

  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [userData, setUserData] = useState();
  //console.log(userData);
  //console.log("token is " + token);
  const [artistData, setArtistData] = useState([]);
  let artists;  
  const classes = useStyles();
  const userEndpointUrl = 'https://api.spotify.com/v1/me';
  const artistEndpointUrl = 'https://api.spotify.com/v1/me/following?type=artist';
  
  const getTokenFromUrl = ()=> {
      //setToken(_token);
        console.log(token);
        var res = _token.split("&");
        //console.log(res[0]);
        res = res[0] + '=';
        res = res.split("=");
        console.log(res[1]);
        setToken(res[1]);
        sessionStorage.setItem('token', token);
        console.log(token);
        window.location.hash = "";
  };
  
  
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
          setUserData(response)
          //console.log(userData)
        })
        .catch(error=>
          console.log(""));
        
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
        //console.log(response.data.artists.items);
        setArtistData(response.data.artists.items);
        artists = response.data.artists.items;
        //console.log(artistData);
      })
      .catch(error=>{
        console.log(error);
        //console.log('this is the token1:'+ token);
      });
      
    };
    useEffect(() => {
      getTokenFromUrl();
      //const _token = getTokenFromUrl();
      /*if(_token){
        setToken(_token);
        console.log( `_token is ${_token}`);
        console.log(`token for homepage is ${token}`);
         }
         fetchUserDataHandler();
         fetchArtistDataHandler();*/
         
  }, [_token]);

   if(token){
    fetchUserDataHandler();
    fetchArtistDataHandler();
    //console.log('this is the token2:'+ token);
  }
  return (<div>
    { userData? (<div className="home_content">
    <h1>Welcome back, {userData.data.display_name}!</h1>
    <br/>
    <Avatar alt={userData.data.display_name} src={userData.data.images[0].url} className={classes.large} style={{margin: "auto"}}/>
    <h2>Followers: {userData.data.followers.total}</h2>
    <h2>Following:</h2>
    <div className={classes.root} style={{justifyContent:"space-between"}}>
    
    <div>
          
          {artistData.map( item=>{
          return(
            <ThemeProvider theme={darkTheme}>
            <Paper elevation={3}>
            <List className={classes.root} style={{textDecoration:"none", color:"white", backgroundColor: "#424242"}}>
            <a href={item.external_urls.spotify} target="_blank" style={{textDecoration:"none", color:"white"}}>
            <ListItem alignItems="center" justify="space-between" className={classes.listItemLayout}>
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
                      style={{ cursor: 'pointer'}}
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
                    <Typography color='textSecondary'>{" FOLLOWERS"}</Typography>
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
  <CircularProgress color="black" style={{height:'100vh', margin:'auto'}} />
}</div>
);
}

export default Homepage;
