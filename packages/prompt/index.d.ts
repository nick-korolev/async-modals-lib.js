interface IPromptOptions {
  title?: string;
  message?: string;
  okText?: string;
  defaultValue?: string;
  placeholder?: string;
  root?: HTMLElement;
}

export default function (options: IPromptOptions): Promise<string>;
