import React from 'react'
import ReactDOM from 'react-dom'

export default class Image extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            imgsrc: "http://assets.fodors.com/destinations/4224/night-aerial-chicago-illinois-usa_main.jpg"
        }
    }
    
    render() {
        return (
            <div className="instagramImage">
                <img src={this.state.imgsrc} />
                <button id="likeButton">
                    <img src="./assets/heart.svg" />    
                </button>
            </div>
        )
    }
}