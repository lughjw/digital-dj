import React, { Component } from 'react';

class NewPlaylist extends Component {
    
    render() {
        return (<div>
            <h1>New Playlist</h1>
                <form>
                    <label>Playlist Name</label>
                    <input type="text"></input>
                    <input type="submit">Create Playlist</input>
                </form>
            </div>)
    }
}

export default NewPlaylist;