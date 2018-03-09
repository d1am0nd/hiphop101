import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
  render() {
    return (
      <article className="content">
        {this.props.children}
      </article>
    );
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
