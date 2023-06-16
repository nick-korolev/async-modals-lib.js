import s from './index.scss';
import { builder } from '../core/builder';

const confirmModal = async (options) => {
  const title = options.title || '';
  const message = options.message || '';
  const okText =  options.okText || 'OK';
  const cancelText =  options.cancelText || 'Cancel';

  const template = `
    ${title ? `<h1 class="amljs-confirm-title">${title}</h1>` : ''}
    ${message ? `<p class="amljs-confirm-message">${message}</p>` : ''}
    <button class="amljs-confirm-button amljs-confirm-button--ok">${okText}</button>
    <button class="amljs-confirm-button amljs-confirm-button--cancel">${cancelText}</button>
  `;

  const buttons = [
    {
      selector: '.amljs-confirm-button--ok',
      handler: (resolver) => {
        resolver(true);
      }
    },
    {
      selector: '.amljs-confirm-button--cancel',
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
    s
  });

  return promise;
};

export default confirmModal;
