interface IAlertOptions {
  title?: string;
  message?: string;
  okText?: string;
  timeout?: number;
  type: 'success' | 'info' | 'warning' | 'error';
  root?: HTMLElement;
}

export default function (options: IAlertOptions): Promise<boolean>;
