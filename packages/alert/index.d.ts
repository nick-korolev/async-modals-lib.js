interface IAlertOptions {
  title?: string;
  message?: string;
  okText?: string;
  timeout?: number;
  type: 'success' | 'error';
  root?: HTMLElement;
  closable?: boolean;
  animation?: 'ease' | 'slide' | 'verticalSlide';
  width?: number;
}

export default function (options: IAlertOptions): Promise<boolean>;
