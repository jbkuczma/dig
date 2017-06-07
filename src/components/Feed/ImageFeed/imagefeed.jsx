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

import Image from './image.jsx'

export default class ImageFeed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.feed['title'],
            profilesInFeed: this.props.feed['profiles'],
            images: [],
            ready: false
        }
    }

    componentWillMount() {
        this.fetchImages()
    }

    /**
     * Durstenfeld shuffle algorithm. Show the photos in a somewhat random order
     */
    // shufflePhotos(photos) {
    //     for (var i = photos.length - 1; i > 0; i--) {
    //         var j = Math.floor(Math.random() * (i + 1));
    //         var temp = photos[i];
    //         photos[i] = photos[j];
    //         photos[j] = temp;
    //     }
    //     return photos;
    // }

    /* trying to implement the OG ig chronological ordering of photos */
    sortPhotos(photos) {
        return photos.sort((photo1, photo2) => {
            return new Date(photo2.dateAdded) - new Date(photo1.dateAdded)
        })
    }

    toDateTime(secs) {
        // let t = new Date(1970, 0, 1); // Epoch
        if(secs.length === 10) {
            return new Date(secs * 1000)
        } else {
            return new Date(secs)
        }
    }

    fetchImages() {
        Client.Session.create(device, storage, username, password)
            .then((session) => {
                let photos = []
                for(let i = 0; i < this.state.profilesInFeed.length; i++) {
                    let user = this.state.profilesInFeed[i]
                    let userInfo = Client.Account.searchForUser(session, user)
                    userInfo.then((account) => {
                        let userid = account.id
                        let feed = new Client.Feed.UserMedia(session, userid)
                        feed.get()
                            .then((userFeed) => {
                                for(var i = 0; i < 2; i ++){
                                    let url = ''
                                    let hasLiked = userFeed[i]._params.hasLiked
                                    let imageUrl = userFeed[i]._params.images[0].url
                                    let dateAdded = this.toDateTime(userFeed[i]._params.takenAt)
                                    if(imageUrl === undefined) {
                                        url = userFeed[i]._params.images[0][0].url.split('?')[0]
                                    } else {
                                        url = imageUrl.split('?')[0]
                                    }
                                    let id = userFeed[i]._params.id
                                    let caption = userFeed[i]._params.caption
                                    let data = {
                                        dateAdded: dateAdded,
                                        username: user,
                                        url: url, 
                                        id: id,
                                        caption: caption,
                                        hasLiked: hasLiked
                                    }
                                    photos.push(data)
                                    if(photos.length === (this.state.profilesInFeed.length * 2)) {
                                        this.setState({
                                            images: this.sortPhotos(photos),
                                            ready: true
                                        })
                                    }
                                }
                            })
                    })
                }
            })
    }
    
    render() {
        return (
            <div className="imageFeed">
                <div className="imageFeedHeader">
                    <h1> {this.state.title} </h1>
                </div>
                {
                    this.state.images.map( (photo, key) => {
                        return <Image photo={photo} key={key} />
                    })
                }
            </div>
        )
    }
}