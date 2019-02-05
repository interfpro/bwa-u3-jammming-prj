const clientId = "0e0f0258b76b430c8483f76b569202f3"; //APP clientID
const redirectUri = "http://localhost:3000/";
const autUrl = "https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=";
const reqUrl = "https://api.spotify.com/v1/search?type=track&limit=13&q=";
const playlistUrl = "https://api.spotify.com/v1/users/";
const tracksUrl = "https://api.spotify.com/v1/playlists/"
const userUrl = "https://api.spotify.com/v1/me"; //get userID URL
let token = "";
const exp_time = 60;

export const Jammmming = {
  //-------Authorizing--------
  getAuthorize() {
    if(token){
      return true;
    } else if(!(window.location.href.indexOf("access_token") > -1)) { //First login
      window.location = autUrl+clientId+"&redirect_uri="+redirectUri;
      return false;
    } else {
      token = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1]; //Get token
      window.setTimeout(() => token = '', exp_time * 1000);
      window.history.pushState('Access Token', null, '/');
      return true;
    }
  },

  //-----GET tracks from API----------
  search(term) {
    if(this.getAuthorize()) {
      return fetch(reqUrl+term, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if(jsonResponse.tracks){
          return jsonResponse.tracks.items.map(item => {
            return {
              id: item.id,
              album: item.album.name,
              artist: item.artists[0].name,
              track: item.name,
              uri: item.uri
            };
          })
        }
      })
    }
  },

  //-----GET userID from API----------
  getUser(name, tracks) {
    if(this.getAuthorize()) {
      return fetch(userUrl, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return {
          id: jsonResponse.id,
          name: name,
          tracks: tracks
        };
      }).then(this.postPlaylistName).then(this.postPlaylistTracks);
    }
  },

  //-----POST Playlist name to API----------
  postPlaylistName(ob) {
    const data = JSON.stringify({name: ob.name});
    return fetch(playlistUrl+ob.id+"/playlists", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
  	    "Authorization": `Bearer ${token}`
      },
      body: data
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      return {
        id: jsonResponse.id,
        tracks: ob.tracks.map(item => item.uri)
      };
    });
  },

  //-----POST tracks to playlist----------
  postPlaylistTracks(ob) {
    const data = JSON.stringify({uris: ob.tracks});
    //console.log(ob.tracks);
    fetch(tracksUrl+ob.id+"/tracks?", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: data
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      return jsonResponse;
    })
  }
}
