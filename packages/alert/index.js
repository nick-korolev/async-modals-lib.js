import { builder } from '../core/builder'
import s from './index.scss'

const SuccessIcon = `
<svg class="amljs-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
  <circle class="amljs-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
  <path class="amljs-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
`

const ErrorIcon = `
<svg class="amljs-crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
  <circle class="amljs-crossmark__circle" cx="26" cy="26" r="25" fill="none"/>
  <path class="amljs-crossmark__cross" fill="none" d="M16,16 L36,36 M36,16 L16,36"/>
</svg>
`

const alertModal = async options => {
  const title = options.title || ''
  const message = options.message || ''
  const timeout = options.timeout || null
  const buttonText = options.okText || 'OK'

  const alertButtonClass = options.type === 'error' ? 'amljs-button--cancel' : 'amljs-button--ok'
  const alertMessageClass = options.type === 'error' ? 'amljs-alert-message--error' : 'amljs-alert-message--success'
  const template = `
    <div class="amljs-alert-content">
      ${title ? `<div class="amljs-alert-title" id="alert-title">${title}</div>` : ''}
      <div class="amljs-alert-icon" aria-hidden="true">
        ${options.type === 'success' ? SuccessIcon : ErrorIcon}
      </div>
      ${message ? `<div class="amljs-alert-message ${alertMessageClass}" id="alert-message">${message}</div>` : ''}
      ${timeout ? '' : `<button class="amljs-alert-button amljs-button ${alertButtonClass}" aria-labelledby="alert-title alert-message">${buttonText}</button>`}
    </div>
  `

  const buttons = [
    {
      selector: '.amljs-alert-button',
      handler: resolver => {
        resolver(true)
      },
    },
  ]

  const root = options.root || document.body
  const { promise, resolver } = builder({
    template,
    buttons: timeout ? [] : buttons,
    root,
    componentType: 'alert',
    s,
    timeout,
    closable: options.closable,
    animation: options.animation,
    width: options.width,
  })

  if (options.timeout) {
    const timer = setTimeout(() => {
      resolver(true)
      clearTimeout(timer)
    }, options.timeout)
  }

  return promise
}

export default alertModal
