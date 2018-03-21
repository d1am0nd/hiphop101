import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {newArtistArticleUrl} from '@/routes/routes';

const List = ({artists}) => {
  return (
    <ul>
      {artists.map((artist) => (
        <li key={artist.name}>
          <h2>{artist.name}</h2>
          <div className="description">
            {artist.description}
          </div>
          <div className="actions">
            <Link to={newArtistArticleUrl(artist.slug)}>Write</Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  artists: PropTypes.array.isRequired,
};

export default List;
