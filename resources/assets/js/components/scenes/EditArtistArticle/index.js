import React, {Component} from 'react';

import {
  values as artistValues,
} from '@/objects/artist';
import {
  values as articleValues,
  errors as articleErrors,
} from '@/objects/artist';

class EditArtistArticle extends Component {
  constructor() {
    super();
    this.state = {
      artist: {...artistValues},
      values: {...articleValues},
      errors: {...articleErrors},
    };
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default EditArtistArticle;
