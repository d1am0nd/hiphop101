import Home from '@/components/scenes/Home';
import Faq from '@/components/scenes/Faq';
import Artist from '@/components/scenes/Artist';

const routes = [
  {
    path: '/',
    component: Home,
    props: {
      auth: true,
    },
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
];

const sidebar = routes.filter((route) => !!route.info.sidebar);

export {
  routes,
  sidebar,
};
