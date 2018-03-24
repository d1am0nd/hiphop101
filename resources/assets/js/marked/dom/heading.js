import React from 'react';
import {renderToString} from 'react-dom/server';

import H2 from '@/components/simple/content/H2';
import H3 from '@/components/simple/content/H3';
import H4 from '@/components/simple/content/H4';
import H5 from '@/components/simple/content/H5';
import H6 from '@/components/simple/content/H6';

const numberToComponent = (n) => {
  switch (n) {
  case 1: {
    return H2;
  }
  case 2: {
    return H3;
  }
  case 3: {
    return H4;
  }
  case 4: {
    return H5;
  }
  case 5: {
    return H6;
  }
  case 6: {
    return H6;
  }
  }
  return H6;
};

const heading = (renderer) => (text, level, raw) => {
  const Comp = numberToComponent(level);
  return renderToString(
    <Comp attributes={{
      id: raw.toLowerCase().replace(/[^\w]+/g, '-'),
    }}>
      {text}
    </Comp>
  );
};

export default heading;
