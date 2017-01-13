/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import classNames from 'classnames';
import { Dropdown, DropdownOption } from '../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class FontFamilyControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    currentFontFamily: undefined,
    currentFontFamilyName: '字体'
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      let fontFamily = getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY']).FONTFAMILY;
      if(fontFamily){
        fontFamily =
            fontFamily && fontFamily.substring(11, fontFamily.length);
        this.props.config.options.forEach(item => {
          if(item.value === fontFamily) {
            this.setState({
              currentFontFamilyName: item.name,
            });
          }
        });
      }

      this.setState({
        currentFontFamily:
          getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

  toggleFontFamily: Function = (fontFamily: string) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      fontFamily,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    let { currentFontFamily, currentFontFamilyName } = this.state;
    const { config: { className, dropdownClassName, options }, modalHandler } = this.props;
    currentFontFamily =
      currentFontFamily && currentFontFamily.substring(11, currentFontFamily.length);

    return (
      <div className="rdw-fontfamily-wrapper" aria-label="rdw-font-family-control">
        <Dropdown
          className={classNames('rdw-fontfamily-dropdown', className)}
          onChange={this.toggleFontFamily}
          modalHandler={modalHandler}
          optionWrapperClassName={classNames('rdw-fontfamily-optionwrapper', dropdownClassName)}
        >
          <span className="rdw-fontfamily-placeholder">
            {currentFontFamilyName}
          </span>
          {
            options.map((family, index) =>
              <DropdownOption
                active={currentFontFamily === family.value}
                value={`fontfamily-${family.value}`}
                key={index}
              >
                {family.name}
              </DropdownOption>)
          }
        </Dropdown>
      </div>
    );
  }
}
