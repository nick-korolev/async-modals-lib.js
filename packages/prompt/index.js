import s from './index.scss';

const promptModal = async (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  const title = options.title || '';
  const message = options.message || '';
  const buttonText = options.okText || 'Ok';
  const defaultValue = options.defaultValue || '';
  const root = options.root || document.body;
  const prompt = document.createElement('div');
  const backdrop = document.createElement('div');
  backdrop.classList.add('amljs-prompt-backdrop');

  prompt.innerHTML = `
    ${title ? `<h1 class="amljs-prompt-title">${title}</h1>` : ''}
    ${message ? `<p class="amljs-prompt-message">${message}</p>` : ''}
    <input class="amljs-prompt-input" type="text" />
    <button class="amljs-prompt-button amljs-prompt-button--ok">${buttonText}</button>
  `;
  prompt.classList.add('amljs-prompt');

  const okButton = prompt.querySelector('.amljs-prompt-button--ok');
  const style = document.createElement('style');
  style.textContent = s;
  const input = prompt.querySelector('.amljs-prompt-input');
  let value = defaultValue;
  input.value = value;
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      okButtonHandler();
    }
    value = e.target.value;
  });

  const cleanup = () => {
    prompt.remove();
    style.remove();
    backdrop.remove();
    okButton.removeEventListener('click', okButtonHandler);
  };

  const close = () => {
    prompt.classList.add('amljs-prompt-close');
    backdrop.classList.add('amljs-prompt-backdrop-close');
    prompt.addEventListener('animationend', cleanup);
  };

  const okButtonHandler = () => {
    resolver(value);
    close();
  };

  okButton.addEventListener('click', () => {
    okButtonHandler();
  });

  root.appendChild(backdrop);
  root.appendChild(prompt);
  root.appendChild(style);

  input.focus();
  return promise;
};

export default promptModal;
