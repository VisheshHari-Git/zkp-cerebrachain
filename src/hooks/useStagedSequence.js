import { useEffect, useRef, useState } from 'react'

/**
 * Advances through `steps` (an array) one at a time on an interval,
 * while `running` is true. Returns the current index and a `done` flag.
 * Used to drive the scan / segmentation / ZK-proof / model-status UIs
 * without duplicating setTimeout chains in every component.
 */
export function useStagedSequence(steps, { running = false, stepDuration = 900, onComplete } = {}) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!running) {
      setIndex(0)
      return undefined
    }

    setIndex(0)
    let current = 0

    function tick() {
      current += 1
      if (current >= steps.length) {
        setIndex(steps.length - 1)
        onCompleteRef.current?.()
        return
      }
      setIndex(current)
      timeoutRef.current = setTimeout(tick, stepDuration)
    }

    timeoutRef.current = setTimeout(tick, stepDuration)

    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, steps.length, stepDuration])

  return { index, done: running && index === steps.length - 1 }
}
