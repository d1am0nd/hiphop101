import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  fetchArticle,
  fetchMyArticles,
  fetchArtistWithArticles,
} from '@/store/actions/artists';
import {fetchPopularArticles} from '@/store/actions/popular';
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

      const {match, location, dispatch} = this.props;
      const {params} = match;
      const {search} = location;
      const getParams = new URLSearchParams(search);
      const pn = !!getParams.get('page') ? getParams.get('page') : null;

      let action = () => {};
      switch (match.path) {
      case '/': {
        console.log('pn', pn);
        action = () => dispatch(
          fetchPopularArticles(pn)
        );
        break;
      }
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
