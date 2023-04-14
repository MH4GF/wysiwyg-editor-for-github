import domLoaded from 'dom-loaded'
import * as pageDetect from 'github-url-detection'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { SELECTORS } from './GitHubPage'

const render = (selector: string, callback: (element: Element) => void) => {
  const elements = Array.from(document.querySelectorAll(selector))
  return elements.map((element) => callback(element))
}

const createButton = (element: Element) => {
  const button = document.createElement('button')
  button.classList.add('tabnav-tab', 'richtext-tab')
  button.textContent = 'Rich Text'
  button.type = 'button'
  button.role = 'tab'
  element.appendChild(button)
}

const createRichTextEditor = (element: Element) => {
  const root = document.createElement('div')
  root.classList.add('richtext-editor-root')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  element.appendChild(root)
}

interface Feature {
  includes: [() => boolean]
  init: () => void
}

const newIssue: Feature = {
  includes: [pageDetect.isNewIssue],
  init: () => {
    render(SELECTORS.TABNAV, createButton)
    render(SELECTORS.TAB_CONTAINER, createRichTextEditor)
  },
}

const initFeature = (feature: Feature) => {
  if (!feature.includes.some((include) => include())) {
    return
  }

  feature.init()
}

const listenPageLoad = (callback: () => void) => {
  callback()

  document.addEventListener(
    'turbo:render',
    () => {
      callback()
    },
    { passive: true },
  )
}

const features: Feature[] = [newIssue]

const main = async () => {
  await domLoaded
  console.log('richtext: load start')
  listenPageLoad(() => {
    features.forEach((feature) => initFeature(feature))
  })

  console.log('richtext: load end')
}

void main()
