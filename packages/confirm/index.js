import s from './index.scss';

const confirmModal = async (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  const message = options.message || 'Are you sure?';
  const root = options.root || document.body;
  const confirm = document.createElement('div');
  confirm.innerHTML = `
    <div class="backdrop"></div>
    <div class="confirm">
      <div class="confirm__message">${message}</div>
      <button class="confirm__button confirm__button--ok">OK</button>
      <button class="confirm__button confirm__button--cancel">Cancel</button>
    </div>
  `;
  const okButton = confirm.querySelector('.confirm__button--ok');
  const cancelButton = confirm.querySelector('.confirm__button--cancel');
  const style = document.createElement('style');
  style.textContent = s;

  const okButtonHandler = () => {
    resolver(true);
    cleanup();
  };

  const cancelButtonHandler = () => {
    resolver(false);
    cleanup();
  };

  const cleanup = () => {
    confirm.remove();
    style.remove();
    confirm.removeEventListener('animationend', cleanup);
    okButton.removeEventListener('click', okButtonHandler);
    cancelButton.removeEventListener('click', cancelButtonHandler);
  };
  okButton.addEventListener('click', () => {
    okButtonHandler();
  });
  cancelButton.addEventListener('click', () => {
    cancelButtonHandler();
  });

  root.appendChild(confirm);
  root.appendChild(style);

  return promise;
};

export default confirmModal;
