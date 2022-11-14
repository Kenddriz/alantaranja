
export const ROUTES_DATA = {
  admin: [
    {
      title: 'paths.dashboard',
      icon: 'dashboard',
      to: '/admin/dashboard'
    },

    {
      title: 'paths.payment',
      icon: 'payments',
      to: '/admin/payments'
    },

    { title: 'paths.user' },

    {
      title: 'user.all',
      icon: 'group',
      to: '/admin/users'
    },

    {
      title: 'paths.profile',
      icon: 'person',
      to: '/admin/profile'
    },

    { title: 'paths.document' },

    {
      title: 'document.all',
      icon: 'bookmark',
      to: '/admin/documents'
    },

    {
      title: 'paths.category',
      icon: 'category',
      to: '/admin/categories'
    },

    {
      title: 'paths.forum',
      icon: 'comment',
      to: '/forum'
    },
  ],

  user: [
    { title: 'paths.payment' },
    {
      title: 'new',
      to: '/my-space/payment/new',
      icon: 'shopping_cart',
    },
    {
      title: 'list',
      to: '/my-space/payment/list',
      icon: 'list',
    },
    { separator: true },
    {
      title: 'paths.purchase',
      icon: 'add_shopping_cart',
      to: '/my-space/payment/purchase'
    },

    {
      title: 'paths.profile',
      icon: 'person',
      to: '/my-space/profile'
    },
    {
      title: 'paths.forum',
      icon: 'comment',
      to: '/forum'
    },
  ],
  teacher: [
    { title: 'paths.teacherDocument' },
    {
      title: 'list',
      icon: 'list',
      to: '/teacher/list'
    },
    {
      title: 'paths.category',
      icon: 'category',
      to: '/teacher/categories'
    },
    { separator: true },
    {
      title: 'paths.teacherProfile',
      icon: 'person',
      to: '/teacher/profile'
    },
    {
      title: 'paths.forum',
      icon: 'comment',
      to: '/forum'
    },
  ]
}
