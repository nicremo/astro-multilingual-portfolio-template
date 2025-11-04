// src/types/react-obfuscate.d.ts
declare module 'react-obfuscate' {
  import { ComponentChildren, JSX } from 'preact';

  export interface ObfuscateProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
    email?: string;
    headers?: Record<string, string>;
    tel?: string;
    sms?: string;
    facetime?: string;
    href?: string;
    children?: ComponentChildren;
    element?: any;
    obfuscate?: boolean;
    obfuscateChildren?: boolean;
    linkText?: string;
    style?: JSX.CSSProperties;
    onClick?: () => void;
  }

  const Obfuscate: (props: ObfuscateProps) => JSX.Element;
  export default Obfuscate;
}
