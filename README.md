# api-testing

An example testing repo against some public APIs.

## Getting Started

Recommended Node v12.22, NPM v7.24

Clone the repo from Github, then install with `npm ci`.

Tests are run with `npm test`.

## Test Suites

### Cat Tests

This collection hits against [Catfact](https://catfact.ninja/).

You'll notice some occasional test failures:

* Some of the cat facts seem to have incorrect "lengths" returned, compared to the actual length of the item.
* The `/breeds` endpoint ignores the submitted limit amount for pagination purposes
