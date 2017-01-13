/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from '../src/tohtml/index'; // eslint-disable-line import/no-extraneous-dependencies
import draftToMarkdown from 'draftjs-to-markdown'; // eslint-disable-line import/no-extraneous-dependencies
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
  EditorState,
} from 'draft-js';
import {stateFromHTML} from 'draft-js-import-html';
import minToolbar from '../src/config/minToolbar';

import { Editor } from '../src';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const contentBlocks = convertFromHTML('<p>中<strong>华人</strong>民<span style="color: rgba(48,23,176,1);">共和国</span></p>');

const contentState = ContentState.createFromBlockArray(contentBlocks);

// const rawContentState = convertToRaw(contentState);

const rawContentState = {
    "entityMap": {},
    "blocks": [{
        "key": "f5emd",
        "text": "fsfs🤗中sdasd华人民共和国",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [{
            "offset": 10,
            "length": 2,
            "style": "BOLD"
        }, {
            "offset": 14,
            "length": 2,
            "style": "bgcolor-rgba(62,39,178,1)"
        }],
        "entityRanges": [],
        "data": {}
    }]
}

class Playground extends Component {

  state: any = {
    editorContent: undefined,
    contentState: rawContentState,
    editorState: EditorState.createWithContent(contentState)
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  clearContent: Function = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
    });
  };

  onContentStateChange: Function = (contentState) => {
    console.log('contentState', contentState);
  };

  onEditorStateChange: Function = (initEditorState) => {
    this.setState({
      initEditorState,
    });
  };

  imageUploadCallBack: Function = file => new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );

  render() {
    const { editorContent, contentState, editorState } = this.state;
    return (
      <div className="playground-root">
        <div className="playground-label">
          Toolbar is alwasy <sup>visible</sup>
        </div>
        <button onClick={this.clearContent}>Force Editor State</button>
        <div className="playground-editorSection">
          <div className="playground-editorWrapper">
            <Editor
            isPopup={true}
                toolbar={minToolbar}
                contentState={contentState}
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              uploadCallback={this.imageUploadCallBack}
              onEditorStateChange={null}
              onContentStateChange={this.onEditorChange}
              placeholder="testing"
              spellCheck
              onFocus={() => {console.log('focus')}}
              onBlur={() => {console.log('blur')}}
              mention={{
                separator: ' ',
                trigger: '@',
                suggestions: [
                  { text: 'A', value: 'a', url: 'href-a' },
                  { text: 'AB', value: 'ab', url: 'href-ab' },
                  { text: 'ABC', value: 'abc', url: 'href-abc' },
                  { text: 'ABCD', value: 'abcd', url: 'href-abcd' },
                  { text: 'ABCDE', value: 'abcde', url: 'href-abcde' },
                  { text: 'ABCDEF', value: 'abcdef', url: 'href-abcdef' },
                  { text: 'ABCDEFG', value: 'abcdefg', url: 'href-abcdefg' },
                ],
              }}
            />
          </div>
          <textarea
            className="playground-content no-focus"
            value={draftToHtml(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={draftToMarkdown(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={JSON.stringify(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef


/**
const rawContentState = ;


toolbar={{
  inline: {
    inDropdown: true,
  },
  list: {
    inDropdown: true,
  },
  textAlign: {
    inDropdown: true,
  },
  link: {
    inDropdown: true,
  },
  image: {
    uploadCallback: this.imageUploadCallBack,
  },
  history: {
    inDropdown: true,
  },
}}*/
