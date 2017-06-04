import React from 'react'
import ReactDOM from 'react-dom'

export default class Image extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }
    
    render() {
        return (
            <div>
                <p> {this.state.user} </p>
            </div>
        )
    }
}