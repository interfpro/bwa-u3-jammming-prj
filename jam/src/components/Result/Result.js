import React from 'react';
import './Result.css';

class Result extends React.Component {
  constructor(props){
    super(props);
  }

  //---------Adding track or deleting track---------------
  handleClick = event => {
    if(this.props.sign=="+"){
      this.props.handleTrack(this.props.track.id, "+");
    } else {
      this.props.handleTrack(this.props.track.id, "-");
    }
  }

  render() {
      return (
        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.track}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <div>
            <a className="Track-action" onClick={this.handleClick}>{this.props.sign}</a>
          </div>
        </div>
      )
    }
  }

export default Result;
