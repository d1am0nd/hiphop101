import React, {Component} from 'react';

import {postNewArtist} from '@/api/artists';
import {getErr} from '@/api/helpers';

import H1 from '@/components/simple/content/H1';
import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';
import TextArea from '@/components/simple/form/TextArea';

class NewArtist extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      wikipedia_url: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    postNewArtist(this.state)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(getErr(err));
      });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
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
            label="Artist name"/>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              placeholder: 'https://en.wikipedia.org/wiki/Kevin_Gates',
              name: 'wikipedia_url',
            }}
            label="Wikipedia URL"/>
          <TextArea
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              placeholder: 'Description',
              name: 'description',
            }}
            label="Short description"/>
          <Submit text="Submit"/>
        </Form>
      </div>
    );
  }
}

export default NewArtist;
