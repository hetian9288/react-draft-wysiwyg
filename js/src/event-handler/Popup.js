import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ToolbarElem from './ToolbarElem';

export default class Popup extends Component {
    appendMaskIntoDoc() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <ToolbarElem {...this.props}>{this.props.children}</ToolbarElem>,
            this.container
        )
    }

    componentDidMount() {
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
        this.appendMaskIntoDoc()
    }

    componentDidUpdate() {
        this.appendMaskIntoDoc()
    }

    componentWillUnmount() {
        document.body.removeChild(this.container)
    }

    render() {
        return null
    }
}