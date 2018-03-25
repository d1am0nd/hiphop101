import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {postNewArtist} from '@/api/artists';
import {getErr, getData} from '@/api/helpers';
import {newArtistArticleUrl} from '@/routes/routes';
import {textBetween} from '@/validation/text';
import {values, errors} from '@/objects/artist';

import H1 from '@/components/simple/content/H1';
import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';
import TextArea from '@/components/simple/form/TextArea';

class NewArtist extends Component {
  constructor() {
    super();
    this.state = {
      values: {...values},
      errors: {...errors},
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {values, errors} = this.state;
    const {history} = this.props;
    postNewArtist(values)
      .then((res) => {
        history.push(newArtistArticleUrl(getData(res).slug));
      })
      .catch((err) => {
        this.setState({
          errors: {
            ...errors,
            ...getErr(err),
          },
        });
      });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  }

  render() {
    const {values, errors} = this.state;
    return (
      <div>
        <H1>Add an artist</H1>
        <Form handleSubmit={(e) => this.handleSubmit(e)}>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              autoFocus: true,
              placeholder: 'Artist name',
              name: 'name',
            }}
            label="Artist name"
            errors={errors.name}/>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              placeholder: 'https://en.wikipedia.org/wiki/Kevin_Gates',
              name: 'wikipedia_url',
            }}
            label="Wikipedia URL"
            errors={errors.wikipedia_url}/>
          <TextArea
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              placeholder: 'Description',
              name: 'description',
              rows: 8,
            }}
            label="Short description"
            help={textBetween({
              input: values.description,
              name: 'Description',
              min: 150,
              max: 400,
            })}
            errors={errors.description}/>
          <Submit text="Submit"/>
        </Form>
      </div>
    );
  }
}

NewArtist.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NewArtist);
