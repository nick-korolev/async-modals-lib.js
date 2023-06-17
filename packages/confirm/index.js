import s from './index.scss';
import { builder } from '../core/builder';

const confirmModal = async (options) => {
  const title = options.title || '';
  const message = options.message || '';
  const okText =  options.okText || 'OK';
  const cancelText =  options.cancelText || 'Cancel';

  const template = `
    ${title ? `<div class="amljs-confirm-title">${title}</div>` : ''}
    ${message ? `<div class="amljs-confirm-message">${message}</div>` : ''}
    <div class="amljs-confirm-buttons">
      <button class="amljs-button amljs-confirm-button amljs-button--ok">${okText}</button>
      <button class="amljs-button amljs-confirm-button amljs-button--cancel">${cancelText}</button>
    </div>
  `;

  const buttons = [
    {
      selector: '.amljs-confirm-button.amljs-button--ok',
      handler: (resolver) => {
        resolver(true);
      }
    },
    {
      selector: '.amljs-confirm-button.amljs-button--cancel',
      handler: (resolver) => {
        resolver(false);
      }
    }
  ];

  const root = options.root || document.body;
  const { promise } = builder({
    template,
    buttons,
    root,
    componentType: 'confirm',
    s,
    closable: options.closable,
    animation: options.animation,
    width: options.width,
  });

  return promise;
};

export default confirmModal;
