import {
  fetchArticle,
  fetchMyArticles,
  fetchArtistWithArticles,
} from '@/store/actions/artists';
import {fetchPopularArticles} from '@/store/actions/popular';

const mapPopularAarticles = ({}, pn) => fetchPopularArticles(pn);
const mapArtistWithArticles = ({slug}) => fetchArtistWithArticles(slug);
const mapFetchArticle = ({artistSlug, prefix, articleSlug}) => fetchArticle(
  artistSlug, prefix, articleSlug
);
const mapFetchMyArticles = ({}) => fetchMyArticles();

export {
  mapPopularAarticles,
  mapArtistWithArticles,
  mapFetchArticle,
  mapFetchMyArticles,
};
