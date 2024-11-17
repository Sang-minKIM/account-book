export const ROUTE = {
  root: '/',
  station: (param: string) => `/station/${param}`,
  //만약 동적인 파라미터가 필요한경우
  // somethingDynamicRoute: (param:string) => `/page/${param}`
}
