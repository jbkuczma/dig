import React from 'react'
import ReactDOM from 'react-dom'

import Image from './image.jsx'

export default class ImageFeed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.feed['title'],
            profilesInFeed: this.props.feed['profiles']
        }
    }
    
    render() {
        return (
            <div className="imageFeed">
                <div className="imageFeedHeader">
                    <h1> {this.state.title} </h1>
                </div>
                {
                    this.state.profilesInFeed.map( (user, key) => {
                        return <Image user={user} key={key} />
                    })
                }
            </div>
        )
    }
}