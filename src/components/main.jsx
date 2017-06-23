import React from 'react'
import ReactDOM from 'react-dom'

import Feed from './Feed/feed.jsx'

export default class MainWindow extends React.Component {

    goToEditScreen() {
        window.location.href = 'edit.html'
    }

    logout() {
        window.location.href = 'login.html'
    }
    
    render() {
        return (
            <div>
                <img src="assets/img/edit.svg" alt="edit" id="editIcon" onClick={this.goToEditScreen} />
                <img src="assets/img/logout.svg" alt="logout" id="logoutIcon" onClick={this.logout} />
                <Feed />
            </div>
        )
    }
}