import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { SELECTORS } from './GitHubPage'

const tabContainer = document.querySelector(SELECTORS.TAB_CONTAINER)
if (!tabContainer) {
  throw new Error('Cannot find tab container')
}

const richTextEditorTab = document.createElement('div')
tabContainer.appendChild(richTextEditorTab)
ReactDOM.createRoot(richTextEditorTab).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
