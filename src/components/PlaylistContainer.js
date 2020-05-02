import React, { Component } from "react";
import Playlist from "./Playlist";

class PlaylistContainer extends Component {
    render() {
        return (
            <div>
                Hello from PlaylistContainer
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
            </div>
        );
    }
}

export default PlaylistContainer;
