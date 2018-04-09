import React from 'react';
import PropTypes from 'prop-types';

import ButtonList from '@/components/simple/content/ButtonList';
import Next from './Next';
import Prev from './Prev';

const makeUrl = (page) => {
  const {pathname, search} = window.location;
  const params = new URLSearchParams(search);
  params.set('page', page);
  return `${pathname}?${params.toString()}`;
};

const Simple = ({next, prev}) => (
  <ButtonList>
    {[
      ...(next ?
        [<Next key="next" url={makeUrl(next)}/>] :
        []),
      ...(prev ?
        [<Prev key="prev" url={makeUrl(prev)}/>] :
        []),
    ]}
  </ButtonList>
);

Simple.propTypes = {
  prev: PropTypes.number,
  next: PropTypes.number,
};

export default Simple;
