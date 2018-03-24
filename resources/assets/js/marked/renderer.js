import marked from 'marked';

import heading from './dom/heading';
import image from './dom/image';
import link from './dom/link';

const renderer = new marked.Renderer();

renderer.heading = heading(renderer);
renderer.image = image(renderer);
renderer.link = link(renderer);

export default renderer;
