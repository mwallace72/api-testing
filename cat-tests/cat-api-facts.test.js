import got from 'got'

import {
  factObjectMatcher,
  factsEmptyObjectMatcher,
  factsObjectMatcher,
  factsRoute,
  linkObjectMatcher,
} from './consts'

test('gets list of facts', async () => {
  const response = await got(factsRoute)
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(factsObjectMatcher)
  json.data.forEach((data) => {
    expect(data).toEqual(factObjectMatcher)
  })
  json.links.forEach((link) => {
    expect(link).toEqual(linkObjectMatcher)
  })
  // Check default pagination
  expect(json.current_page).toEqual(1)
  expect(json.first_page_url).toEqual(expect.stringContaining('1'))
})

test.each([30, 100])(
  'gets list of facts with a set max length %s',
  async (length) => {
    const response = await got(factsRoute, {
      searchParams: {
        max_length: length,
      },
    })
    expect(response.statusCode).toEqual(200)
    const json = JSON.parse(response.body)
    expect(json).toEqual(factsObjectMatcher)
    json.data.forEach((data) => {
      expect(data).toEqual(factObjectMatcher)
      expect(data.length).toBeLessThanOrEqual(length)
    })
    json.links.forEach((link) => {
      expect(link).toEqual(linkObjectMatcher)
    })
    // Check default pagination
    expect(json.current_page).toEqual(1)
    expect(json.first_page_url).toEqual(expect.stringContaining('1'))
  }
)

test.each([0, -5])(
  'gets list of facts with border max length %s',
  async (length) => {
    const response = await got(factsRoute, {
      searchParams: {
        max_length: length,
      },
    })
    expect(response.statusCode).toEqual(200)
    const json = JSON.parse(response.body)
    expect(json).toEqual(factsEmptyObjectMatcher)
  }
)

test.each([10, 23])('gets list of facts with limit %s', async (limit) => {
  const response = await got(factsRoute, {
    searchParams: {
      limit,
    },
  })
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(factsObjectMatcher)
  json.data.forEach((data) => {
    expect(data).toEqual(factObjectMatcher)
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

test('gets list of facts with limit -1', async () => {
  const response = await got(factsRoute, {
    throwHttpErrors: false,
    searchParams: {
      limit: -1,
    },
  })
  expect(response.statusCode).toEqual(404)
  const json = JSON.parse(response.body)
  expect(json.message).toEqual('Not Found')
})

test('gets list of facts with limit & max_length', async () => {
  const limit = 3
  const length = 20
  const response = await got(factsRoute, {
    searchParams: {
      limit,
      max_length: length,
    },
  })
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(factsObjectMatcher)
  json.data.forEach((data) => {
    expect(data).toEqual(factObjectMatcher)
    expect(data.length).toBeLessThanOrEqual(length)
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
