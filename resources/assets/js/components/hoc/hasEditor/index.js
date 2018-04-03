import React from 'react';

import {toHtml} from '@/marked';

const hasEditor = (Component) => {
  class HasEditor extends React.Component {
    constructor() {
      super();
      this.editorStateToHtml = toHtml;
    }

    render() {
      return (
        <Component
          {...this.props}
          editorStateToHtml={this.editorStateToHtml}/>
      );
    }
  }

  return HasEditor;
};

export default hasEditor;
