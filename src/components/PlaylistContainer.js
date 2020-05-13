import React, { Component } from "react";
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import NewPlaylist from "./NewPlaylist";

class PlaylistContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            selectedPlaylist: null,
        };
    }

    handleDeletePlaylistTrack = (playlistId, trackId) => {
        console.log(`playlistId: ${playlistId}, trackId: ${trackId}`);
        // if (
        //     this.state.selectedPlaylist &&
        //     playlistId === this.state.selectedPlaylist.id
        // ) {
        //     this.setState({
        //         selectedPlaylist: null,
        //         playlists: this.state.playlists.filter(
        //             (playlist) => playlistId !== playlist.id
        //         ),
        //     });
        // } else {
        //     this.setState({
        //         playlists: this.state.playlists.filter(
        //             (playlist) => playlistId !== playlist.id
        //         ),
        //     });
        // }

        // fetch(`http://localhost:4000/playlists/${playlistId}/tracks/${}`, {
        //     method: "delete",
        //     headers: {}
        // })
        // .then(resp => console.log(resp))
    };

    handleCreatePlaylist = event => {
        // console.log(event.target.playlistName.value)
        event.preventDefault();
        // push to server
        fetch("http://localhost:4000/playlists", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: event.target.playlistName.value
            })
        })
        .then(r => r.json())
        .then(resp => console.log(resp))
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
                        handleDeletePlaylistTrack={
                            this.handleDeletePlaylistTrack
                        }
                    />
                ) : (
                    <div>
                        <form onSubmit={this.handleCreatePlaylist}>
                            <input name='playlistName' type="text" />
                            <input type="submit" value="Create Playlist" />
                        </form>
                        {this.state.playlists.map((playlist) => (
                            <div
                                key={playlist.id}
                                onClick={() =>
                                    this.setState({
                                        selectedPlaylist: playlist,
                                    })
                                }
                            >
                                {playlist.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default PlaylistContainer;
