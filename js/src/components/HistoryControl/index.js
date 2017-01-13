/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import { getFirstIcon } from '../../utils/toolbar';
import {JavaDe} from '../../Utils/func';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class HistoryControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    undoDisabled: false,
    redoDisabled: false,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        undoDisabled: properties.editorState.getUndoStack().size === 0,
        redoDisabled: properties.editorState.getRedoStack().size === 0,
      });
    }
  }

  undo: Function = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.undo(editorState);
    if (newState) {
      onChange(newState);
    }
  };

  redo: Function = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.redo(editorState);
    if (newState) {
      onChange(newState);
    }
  };

  renderInDropDown(undoDisabled: bool, redoDisabled: bool, config: Object): Object {
    const { options, undo, redo, className } = config;
    const { modalHandler } = this.props;
    return (
      <Dropdown
        className={classNames('rdw-history-dropdown', className)}
        onChange={this.toggleInlineStyle}
        modalHandler={modalHandler}
        aria-label="rdw-history-control"
      >
        <span className="iconfont">{JavaDe(getFirstIcon(config))}</span>
        {options.indexOf('undo') >= 0 && <DropdownOption
          onClick={this.undo}
          disabled={undoDisabled}
          className={classNames('rdw-history-dropdownoption', undo.className)}
        >
          <span className="iconfont">{JavaDe(undo.icon)}</span>
        </DropdownOption>}
        {options.indexOf('redo') >= 0 && <DropdownOption
          onClick={this.redo}
          disabled={redoDisabled}
          className={classNames('rdw-history-dropdownoption', redo.className)}
        >
          <span className="iconfont">{JavaDe(redo.icon)}</span>
        </DropdownOption>}
      </Dropdown>
    );
  }

  renderInFlatList(undoDisabled: bool, redoDisabled: bool, config: Object): Object {
    const { options, undo, redo, className } = config;
    return (
      <div className={classNames('rdw-history-wrapper', className)} aria-label="rdw-history-control">
        {options.indexOf('undo') >= 0 && <Option
          value="unordered-list-item"
          onClick={this.undo}
          className={classNames(undo.className)}
          disabled={undoDisabled}
        >
          <span className="iconfont">{JavaDe(undo.icon)}</span>
        </Option>}
        {options.indexOf('redo') >= 0 && <Option
          value="ordered-list-item"
          onClick={this.redo}
          className={classNames(redo.className)}
          disabled={redoDisabled}
        >
          <span className="iconfont">{JavaDe(redo.icon)}</span>
        </Option>}
      </div>
    );
  }

  render(): Object {
    const { config } = this.props;
    const {
      undoDisabled,
      redoDisabled,
    } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(undoDisabled, redoDisabled, config);
    }
    return this.renderInFlatList(undoDisabled, redoDisabled, config);
  }

}
