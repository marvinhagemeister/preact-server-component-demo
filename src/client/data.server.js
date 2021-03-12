export const ServerComponent = ({ state }: { state: Boolean }) => {
  return { J0: state ? ["$", "h3", null, { "class": "foo", "children": "hello"}] : ["$", "p", null, { "children": "This is text coming from the server"}] }
}

export const ServerComponent2  = ({ state }: { state: Boolean }) => {
  return { J0: state ? ["$", "h3", null, { "children": "world!"}] : ["$", "h3", null, { "class": "foo", "children": "Franzbrötchen"}] }
}
