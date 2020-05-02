import React, { Component } from "react";

class Player extends Component {
    render() {
        return (
            <div>
                <button onClick={event => alert("Playing")}>Play</button>
            </div>
        );
    }
}

export default Player;
