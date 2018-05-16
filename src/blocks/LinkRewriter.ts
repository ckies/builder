import * as visit from 'unist-util-visit'

export interface URLs {
  policy?: string
  settings?: string
}

const parser = (url: URLs) => (node: any, index: number, parent: any) => {
  if (node.url === '#settings' && url.settings) {
    node.url = url.settings
  }

  if (node.url === '#policy' && url.policy) {
    node.url = url.policy
  }
}

export const LinkRewriter = (options: { url: URLs }) => (ast: any) => {
  visit(ast, 'link', parser(options.url || []))
}
