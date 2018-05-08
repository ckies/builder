import { BasePage } from '@ckies/pages'
import * as remark from 'remark'
import * as html from 'remark-html'
import * as shortcodes from 'remark-shortcodes'
import * as stringify from 'remark-stringify'

import { CookieTable } from '../blocks/CookieTable'
import { CookieToggle } from '../blocks/CookieToggle'
import { Cookie } from '../types'

export class Builder {
  constructor(
    public page: BasePage,
    public cookies?: Cookie[]
  ) { }

  public toMarkdown(): string {
    return this.parseWith(stringify).toString()
  }

  public toHTML(): string {
    return this.parseWith(html).toString()
  }

  private parseWith(parser: any) {
    return remark().use(
      shortcodes
    ).use(
      CookieTable, { cookies: this.cookies || [] }
    ).use(
      CookieToggle
    ).use(
      parser
    ).processSync(
      this.page.data
    )
  }
}
