import Home from '@/components/scenes/Home';
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

const routes = [
  {
    path: '/',
    component: Home,
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
    component: authOnly(MyProfile),
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
