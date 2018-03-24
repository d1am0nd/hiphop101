import marked from 'marked';

import heading from './dom/heading';
import image from './dom/image';

const renderer = new marked.Renderer();

renderer.heading = heading(renderer);
renderer.image = image(renderer);

export default renderer;
