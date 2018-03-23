export default {
  options: [
    'blockType',
    'inline',
    'list',
    'link',
    'image',
    'remove',
    /*
    'fontSize',
    'fontFamily',
    'colorPicker',
    'textAlign',
    'embedded',
    'emoji',
    'history',
    */
  ],
  inline: {
    options: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      /*
      'monospace',
      'superscript',
      'subscript',
      */
    ],
  },
  blockType: {
    options: [
      'Normal',
      /*
      'H1',
      */
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      /*
      'Blockquote',
      'Code',
      */
    ],
  },
  list: {
    options: [
      'unordered',
      'ordered',
      /*
      'indent',
      'outdent',
      */
    ],
  },
  image: {
    urlEnabled: true,
    uploadEnabled: false,
    previewImage: true,
    alignmentEnabled: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: {
      present: false,
      mandatory: false,
    },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
    title: undefined,
  },
};
