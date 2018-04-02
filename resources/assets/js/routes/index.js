// import Home from '@/components/scenes/Home';
import Shaq from '@/components/loading/Shaq';
import About from '@/components/scenes/About';
import HowToWrite from '@/components/scenes/HowToWrite';
import Artist from '@/components/scenes/Artist';
import NewArtist from '@/components/scenes/NewArtist';
import NewArticle from '@/components/scenes/NewArticle';
import NewArtistArticle from '@/components/scenes/NewArtistArticle';
import EditArtistArticle from '@/components/scenes/EditArtistArticle';
import ArtistArticle from '@/components/scenes/ArtistArticle';
import MyProfile from '@/components/scenes/MyProfile';

import authOnly from '@/components/hoc/authOnly';
import fetchesData from '@/components/hoc/fetchesData';

const routes = [
  {
    path: '/',
    component: Shaq,
    info: {
      name: 'Home',
      sidebar: true,
    },
  },
  {
    path: '/about',
    component: About,
    info: {
      name: 'About',
      sidebar: true,
    },
  },
  {
    path: '/how-to-write-an-article',
    component: HowToWrite,
    info: {
      name: 'How to Write',
      sidebar: true,
    },
  },
  {
    path: '/artists/:slug',
    component: fetchesData(Artist),
    info: {
      sidebar: false,
    },
  },
  {
    path: '/artists/:artistSlug/:prefix/:articleSlug',
    component: fetchesData(ArtistArticle),
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
    path: '/articles/id/:id',
    component: authOnly(EditArtistArticle),
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
  {
    path: '/profile',
    component: fetchesData(authOnly(MyProfile)),
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
