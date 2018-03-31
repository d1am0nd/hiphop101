import React from 'react';
import PropTypes from 'prop-types';

import {textBetween} from '@/validation/text';
import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';
import TextArea from '@/components/simple/form/TextArea';
import ButtonList from '@/components/simple/content/ButtonList';

const ArtistForm = ({
  artist,
  errors,
  handleChange,
  handleSubmit,
}) => (
  <Form handleSubmit={(e) => handleSubmit(e)}>
    <Input
      handleChange={(e) => handleChange(e)}
      attributes={{
        autoFocus: true,
        placeholder: 'Artist name',
        name: 'name',
        value: artist.name,
      }}
      label="Artist name"
      errors={errors.name}/>
    <Input
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'https://en.wikipedia.org/wiki/Kevin_Gates',
        name: 'wikipedia_url',
        value: artist.wikipedia_url,
      }}
      label="Wikipedia URL"
      errors={errors.wikipedia_url}/>
    <TextArea
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'Description',
        name: 'description',
        rows: 8,
        value: artist.description,
      }}
      label="Short description"
      help={textBetween({
        input: artist.description,
        name: 'Description',
        min: 150,
        max: 400,
      })}
      errors={errors.description}/>
    <ButtonList>
      {[
        <Submit
          attributes={{
            className: 'btn-inverse on-white',
          }}
          key={0}
          text="Submit"/>,
      ]}
    </ButtonList>
  </Form>
);

ArtistForm.propTypes = {
  artist: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ArtistForm;
