import { useEffect } from "react"


// exceptions: elements in which 
//              a click don't call callback function
export default function useClickOutside(
  callback: CallableFunction, 
  exceptions: React.RefObject<HTMLElement>[]
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const insideException = exceptions
        .find(e => e.current 
            && e.current.contains(event.target as Node))
      if (exceptions[0].current
          && !insideException) {
          callback()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [exceptions[0]])
}