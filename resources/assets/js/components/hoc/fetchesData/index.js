import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import hasAuthListener from '@/components/hoc/hasAuthListener';

import Shaq from '@/components/loading/Shaq';

const fetchesData = (WrappedComponent, fetchMethod) => {
  class FetchesData extends React.Component {
    constructor(props) {
      super(props);
      this.fetchData = this.fetchData.bind(this);
      this.state = {
        isLoading: true,
      };
    }

    fetchData() {
      this.setState({isLoading: true});

      const {match, location, dispatch} = this.props;
      const {params} = match;
      const {search} = location;
      const getParams = new URLSearchParams(search);
      const pn = !!getParams.get('page') ? getParams.get('page') : null;

      dispatch(fetchMethod(params, pn))
        .then((res) => {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        })
        .catch((res) => {
          this.setState({
            ...this.state,
            isLoading: false,
          });
        });
    }

    componentDidMount() {
      this.fetchData();
      this.props.addAuthListener(
        this.fetchData
      );
    }

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.fetchData();
      }
    }

    render() {
      return (
        !!this.state.isLoading ?
          <Shaq/> :
          <WrappedComponent
            {...this.props}
          />
      );
    }
  }

  FetchesData.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    addAuthListener: PropTypes.func.isRequired,
  };

  return withRouter(connect()(
    hasAuthListener(FetchesData)
  ));
};

export default fetchesData;
