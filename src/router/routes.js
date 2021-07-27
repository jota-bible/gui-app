const routes = [
{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      meta: {
        title: ''
      },
      component: () =>
        import('pages/Search.vue')
    },
    {
      path: '/reading-plan',
      meta: {
        title: 'Plan czytania'
      },
      component: () =>
        import('pages/ReadingPlan.vue')
    },
    {
      path: '/settings',
      meta: {
        title: 'Ustawienia'
      },
      component: () =>
        import('pages/Settings.vue')
    }
  ]
},
{
  path: '/reading-plan-print',
  meta: {
    title: 'Wydruk planu czytania'
  },
  component: () =>
    import('pages/ReadingPlanPrint.vue')
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () =>
      import('pages/Error404.vue')
  })
}

export default routes
