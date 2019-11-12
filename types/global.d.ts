declare interface Window {
  fbq: (eventName: string, type: string, option?: {}) => void;
  gtag: (eventName: string, type: string, option?: {}) => void;
}
