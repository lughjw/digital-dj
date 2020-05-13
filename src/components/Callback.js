import React, { Component } from 'react';
import Spotify from "../Spotify";

Spotify.collectAccessToken();

class Callback extends Component {
    
    render() {
        return <div></div>
        // return <div>{console.log(this.props)}</div>
    }
}

export default Callback;