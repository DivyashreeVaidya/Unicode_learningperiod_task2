export const getTokenFromUrl = ()=>{
    let string = window.location.hash;
    let _and = string.indexOf('&');
    let access_token=string.substring(14,_and);
    sessionStorage.setItem('token', access_token);
    return access_token;
  }