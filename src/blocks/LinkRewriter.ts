import * as visit from 'unist-util-visit'

export interface Links {
  policy?: string
  settings?: string
}

const parser = (links: Links) => (node: any, index: number, parent: any) => {
  if (node.url === '#settings' && links.settings) {
    node.url = links.settings
  }

  if (node.url === '#policy' && links.policy) {
    node.url = links.policy
  }
}

export const LinkRewriter = (options: { links: Links }) => (ast: any) => {
  visit(ast, 'link', parser(options.links || []))
}
