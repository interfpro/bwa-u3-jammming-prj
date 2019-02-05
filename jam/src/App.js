import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import ResultsList from './components/ResultsList/ResultsList.js';
import Playlist from './components/Playlist/Playlist.js';
import {Jammmming} from './util/Jammmming.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: [],
      playlistTracks: [],
    }
    this.showTracks = this.showTracks.bind(this);
    this.handleTrack = this.handleTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  //-------GET tracks from API and lay them out------------
  showTracks = (term) => {
    Jammmming.search(term).then(tracks => {
      this.setState({tracks: tracks});
    })
  }

  //-------Add track to playlist------------
  addTrack = id => {
    if(!(this.state.playlistTracks.some(element => {
      return id == element.id;
    }))) {
      const ident = this.state.tracks.findIndex(element => {
        return id == element.id;
      });
      const temptracks = this.state.playlistTracks;
      temptracks.push(this.state.tracks[ident]);
      this.setState({playlistTracks: temptracks});
    }
  }

  //-------Delete track from playlist------------
  deleteTrack = id => {
    const ident = this.state.playlistTracks.findIndex(element => {
      return id == element.id;
    });
    const temptracks = this.state.playlistTracks;
    temptracks.splice(ident, 1);
    this.setState({playlistTracks: temptracks});
  }

  //------Adding track or deleting track---------
  handleTrack = (id, key) => {
    if(key=="+"){
      this.addTrack(id);
    } else {
      this.deleteTrack(id);
    }
  }

  //---------Save playlist to API----------------
  savePlaylist = name => {
    Jammmming.getUser(name, this.state.playlistTracks);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar showTracks={this.showTracks}/>
          <div className="App-playlist">
            <ResultsList tracks={this.state.tracks} handleTrack={this.handleTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} handleTrack={this.handleTrack} savePlaylist={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
