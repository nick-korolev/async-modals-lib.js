import s from './index.scss';
import { builder } from '../core/builder';

const promptModal = async (options) => {
  const title = options.title || '';
  const message = options.message || '';
  const buttonText = options.okText || 'Ok';
  const defaultValue = options.defaultValue || '';
  const placeholder = options.placeholder || '';

  const component = options.component ? options.component : 'input';
  if (component !== 'input' && component !== 'textarea') {
    throw new Error('Invalid component type');
  }
  let templateElement = `<input class="amljs-prompt-input" placeholder="${placeholder}" type="text" id="prompt-input" aria-labelledby="prompt-title prompt-message" />`;
  if (component === 'textarea') {
    templateElement = `<textarea class="amljs-prompt-input" placeholder="${placeholder}" id="prompt-input" aria-labelledby="prompt-title prompt-message"></textarea>`;
  }
  const template = `
    <div class="amljs-prompt-content">
      ${title ? `<div class="amljs-prompt-title" id="prompt-title">${title}</div>` : ''}
      ${message ? `<div class="amljs-prompt-message" id="prompt-message">${message}</div>` : ''}
      ${templateElement}
      <button class="amljs-button amljs-prompt-button amljs-button--ok" aria-describedby="prompt-title prompt-message">${buttonText}</button>
    </div>
  `;

  const root = options.root || document.body;
  const { promise, resolver } = builder({
    template,
    buttons: [
      {
        selector: '.amljs-prompt-button.amljs-button--ok',
        handler: (res) => {
          res(value);
        }
      }
    ],
    root: options.root || document.body,
    componentType: 'prompt',
    s,
    closable: options.closable,
    animation: options.animation,
    width: options.width,
  });

  const input = root.querySelector('.amljs-prompt-input');
  let value = defaultValue;
  input.value = value;
  input.addEventListener('keydown', (e) => {
    value = e.target.value;
    if (e.keyCode === 13 && component === 'input') {
      resolver(value);
    }
  });
  input.focus();
  return promise;
};

export default promptModal;
