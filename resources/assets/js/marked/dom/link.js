import React from 'react';
import {renderToString} from 'react-dom/server';

import A from '@/components/simple/content/A';

// Add _blank to links
const link = (renderer) => (href, title, text) => {
  // Sanitize
  let prot = '';
  try {
    prot = decodeURIComponent(unescape(href))
      .replace(/[^\w:]/g, '')
      .toString()
      .toLowerCase();
  } catch (e) {
    return '';
  }
  if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
    return '';
  }
  return `<a href="${href}"` +
    `title="${title}"` +
    `target="_blank">` +
    text +
    `</a>`;
  return renderToString(
    <A
      href={href}
      title={title}
      attributes={{
        target: '_blank',
      }}>
      {text}
    </A>
  );
};

export default link;
