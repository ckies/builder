export enum CookieType {
  NECESSARY = 'necessary',
  FUNCTIONAL = 'functional',
  PERFORMANCE = 'performance',
  MARKETING = 'marketing'
}

export interface Cookie {
  name: string
  info: string
  type: CookieType
  host?: string
  expires: string
}