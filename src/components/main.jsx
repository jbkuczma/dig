import React from 'react'
import ReactDOM from 'react-dom'

import Feed from './Feed/feed.jsx'

export default class MainWindow extends React.Component {

    goToEditScreen() {
        window.location.href = 'edit.html'
    }
    
    render() {
        return (
            <div>
                <img src="assets/img/edit.svg" alt="edit" id="editIcon" onClick={this.goToEditScreen} />
            <Feed />
            </div>
        )
    }
}