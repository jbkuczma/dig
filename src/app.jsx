import React from 'react'
import ReactDOM from 'react-dom'

import MainWindow from './components/main.jsx'

export default class App extends React.Component {
    
    render() {
        return (
            <MainWindow />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app')) 