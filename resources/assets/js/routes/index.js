import Home from '@/components/scenes/Home';
import Faq from '@/components/scenes/Faq';
import Artist from '@/components/scenes/Artist';
import NewArtist from '@/components/scenes/NewArtist';
import NewArticle from '@/components/scenes/NewArticle';
import NewArtistArticle from '@/components/scenes/NewArtistArticle';
import ArtistArticle from '@/components/scenes/ArtistArticle';

import authOnly from '@/components/hoc/authOnly';

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
    path: '/artists/:artistSlug/:prefix/:articleSlug',
    component: ArtistArticle,
    info: {
      sidebar: false,
    },
  },
  {
    path: '/articles/new',
    component: authOnly(NewArticle),
    info: {
      sidebar: false,
    },
  },
  {
    path: '/articles/:slug/new',
    component: authOnly(NewArtistArticle),
    info: {
      sidebar: false,
    },
  },
  {
    path: '/artist/new',
    component: authOnly(NewArtist),
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
