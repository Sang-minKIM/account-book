const BASE_URL = 'http://localhost:3000'

export async function fetchData(path: string, init?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
  })

  const json = await response.json()
  return json
}
