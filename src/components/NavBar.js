import React, { Component } from "react";
import { NavLink, Link, Redirect, Route } from "react-router-dom";
import SearchBar from './SearchBar';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <Link className="nav-link" to="/">
                    Home
                </Link>
                {/* <ul className="nav-links">
                    <Link className="nav-link" to="/playlists">
                        Playlists
                    </Link>
                </ul> */}
                {/* {this.props.loggedInStatus === "LOGGED_IN"? ( */}
                    <div>
                        <SearchBar />
                        <ul className="nav-links">
                            <Link className="nav-link" to="/user/settings">Settings</Link>
                            <Link className="nav-link" to={`/playlists`}>Playlists</Link>
                            {/* <Link className="nav-link" onClick={this.props.handleLogout} to="/">Logout</Link> */}
                        </ul>
                    </div>
                {/* // ) : (
                //     <ul className="nav-links">
                //         <Link className="nav-link" to="/signup">Sign up</Link>
                //         <Link className="nav-link" to="/login">Login</Link>
                //     </ul>
                // )} */}
            </nav>
        );
    }
}

export default NavBar;
