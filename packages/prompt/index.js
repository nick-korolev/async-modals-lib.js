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
  let templateElement = `<input class="amljs-prompt-input" placeholder="${placeholder}" type="text" />`;
  if (component === 'textarea') {
    templateElement = `<textarea class="amljs-prompt-input" placeholder="${placeholder}"></textarea>`;
  }
  const template = `
    ${title ? `<div class="amljs-prompt-title">${title}</div>` : ''}
    ${message ? `<div class="amljs-prompt-message">${message}</div>` : ''}
    ${templateElement}
    <button class="amljs-button amljs-prompt-button amljs-button--ok">${buttonText}</button>
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
  input.addEventListener('keyup', (e) => {
    value = e.target.value;
    if (e.keyCode === 13 && component === 'input') {
      resolver(value);
    }
  });
  input.focus();
  return promise;
};

export default promptModal;
