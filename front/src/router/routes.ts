import { RouteRecordRaw } from 'vue-router';
import {fillRegistrationGuard} from 'src/router/middleware/fill-registration-guard';
import {forgotPasswordGuard} from 'src/router/middleware/forgot-password-guard';
import {adminGuard} from 'src/router/middleware/admin-guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/forum',
    component: () => import('layouts/ForumLayout.vue'),
    children: [
      {
        path: '',
        alias: 'create-topic',
        name: 'createTopic',
        component: () => import('pages/forum/TopicCreatePage.vue'),
      },
      {
        path: 'topic-details/:id',
        component: () => import('pages/forum/TopicDetails.vue'),
      },
    ]
  },
  {
    path: '/',
    name: 'welcome',
    component: () => import('pages/HomePage.vue'),
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        alias: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      {
        path: 'active-account',
        name: 'accountActivation',
        component: () => import('pages/auth/AccountActivationPage.vue'),
      },
      {
        path: 'reset-password',
        beforeEnter: forgotPasswordGuard,
        name: 'resetPassword',
        component: () => import('pages/auth/ResetPasswordPage.vue'),
      },
      {
        path: 'fill-registration',
        name: 'fillRegistration',
        beforeEnter: fillRegistrationGuard,
        component: () => import('pages/auth/FillRegistrationPage.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    beforeEnter: adminGuard,
    children: [
      {
        path: '',
        alias: 'home',
        name: 'home',
        component: () => import('pages/admin/AdminHome.vue'),
      },
      {
        path: 'documents',
        name: 'document',
        component: () => import('pages/admin/AdminDocuments.vue'),
      },
      {
        path: 'categories',
        name: 'category',
        component: () => import('pages/admin/AdminCategories.vue'),
      },
      {
        path: 'users',
        name: 'user',
        component: () => import('pages/admin/AdminUsers.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: 'payments',
        name: 'payment',
        component: () => import('pages/admin/AdminPayments.vue'),
      }
    ],
  },
  {
    path: '/my-space',
    component: () => import('layouts/MySpaceLayout.vue'),
    children: [
      {
        path: '',
        alias: 'payment/new',
        name: 'paymentNew',
        component: () => import('pages/my-space/PaymentNewPage.vue')
      },
      {
        path: 'payment/purchase',
        name: 'purchase',
        component: () => import('pages/my-space/MyPurchasePage.vue')
      },
      {
        path: 'payment/list',
        name: 'paymentList',
        component: () => import('pages/my-space/PaymentsList.vue')
      },
    ],
  },
  {
    path: '/teacher',
    component: () => import('layouts/TeacherLayout.vue'),
    children: [
      {
        path: '',
        alias: 'document-create',
        name: 'teacherDocument',
        component: () => import('pages/teacher/TeacherDocumentCreate.vue'),
      },
      {
        path: 'list',
        name: 'teacherDocumentList',
        component: () => import('pages/teacher/TeacherDocumentsList.vue'),
      },
      {
        path: 'profile',
        name: 'teacherProfile',
        component: () => import('pages/ProfilePage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
