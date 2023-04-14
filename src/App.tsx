import { RichTextEditor } from '@project/rich-text-editor'

import { useSyncGitHubTabsState, useSyncGitHubTextareaValue } from './GitHubPage'

export const App = () => {
  const selected = useSyncGitHubTabsState()
  const { value, setValue } = useSyncGitHubTextareaValue()

  return (
    <div role="tabpanel">
      {selected ? <RichTextEditor value={value} onUpdate={setValue} /> : null}
    </div>
  )
}
