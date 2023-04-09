import { useMemo, useCallback, useSyncExternalStore } from 'react'

import { SELECTORS } from './constants'

export const useSyncGitHubTextareaValue = () => {
  const textarea = useMemo(() => {
    return document.querySelector(SELECTORS.TEXTAREA) satisfies HTMLTextAreaElement | null
  }, [])
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      textarea?.addEventListener('input', onStoreChange)
      return () => textarea?.removeEventListener('input', onStoreChange)
    },
    [textarea],
  )
  const getSnapshot = useCallback(() => textarea?.value, [])
  const value = useSyncExternalStore(subscribe, getSnapshot) ?? ''

  const setValue = useCallback(
    (value: string) => {
      if (!textarea) {
        return
      }

      if (textarea.value === value) {
        return
      }

      textarea.value = value
    },
    [textarea],
  )

  return { value, setValue }
}
