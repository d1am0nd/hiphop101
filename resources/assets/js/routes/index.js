import Home from '@/components/scenes/Home';
import Faq from '@/components/scenes/Faq';

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
    props: {

    },
    info: {
      name: 'FAQ',
      sidebar: true,
    },
  },
];

const sidebar = routes.filter((route) => !!route.info.sidebar);

export {
  routes,
  sidebar,
};
