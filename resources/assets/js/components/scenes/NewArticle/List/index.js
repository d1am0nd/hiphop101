import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {newArtistArticleUrl} from '@/routes/routes';

import ButtonList from '@/components/simple/content/ButtonList';

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
            <ButtonList>
              {[
                <Link
                  key={0}
                  className="btn-inverse on-white"
                  to={newArtistArticleUrl(artist.slug)}>
                Write
                </Link>,
              ]}
            </ButtonList>
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
