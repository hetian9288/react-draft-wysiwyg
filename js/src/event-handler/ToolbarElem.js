import React, {Component, PropTypes} from 'react';
import {getPageOffset} from '../Utils/func';

export default class ToolbarElem extends Component{
    static propTypes = {
        parentDomID: PropTypes.string.isRequired
    };
    state: Object = {
      style:{
          position:'absolute',
          display: 'inline-block',
          zIndex:9999,
      }
    };
    render(){
        return (
            <div ref={'ToolbarElem'} className="ToolbarElem" style={{...this.state.style}}>
                {this.props.children}
            </div>
        )
    }
    componentDidMount() {
        const parent = document.getElementById(this.props.parentDomID)
        const offset = getPageOffset(parent);
        const _offsetLeft = this.refs.ToolbarElem.offsetWidth / 2;
        this.setState({
            style: {
                ...this.state.style,
                left: offset.x + parent.offsetWidth / 2,
                top: offset.y - (this.refs.ToolbarElem.offsetHeight + 2),
                marginLeft: - _offsetLeft
            }
        })
    }
}