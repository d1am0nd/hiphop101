import React from 'react';
import PropTypes from 'prop-types';

import {tsToHuman as toHuman} from '@/helpers/time';

const Details = ({article}) => (
  <div className="article-details">
    <ul>
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
};

export default Details;
