export default function preventClickOutsideLabelElements(
  e: React.MouseEvent<HTMLLabelElement, MouseEvent>, 
  ...queries:string[]
) {
  const elements = queries.map(e => document.querySelector(e))
  console.log(elements)
  if (!elements.includes(e.target as HTMLElement)) {
    e.preventDefault()
  }
}