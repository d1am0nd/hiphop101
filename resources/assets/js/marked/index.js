import marked from 'marked';

import {defaultConfig} from './config';

// Add _blank to links
/*
renderer.link = link(renderer);
renderer.code = code(renderer);
renderer.image = image(renderer);
*/

const toHtml = (text) => marked(
  text,
  defaultConfig
);

export {
  toHtml,
};
