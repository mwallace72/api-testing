import got from 'got'

import { factObjectMatcher, factRoute } from './consts'

test('gets a fact', async () => {
  const response = await got(factRoute)
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(factObjectMatcher)
  expect(json.length).toEqual(json.fact.length)
})

test.each([30, 100])('gets a fact with a set max length %s', async (length) => {
  const response = await got(factRoute, {
    searchParams: {
      max_length: length,
    },
  })
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual(factObjectMatcher)
  expect(json.length).toEqual(json.fact.length)
  expect(json.length).toBeLessThanOrEqual(length)
})

test.each([0, -5])('gets a fact with border max length %s', async (length) => {
  const response = await got(factRoute, {
    searchParams: {
      max_length: length,
    },
  })
  expect(response.statusCode).toEqual(200)
  const json = JSON.parse(response.body)
  expect(json).toEqual({})
})
