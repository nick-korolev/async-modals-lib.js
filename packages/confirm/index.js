import s from './index.scss';

const confirmModal = async (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  const title = options.title || '';
  const message = options.message || '';
  const okText =  options.okText || 'OK';
  const cancelText =  options.cancelText || 'Cancel';
  const root = options.root || document.body;
  const confirm = document.createElement('div');
  const backdrop = document.createElement('div');
  backdrop.classList.add('amljs-confirm-backdrop');

  confirm.innerHTML = `
    ${title ? `<h1 class="amljs-confirm-title">${title}</h1>` : ''}
    ${message ? `<p class="amljs-confirm-message">${message}</p>` : ''}
    <button class="amljs-confirm-button amljs-confirm-button--ok">${okText}</button>
    <button class="amljs-confirm-button amljs-confirm-button--cancel">${cancelText}</button>
  `;
  confirm.classList.add('amljs-confirm');

  const okButton = confirm.querySelector('.amljs-confirm-button--ok');
  const cancelButton = confirm.querySelector('.amljs-confirm-button--cancel');
  const style = document.createElement('style');
  style.textContent = s;

  const cleanup = () => {
    confirm.remove();
    style.remove();
    backdrop.remove();
    okButton.removeEventListener('click', okButtonHandler);
    cancelButton.removeEventListener('click', cancelButtonHandler);
  };

  const close = () => {
    confirm.classList.add('amljs-confirm-close');
    backdrop.classList.add('amljs-confirm-backdrop-close');
    confirm.addEventListener('animationend', cleanup);
  };

  const okButtonHandler = () => {
    resolver(true);
    close();
  };

  const cancelButtonHandler = () => {
    resolver(false);
    close();
  };

  okButton.addEventListener('click', () => {
    okButtonHandler();
  });
  cancelButton.addEventListener('click', () => {
    cancelButtonHandler();
  });

  root.appendChild(backdrop);
  root.appendChild(confirm);
  root.appendChild(style);

  return promise;
};

export default confirmModal;
