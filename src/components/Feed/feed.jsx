import React from 'react'
import ReactDOM from 'react-dom'

import ImageFeed from './ImageFeed/imagefeed.jsx'
import userJsonData from '../../../cookies/info.json'

export default class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: userJsonData['feeds']
        }
    }

    render() {
        return (
            <div className="allImageFeeds">
                {
                    this.state.data.map( (feed, key) => {
                        return <ImageFeed feed={feed} key={key} />
                    })
                }
            </div>
        )
    }
}