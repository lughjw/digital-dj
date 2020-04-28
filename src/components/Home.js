import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

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
                </div>
            );
        }
    }
}

export default Home;
