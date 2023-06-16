import s from './index.scss';

const alertModal = async (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  const title = options.title || '';
  const message = options.message || '';
  const timeout = options.timeout || null;
  const buttonText =  options.okText || 'OK';
  const root = options.root || document.body;
  const alert = document.createElement('div');
  const backdrop = document.createElement('div');
  backdrop.classList.add('amljs-alert-backdrop');

  const alertButtonClass = options.type === 'error' ? 'amljs-alert-button--cancel' : 'amljs-alert-button--ok';
  alert.innerHTML = `
    ${ title ? `<h1 class="amljs-alert-title">${title}</h1>` : ''}
    ${ message ? `<p class="amljs-alert-message">${message}</p>` : ''}
    ${ timeout ? '' : `<button class="amljs-alert-button ${alertButtonClass}">${buttonText}</button>` }
  `;
  alert.classList.add('amljs-alert');

  const button = alert.querySelector(`.${alertButtonClass}`);
  const style = document.createElement('style');
  style.textContent = s;

  const cleanup = () => {
    alert.remove();
    style.remove();
    backdrop.remove();
    button.removeEventListener('click', buttonHandler);
  };

  const close = () => {
    alert.classList.add('amljs-alert-close');
    backdrop.classList.add('amljs-alert-backdrop-close');
    alert.addEventListener('animationend', cleanup);
  };

  const buttonHandler = () => {
    resolver(true);
    close();
  };

  button?.addEventListener('click', buttonHandler);

  root.appendChild(backdrop);
  root.appendChild(alert);
  root.appendChild(style);

  if (options.timeout) {
    const timer = setTimeout(() => {
      buttonHandler();
      clearTimeout(timer);
    }, options.timeout);
  }
  return promise;
};

export default alertModal;
