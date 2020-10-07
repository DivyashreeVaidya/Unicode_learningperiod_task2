import React, { useEffect, useState }from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Tracks from './components/Tracks';
import Albums from './components/Albums';
import Playlists from './components/Playlists';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {getTokenFromUrl} from './spotify';
import axios from 'axios';
function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  //const [artistData, setArtistData] = useState([]);
  //let artists;
  /*const getToken = () =>
  {
    return window.location.hash
    .substring(1)
    .split('&') 
    .reduce((initial,item) => {
      var parts = item.split('='); 
      initial[parts[0]] = 
      decodeURIComponent(parts[1]);
       
      return initial;
    },{});
  }*/

  useEffect(() => {
    /*const hash = getToken();
    window.location.hash = ""; 
    const _token = hash.access_token; 
     

    if(_token) {
      setToken(_token)
      sessionStorage.setItem('token', token);
    }
    console.log("I have a token:", token); 
  },*/ 
  const _token = getTokenFromUrl()

  if(_token){
    setToken(_token);
    console.log(_token);
  }

  /*axios({
    method:"GET",
    url:"https://api.spotify.com/v1/me/following?type=artist",
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + `${token}`
    }
  })
  .then((response)=>{
    console.log(response.data.artists.items);
    setArtistData(response.data.artists.items);
    artists = response.data.artists.items;
    console.log(artistData);
  })
  .catch(error=>{
    console.log(error);
    console.log("tokennn "+ token);
  })*/
},[]);


  return (
    <div className="App">
    {  token ? (<div className="homepage">
      <Router>
        <Navbar/>
        <Switch>
        <Route exact path="/home" component={Homepage}/>
        <Route path="/tracks" component={Tracks}/>
        <Route path="/albums" component={Albums}/>
        <Route path="/playlists" component={Playlists}/>
        </Switch>
      </Router>
      </div>) :
      (<div className="container">
      <Login/>
      </div>) }
    </div>
  );
}

export default App;
