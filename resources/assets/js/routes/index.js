import Home from '@/components/scenes/Home';
import Faq from '@/components/scenes/Faq';
import Artist from '@/components/scenes/Artist';
import NewArticle from '@/components/scenes/NewArticle';

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
];

const sidebar = routes.filter((route) => !!route.info.sidebar);

export {
  routes,
  sidebar,
};
