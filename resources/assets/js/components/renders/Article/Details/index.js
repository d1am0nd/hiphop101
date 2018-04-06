import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {artistUrl} from '@/routes/routes';
import {tsToHuman as toHuman} from '@/helpers/time';

const Details = ({article, artist}) => (
  <div className="article-details">
    <ul>
      {
        artist ?
          <li><b>
            <Link to={artistUrl(artist.slug)}>{artist.name}</Link>
          </b></li> :
          null
      }
      <li>Likes: <b>{article.likes_count}</b></li>
      <li>Author: {article.user.name}</li>
      {
        article.updated_at ?
          <li>Last change: {toHuman(article.updated_at * 1000)}</li> :
          null
      }
    </ul>
  </div>
);

Details.propTypes = {
  article: PropTypes.object.isRequired,
  artist: PropTypes.object,
};

export default Details;
