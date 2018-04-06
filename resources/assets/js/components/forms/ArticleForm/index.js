import React from 'react';
import PropTypes from 'prop-types';

import {textMin} from '@/validation/text';
import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import TextArea from '@/components/simple/form/TextArea';
import ButtonList from '@/components/simple/content/ButtonList';

const ArticleForm = ({
  article,
  errors,
  handleChange,
  handlePublish,
  handleSaveDraft,
}) => (
  <Form>
    <Input
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'Title',
        tabIndex: 1,
        name: 'title',
        value: article.title,
      }}
      errors={errors.title}
      label="Title"/>
    <TextArea
      handleChange={(e) => handleChange(e)}
      attributes={{
        placeholder: 'Content',
        name: 'content',
        rows: 30,
        tabIndex: 2,
        value: article.content,
      }}
      label="Article content (required)"
      help={textMin({
        input: article.content,
        name: 'Content',
        min: 800,
      })}
      errors={errors.content}/>
    <ButtonList>
      {[
        <a
          key={0}
          className="btn-inverse on-white"
          onClick={(e) => handlePublish(e)}
          href="javascript:;">
          Submit
        </a>,
        !!!article.active ?
          <a
            key={1}
            className="btn-normal on-white"
            onClick={(e) => handleSaveDraft(e)}
            href="javascript:;">
            Save draft
          </a> : null,
      ]}
    </ButtonList>
  </Form>
);

ArticleForm.propTypes = {
  article: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
};

export default ArticleForm;
