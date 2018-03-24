import React from 'react';
import Img from '@/components/simple/content/Img';
import {renderToString} from 'react-dom/server';

const image = (renderer) => (src, title, alt) => renderToString(
  <Img
    src={src}
    attributes={{
      title: title,
      alt: alt,
    }}/>
);

export default image;
