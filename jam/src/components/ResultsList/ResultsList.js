import React from 'react';
import './ResultsList.css';
import Result from '../../components/Result/Result.js';
const sign = '+';

class ResultsList extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {this.props.tracks.map(track => {
          return <Result track={track} handleTrack={this.props.handleTrack} sign={sign} key={track.id}/>
        })}
      </div>
      )
    }
  }

export default ResultsList;
