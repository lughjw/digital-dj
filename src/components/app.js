import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Login from "./auth/Login";
import Spotify from "../Spotify";
import PlaylistContainer from "./PlaylistContainer";
import Player from "./Player";
import Callback from "./Callback"

// Collects the token when returning back from the spotify auth.

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
        };
    }

    checkLoginStatus = () => {
        axios
            .get("http://localhost:4000/logged_in", { withCredentials: true })
            .then((response) => {
                if (
                    response.data.logged_in &&
                    this.state.loggedInStatus === "NOT_LOGGED_IN"
                ) {
                    this.setState({
                        loggedInStatus: "LOGGED_IN",
                        user: response.data.user,
                    });
                } else if (
                    !response.data.logged_in &&
                    this.state.loggedInStatus === "LOGGED_IN"
                ) {
                    this.setState({
                        loggedInStatus: "NOT_LOGGED_IN",
                        user: {},
                    });
                }
            })
            .catch((error) => {
                console.log("check login error", error);
            });
    };

    componentDidMount() {
        this.checkLoginStatus();
        // Set spotify token
        let _token = Spotify.userAccessToken.access_token;
        console.log("token: ", Spotify.userAccessToken);
        if (_token) {
            this.setState({
                token: _token,
            });
        }
    }

    handleLogin = (data) => {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user,
        });
    };

    handleLogout = () => {
        axios
            .delete("http://localhost:4000/logout", { withCredentials: true })
            .then((response) => {
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {},
                });
            })
            .catch((error) => {
                console.log("logout error", error);
            });
    };

    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <NavBar
                        handleLogout={this.handleLogout}
                        loggedInStatus={this.state.loggedInStatus}
                    />
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={(props) => (
                                <Home
                                    {...props}
                                    user={this.state.user}
                                    loggedInStatus={this.state.loggedInStatus}
                                    handleLogin={this.handleLogin}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/login"}
                            render={(props) => (
                                <Login
                                    {...props}
                                    handleLogin={this.handleLogin}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/dashboard"}
                            render={(props) => (
                                <Dashboard
                                    {...props}
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={"/playlists"}
                            render={(props) => <PlaylistContainer {...props} />}
                        />
                        <Route
                            path={"/callback"}
                            render={(props) => <Callback {...props} />}
                        />
                    </Switch>
                </BrowserRouter>
                <Player />
            </div>
        );
    }
}
