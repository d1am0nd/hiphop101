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
    return text;
  }
  if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
    return text;
  }
  // If it starts with #, don't insert blank
  const blank = href.length > 0 && href[0] !== '#';

  return `<a href="${href}"` +
    `title="${title}"` +
    `${blank ? 'target="_blank"' : ''}>` +
    text +
    `</a>`;
};

export default link;
