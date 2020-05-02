import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";
import logo from "./logo.svg";
import Spotify from "../Spotify";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _token: "",
        };
    }

    handleSpotifyAuth = (event) => {
        //event.preventDefault();
        // let myWindow = window.open(Spotify.authorizeLink);
        // console.log(myWindow,"name")
        // Spotify.authorize().then((resp) => this.setState({ _token: resp }));
    };

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
    };

    render() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            return (
                <div>
                    <h1>Welcome to Your Digital DJ</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Welcome to Your Digital DJ</h1>
                    {/* <h1> Status: {this.props.loggedInStatus}</h1> */}
                    <Registration
                        {...this.props}
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                    />
                    OR Sign in with Spotify...
                    <header className="App-header">
                        <a href={Spotify.authorizeLink}>
                            <img
                                src={logo}
                                width="80%"
                                className="App-logo"
                                alt="logo"
                            />
                        </a>
                    </header>
                </div>
            );
        }
    }
}

export default Home;
