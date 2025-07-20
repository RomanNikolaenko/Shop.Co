export const STATIC_ROUTES = {
  HOME: {
    Path: '',
    RouterLink: '/',
    Title: 'SHOP.CO | Home',
  },

  ABOUT: {
    Path: 'about',
    RouterLink: '/about',
    Title: 'SHOP.CO | About Us',
  },

  USER: {
    Path: 'user',
    RouterLink: '/user',
    CH: {
      LOGIN: {
        Path: 'login',
        RouterLink: '/user/login',
        Title: 'SHOP.CO | Login',
      },
      REGISTER: {
        Path: 'register',
        RouterLink: '/user/register',
        Title: 'SHOP.CO | Register',
      },
    },
  },

  NOT_FOUND: {
    Path: '**',
    RouterLink: '/**',
    Title: 'SHOP.CO | Not Found',
  },
};
