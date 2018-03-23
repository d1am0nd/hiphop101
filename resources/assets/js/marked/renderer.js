import marked from 'marked';

import heading from './dom/heading';

const renderer = new marked.Renderer();

renderer.heading = heading(renderer);

export default renderer;
