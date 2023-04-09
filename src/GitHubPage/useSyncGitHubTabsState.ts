import type { RefObject } from 'react'
import { useMemo, useCallback, useSyncExternalStore } from 'react'

import { SELECTORS } from './constants'

interface Args {
  richtextButtonRef: RefObject<HTMLButtonElement>
}

/**
 *
 * GitHubのエディタタブの状態を同期する
 * この拡張機能から挿入したボタンが現在選択されているかどうかを返す
 * https://github.com/MH4GF/richtext-editor-for-github/issues/newでデベロッパーツールを開き、
 * ソースのindex.jsを見るとタブの変更処理を行っていることがわかる
 */
export const useSyncGitHubTabsState = ({ richtextButtonRef }: Args) => {
  const tabContainer = useMemo(() => document.querySelector(SELECTORS.TAB_CONTAINER), [])

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      tabContainer?.addEventListener('tab-container-changed', onStoreChange)
      return () => tabContainer?.removeEventListener('tab-container-changed', onStoreChange)
    },
    [tabContainer],
  )

  const getSnapshot = useCallback(() => richtextButtonRef.current?.ariaSelected === 'true', [])

  return useSyncExternalStore(subscribe, getSnapshot)
}
