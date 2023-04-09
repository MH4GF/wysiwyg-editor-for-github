import { RichTextEditor } from '@project/rich-text-editor'
import { useRef } from 'react'
import { createPortal } from 'react-dom'

import { SELECTORS, useSyncGitHubTabsState, useSyncGitHubTextareaValue } from './GitHubPage'

const githubTabnav = document.querySelector(SELECTORS.TABNAV)
if (!githubTabnav) {
  throw new Error('Cannot find tab nav')
}

export const App = () => {
  const richtextButtonRef = useRef<HTMLButtonElement>(null)
  const selected = useSyncGitHubTabsState({ richtextButtonRef })
  const { value, setValue } = useSyncGitHubTextareaValue()

  return (
    <div>
      {createPortal(
        <button type="button" className="tabnav-tab" role="tab" ref={richtextButtonRef}>
          Rich Text
        </button>,
        githubTabnav,
      )}
      <div role="tabpanel">
        {selected ? <RichTextEditor value={value} onUpdate={setValue} /> : null}
      </div>
    </div>
  )
}
