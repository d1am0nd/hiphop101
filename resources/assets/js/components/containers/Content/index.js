import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import {routes} from '@/routes';

class Content extends Component {
  render() {
    return (
      <article className="content">
        {routes.map((route, i) => (
          <Route
            exact={true}
            key={i}
            path={route.path}
            render={() => <route.component {...route.props}/>}/>
        ))}
      </article>
    );
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
