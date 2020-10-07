import React from 'react'
import Spotify_Logo_RGB_White from './Spotify_Logo_RGB_White.png';
import './Login.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  buttonColor: {
    backgroundColor: "#1db954",
    padding: "20px",
    color:"white",
    fontWeight: 900,
    textDecoration: "none",
    borderRadius: "99px",
    fontSize: "x-large",
  }
}));
function Login(){
  const clientId = "d18232005d664926b01d9eb1d85ce727";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "http://localhost:3000/home";
  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-library-read",
    "user-follow-read",
  ];

  const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  const classes = useStyles();
  
  
  
  return(<div>
      <div className="login">
  <img className="login_Logo" src={Spotify_Logo_RGB_White} alt="Logo"></img>
<Button variant="contained" className= {classes.buttonColor}><a href = {loginURL} className="login_link">Log In to Spotify</a></Button>
</div>
</div>
  )
}

export default Login;