
export const ROUTES_DATA = {
  admin: [
    {
      title: 'paths.dashboard',
      icon: 'dashboard',
      to: '/admin/dashboard'
    },
    {
      title: 'paths.profile',
      icon: 'person',
      to: '/admin/profile'
    },
    {
      title: 'paths.category',
      icon: 'category',
      to: '/admin/categories'
    },
    {
      title: 'paths.document',
      icon: 'bookmark',
      to: '/admin/documents'
    },
    {
      title: 'paths.user',
      icon: 'group',
      to: '/admin/users'
    },

    {
      title: 'paths.payment',
      icon: 'payments',
      to: '/admin/payments'
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
      title: 'new',
      to: '/teacher/document-create',
      icon: 'add',
    },
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
