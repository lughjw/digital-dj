import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    
    render() {
        return <div>
            <h1>Dashboard</h1>
            <h1>Status: {this.props.loggedInStatus}</h1>
        </div>
    }
}

export default Dashboard;