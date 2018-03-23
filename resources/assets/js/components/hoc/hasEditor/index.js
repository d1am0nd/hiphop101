import React from 'react';
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import defaultConfig from './editorConfig';

const hasEditor = (Component) => {
  class HasEditor extends React.Component {
    constructor() {
      super();
      this.editorStateToHtml = (state) => draftToHtml(
        convertToRaw(
          state.getCurrentContent()
        )
      );
      this.htmlToEditorState = (html) => EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(html)
        )
      );
    }

    render() {
      return (
        <Component
          defaultConfig={defaultConfig}
          editorStateToHtml={this.editorStateToHtml}
          htmlToEditorState={this.htmlToEditorState}/>
      );
    }
  }

  return HasEditor;
};

export default hasEditor;
