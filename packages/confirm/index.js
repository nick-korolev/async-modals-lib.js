import s from './index.scss';

const confirmModal = async (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  const message = options.message || 'Are you sure?';
  const root = options.root || document.body;
  const confirm = document.createElement('div');
  const backdrop = document.createElement('div');
  backdrop.classList.add('confirm__backdrop');

  confirm.innerHTML = `
    <div class="confirm__message">${message}</div>
    <button class="confirm__button confirm__button--ok">OK</button>
    <button class="confirm__button confirm__button--cancel">Cancel</button>
  `;
  confirm.classList.add('confirm');

  const okButton = confirm.querySelector('.confirm__button--ok');
  const cancelButton = confirm.querySelector('.confirm__button--cancel');
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
    confirm.classList.add('confirm--close');
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
