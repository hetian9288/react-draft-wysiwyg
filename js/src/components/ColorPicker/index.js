/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  colors,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import Option from '../Option';
import {JavaDe} from '../../Utils/func';
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import { SketchPicker } from 'react-color';

export default class ColorPicker extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    currentColor: undefined,
    currentBgColor: undefined,
    showModal: false,
    showColorModal: false,
    showBgColorModal: false,
    currentStyle: 'color',
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
        this.currentColorValue = getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR;
        this.currentBgColorValue = getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR;
    }
    modalHandler.registerCallBack(this.showHideModal);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
        this.currentColorValue = getSelectionCustomInlineStyle(properties.editorState, ['COLOR']).COLOR;
      // newState.currentColor
      //   = getSelectionCustomInlineStyle(properties.editorState, ['COLOR']).COLOR;
      this.currentBgColorValue = getSelectionCustomInlineStyle(properties.editorState, ['BGCOLOR']).BGCOLOR;
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.showHideModal);
  }

  onOptionClick: Function = (type: string): void => {
    switch (type){
      case 'bgcolor':
        this.setCurrentStyleBgcolor();
        break;
      case 'color':
        this.setCurrentStyleColor();
        break;
    }
  };

  setCurrentStyleBgcolor: Function = (): void => {
    this.setState({
      currentStyle: 'bgcolor'
    });
    this.signalBgcolorShowModal = !this.signalBgcolorShowModal;
    this.signalColorShowModal = false;
  };

  setCurrentStyleColor: Function = (): void => {
    this.setState({
      currentStyle: 'color',
    });
      this.signalColorShowModal = !this.signalColorShowModal;
      this.signalBgcolorShowModal = false;
  };

  showHideModal: Function = (): void => {
    this.setState({
      showBgColorModal: this.signalBgcolorShowModal,
      showColorModal: this.signalColorShowModal,
      currentColor: this.currentColorValue,
        currentBgColor:this.currentBgColorValue,
    });
    this.signalColorShowModal = false;
    this.signalBgcolorShowModal = false;
      this.currentColorValue = undefined;
      this.currentBgColorValue = undefined;
  }

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  setColor: Function = (type: string, color: Object): void => {
      const colorVal = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
      const { editorState, onChange } = this.props;
      // 设置样式
      const newState = toggleCustomInlineStyle(
          editorState,
          type,
          `${type}-${colorVal}`
      );
      // 更新state
      switch (type){
          case 'color':
              this.setState({
                  currentColor: colorVal
              });
              break;
          case 'bgcolor':
              this.setState({
                  currentBgColor: colorVal
              });
              break;
      }

      if (newState) {
          onChange(newState);
      }
  };

  renderModal: Function = (color:string): Object => {
    const { config: { popupClassName } } = this.props;
    const { currentBgColor, currentColor, currentStyle } = this.state;
      let colorVal = currentStyle === 'bgcolor' ? this.state.currentBgColor : this.state.currentColor;
    return (
        <div
            className={classNames('rdw-colorpicker-modal', popupClassName)}
            onClick={this.stopPropagation}
        >
          <SketchPicker
              color={ color }
              onChange={ this.setColor.bind(this,currentStyle) }
          />
        </div>
    )
  };

  render(): Object {
      const { config: {options, color, bgcolor, className} } = this.props;
      const { showColorModal,showBgColorModal } = this.state;

      return (
          <div className={classNames('rdw-colorpicker-wrapper', className)} aria-label="rdw-colorPicker-control">
              {
                  options.indexOf('color') >= 0 &&
                  <div className={classNames('colorpicker-wrapper')}>
                      <Option
                          className={classNames(color.className)}
                          onClick={this.onOptionClick.bind(this, 'color')}
                          aria-haspopup="true"
                          aria-expanded={showColorModal}
                      >
                          <span className="iconfont">{JavaDe(color.icon)}</span>
                      </Option>
                      {showColorModal ? this.renderModal(this.state.currentColor) : undefined}
                  </div>
              }
              {
                  options.indexOf('bgcolor') >= 0 &&
                  <div className={classNames('colorpicker-wrapper')}>
                      <Option
                          className={classNames(bgcolor.className)}
                          onClick={this.onOptionClick.bind(this, 'bgcolor')}
                          aria-haspopup="true"
                          aria-expanded={showBgColorModal}
                      >
                          <span className="iconfont">{JavaDe(bgcolor.icon)}</span>
                      </Option>
                      {showBgColorModal ? this.renderModal(this.state.currentBgColor) : undefined}
                  </div>
              }
          </div>
      )
  }
}
