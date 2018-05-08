import * as visit from 'unist-util-visit'

const TableRow = (values: string[]) => (
  {
    children: values.map(
      (value) => ({
        children: [{
          type: 'text',
          value
        }],
        type: 'tableCell'
      })
    ),
    type: 'tableRow'
  }
)
const Table = (head: string[], body: any[]) => (
  {
    align: [null, null, null],
    children: (
      [
        TableRow(head)
      ].concat(
        body.map(
          (cookie) => TableRow([cookie.name, cookie.info, cookie.expires])
        )
      )
    ),
    type: 'table'
  }
)

const parser = (cookies: any[]) => (node: any, index: number, parent: any) => {
  if (node.identifier === 'cookies') {
    parent.children[index] = Table(
      ['Name', 'Purpose', 'Term'],
      cookies.filter(
        (item) => item.type === node.attributes.type)
    )
  }
}

export const CookieTable = (options: { cookies: any[] }) => (ast: any) => {
  visit(ast, 'shortcode', parser(options.cookies || []))
}
