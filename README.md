# Async Modals Library

This library provides simple API, and highly customizable way to implement modals in your application. With built-in handling for asynchronous actions, it supports alert modals with customizable success and error states, a user confirmation step with customizable OK and Cancel buttons, a prompt modal component which allows users to enter data.
![image](https://github.com/nick-korolev/async-modals-lib.js/assets/94742553/d83d1b4c-be68-494f-80da-db63b62735ff)

**No dependencies**

![gzip](https://deno.bundlejs.com/?q=async-modals-lib.js&badge=)

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install Async Modals Library.

```bash
npm install async-modals-lib.js
# or
yarn add async-modals-lib.js
```

## Usage
### Alert
```javascript
import alertModal from 'async-modals-lib.js';

const options = {
  title: 'Your Title',
  message: 'Your Message',
  type: 'success', // or 'error'
  timeout: 3000, // in milliseconds, optional
  okText: 'OK', // text for the OK button, optional
  root: document.body, // the parent for the modal, optional
  closable: true, // whether the modal can be closed by user interaction, optional
  animation: 'slide', // type of animation for the modal display, optional 'ease' | 'slide' | 'verticalSlide'
  width: '400px' // width of the modal, optional
};

const result = await alertModal(options)
// return true

```

### Confirm 

```javascript
import confirmModal from 'async-modals-lib.js';

const options = {
  title: 'Your Title',
  message: 'Your Message',
  okText: 'Yes', // text for the Yes button, optional
  cancelText: 'No', // text for the No button, optional
  root: document.body, // the parent for the modal, optional
  closable: true, // whether the modal can be closed by user interaction, optional
  animation: 'slide', // type of animation for the modal display, optional 'ease' | 'slide' | 'verticalSlide'
  width: '400px' // width of the modal, optional
};

const isConfirmed = await confirmModal(options)
// return true or false 

```
### Prompt

```javascript
import promptModal from 'async-modals-lib.js';

const options = {
  title: 'Your Title',
  message: 'Your Message',
  okText: 'Submit', // text for the Submit button, optional
  defaultValue: '', // default input value, optional
  placeholder: 'Your Placeholder', // placeholder for the input, optional
  root: document.body, // the parent for the modal, optional
  closable: true, // whether the modal can be closed by user interaction, optional
  animation: 'slide', // type of animation for the modal display, optional 'ease' | 'slide' | 'verticalSlide'
  width: '400px' // width of the modal, optional
};

const inputText = await promptModal(options)

```

# Custom Styles

You can easily customize the look and feel of your modals by overriding the styles. Each element of the modals has a specific class assigned, and you can target these classes in your CSS to apply custom styles. The CSS classes are:

- Alert Modal: `.amljs-alert-title`, `.amljs-alert-icon`, `.amljs-alert-message`, `.amljs-alert-button`, `.amljs-button`, `.amljs-button--ok`, `.amljs-button--cancel`, `.amljs-alert-message--error`, `.amljs-alert-message--success`
- Confirm Modal: `.amljs-confirm-title`, `.amljs-confirm-message`, `.amljs-button`, `.amljs-confirm-button`, `.amljs-button--ok`, `.amljs-button--cancel`
- Prompt Modal: `.amljs-prompt-title`, `.amljs-prompt-message`, `.amljs-prompt-input`, `.amljs-button`, `.amljs-prompt-button`, `.amljs-button--ok`

Please note that your custom styles should be loaded after the library styles to ensure they take precedence. If you are using CSS modules or a similar methodology, you may need to apply a higher specificity or use `!important` to override the default styles.

Here is an example of how you can override the styles:

```css
.amljs-alert-button {
  background-color: #ff6347;
  color: white;
}

.amljs-alert-title {
  font-size: 2em;
}

.amljs-prompt-input {
  border: 2px solid #ff6347;
}
```

In the above example, the alert button is styled with a tomato background and white text. The alert title font size is increased, and the prompt input field has a tomato border.

Feel free to style your modals as you see fit to match your project's design!

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you encounter any problems or have suggestions, please open an issue.

