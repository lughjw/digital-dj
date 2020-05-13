import React, { Component } from "react";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistTracksObj: null,
        };
    }

    /*
    playlistTracksObj = {

    }
    */

    handleDeleteTrack = trackId => {
        console.log(`playlistId: ${this.props.playlist.id}, trackId: ${trackId}`);

        let playlistTracksObj = this.state.playlistTracksObj;
        
        playlistTracksObj.items = this.state.playlistTracksObj.items.filter(trackObj => trackObj.track.id !== trackId);

        this.setState({ playlistTracksObj })

        fetch(`http://localhost:4000/playlists/${this.props.playlist.id}/tracks/${trackId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => console.log(resp))
    };

    componentDidMount() {
        fetch(
            `http://localhost:4000/playlists/${this.props.playlist.id}/tracks`
        )
            .then((r) => r.json())
            .then((playlistTracksObj) => {
                // console.log(playlistTracksObj);
                this.setState({ playlistTracksObj });
            });

        this.props.history.push(`/playlists/${this.props.playlist.id}`);
    }

    render() {
        console.log(this.props.playlist);
        return (
            <div>
                <h2>
                    {this.props.playlist.name}
                </h2>

                {this.state.playlistTracksObj ? (
                    <ul>
                        {this.state.playlistTracksObj.items.map((trackObj) => (
                            <li key={trackObj.track.id}>
                                {trackObj.track.name}<button onClick={() => this.handleDeleteTrack(trackObj.track.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>LOADING SONGS...</div>
                )}
            </div>
        );
    }
}

export default Playlist;
