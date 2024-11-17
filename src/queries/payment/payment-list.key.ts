export const PAYMENTS_LIST_ENDPOINT = {
  default: '/payments',
  sort: (body: { pageSize: number; pageNumber: number }) =>
    `/payments?_limit=${body.pageSize}&_page=${body.pageNumber}`,
}

export const PAYMENTS_LIST_KEY = {
  default: ['payments-list'],
  sort: (body: { pageSize: number; pageNumber: number }) => {
    return [...PAYMENTS_LIST_KEY.default, body.pageSize, body.pageNumber]
  },
}
