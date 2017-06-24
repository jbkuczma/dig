import React from 'react'
import ReactDOM from 'react-dom'

import Feed from './Feed/feed.jsx'

let userJsonData = require('../../cookies/info.json')
const fs = require('fs')

export default class MainWindow extends React.Component {

    goToEditScreen() {
        window.location.href = 'edit.html'
    }

    logout() {
        let fileName = __dirname + '/cookies/info.json'
        fs.writeFile(fileName, JSON.stringify(userJsonData, null, 2), (error) => {
            if(error) {
                return console.log(error)
            } else {
                setTimeout(() => {
                     window.location.href = 'login.html'
                }, 500)
            }
        })     
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