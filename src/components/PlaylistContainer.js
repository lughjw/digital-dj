import React, { Component } from "react";
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import NewPlaylist from "./NewPlaylist";
import API from "../API";

class PlaylistContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPlaylistName: "",
            playlists: [],
            selectedPlaylist: null,
        };
    }

    handleCreatePlaylist = (event) => {
        // console.log(event.target.playlistName.value)
        event.preventDefault();
        // push to server
        fetch("http://localhost:4000/playlists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: this.state.newPlaylistName,
            }),
        })
        .then((r) => r.json())
        .then((newPlaylist) =>
            this.setState({
                newPlaylistName: "",
                playlists: [newPlaylist, ...this.state.playlists],
            })
        );
            
        event.target.reset();
    };

    handleDeletePlaylist = playlistId => {
        // API.deletePlaylist()
        fetch(`http://localhost:4000/playlists/${playlistId}`, {
            method: "DELETE"
        })
        .then((resp) => {
            console.log(resp)
            this.setState({
                playlists: this.state.playlists.filter(playlist => playlist.id !== playlistId),
                selectedPlaylist: this.state.selectedPlaylist && 
                    (this.state.selectedPlaylist.id === playlistId) ? 
                    null : 
                    this.state.selectedPlaylist,
            })
        })
    }

    componentDidMount() {
        fetch("http://localhost:4000/playlists")
            .then((resp) => resp.json())
            .then((playlists) =>
                this.setState({ playlists: playlists["items"] })
            );

        this.props.history.push("/playlists");
    }
    render() {
        return (
            <div>
                {this.state.selectedPlaylist ? (
                    <Playlist
                        {...this.props}
                        key={this.state.selectedPlaylist["id"]}
                        playlist={this.state.selectedPlaylist}
                        handleDeletePlaylist={this.handleDeletePlaylist}
                    />
                ) : (
                    <div>
                        <form onSubmit={this.handleCreatePlaylist}>
                            <input
                                onChange={(e) =>
                                    this.setState({
                                        newPlaylistName: e.target.value,
                                    })
                                }
                                name="playlistName"
                                type="text"
                            />
                            <input type="submit" value="Create Playlist" />
                        </form>
                        {this.state.playlists.map((playlist) => (
                            <div className="playlistBrief" key={playlist.id}>
                                <div
                                    onClick={() =>
                                        this.setState({
                                            selectedPlaylist: playlist,
                                        })
                                    }
                                >
                                    {playlist.name}
                                </div>
                                <button onClick={() => this.handleDeletePlaylist(playlist.id)}>Delete Playlist</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default PlaylistContainer;
