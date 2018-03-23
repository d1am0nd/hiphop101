import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
// import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {textBetween} from '@/validation/text';
import {findBySlug, postNewArtistArticle} from '@/api/artists';
import {getErr, getData} from '@/api/helpers';
import hasEditor from '@/components/hoc/hasEditor';

import H1 from '@/components/simple/content/H1';
import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';
import TextArea from '@/components/simple/form/TextArea';

class NewArtistArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      values: {
        title: '',
        description: '',
        content: '',
      },
      errors: {
        title: [],
        description: [],
        content: [],
      },
      editorState: props.htmlToEditorState(
        `Write here`
      ),
    };
  }

  componentDidMount() {
    const {slug} = this.props.match.params;
    findBySlug(slug)
      .then((res) => {
        this.setState({
          artist: getData(res),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {artist, values} = this.state;
    postNewArtistArticle(artist.slug, values)
      .then((res) => {
        console.log('RES', getData(res));
      })
      .catch((err) => {
        this.setState({
          errors: getErr(err),
        });
      });
  }

  handleInputChange(e) {
    const {target} = e;
    this.setState({
      values: {
        ...this.state.values,
        [target.name]: target.value,
      },
    });
  }

  handleEditorChange(editorState) {
    this.setState({
      editorState,
      values: {
        ...this.state.values,
        content: this.props.editorStateToHtml(editorState),
      },
    });
  }

  render() {
    const {
      artist,
      values,
      errors,
      editorState,
    } = this.state;
    return (
      <div>
        <H1>New article for {artist.name}</H1>
        <Form handleSubmit={(e) => this.handleSubmit(e)}>
          <Input
            handleChange={(e) => this.handleInputChange(e)}
            attributes={{
              placeholder: 'Title',
              tabIndex: 1,
              name: 'title',
            }}
            errors={errors.title}
            label="Title"/>
          <TextArea
            handleChange={(e) => this.handleInputChange(e)}
            attributes={{
              placeholder: 'Description',
              name: 'description',
              rows: 8,
              tabIndex: 2,
            }}
            label="Short description"
            help={textBetween({
              input: values.description,
              name: 'Description',
              min: 150,
              max: 400,
            })}
            errors={errors.description}/>
          <Editor
            toolbar={{...this.props.defaultConfig}}
            editorState={editorState}
            wrapperClassName="wysiwyg-wrapper"
            editorClassName="wysiwyg-editor"
            onEditorStateChange={
              (e, test) => this.handleEditorChange(e, test)
            }/>
          <div dangerouslySetInnerHTML={
            {__html: this.props.editorStateToHtml(editorState)}
          }/>
          <Submit text="Submit"/>
        </Form>
      </div>
    );
  }
};

NewArtistArticle.propTypes = {
  defaultConfig: PropTypes.object.isRequired,
  editorStateToHtml: PropTypes.func.isRequired,
  htmlToEditorState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default hasEditor(
  withRouter(
    NewArtistArticle
  )
);
