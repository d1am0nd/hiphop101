import React from 'react';
import PropTypes from 'prop-types';

import Input from '@/components/simple/form/Input';

const ArtistForm = ({handleArtistChange}) => {
  return (
    <div>
      Choose artist
      <Input
        type="search"
        handleChange={(e) => console.log(e)}
        placeholder="Find artist"
        name="artist"/>
      <div
        onClick={(e) => handleArtistChange(e, 'test')}>
        change
      </div>
    </div>
  );
};

ArtistForm.propTypes = {
  handleArtistChange: PropTypes.func.isRequired,
};

export default ArtistForm;
