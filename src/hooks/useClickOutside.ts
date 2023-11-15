import { useEffect } from "react"

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