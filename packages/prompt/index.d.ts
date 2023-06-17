interface IPromptOptions {
  title?: string;
  message?: string;
  okText?: string;
  defaultValue?: string;
  placeholder?: string;
  root?: HTMLElement;
  closable?: boolean;
  animation?: 'ease' | 'slide' | 'verticalSlide';
  width?: number;
}

export default function (options: IPromptOptions): Promise<string>;
