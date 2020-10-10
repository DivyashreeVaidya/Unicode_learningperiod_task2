import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './Tracks.css';
import { CircularProgress, Paper, Avatar, Typography, Grid, Card, CardContent, CardActionArea} from '@material-ui/core';
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

function Tracks() {
  //const _token = getTokenFromUrl();
  //console.log(_token);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  //console.log("token is " + token);
  const [tracksData, setTracksData] = useState();
  const classes = useStyles();
  const trackEndpointUrl = 'https://api.spotify.com/v1/me/tracks?offset=5&limit=10';
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
      console.log(response)
      setTracksData(response)
    })
    .catch(error=>
      console.log(error));
  };

  useEffect(() => {
    fetchTrackDataHandler();
  }, []);

  return (<div>
             <div className="tracks_content">
             <h1>Tracks</h1>
             <Grid container direction='row' justify='center' alignItems='center' spacing = {6}>
       {tracksData? (
           <div>
           {tracksData.data.items.map(item => {
             return (
              <div className="tracks_content--element">
               <Grid sm = {8}>
               <ThemeProvider theme={darkTheme}>
                 <a href={item.track.external_urls.spotify} target="_blank" style={{textDecoration:'none', color:'white'}}>
                 <Paper className= {classes.paper} elevation={15} style={{backgroundColor:'black', color:'white'}}>
                 <Card  className={classes.root} style={{backgroundColor:'black', color:'white'}}>
                  <CardActionArea>
                  <img className="coverImage" src={item.track.album.images[1].url} style={{borderRadius:'5px', padding:'5px'}}/>
                   <CardContent>
                   <Typography variant="h6"  style={{ cursor: 'pointer' }}>
                    {item.track.name}
                   </Typography>
                   <Typography variant="subtitle2"  color='textSecondary'>
                    {item.track.artists[0].name}<br/>
                    {item.track.album.name}
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
         </div>):<CircularProgress color="white"/>}
       </Grid>
       </div>
           
    </div>
          
             );
}

export default Tracks;