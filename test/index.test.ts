import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('fph', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('runs', ctx => {
    expect(ctx.stdout).to.contain('Fetching latest trends from Product Hunt')
  })

  test
  .stdout()
  .do(() => cmd.run([]))
  .it('fetches data', ctx => {
    expect(ctx.stdout).to.contain('https://www.producthunt.com/posts/')
  })
})
