import React from 'react';
import './Playlist.css';
import Result from '../../components/Result/Result.js';
const sign = '-';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playlistName: "New Playlist"
    }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //----------Change playlist name------------------
  handleNameChange = event => {
    this.setState({playlistName: event.target.value});
  }

  //----------Save playlist to API-------------------
  handlePlaylist = () => {
    this.props.savePlaylist(this.state.playlistName);
  }

  render() {
      return (
        <div className="Playlist">
          <div>
            <input onChange={this.handleNameChange} value={this.state.playlistName}/>
            {this.props.playlistTracks.map(track => {
              return <Result track={track} handleTrack={this.props.handleTrack} sign={sign} key={track.id}/>
            })}
          </div>
          <a className="Playlist-save" onClick={this.handlePlaylist}>SAVE TO SPOTIFY</a>
        </div>
      )
    }
  }

  export default Playlist;
