import * as path from 'path'

import { Policy, Settings } from '@ckies/pages'

import { Builder } from '../src/lib/Builder'
import { Cookie, CookieType } from '../src/types'

describe('Builder', () => {
  describe('Settings', () => {
    let builder: Builder
    const settings = new Settings('en')

    beforeEach(() => {
      builder = new Builder(settings)
    })

    it('can return the raw Markdown file with custom shortcodes', () => {
      expect(builder.page.data).toContain('# Cookie Settings')

      expect(builder.page.data).toContain('[[ toggle for="functional" ]]')
      expect(builder.page.data).toContain('[[ toggle for="performance" ]]')
      expect(builder.page.data).toContain('[[ toggle for="marketing" ]]')
    })

    it('can render a file into Markdown with checkbox for cookie toggle', () => {
      expect(builder.toMarkdown()).toContain('# Cookie Settings')

      expect(builder.toMarkdown()).toContain('<input type="checkbox" name="ckies_toggle_functional" data-cookie-type="functional" />')
      expect(builder.toMarkdown()).toContain('<input type="checkbox" name="ckies_toggle_performance" data-cookie-type="performance" />')
      expect(builder.toMarkdown()).toContain('<input type="checkbox" name="ckies_toggle_marketing" data-cookie-type="marketing" />')

      expect(builder.toMarkdown()).not.toContain('[[ toggle for="functional" ]]')
      expect(builder.toMarkdown()).not.toContain('[[ toggle for="performance" ]]')
      expect(builder.toMarkdown()).not.toContain('[[ toggle for="marketing" ]]')
    })

    it('can render a file into HTML with checkbox for cookie toggle', () => {
      expect(builder.toHTML()).toContain('<h1>Cookie Settings</h1>')

      expect(builder.toHTML()).toContain('<input type="checkbox" name="ckies_toggle_functional" data-cookie-type="functional" />')
      expect(builder.toHTML()).toContain('<input type="checkbox" name="ckies_toggle_performance" data-cookie-type="performance" />')
      expect(builder.toHTML()).toContain('<input type="checkbox" name="ckies_toggle_marketing" data-cookie-type="marketing" />')

      expect(builder.toHTML()).not.toContain('[[ toggle for="functional" ]]')
      expect(builder.toHTML()).not.toContain('[[ toggle for="performance" ]]')
      expect(builder.toHTML()).not.toContain('[[ toggle for="marketing" ]]')
    })

    it('can render a file into HTML with default links to policy', () => {
      expect(builder.toHTML()).toContain('<a href="#policy">Cookie Policy</a>')
    })

    it('can render a file into HTML with custom links to policy', () => {
      const tmp = new Builder(settings, { links: { policy: 'http://custom-link' }})

      expect(tmp.toHTML()).toContain('<a href="http://custom-link">Cookie Policy</a>')
    })
  })

  describe('Policy', () => {
    let builder: Builder
    const policy = new Policy('en')

    const cookies = [
      {
        name: "example_cookie_necessary",
        info: "info for necessary cookie",
        type: CookieType.NECESSARY,
        expires: "10y"
      },
      {
        name: "example_cookie_functional",
        info: "info for functional cookie",
        type: CookieType.FUNCTIONAL,
        expires: "1y"
      },
      {
        name: "example_cookie_performance_1st",
        info: "info for performance cookie 1st",
        type: CookieType.PERFORMANCE,
        expires: "2d"
      },
      {
        name: "example_cookie_performance_2nd",
        info: "info for performance cookie 2nd",
        type: CookieType.PERFORMANCE,
        expires: "2d"
      },
      {
        name: "example_cookie_marketing",
        info: "info for marketing cookie",
        type: CookieType.MARKETING,
        expires: "3h"
      }
    ]

    beforeEach(() => {
      builder = new Builder(policy, { cookies })
    })

    it('can return the raw Markdown file with custom shortcodes', () => {
      expect(builder.page.data).toContain('# Cookie Policy')

      expect(builder.page.data).toContain('[[ cookies type="necessary" ]]')
      expect(builder.page.data).toContain('[[ cookies type="functional" ]]')
      expect(builder.page.data).toContain('[[ cookies type="performance" ]]')
      expect(builder.page.data).toContain('[[ cookies type="marketing" ]]')
    })

    it('can render a file into Markdown with table of cookies', () => {
      expect(builder.toMarkdown()).toContain('# Cookie Policy')

      expect(builder.toMarkdown()).toContain('| info for performance cookie 1st')
      expect(builder.toMarkdown()).toContain('| info for performance cookie 2nd')
      expect(builder.toMarkdown()).toContain('| info for functional cookie')
      expect(builder.toMarkdown()).toContain('| info for necessary cookie')

      expect(builder.toMarkdown()).not.toContain('[[ cookies type="necessary" ]]')
      expect(builder.toMarkdown()).not.toContain('[[ cookies type="functional" ]]')
      expect(builder.toMarkdown()).not.toContain('[[ cookies type="performance" ]]')
      expect(builder.toMarkdown()).not.toContain('[[ cookies type="marketing" ]]')
    })

    it('can render a file into HTML with table of cookies', () => {
      expect(builder.toHTML()).toContain('<h1>Cookie Policy</h1>')

      expect(builder.toHTML()).toContain('<table>')

      expect(builder.toHTML()).toContain('<td>info for performance cookie 1st')
      expect(builder.toHTML()).toContain('<td>info for performance cookie 2nd')
      expect(builder.toHTML()).toContain('<td>info for functional cookie')
      expect(builder.toHTML()).toContain('<td>info for necessary cookie')

      expect(builder.toHTML()).not.toContain('[[ cookies type="necessary" ]]')
      expect(builder.toHTML()).not.toContain('[[ cookies type="functional" ]]')
      expect(builder.toHTML()).not.toContain('[[ cookies type="performance" ]]')
      expect(builder.toHTML()).not.toContain('[[ cookies type="marketing" ]]')
    })

    it('can render a file into HTML with default links to settings', () => {
      expect(builder.toHTML()).toContain('<a href="#settings">Cookie Settings</a>')
    })

    it('can render a file into HTML with custom links to settings', () => {
      const tmp = new Builder(policy, { links: { settings: 'http://custom-link' }})
      
      expect(tmp.toHTML()).toContain('<a href="http://custom-link">Cookie Settings</a>')
    })
  })
})