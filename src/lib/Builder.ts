import { BasePage } from '@ckies/pages'
import * as remark from 'remark'
import * as html from 'remark-html'
import * as shortcodes from 'remark-shortcodes'
import * as stringify from 'remark-stringify'

import { CookieTable } from '../blocks/CookieTable'
import { CookieToggle } from '../blocks/CookieToggle'
import { LinkRewriter } from '../blocks/LinkRewriter'
import { Cookie } from '../types'

export interface Options {
  cookies?: Cookie[]
  url?: {
    policy?: string
    settings?: string
  }
}

export class Builder {
  constructor(
    public page: BasePage,
    public options?: Options
  ) { }

  public toMarkdown(): string {
    return this.parseWith(stringify).toString()
  }

  public toHTML(): string {
    return this.parseWith(html).toString()
  }

  private cookies() {
    return this.options && this.options.cookies ? (
      this.options.cookies
    ) : []
  }

  private url() {
    return this.options && this.options.url ? (
      this.options.url
    ) : {}
  }

  private parseWith(parser: any) {
    return remark().use(
      shortcodes
    ).use(
      CookieTable, { cookies: this.cookies() }
    ).use(
      CookieToggle
    ).use(
      LinkRewriter, { url: this.url() }
    ).use(
      parser
    ).processSync(
      this.page.data
    )
  }
}
