declare interface Window {
  events: EventTarget;
  FB: {};
  fbq: (eventName: string, type: string, option?: {}) => void;
  gtag: (eventName: string, type: string, option?: {}) => void;
  grecaptcha: {
    render: (dom: HTMLElement, options: { sitekey: string }) => void;
    getResponse: () => string;
    reset: () => void;
  };
}
