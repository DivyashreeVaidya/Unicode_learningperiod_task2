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
