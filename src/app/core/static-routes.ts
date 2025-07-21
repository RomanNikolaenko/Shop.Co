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
      FORGOT: {
        Path: 'forgot',
        RouterLink: '/user/forgot',
        Title: 'SHOP.CO | Forgot',
      },
      OTP: {
        Path: 'otp',
        RouterLink: '/user/otp',
        Title: 'SHOP.CO | Otp',
      },
    },
  },

  NOT_FOUND: {
    Path: '**',
    RouterLink: '/**',
    Title: 'SHOP.CO | Not Found',
  },
};
