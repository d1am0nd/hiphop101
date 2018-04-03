import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {openRegister, openLogin} from '@/store/actions/modal';
import hasEditor from '@/components/hoc/hasEditor';
import text from './text';

import H1 from '@/components/simple/content/H1';
import H2 from '@/components/simple/content/H2';
import TextArea from '@/components/simple/form/TextArea';
import Description from '@/components/simple/content/Description';
import HtmlContent from '@/components/simple/content/HtmlContent';

class HowToWrite extends Component {
  constructor() {
    super();
    this.state = {
      editorText: text,
    };
  }

  handleTextChange(e) {
    this.setState({
      editorText: e.target.value,
    });
  }

  render() {
    const {editorText} = this.state;
    const {openLogin, openRegister} = this.props;
    return (
      <div>
        <H1>How to write an article</H1>
        <H2>1. Register an account</H2>
        <Description>
          If you don{`'`}t already have an account, you{`'`}ll need to{` `}
          <a href="javascript:;" onClick={
            (e) => openRegister(e)
          }>register</a> first. Or if you are already registered,{` `}
          <a href="javascript:;" onClick={
            (e) => openLogin(e)
          }>login</a> to your account.
        </Description>
        <p>
          Your email will not be visible to anyone but you.
        </p>
        <p>
          Your username will be visible in the article you write.
        </p>
        <H2>2. Find the artist</H2>
        <Description>
          Click {`"`}New Article{`"`} in the header and find the artist{` `}
          you would like to write an introduction for.
        </Description>
        <p>
          If the artist is not{` `}
          yet in the database, click {`"`}Add an artist{`"`} and fill{` `}
          in the required fields - Artist name, Wikipedia URL and a short {` `}
          description.
        </p>
        <H2>3. Write the article content using markdown</H2>
        <TextArea
          attributes={{
            value: editorText,
            rows: 20,
          }}
          handleChange={(e) => this.handleTextChange(e)}/>
        <HtmlContent>
          {this.props.editorStateToHtml(editorText)}
        </HtmlContent>
      </div>
    );
  }
}

HowToWrite.propTypes = {
  openRegister: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  editorStateToHtml: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    openRegister: () => dispatch(openRegister()),
    openLogin: () => dispatch(openLogin()),
  };
};

export default hasEditor(connect(
  null,
  mapDispatchToProps
)(HowToWrite));
