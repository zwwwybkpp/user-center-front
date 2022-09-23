export default [

  /**
   * 用户登录、用户注册
   */
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        component: './user/Login',
      },
      {
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: "欢迎页",
    path: '/welcome',
    icon: 'smile',
    component: './Welcome',
  },
  /**
   * 管理页,仅管理员可见
   */
  {
    path: '/admin',
    name: "管理页",
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manager',
        name: "用户管理",
        icon: 'table',
        component: './admin/UserManager',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
