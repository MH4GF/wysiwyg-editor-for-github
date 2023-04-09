import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import { useCallback, useEffect } from 'react'
import type { FC } from 'react'

interface UpdateFromExternalValuePluginProps {
  value: string
}

const UpdateFromExternalValuePlugin: FC<UpdateFromExternalValuePluginProps> = ({ value }) => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    editor.update(() => {
      $convertFromMarkdownString(value, TRANSFORMERS)
    })
  }, [value])

  return null
}

interface UpdateToExternalValuePluginProps {
  onUpdate: (value: string) => void
}

const UpdateToExternalValuePlugin: FC<UpdateToExternalValuePluginProps> = ({ onUpdate }) => {
  const onChange = useCallback((_editorState: EditorState, editor: LexicalEditor) => {
    return editor.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS)
      onUpdate(markdown)
    })
  }, [])

  return <OnChangePlugin onChange={onChange} />
}

type Props = UpdateFromExternalValuePluginProps & UpdateToExternalValuePluginProps

export const SyncExternalValuePlugin: FC<Props> = ({ value, onUpdate }) => {
  return (
    <>
      <UpdateFromExternalValuePlugin value={value} />
      <UpdateToExternalValuePlugin onUpdate={onUpdate} />
    </>
  )
}
