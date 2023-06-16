// jsdoc
/**
 * @param options
 * @param options.template {string} - template
 * @param options.buttons {Array<{selector: string, handler: () => void>}>} - array of buttons
 * @param options.root {HTMLElement} - root element
 * @param options.componentType {alert | confirm | prompt} - component type
 * @param options.s {string} - css
 * @returns {{promise: Promise<boolean> | Promise<string> | Promise<unknown>, resolver: (val: unknown) => void}}
 */
export const builder = (options) => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });

  const template = options.template || '';
  const root = options.root || document.body;
  const component = document.createElement('div');
  component.tabIndex = 0;
  const backdrop = document.createElement('div');
  backdrop.classList.add(`amljs-${options.componentType}-backdrop`);
  component.innerHTML = template;
  component.classList.add(`amljs-${options.componentType}`);
  const style = document.createElement('style');
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
    component.classList.add(`amljs-${options.componentType}-close`);
    backdrop.classList.add(`amljs-${options.componentType}-backdrop-close`);
    component.addEventListener('animationend', cleanup);
  };

  buttons.forEach((button) => {
    button.element.addEventListener('click', () => {
      button.handler(resolver);
      close();
    });
  });

  root.appendChild(backdrop);
  root.appendChild(component);
  root.appendChild(style);
  component.focus();

  return { promise, resolver: (val) => {
    resolver(val);
    close();
  } };

};
