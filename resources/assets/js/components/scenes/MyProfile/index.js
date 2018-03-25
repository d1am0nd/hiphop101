import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getUsername} from '@/store/selectors/auth';
import {getData} from '@/api/helpers';
import {myArticles} from '@/api/auth';
import {articleUrl, editArticleUrl} from '@/routes/routes';

import {Link} from 'react-router-dom';
import ArticleShort from '@/components/renders/ArticleShort';
import H1 from '@/components/simple/content/H1';
import Section from '@/components/simple/content/Section';

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    myArticles()
      .then((res) => {
        this.setState({
          articles: getData(res),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {username} = this.props;
    const {articles} = this.state;
    return (
      <div>
        <H1>{username}</H1>
        <Section title="My articles">
          <ul className="short-descriptions">
            {articles.map((article, i) => (
              <li key={i}>
                <ArticleShort article={article}/>
                <ul className="buttons">
                  <li>
                    <Link to={
                      articleUrl(
                        article.artist.slug,
                        article.prefix,
                        article.slug
                      )
                    }>
                      See
                    </Link>
                  </li>
                  <li>
                    <Link to={editArticleUrl(article.id)}>
                      Edit
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    );
  }
}

MyProfile.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    username: getUsername(state),
  };
};

export default connect(mapStateToProps)(MyProfile);
