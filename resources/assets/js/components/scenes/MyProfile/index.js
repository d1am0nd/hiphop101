import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getUsername, getUser} from '@/store/selectors/auth';
import {deleteMyArticle} from '@/store/actions/artists';
import {getMyArticles} from '@/store/selectors/artists';
import {articleUrl, editArticleUrl} from '@/routes/routes';

import {Link} from 'react-router-dom';
import ArticleShort from '@/components/renders/ArticleShort';
import ArticleDetails from '@/components/renders/Article/Details';
import H1 from '@/components/simple/content/H1';
import Section from '@/components/simple/content/Section';
import ButtonList from '@/components/simple/content/ButtonList';

class MyProfile extends Component {
  render() {
    const {user, articles} = this.props;
    return (
      <div>
        <H1>{user.name}</H1>
        {articles.length > 0 ?
          <Section title="My articles">
            <ul className="short-descriptions">
              {articles.map((article, i) => (
                <li key={i}>
                  <ArticleShort article={article}/>
                  <ArticleDetails
                    article={article}
                    artist={article.artist}
                    author={user}/>
                  <ButtonList>
                    {[
                      <Link
                        key={0}
                        className="btn-inverse on-white"
                        to={editArticleUrl(article.id)}>
                        Edit
                      </Link>,
                      ...(article.active !== 1 ?
                        [
                          <a
                            key={1}
                            className="btn-alert on-white"
                            onClick={
                              (e) => this.props.deleteMyArticle(article.id)
                            }
                            to={
                              articleUrl(
                                article.artist.slug,
                                article.prefix,
                                article.slug
                              )
                            }>
                            Delete draft
                          </a>,
                        ] : []
                      ),
                      article.active === 1 ?
                        <Link
                          key={2}
                          className="btn-normal on-white"
                          to={
                            articleUrl(
                              article.artist.slug,
                              article.prefix,
                              article.slug
                            )
                          }>
                          Read
                        </Link> :
                        <b key={3}>Not published</b>,
                    ]}
                  </ButtonList>
                </li>
              ))}
            </ul>
          </Section>
          :
          <Section title="You haven't written any articles"/>
        }
      </div>
    );
  }
}

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  deleteMyArticle: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMyArticle: (id) => dispatch(deleteMyArticle(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    username: getUsername(state),
    articles: getMyArticles(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
