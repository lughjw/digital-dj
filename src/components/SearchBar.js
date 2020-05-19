import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSumbit = event => {
    event.preventDefault();
    fetch("http://localhost:4000/search?" + new URLSearchParams("q="+this.state.searchText))
    .then(r => r.json())
    .then(res => console.log(res))
    event.target.reset();
    this.setState({searchText: ""});
  }
  
  
  render() {
    return <div className="searchBar">
      <form onSubmit={this.handleSumbit} >
        <input onChange={this.handleChange} name="searchText" type="text" />
        <input type="submit" value="Search"/>
      </form>
    </div>
  }
}

export default SearchBar;