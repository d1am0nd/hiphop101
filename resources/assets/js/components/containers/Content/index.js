import React, {Component} from 'react';
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
            render={(props) => (
              <route.component
                {...props}
                {...route.props}/>
            )}/>
        ))}
      </article>
    );
  }
}

export default Content;
