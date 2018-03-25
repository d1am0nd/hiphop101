import React from 'react';
import PropTypes from 'prop-types';

import {textBetween} from '@/validation/text';
import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';
import TextArea from '@/components/simple/form/TextArea';

const ArticleForm = ({
  article,
  errors,
  handleChange,
  handleSubmit,
}) => (
  <Form handleSubmit={(e) => handleSubmit(e)}>
    <Input
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'Title',
        tabIndex: 1,
        name: 'title',
        value: article.name,
      }}
      errors={errors.title}
      label="Title"/>
    <TextArea
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'Description',
        name: 'description',
        rows: 8,
        tabIndex: 2,
        value: article.description,
      }}
      label="Short description"
      help={textBetween({
        input: article.description,
        name: 'Description',
        min: 150,
        max: 400,
      })}
      errors={errors.description}/>
    <TextArea
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'Content',
        name: 'content',
        rows: 30,
        tabIndex: 2,
        value: article.content,
      }}
      label="Article content"
      errors={errors.content}/>
    <Submit text="Submit"/>
  </Form>
);

ArticleForm.propTypes = {
  article: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ArticleForm;
