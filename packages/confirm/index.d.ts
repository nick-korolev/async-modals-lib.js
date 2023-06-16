interface IConfirmOptions {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  root?: HTMLElement;
}

export default function (options: IConfirmOptions): Promise<boolean>;
