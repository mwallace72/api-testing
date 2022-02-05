import got from 'got'

import {
  breedObjectMatcher,
  breedsObjectMatcher,
  breedsRoute,
  linkObjectMatcher,
} from './consts'

test('gets list of breeds', async () => {
  const response = await got(breedsRoute)
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(breedsObjectMatcher)
  json.data.forEach((data) => {
    expect(data).toEqual(breedObjectMatcher)
  })
  json.links.forEach((link) => {
    expect(link).toEqual(linkObjectMatcher)
  })
  // Check default pagination
  expect(json.current_page).toEqual(1)
  expect(json.first_page_url).toEqual(expect.stringContaining('1'))
})

test.each([10, 23])('gets list of breeds with limit %s', async (limit) => {
  const response = await got(breedsRoute, {
    searchParams: {
      limit,
    },
  })
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(breedsObjectMatcher)
  json.data.forEach((data) => {
    expect(data).toEqual(breedObjectMatcher)
  })
  json.links.forEach((link) => {
    expect(link).toEqual(linkObjectMatcher)
  })
  expect(json.data.length).toBeLessThanOrEqual(limit)
  expect(json.per_page).toEqual(limit.toString())
  // Check default pagination
  expect(json.current_page).toEqual(1)
  expect(json.first_page_url).toEqual(expect.stringContaining('1'))
})
