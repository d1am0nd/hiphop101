import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  fetchArticle,
  fetchMyArticles,
  fetchArtistWithArticles,
} from '@/store/actions/artists';
import hasAuthListener from '@/components/hoc/hasAuthListener';

import Shaq from '@/components/loading/Shaq';

const fetchesData = (WrappedComponent) => {
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

      const {match, dispatch} = this.props;
      const {params} = match;

      let action = () => {};
      switch (match.path) {
      case '/artists/:slug': {
        action = () => dispatch(
          fetchArtistWithArticles(params.slug)
        );
        break;
      }
      case '/artists/:artistSlug/:prefix/:articleSlug': {
        action = () => dispatch(
          fetchArticle(
            params.artistSlug,
            params.prefix,
            params.articleSlug
          )
        );
        break;
      }
      case '/profile': {
        action = () => dispatch(
          fetchMyArticles()
        );
        break;
      }
      }

      action()
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
