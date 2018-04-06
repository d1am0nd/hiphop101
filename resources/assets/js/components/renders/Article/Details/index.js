import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {artistUrl} from '@/routes/routes';
import {dbTsToHuman as toHuman} from '@/helpers/time';

const Details = ({article, artist, author}) => (
  <div className="article-details">
    <ul>
      {
        article.likes_count ?
          <li>Likes: <strong>{article.likes_count}</strong></li> : null
      }
      {
        artist ?
          <li>
            Artist:{` `}
            <Link to={artistUrl(article.artist.slug)}>
              {article.artist.name}
            </Link>
          </li> : null
      }
      {
        author ?
          <li>Author: {author.name}</li> : null
      }
      {
        article.updated_at ?
          <li>Last edit: {toHuman(article.updated_at)}</li> : null
      }
    </ul>
  </div>
);

Details.propTypes = {
  article: PropTypes.object.isRequired,
  artist: PropTypes.object,
  author: PropTypes.object,
};

export default Details;
