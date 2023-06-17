interface IConfirmOptions {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  root?: HTMLElement;
  closable?: boolean;
  animation?: 'ease' | 'slide' | 'verticalSlide';
  width?: number;
}

export default function (options: IConfirmOptions): Promise<boolean>;
