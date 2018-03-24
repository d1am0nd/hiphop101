import React from 'react';
import PropTypes from 'prop-types';

import H1 from '@/components/simple/content/H1';
import Description from '@/components/simple/content/Description';

const Artist = ({artist}) => {
  return (
    <div>
      <H1>{artist.name}</H1>
      <Description>{artist.description}</Description>
    </div>
  );
};

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default Artist;
