import {post, patch, get} from './defaults';

const REGISTER_URL = '/api/auth/register';
const LOGIN_URL = '/api/auth/login';
const LOGOUT_URL = '/api/auth/logout';
const REFRESH_URL = '/api/auth/refresh';
const MY_ARTICLES_URL = '/api/auth/articles';

const registerUrl = () => REGISTER_URL;
const loginUrl = () => LOGIN_URL;
const logoutUrl = () => LOGOUT_URL;
const refreshUrl = () => REFRESH_URL;
const myArticlesUrl = () => MY_ARTICLES_URL;
const myArticleUrl = (id) => `${MY_ARTICLES_URL}/${id}`;

// Requires: name, email, password, password_confirmation
const register = (registerInfo) => post(registerUrl(), registerInfo);

// Requires: email, password
const login = (credentials) => post(loginUrl(), credentials);

const logout = () => post(logoutUrl());

const refreshToken = () => post(refreshUrl());

const myArticles = () => get(myArticlesUrl());
const myArticle = (id) => get(myArticleUrl(id));
const patchArticle = (id, article) => patch(myArticleUrl(id), article);

export {
  register,
  logout,
  login,
  refreshToken,
  myArticles,
  myArticle,
  patchArticle,
};
