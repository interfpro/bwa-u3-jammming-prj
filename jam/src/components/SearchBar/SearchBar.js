import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //-----------Changing the searching term------------------
  handleTermChange = event => {
    this.setState({term: event.target.value});
  }

  //-------GET tracks from API and lay them out------------
  handleSearch = (event) => {
    this.props.showTracks(this.state.term);
  }

  render() {
      return (
        <div className="SearchBar">
          <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
          <a onClick={this.handleSearch}>SEARCH</a>
        </div>
      )
    }
  }

  export default SearchBar;
