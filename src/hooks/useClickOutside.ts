import { useEffect } from "react"


// exceptions: elements refs in which 
//              a click don't call callback function
// callback: use on outside exceptions
// callbackInside: use on inside exceptions
export default function useClickOutside(
  callback: CallableFunction, 
  exceptions: React.RefObject<HTMLElement>[],
  callbackInside?: CallableFunction,
  container?: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      const insideException = exceptions
        .find(e => e.current 
            && e.current.contains(event.target as Node))
      if (!exceptions[0].current) {
        return
      }
      if (!insideException) {
        callback(event)
      } else {
        callbackInside && callbackInside(event)
      }
    }

    const cont = (container && container.current) || document
    
    cont.addEventListener("mousedown", handleClickOutside)
    return () => {
      cont.removeEventListener("mousedown", handleClickOutside)
    }
  }, [exceptions[0]])
}