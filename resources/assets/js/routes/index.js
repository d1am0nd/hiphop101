import Home from '@/components/scenes/Home';
import Faq from '@/components/scenes/Faq';
import Artist from '@/components/scenes/Artist';
import NewArtist from '@/components/scenes/NewArtist';
import NewArticle from '@/components/scenes/NewArticle';
import NewArtistArticle from '@/components/scenes/NewArtistArticle';

const routes = [
  {
    path: '/',
    component: Home,
    info: {
      name: 'Home',
    },
  },
  {
    path: '/faq',
    component: Faq,
    info: {
      name: 'FAQ',
      sidebar: true,
    },
  },
  {
    path: '/artists/:slug',
    component: Artist,
    info: {
      sidebar: false,
    },
  },
  {
    path: '/articles/new',
    component: NewArticle,
    props: {
      auth: true,
    },
    info: {
      sidebar: false,
    },
  },
  {
    path: '/articles/:slug/new',
    component: NewArtistArticle,
    props: {
      auth: true,
    },
    info: {
      sidebar: false,
    },
  },
  {
    path: '/artist/new',
    component: NewArtist,
    props: {
      auth: true,
    },
    info: {
      sidebar: false,
    },
  },
];

const sidebar = routes.filter((route) => !!route.info.sidebar);

export {
  routes,
  sidebar,
};
