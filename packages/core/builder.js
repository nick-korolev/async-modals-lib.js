const CloseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
`;

/**
 * @param options
 * @param options.template {string} - template
 * @param options.buttons {Array<{selector: string, handler: () => void>}>} - array of buttons
 * @param options.root {HTMLElement} - root element
 * @param options.componentType {alert | confirm | prompt} - component type
 * @param options.s {string} - css
 * @param options.closable {boolean} - closable
 * @param options.animation {ease | slide} - animation
 * @param options.width {number} - width
 * @returns {{promise: Promise<boolean> | Promise<string> | Promise<unknown>, resolver: (val: unknown) => void}}
 */
export const builder = (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });

  let template = options.template || '';
  if (options.closable) {
    template += `<button class="amljs-button amljs-close-button" aria-label="Close">${CloseIcon}</button>`;
  }
  const root = options.root || document.body;
  const component = document.createElement('div');
  component.setAttribute('role', 'dialog');
  component.setAttribute('aria-modal', 'true');

  if (options.componentType === 'alert') {
    component.setAttribute('role', 'alertdialog');
  }
  
  component.tabIndex = -1;

  const backdrop = document.createElement('div');
  backdrop.classList.add('amljs-modal-backdrop');
  component.innerHTML = template;
  component.classList.add(`amljs-${options.componentType}`);
  component.classList.add('amljs-modal');
  const style = document.createElement('style');

  const animation = options.animation || 'ease';
  const animationIn = `amljs-modal-${animation}-in`;
  const animationOut = `amljs-modal-${animation}-out`;
  component.classList.add(animationIn);
  if (options.width) {
    component.style.width = `${options.width}px`;
    component.style.left = `calc(50% - ${options.width}px / 2)`;
  }

  style.textContent = options.s;

  const buttons = (options.buttons || []).map((button) => {
    const element = component.querySelector(button.selector);
    return {
      ...button,
      element,
    };
  });

  const cleanup = () => {
    component.remove();
    style.remove();
    backdrop.remove();
    buttons.forEach((button) => {
      button.element.removeEventListener('click', button.handler);
    });
  };
  const close = () => {
    component.classList.add(animationOut);
    backdrop.classList.add('amljs-modal-backdrop-close');
    component.addEventListener('animationend', cleanup);
  };

  buttons.forEach((button) => {
    button.element.addEventListener('click', () => {
      button.handler(resolver);
      close();
    });
  });

  if (options.closable) {
    const closeButton = component.querySelector('.amljs-close-button');
    closeButton.addEventListener('click', () => {
      resolver(null);
      close();
    });
  }

  root.appendChild(backdrop);
  root.appendChild(component);
  root.appendChild(style);
  component.focus();

  return { promise, resolver: (val) => {
    resolver(val);
    close();
  } };

};
