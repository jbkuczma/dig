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
            user: this.props.user,
            images: [],
            ready: false
        }
    }

    componentWillMount(){
        this.fetchImages()
    }

    fetchImages() {
        Client.Session.create(device, storage, username, password)
            .then((session) => {
                return [session, Client.Account.searchForUser(session, this.props.user)]
            })
            .spread((session, account) => {
                let userid = account.id
                let feed = new Client.Feed.UserMedia(session, userid)
                return feed.get() /* returns ~12 photos */
            .then((userFeed) => {
                let photos = []
                for(var i = 0; i < 2; i ++){
                    // if(userFeed[i]._params.images[0] instanceof Array) {
                    //     /* if the media grabbed is an album, it is returned as an array or arrays. the first array will be grabbed */
                    //     let url = userFeed[i]._params.images[0][0].url.split('?')[0]
                    // } else {
                    //     /* single item */
                    //     let url = userFeed[i]._params.images[0].url.split('?')[0]
                    // }
                    let url = ''
                    let imageUrl = userFeed[i]._params.images[0].url
                    if(imageUrl === undefined) {
                        url = userFeed[i]._params.images[0][0].url.split('?')[0]
                    } else {
                        url = imageUrl.split('?')[0]
                    }
                    // let url = userFeed[i]._params.images[0].url.split('?')[0]
                    
                    let id = userFeed[i]._params.id
                    let caption = userFeed[i]._params.caption
                    let data = {
                        url: url, 
                        id: id,
                        caption: caption
                    }
                    photos.push(data)
                }
                this.setState({
                    images: photos,
                    ready: true
                })
            })
        })
    }
    
    render() {
        if(this.state.ready) {
            return (
                <div>
                    {this.state.images.map((photo) => {
                        return (
                            <div className="instagramImage" key={photo.id}>
                                <img src={photo.url} />
                                <button id="likeButton">
                                    <img src="./assets/heart.svg" />    
                                </button>
                                <div>
                                    <span id="imgCaption"> @{this.props.user} </span>
                                </div>
                                <span id="imageCaption"> {photo.caption === undefined ? '' : photo.caption} </span>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <img src="./assets/loading.svg" alt="loading" />
                    <br />
                    <img src="./assets/loading.svg" alt="loading" />
                </div>
            )
        }
    }
}