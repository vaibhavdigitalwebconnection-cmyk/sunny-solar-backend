/// <reference types="vite/client" />

declare module '*.jfif' {
  const src: string;
  export default src;
}

interface Window {
  fbq?: (...args: any[]) => void;
  _fbq?: any;
}

