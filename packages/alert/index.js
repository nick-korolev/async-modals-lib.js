import s from './index.scss';
import { builder } from '../core/builder';

const alertModal = async (options) => {

  const title = options.title || '';
  const message = options.message || '';
  const timeout = options.timeout || null;
  const buttonText =  options.okText || 'OK';

  const alertButtonClass = options.type === 'error' ? 'amljs-alert-button--cancel' : 'amljs-alert-button--ok';
  const template = `
    ${ title ? `<h1 class="amljs-alert-title">${title}</h1>` : ''}
    ${ message ? `<p class="amljs-alert-message">${message}</p>` : ''}
    ${ timeout ? '' : `<button class="amljs-alert-button ${alertButtonClass}">${buttonText}</button>` }
  `;

  const buttons = [
    {
      selector: `.${alertButtonClass}`,
      handler: (resolver) => {
        resolver(true);
      }
    }
  ];

  const root = options.root || document.body;
  const { promise, resolver } = builder({
    template,
    buttons: timeout ? [] : buttons,
    root,
    componentType: 'alert',
    s,
    timeout
  });

  if (options.timeout) {
    const timer = setTimeout(() => {
      resolver(true);
      clearTimeout(timer);
    }, options.timeout);
  }

  return promise;
};

export default alertModal;
