import React from 'react'
import ReactDOM from 'react-dom'

import request from 'request'
import _ from 'underscore'

var Client = require('instagram-private-api').V1;
var device = new Client.Device('user');
var storage = new Client.CookieFileStorage(__dirname + '/cookies/user.json');

var Promise = require('bluebird');

var userInfo = require('../../../../cookies/info.json')

const username = userInfo['username']
const password = userInfo['password']

export default class Image extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.photo.user,
            url: this.props.photo.url,
            caption: this.props.photo.caption,
            hasLiked: this.props.photo.hasLiked,
            ready: true
        }
    }
    
    likePhoto(photo) {
        let hasLiked = this.props.photo.hasLiked
        let id = this.props.photo.id
        Client.Session.create(device, storage, username, password)
            .then((session) => {
                if(hasLiked) {
                    Client.Like.destroy(session, id)
                    return false
                } else {
                    Client.Like.create(session, id)
                    return true
                }
            })
            .then((like) => {
                this.setState({
                    hasLiked: like
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    render() {
        if(this.state.ready) {
            return (
                <div>
                    <div className="instagramImage" key={this.props.photo.id}>
                        <div>
                            <span id="imgCaption"> @{this.props.photo.username} </span>
                        </div>
                        <img src={this.props.photo.url} />
                        <div>
                            {this.state.hasLiked ? 
                                <img src="./assets/img/heart_fill.svg" className="likeButton" onClick={this.likePhoto.bind(this, this.props.photo)} />
                                :
                                <img src="./assets/img/heart_outline.svg" className="likeButton" onClick={this.likePhoto.bind(this, this.props.photo)} />
                            }
                        </div>
                        <span id="imageCaption"> {this.props.photo.caption === undefined ? '' : this.props.photo.caption} </span>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <img src="./assets/img/loading.svg" alt="loading" />
                </div>
            )
        }
    }
}