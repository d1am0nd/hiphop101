import React, {Component} from 'react';
import PropTypes from 'prop-types';

import H1 from '@/components/simple/content/H1';

class Artist extends Component {
  render() {
    const {slug} = this.props.match.params;
    return (
      <div>
        <H1>{slug}</H1>
        test
      </div>
    );
  }
}

Artist.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Artist;
