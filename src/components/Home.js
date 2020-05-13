import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";
import logo from "./logo.svg";
import Spotify from "../Spotify";
import API from "../API"
// import Cookies from "js-cookie"
import cookie from 'react-cookies'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _token: "",
        };
    }

    handleSuccessfulAuth = (data, accessToken) => {
        // console.log("setting cookie")
        // document.cookie = `access_token=${accessToken}`;
        // console.log("set cookie ",document.cookie)
        // Cookies.set('access_token', accessToken)
        console.log("session_id cookie", cookie.loadAll())
        this.props.handleLogin(data);
    };

    componentDidMount() {
        // Get spotify token if it's available
        let accessToken = new URL(window.location.href).searchParams.get(
            "access_token"
        );
        // console.log("cookies ", document.cookie)
        console.log("accessToken", accessToken)
        if (accessToken !== null) {
            this.setState({ spotifyToken: accessToken });
            // this.props.history.replace("/");
            API.createSession(accessToken)
            .then(r => r.json())
            .then((r) => {
                console.log("response from create session", r)
                if (r.logged_in) {
                    this.handleSuccessfulAuth(r,accessToken)
                }
            });
        }
    }

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
                    <h3>Sign in with Spotify...</h3>
                    <header className="App-header">
                        <img
                            src={logo}
                            width="80%"
                            className="App-logo"
                            alt="logo"
                            onClick={this.handleLogin}
                        />
                    </header>
                </div>
            );
        }
    }
}

export default Home;
