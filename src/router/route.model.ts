export const ROUTE = {
  root: '/',
  payment: {
    list: '/payments',
    detail: (id: string) => `/payments/${id}`,
  },
  //만약 동적인 파라미터가 필요한경우
  // somethingDynamicRoute: (param:string) => `/page/${param}`
}
