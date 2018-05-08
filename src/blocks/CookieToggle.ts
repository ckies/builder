import * as visit from 'unist-util-visit'

const parser = () => (node: any, index: number, parent: any) => {
  if (node.identifier === 'toggle') {
    const cookieType = node.attributes.for

    parent.children[index] = {
      type: 'html',
      value: `<input type="checkbox" name="ckies_toggle_${cookieType}" data-cookie-type="${cookieType}" />`
    }
  }
}

export const CookieToggle = () => (ast: any) => {
  visit(ast, 'shortcode', parser())
}
