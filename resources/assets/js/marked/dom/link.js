import {extractRootDomain as erd} from '@/helpers/domain';

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
  const domain = erd(href);

  return `<a href="${href}"` +
    `title="${title}"` +
    `${blank ? 'target="_blank"' : ''}>` +
    text +
    `</a> <span class="href-domain">(${domain})</span>`;
};

export default link;
