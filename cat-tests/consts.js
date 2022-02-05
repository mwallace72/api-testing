const baseRoute = 'https://catfact.ninja/'
const factsRoute = `${baseRoute}facts`
const breedsRoute = `${baseRoute}breeds`

const nullOrAnyError = (expected, received) =>
  `expected null or instance of ${this.utils.printExpected(
    expected
  )}, but received ${this.utils.printReceived(received)}`

expect.extend({
  nullOrAny: (received, expected) => {
    if (received === null) {
      return {
        pass: true,
        message: () => nullOrAnyError(expected, received),
      }
    }

    if (expected == String) {
      return {
        pass: typeof received == 'string' || received instanceof String,
        message: () => nullOrAnyError(expected, received),
      }
    }

    if (expected == Number) {
      return {
        pass: typeof received == 'number' || received instanceof Number,
        message: () => nullOrAnyError(expected, received),
      }
    }

    if (expected == Function) {
      return {
        pass: typeof received == 'function' || received instanceof Function,
        message: () => nullOrAnyError(expected, received),
      }
    }

    if (expected == Object) {
      return {
        pass: received !== null && typeof received == 'object',
        message: () => nullOrAnyError(expected, received),
      }
    }

    if (expected == Boolean) {
      return {
        pass: typeof received == 'boolean',
        message: () => nullOrAnyError(expected, received),
      }
    }

    if (typeof Symbol != 'undefined' && this.expectedObject == Symbol) {
      return {
        pass: typeof received == 'symbol',
        message: () => nullOrAnyError(expected, received),
      }
    }

    return {
      pass: received instanceof expected,
      message: () =>
        `expected null or instance of ${this.utils.printExpected(
          expected
        )}, but received ${this.utils.printReceived(received)}`,
    }
  },
  numberOrNumericString: (received) => {
    return {
      pass:
        typeof received == 'number' ||
        received instanceof Number ||
        !Number.isNaN(received),
      message: () =>
        `expected number or numeric string but received ${this.utils.printReceived(
          received
        )}`,
    }
  },
})

module.exports = {
  baseRoute,
  factsRoute,
  factsObjectMatcher: expect.objectContaining({
    current_page: expect.any(Number),
    data: expect.any(Array),
    first_page_url: expect.any(String),
    from: expect.any(Number),
    last_page: expect.any(Number),
    last_page_url: expect.any(String),
    links: expect.any(Array),
    next_page_url: expect.nullOrAny(String),
    path: factsRoute,
    per_page: expect.numberOrNumericString(),
    prev_page_url: expect.nullOrAny(String),
    to: expect.any(Number),
    total: expect.any(Number),
  }),
  factRoute: `${baseRoute}fact`,
  factObjectMatcher: expect.objectContaining({
    fact: expect.any(String),
    length: expect.any(Number),
  }),
  linkObjectMatcher: expect.objectContaining({
    url: expect.nullOrAny(String),
    label: expect.any(String),
    active: expect.any(Boolean),
  }),
  factsEmptyObjectMatcher: expect.objectContaining({
    current_page: 1,
    data: [],
    first_page_url: expect.stringContaining('1'),
    from: null,
    last_page: 1,
    last_page_url: expect.stringContaining('1'),
    links: [
      { url: null, label: expect.any(String), active: false },
      {
        url: expect.stringContaining('1'),
        label: '1',
        active: true,
      },
      { url: null, label: 'Next', active: false },
    ],
    next_page_url: null,
    path: factsRoute,
    per_page: 10,
    prev_page_url: null,
    to: null,
    total: 0,
  }),
  breedsRoute: `${baseRoute}breeds`,
  breedsObjectMatcher: expect.objectContaining({
    current_page: expect.any(Number),
    data: expect.any(Array),
    first_page_url: expect.any(String),
    from: expect.any(Number),
    last_page: expect.any(Number),
    last_page_url: expect.any(String),
    links: expect.any(Array),
    next_page_url: expect.nullOrAny(String),
    path: breedsRoute,
    per_page: expect.numberOrNumericString(),
    prev_page_url: expect.nullOrAny(String),
    to: expect.any(Number),
    total: expect.any(Number),
  }),
  breedObjectMatcher: expect.objectContaining({
    breed: expect.any(String),
    country: expect.any(String),
    origin: expect.any(String),
    coat: expect.any(String),
    pattern: expect.any(String),
  }),
}
