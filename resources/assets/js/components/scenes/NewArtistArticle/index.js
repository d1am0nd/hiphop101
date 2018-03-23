import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

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

  render() {
    const {
      artist,
      values,
      errors,
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
          <TextArea
            handleChange={(e) => this.handleInputChange(e)}
            attributes={{
              placeholder: 'Content',
              name: 'content',
              rows: 30,
              tabIndex: 2,
            }}
            label="Article content"
            errors={errors.content}/>
          <div dangerouslySetInnerHTML={{
            __html: this.props.editorStateToHtml(values.content),
          }}/>
          <Submit text="Submit"/>
        </Form>
      </div>
    );
  }
};

NewArtistArticle.propTypes = {
  editorStateToHtml: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default hasEditor(
  withRouter(
    NewArtistArticle
  )
);
